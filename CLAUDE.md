# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

See `/mnt/shared/development/CLAUDE.md` for global development guidelines.

## Project Overview

Argus landing page - a Vue 3 + Vite single-page application with Tailwind CSS styling, deployed to Cloudflare Pages. The contact form posts to a Pages Function that sends through Resend.

## Development Commands

```bash
npm run dev       # Start dev server (with --host for network access)
npm run build     # Production build
npm run preview   # Preview production build
npm run lint      # Run ESLint
npm run test      # Run Vitest (runs in watch mode by default)
```

To run a single test file:
```bash
npx vitest run src/__tests__/ContactForm.spec.js
```

## Architecture

**Routing**: File-based routing via `vite-plugin-pages`. Routes are auto-generated from `src/pages/`:
- `/` → Index.vue
- `/portfolio` → Portfolio.vue
- `/contact` → Contact.vue
- `/about` → About.vue

**Key entry points**:
- `src/main.js` - Vue app initialization
- `src/App.vue` - Root component with navigation setup

**Contact Form**: `src/components/ContactForm.vue` posts JSON to `/api/contact`, a Cloudflare Pages Function in `functions/api/contact.js` that validates the fields server-side and sends through the Resend API. The sending credential never reaches the browser.

## Environment Variables

The contact Function reads three variables from the Cloudflare Pages project, `RESEND_API_KEY` (encrypted secret), `CONTACT_TO` (the inbox that receives the leads) and the optional `CONTACT_FROM` (defaults to the Resend onboarding sender).

To exercise the Function locally, run `npx wrangler pages dev dist --binding CONTACT_TO=you@example.com --binding RESEND_API_KEY=re_...` after a build.

The client build reads one variable, `VITE_CF_BEACON_TOKEN`, the Cloudflare Web Analytics site token. See `.env.example`. It is only read in production builds (`vite build`, which defaults to `mode: "production"`); dev and preview never load the beacon even if the variable is set locally. In CI it is only injected on pushes to `main` (see `.github/workflows/deploy.yml`), so pull request preview deploys never send data into the production Web Analytics dashboard.

## Analytics

Pageviews and Core Web Vitals are collected with Cloudflare Web Analytics, chosen because the site is already proxied through Cloudflare, the free tier has no traffic cap, and the beacon sets no cookies and does no fingerprinting, so it needs no consent banner.

**How it is wired in**: `vite.config.js` injects `<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token":"..."}'>` into every emitted HTML shell (the homepage plus one static shell per route, see `routeMetadata()` in the same file) when `VITE_CF_BEACON_TOKEN` is set. The token is a public site identifier, not a secret, but it still comes from an environment variable rather than being hardcoded so different deploys (or a future preview environment) can point at different Web Analytics sites without a code change.

**Route changes**: the beacon patches `history.pushState` and listens for `popstate` itself, so `vue-router`'s client-side navigations are picked up as separate pageviews automatically. No `router.afterEach` hook is needed for this.

**Custom events**: Cloudflare Web Analytics has no custom event API (confirmed against the current Cloudflare docs; the FAQ says events support may come "in the future" but does not exist today). A successful contact form submission is recorded as a virtual pageview instead: `src/analytics.js` exports `trackFormSubmission()`, called from `ContactForm.vue` right after the confirmation message is shown. It pushes the URL to `/contact/submitted` and immediately back to the real path with two synchronous `history.pushState` calls. The beacon flushes a measurement for the outgoing route on every `pushState`, so this records one hit on `/contact/submitted` without ever really navigating the user or the router. In the dashboard, filter Top Pages by `/contact/submitted` to get a submission count. If Cloudflare ever ships real custom events, replace this with the real API and drop the virtual route.

**Reading the dashboard**: Cloudflare dashboard → the zone → Analytics & Logs → Web Analytics. The overview shows visits, pageviews, and Top Pages/Referrers/Countries for the selected time range; every route the build emits a shell for (`/`, `/about`, `/contact`, `/portfolio`) shows up there once traffic exists, plus the virtual `/contact/submitted` hit for each successful contact submission. The Core Web Vitals tab breaks down LCP, INP and CLS from real visitors into Good/Needs Improvement/Poor buckets at the 75th percentile, with a Debug View listing the worst-performing elements; it needs a representative week of traffic before the percentiles are meaningful, which is why that acceptance criterion is time-gated rather than a one-time check.

**Setup that still has to happen** (a production mutation, not done by this change): create the Web Analytics site and get its token, either in the dashboard (Analytics & Logs → Web Analytics → Add a site → goargus.dev → Manual setup) or via the API:

```
POST https://api.cloudflare.com/client/v4/accounts/<account_id>/rum/site_info
{
  "host": "goargus.dev",
  "zone_tag": "2d9951c53a6c7c961f84e37780345b31",
  "auto_install": false
}
```

`auto_install: false` matters: Cloudflare Free zones have edge-side automatic beacon injection on by default for proxied hostnames since September 2025. If that is already on for this zone, turn it off first (Analytics & Logs → Web Analytics → Manage Site → Advanced Options → JS Snippet Injection) before shipping this manual beacon, otherwise every pageview gets counted twice. Take the `site_token` from the response (or from the dashboard's Manage Site screen) and set it as the `VITE_CF_BEACON_TOKEN` repository secret so `.github/workflows/deploy.yml` can pass it to the build.

## Build Configuration

Production builds include:
- Console/debugger statement removal
- Vendor chunk splitting (vue, vue-router)
- Terser minification

## Testing

Tests use Vitest + Vue Test Utils with jsdom environment. Test files are in `src/__tests__/`.

## Deployment

Automatic deployment to Cloudflare Pages via `.github/workflows/deploy.yml` on push to main, and a preview deployment on every pull request. The workflow lints, tests and builds before deploying.

## Notes

- UI text is in Spanish (hardcoded, no i18n framework)
- Tailwind config has custom neumorphic shadow design tokens
- TypeScript strict mode is enabled
