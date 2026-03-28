# 02 — Revision Backlog

**Date**: 2026-03-28

---

## Phase A — Foundation Hardening

| # | Task | File(s) | Priority |
|---|---|---|---|
| A1 | Rewrite README.md | `README.md` | P0 |
| A2 | Delete starter public assets | `public/*.svg` | P0 |
| A3 | Add favicon.ico + brand SVG logo | `public/` | P0 |
| A4 | Add OG image placeholder | `public/og-image.png` | P0 |
| A5 | Fix metadata: canonical, og:image, twitter:image | `src/app/layout.tsx` | P0 |
| A6 | Fix JsonLd to reference existing assets | `src/components/layout/JsonLd.tsx` | P0 |
| A7 | Add skip-to-content link | `src/app/layout.tsx` | P1 |
| A8 | Add aria-expanded to mobile menu | `src/components/layout/Header.tsx` | P1 |
| A9 | Add prefers-reduced-motion global strategy | `src/app/globals.css` + components | P1 |
| A10 | Clean dead/unused code (ClientLogos) | `src/components/sections/ClientLogos.tsx` | P1 |
| A11 | Rewrite PROGRESS.md honestly | `PROGRESS.md` | P0 |
| A12 | Update .env.example with server key | `.env.example` | P0 |

## Phase B — Lead Capture Hardening

| # | Task | File(s) | Priority |
|---|---|---|---|
| B1 | Fix false-success on network error | `src/components/contact/ContactForm.tsx` | P0 |
| B2 | Add error state UI | `src/components/contact/ContactForm.tsx` | P0 |
| B3 | Add fields: name, phone, cargo, route, timeline, consent | `src/components/contact/ContactForm.tsx` | P0 |
| B4 | Add direct contact fallback (WhatsApp, phone, email) | `src/app/contact/page.tsx` | P0 |
| B5 | Create server Supabase client | `src/lib/supabaseServer.ts` | P0 |
| B6 | Refactor /api/leads to use server client | `src/app/api/leads/route.ts` | P0 |
| B7 | Add server-side Zod validation | `src/app/api/leads/route.ts` | P0 |
| B8 | Add honeypot field | `ContactForm.tsx` + `route.ts` | P1 |
| B9 | Update Supabase migration with RLS + new fields | `supabase/migrations/` | P0 |

## Phase C — Trust, IA, and Content

| # | Task | File(s) | Priority |
|---|---|---|---|
| C1 | Create About page | `src/app/about/page.tsx` | P1 |
| C2 | Create FAQ page | `src/app/faq/page.tsx` | P1 |
| C3 | Replace StatsCounter with neutral content | `src/components/sections/StatsCounter.tsx` | P0 |
| C4 | Add company intro section to homepage | `src/app/page.tsx` | P1 |
| C5 | Neutralize case study metrics | `src/lib/caseStudiesData.ts` | P0 |
| C6 | Remove ClientLogos component | `src/components/sections/ClientLogos.tsx` | P1 |
| C7 | Add footer direct contact channels | `src/components/layout/Footer.tsx` | P1 |
| C8 | Update sitemap with new pages | `src/app/sitemap.ts` | P1 |

## Phase D — Motion, Performance, Polish

| # | Task | File(s) | Priority |
|---|---|---|---|
| D1 | Add reduced-motion fallback to HeroGlobe | `src/components/canvas/HeroGlobe.tsx` | P1 |
| D2 | Add reduced-motion fallback to HeroSection | `src/components/layout/HeroSection.tsx` | P1 |
| D3 | Add reduced-motion CSS media query | `src/app/globals.css` | P1 |
| D4 | Add ESC close + focus trap to case study modal | `src/components/case-studies/CaseStudyModal.tsx` | P1 |
| D5 | Ensure mobile UX is clean for ServicesHorizontal | `src/components/sections/ServicesHorizontal.tsx` | P1 |

## Phase E — SEO, Analytics, Launch

| # | Task | File(s) | Priority |
|---|---|---|---|
| E1 | Add analytics placeholder structure | `src/app/layout.tsx` | P1 |
| E2 | Add form submit + CTA tracking helpers | `src/lib/analytics.ts` | P1 |
| E3 | Update sitemap with all new pages | `src/app/sitemap.ts` | P1 |
| E4 | Create launch readiness checklist | `docs/rebuild_audit/04_launch_readiness.md` | P1 |
| E5 | Run lint + typecheck + build, fix all | — | P0 |
