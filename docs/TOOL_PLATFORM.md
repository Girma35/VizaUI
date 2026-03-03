# Tool platform: auth, subscriptions, and future tools

This document explains how the platform supports **paying vs free users**, **pro-only tools**, **ads**, and **referral tracking** without affecting the two existing tools (Time Zone Converter and API Response Test Viewer).

---

## 1. Tool access model

### Free vs pro-only tools

- **`lib/data.ts`** — Each tool has an optional `proOnly?: boolean`. Omit or set to `false` for free tools.
- **Existing tools** (API Tester, Time Zone Converter) have **no** `proOnly` flag, so they stay free for everyone.
- **Future tools** that should be paid: set `proOnly: true` in the tool definition.

### Access control (`lib/tool-access.ts`)

- **`ALWAYS_FREE_TOOL_SLUGS`** — Slugs listed here are never gated (currently `api-tester`, `time-zone-converter`). Use this so existing tools are never affected by future logic.
- **`isToolFreeForAll(slug)`** — True if the tool is free for everyone (in the list or `proOnly` is false).
- **`isProOnlyTool(slug)`** — True if the tool is pro-only.
- **`canAccessTool(slug, isSubscribed)`** — True if the user may use the tool (free tool or subscribed user).
- **`shouldShowAdsOnTool(slug, isSubscribed)`** — True if we should show ads (pro tool + free user).

Use these helpers in layouts and components so behaviour stays consistent.

---

## 2. User accounts and auth

### Stack

- **NextAuth.js** (Credentials provider): login with email + password.
- **Passwords**: hashed with **bcrypt** (e.g. `bcryptjs`), never stored in plain text.
- **Session**: JWT; subscription status is re-read from the DB in the session callback so access updates as soon as subscription changes.

### Registration and referral

- **`POST /api/auth/register`** — Creates user (email, hashed password, name). Reads **referral code** from cookie `viza_ref` and saves it on the user so you can attribute signups to campaigns.
- **Referral cookie**: When a user lands on the site with `?ref=CODE` (or `?referral=CODE`), the register page stores it in a cookie. On submit, the register API sends the cookie and the new user is stored with that referral code.

### Login / logout

- **Login**: `signIn('credentials', { email, password })` on the login page; redirect to dashboard or `callbackUrl`.
- **Logout**: `signOut()` from `next-auth/react` (e.g. in the dashboard or navbar).

### Session and subscription in the app

- **`getServerSession(authOptions)`** — Use in Server Components or API routes to get the current user and session. The session includes `userId`, `isSubscribed`, `subscriptionStatus` (from DB).
- **`useSession()`** — Use in Client Components; same data plus loading state.

Subscription status is resolved in the **session callback** by calling `isSubscribed(userId)`, which reads from the database. So when you update the user’s subscription (e.g. via webhook), the next request gets the new status without extra cache invalidation.

---

## 3. Restricting access and showing ads (future tools only)

### Pro-only tools: paywall

- **`components/tools/ProToolGate.tsx`** — Wraps the **page content** of a **pro-only** tool.
  - If the tool is in `ALWAYS_FREE_TOOL_SLUGS` or not pro-only: always renders `children`.
  - If the tool is pro-only and the user is not subscribed: renders a paywall (message + link to billing); otherwise renders `children`.
- **Usage**: In the **layout or page** of a **new** pro tool, wrap the main content in `<ProToolGate toolSlug="..." toolName="...">{children}</ProToolGate>`. Do **not** use it for `api-tester` or `time-zone-converter`.

### Ads for free users on pro tools

- **`components/tools/AdPlaceholder.tsx`** — Renders an ad slot only when `shouldShowAdsOnTool(slug, isSubscribed)` is true (pro tool + free user). Replace the placeholder with your ad tag (e.g. AdSense) when ready.
- **`components/tools/SubscribePrompt.tsx`** — Shown to free users on pro tools to encourage subscription (banner or inline). Renders nothing for subscribers or on free tools.

### Example: adding a new pro-only tool

1. In **`lib/data.ts`**, add a tool with `proOnly: true` and the right `slug` (e.g. `my-new-tool`).
2. Create the app route, e.g. **`app/my-new-tool/page.tsx`** (or under a shared path).
3. Wrap the page (or layout) with:

```tsx
<ProToolGate toolSlug="my-new-tool" toolName="My New Tool">
  <div>
    <AdPlaceholder toolSlug="my-new-tool" className="my-4" />
    {/* Your tool UI */}
    <SubscribePrompt toolSlug="my-new-tool" variant="banner" />
  </div>
</ProToolGate>
```

The two existing tools (**api-tester**, **time-zone-converter**) must **not** be wrapped with `ProToolGate` or given `proOnly`; they remain free and ad-free.

---

## 4. Subscription status and immediate updates

- Subscription state lives on **User** in the DB: `subscriptionStatus`, `subscriptionId`, `subscriptionEndsAt`.
- **Session callback** in `lib/auth.ts` calls `isSubscribed(userId)` on each session load, so as soon as you update the user in the DB (e.g. via webhook), the next request sees the new status.
- **Webhook**: **`POST /api/webhooks/subscription`** — Implement verification (e.g. Stripe signature) and map your payment events to updates on `User` (set `subscriptionStatus`, `subscriptionEndsAt`). When a user subscribes or cancels, update the user and optionally set `subscriptionEndsAt` for grace period.

---

## 5. Marketing and referral

- **Referral links**: Use `https://yoursite.com/register?ref=welcome2025` (or `referral=`, `utm_content=`). The register page stores the value in the `viza_ref` cookie; the register API saves it on the user.
- **Prompts**: Use **`SubscribePrompt`** on pro tool pages so free users see a clear CTA to subscribe.
- **Email / newsletters**: Not implemented here. You can add a table (e.g. `NewsletterSubscription`) and an API route to collect emails and hook it to your provider (Resend, Mailchimp, etc.).

---

## 6. Security notes

- Passwords: **bcrypt** with a cost of 12 in the register API.
- Session: **JWT** with a strong **NEXTAUTH_SECRET**; use HTTPS in production.
- Webhook: **Verify** the payload (e.g. Stripe signature) before updating subscription status.
- Never trust client-only checks for access: always enforce in **API routes or Server Components** using `getServerSession` and `canAccessTool` / DB subscription state when needed.

---

## 7. Setup checklist

1. **Env**: Copy `.env.example` to `.env` and set `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`.
2. **DB**: Run `npx prisma generate` and `npx prisma db push` (or `prisma migrate dev`).
3. **Dependencies**: `npm install next-auth @prisma/client bcryptjs` and `npm install -D prisma`. Run `npx prisma generate` after schema changes.
4. **Billing**: Wire your billing page to your payment provider and call `/api/webhooks/subscription` (with verification) when subscription state changes.
5. **New pro tools**: Add tool with `proOnly: true`, create route, wrap with `ProToolGate`; add `AdPlaceholder` and `SubscribePrompt` as desired. Do not use these on API Tester or Time Zone Converter.
