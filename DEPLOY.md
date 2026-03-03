# Deploy VizaUI to DigitalOcean

This app is ready for production. Follow this guide for SEO and deployment.

---

## 1. SEO (already in place)

- **Metadata**: `app/layout.tsx` — title, description, Open Graph, Twitter Cards, `metadataBase`
- **Canonical URLs**: Set `NEXT_PUBLIC_SITE_URL` to your live URL so sitemap, OG, and canonicals are correct
- **Structured data**: JSON-LD (Organization, WebSite) in layout; tool pages have SoftwareApplication schema
- **Sitemap**: `/sitemap.xml` — static pages + all tool pages from `lib/data.ts`
- **Robots**: `/robots.txt` — allows all, points to sitemap, disallows `/dashboard/`, `/login`, `/register`

**Before deploy:** Set the env var below so all SEO URLs use your real domain.

---

## 2. Environment variable (required for production)

In your hosting dashboard (e.g. DigitalOcean App Platform → your app → Settings → App-Level Environment Variables), add:

| Name | Value | Purpose |
|------|--------|--------|
| `NEXT_PUBLIC_SITE_URL` | `https://yourdomain.com` | Sitemap, Open Graph, canonical URLs |

Use your real domain (no trailing slash). If unset, the app falls back to `https://vizalabs.com`.

---

## 3. Deploy to DigitalOcean App Platform

1. Push the repo to GitHub (or GitLab).
2. In [DigitalOcean](https://cloud.digitalocean.com/apps) go to **Apps → Create App**.
3. Connect the repo and pick the branch (e.g. `main`).
4. **Build settings** (usually auto-detected for Next.js):
   - Build command: `npm run build`
   - Run command: `npm start`
   - Environment: add `NEXT_PUBLIC_SITE_URL` as above.
5. Create the app and deploy.

---

## 4. Which DigitalOcean plan to use

For this Next.js app (tools catalog + a few client-heavy pages, scaling to ~100 tools):

| Plan | Cost | Best for |
|------|------|----------|
| **Basic – 512 MB / 1 vCPU** | **$5/mo** | Low traffic, side projects, testing. Builds can be slow; may need to increase resources if build fails. |
| **Basic – 1 GB / 1 vCPU** | **$10/mo** | **Recommended.** Enough for Next.js build and runtime, small–medium traffic. |
| **Professional – 2 GB** | ~$12+/mo | Higher traffic or many concurrent users. |

**Recommendation:** Start with the **$10/mo Basic (1 GB)** instance so builds and runtime are stable. You can scale down to 512 MB later if traffic is low, or add more resources if you grow.

---

## 5. Visitors in USA, Europe, and Canada — what to consider

### Region (datacenter)

Your app runs in **one region**. Choose it in App Platform when creating the app (or later under **Settings → Region**).

| Region | Best for | Tradeoff |
|--------|----------|----------|
| **New York (NYC)** | US East, Canada | **Recommended default.** Good for North America and acceptable latency to Europe. |
| **London (LON)** | Europe, US East | Pick if most visitors are in Europe; still okay for East Coast US and Canada. |
| **Frankfurt (FRA)** | Central Europe | Use if your traffic is mainly EU (e.g. Germany, France, Netherlands). |
| **Toronto (TOR)** | Canada, US East | Use if Canada is the main audience. |

**Practical choice:** **New York (NYC)** is a good single region for USA + Europe + Canada. If analytics later show most traffic from Europe, switch to **London (LON)**.

### CDN and static assets

App Platform uses a **global CDN** for static assets (JS, CSS, images). Those are served from edge locations worldwide, so USA, Europe, and Canada all get fast static delivery. The **region** above only affects where the Next.js server runs (HTML and API). For a tools catalog with mostly client-side navigation, one region plus CDN is usually enough.

### Compliance (EU visitors)

If you have visitors in the EU/UK:

- Keep your **Privacy Policy** and **Terms** pages clear and linked (you already have `/privacy` and `/terms`).
- Set `NEXT_PUBLIC_SITE_URL` correctly so canonical and OG URLs point to your real domain.
- If you add analytics or cookies later, mention them in the privacy policy and consider a cookie/consent banner if required.

---

## 6. After deploy

1. Set your custom domain in the App Platform and (if needed) add the CNAME record.
2. In App Platform, ensure `NEXT_PUBLIC_SITE_URL` is exactly your production URL (e.g. `https://yourdomain.com`).
3. Redeploy once so the sitemap and OG URLs are generated with the correct domain.
4. In [Google Search Console](https://search.google.com/search-console), add the property and submit `https://yourdomain.com/sitemap.xml`.

---

## 7. One-command deploy (droplet / VPS) — rsync only (no git pull)

Deploy uses **rsync** from your machine to the server. The server does **not** run `git pull`; all code comes from the rsync.

If you host on a droplet (e.g. DigitalOcean VPS at 45.55.49.70) with SSH host `viza` and app in `~/VizaUI`:

**From your machine (project root):**

```bash
chmod +x scripts/deploy.sh
./scripts/deploy.sh
```

This will:

1. **Rsync** your project to the server (excluding `node_modules`, `.next`, `.git`, `.env`).
2. **SSH** into the server and run **`scripts/server-update.sh`**, which:
   - `cd ~/VizaUI`
   - `npm install`
   - `npx prisma generate` (if Prisma exists)
   - `npm run build`
   - `pm2 restart viza`

**To change what runs on the server:** edit **`scripts/server-update.sh`** in the repo. The next time you run `./scripts/deploy.sh`, the updated steps will run (the script is sent over SSH). Add steps like `npx prisma migrate deploy`, or change the PM2 app name, in that file.

**Optional env (before running deploy.sh):**

| Variable | Default | Purpose |
|----------|---------|--------|
| `DEPLOY_SSH_HOST` | `viza` | SSH host from `~/.ssh/config` |
| `DEPLOY_REMOTE_DIR` | `~/VizaUI` | Path on the server |

Example: `DEPLOY_REMOTE_DIR=/var/www/viza ./scripts/deploy.sh`

---

## 8. Adding more tools (e.g. up to 100)

Add entries to the `tools` array in `lib/data.ts`. The sitemap and tools listing update automatically; no extra deploy config needed.
