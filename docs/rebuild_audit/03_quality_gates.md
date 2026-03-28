# 03 — Quality Gates

**Date**: 2026-03-28 (updated)

---

## Gate 1 — Repo Hygiene

- [x] README rewritten (not default template)
- [x] All starter assets deleted from public/
- [x] PROGRESS.md reflects actual state
- [x] .env.example documents all required vars
- [x] No dead components shipped without purpose (ClientLogos removed, supabaseClient.ts removed)

## Gate 2 — Brand & Content Truth

- [x] No public-facing stats that lack evidence (StatsCounter shows capabilities, not numbers)
- [x] No placeholder client logos displayed (component deleted)
- [x] Case studies clearly marked as illustrative scenarios
- [ ] All copy matches company positioning — needs business review
- [ ] Brand favicon + OG image in place — placeholder exists, needs real design

## Gate 3 — IA & Conversion

- [x] Homepage answers: who, what services, why credible, how to contact
- [x] Clear CTA path to /contact on every page
- [x] Contact page has form + fallback direct channels
- [x] Service pages have scope, description, CTA
- [x] About/company presence exists (/about page)

## Gate 4 — Lead Capture & Backend

- [x] Form shows success ONLY when backend confirms insert
- [x] Error state is user-facing and clear (with fallback email)
- [x] Server-side Zod validation active on /api/leads
- [x] Anti-spam minimum (honeypot) active
- [x] Supabase server client used for inserts (supabaseServer.ts)
- [x] RLS enabled on leads_prospect (migration 00002)
- [x] Lead payload includes name, phone, service, cargo context, consent

## Gate 5 — Motion, Responsiveness, Accessibility

- [x] Mobile experience clean and functional
- [x] ServicesHorizontal usable on mobile (separate vertical stack)
- [x] Hero background has reduced-motion fallback (CityLoopHeroFallback)
- [x] `prefers-reduced-motion` respected sitewide (globals.css + component hooks)
- [x] Case study modal closeable via ESC
- [x] Mobile menu has aria-expanded
- [x] Skip-to-content link present

## Gate 6 — SEO, Analytics, Visibility

- [x] Canonical URL set (metadataBase in layout.tsx)
- [ ] og:image and twitter:image pointing to real asset — needs designed image
- [x] JSON-LD valid (logo.svg exists in public/)
- [x] Favicon present (favicon.svg)
- [x] Analytics/GTM placeholder ready (src/lib/analytics.ts)
- [x] Sitemap includes all published routes (11 routes)
- [x] robots.txt correct

## Gate 7 — Production Validation

- [x] `npm run lint` passes
- [x] `npx tsc --noEmit` passes
- [x] `npm run build` passes
- [x] All routes build successfully (17 routes including _not-found)
