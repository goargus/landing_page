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

The client bundle needs none. The contact Function reads three variables from the Cloudflare Pages project, `RESEND_API_KEY` (encrypted secret), `CONTACT_TO` (the inbox that receives the leads) and the optional `CONTACT_FROM` (defaults to the Resend onboarding sender).

To exercise the Function locally, run `npx wrangler pages dev dist --binding CONTACT_TO=you@example.com --binding RESEND_API_KEY=re_...` after a build.

## Analytics

Pageviews and Core Web Vitals are collected with Cloudflare Web Analytics. It sets no cookies and does no fingerprinting, so the site needs no consent banner.

**How it is wired in**: nothing in this repo configures it. Cloudflare injects the beacon at the edge for the proxied zone, which covers every route with no build step, no environment variable and no repository secret. The site token, `4f8882ade5e441d6bd9bc0fc647eb243`, is a public identifier that ships in the HTML to every visitor. Confirming it from the command line needs a browser user agent, because Cloudflare skips edge injection for other clients:

```bash
curl -sL -A "Mozilla/5.0 (X11; Linux x86_64) Chrome/131.0.0.0" https://goargus.dev/ | grep cloudflareinsights
```

Do not add a second beacon to the build. Two beacons on one page count every visit twice.

**Route changes**: the injected beacon runs in SPA mode (`"spa":2` in its `data-cf-beacon` payload), patching `history.pushState` and listening for `popstate`, so `vue-router` navigations are counted as separate pageviews. No `router.afterEach` hook is needed.

**Custom events**: Cloudflare Web Analytics has no custom event API. Its FAQ says support may come later. A successful contact form submission is therefore recorded as a virtual pageview: `src/analytics.js` exports `trackFormSubmission()`, called from `ContactForm.vue` once the confirmation message is shown. It pushes the URL to `/contact/submitted` and immediately back to the real path, so the visitor and the router never move. Filter Top Pages by `/contact/submitted` for a submission count.

**This virtual pageview is unverified.** Whether the beacon flushes a hit for two synchronous `pushState` calls has never been observed in production. It could not be tested from headless Chromium, where the beacon loads but reports nothing at all, including for ordinary pageviews. To confirm it, submit the form once on the live site and look for `/contact/submitted` under Top Pages. If it never appears, the likely fix is a short delay between the two calls so the beacon treats them as distinct navigations. If Cloudflare ships a real event API, drop this workaround.

**Reading the dashboard**: Cloudflare dashboard, then the zone, then Analytics & Logs, then Web Analytics. The overview shows visits, pageviews, Top Pages, Referrers and Countries for the selected range. The Core Web Vitals tab splits LCP, INP and CLS from real visitors into Good, Needs Improvement and Poor at the 75th percentile, with a Debug View listing the worst elements. It needs a representative week of traffic before those percentiles mean anything.

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
