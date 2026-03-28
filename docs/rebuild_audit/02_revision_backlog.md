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

## Phase B — Lead Capture Hardening — ALL DONE

| # | Task | Status |
|---|---|---|
| B1 | Fix false-success on network error | DONE |
| B2 | Add error state UI | DONE |
| B3 | Add fields: name, phone, cargo, route, timeline, consent | DONE |
| B4 | Add direct contact fallback | DONE |
| B5 | Create server Supabase client | DONE |
| B6 | Refactor /api/leads to use server client | DONE |
| B7 | Add server-side Zod validation | DONE |
| B8 | Add honeypot field | DONE |
| B9 | Update Supabase migration with RLS + new fields | DONE |
| B10 | Remove dead browser supabaseClient.ts | DONE |

## Phase C — Trust, IA, and Content — ALL DONE

| # | Task | Status |
|---|---|---|
| C1 | Create About page | DONE |
| C2 | Create FAQ page | DONE |
| C3 | Replace StatsCounter with neutral content | DONE |
| C4 | Add company intro section to homepage | DONE |
| C5 | Neutralize case study metrics (marked illustrative) | DONE |
| C6 | Remove ClientLogos component | DONE |
| C7 | Add footer direct contact channels | DONE |
| C8 | Update sitemap with new pages | DONE |

## Phase D — Motion, Performance, Polish — ALL DONE

| # | Task | Status |
|---|---|---|
| D1 | Hero de-scoped to clean static implementation | DONE |
| D2 | Animated hero paths removed (HeroGlobe, RouteField, CityLoop) | DONE |
| D3 | Reduced-motion CSS media query (globals.css) | DONE |
| D4 | ESC close + focus trap on case study modal | DONE |
| D5 | ServicesHorizontal rewritten (proper scroll-hijack + mobile stack) | DONE |

## Phase E — SEO, Analytics, Launch

| # | Task | File(s) | Priority |
|---|---|---|---|
| E1 | Add analytics placeholder structure | `src/app/layout.tsx` | P1 |
| E2 | Add form submit + CTA tracking helpers | `src/lib/analytics.ts` | P1 |
| E3 | Update sitemap with all new pages | `src/app/sitemap.ts` | P1 |
| E4 | Create launch readiness checklist | `docs/rebuild_audit/04_launch_readiness.md` | P1 |
| E5 | Run lint + typecheck + build, fix all | — | P0 |
