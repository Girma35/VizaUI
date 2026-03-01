# VizaLabs - AI SaaS Starter Kit

A complete Next.js AI SaaS starter kit built with modern tooling.

## Stack

- **Framework**: Next.js 16 (App Router, TypeScript)
- **Styling**: Tailwind CSS v4 with class-based dark mode
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Utilities**: clsx

## Getting Started

```bash
npm install
npm run dev
```

## Pages

- `/` — Landing page (Hero, Features, Pricing, CTA)
- `/login` — Sign in page
- `/register` — Sign up page
- `/dashboard` — Dashboard overview
- `/dashboard/chat` — AI Chat interface
- `/dashboard/settings` — Account settings
- `/dashboard/billing` — Subscription & billing

## Project Structure

```
app/          # Next.js App Router pages and layouts
components/   # Reusable React components
  ui/         # Button, Card, Input, Modal, Dropdown, Toast
  layout/     # Navbar, Sidebar
  landing/    # Hero, Features, Pricing, CTA
lib/          # Shared data and utilities
```
