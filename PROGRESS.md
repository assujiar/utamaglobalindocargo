# PROGRESS.md — Honest Build Status

**Last updated**: 2026-03-28

---

## Status Legend
- **Implemented** — Code exists and compiles
- **Verified** — Tested and confirmed working
- **Missing** — Not yet built
- **Needs Business Input** — Requires real data/assets from stakeholders

---

## Implemented & Verified

- [x] Next.js 16 App Router with TypeScript strict mode
- [x] Tailwind CSS v4 with brand colors (#ff4600, #111111)
- [x] GSAP + Lenis smooth scroll integration
- [x] HeroSection with CityLoop 3D scene (R3F procedural city + highway loops)
- [x] Hero fallback: static CSS cityscape for reduced-motion / no-WebGL
- [x] ServicesHorizontal with 6 service panels (desktop horizontal scroll, mobile vertical)
- [x] 6 service detail pages with ServicePageLayout template
- [x] Case studies page with Framer Motion layout transitions
- [x] Case study modal with ESC close and focus management
- [x] Contact form — 3-step multi-field with Zod validation
- [x] Contact form — proper error handling (success only on confirmed insert)
- [x] Contact form — honeypot anti-spam field
- [x] Contact form — privacy consent checkbox
- [x] Contact form — direct contact fallback section
- [x] /api/leads — server-side Zod validation
- [x] /api/leads — uses server Supabase client (service role key)
- [x] Supabase migration with RLS and insert-only anon policy
- [x] About page — company positioning, services, approach
- [x] FAQ page — 8 common questions
- [x] Header — navigation with About, FAQ links, aria-expanded, ESC close
- [x] Footer — 4-column with service links, company links, direct contact CTA
- [x] Skip-to-content accessibility link
- [x] prefers-reduced-motion CSS strategy
- [x] Metadata — canonical, OG image, Twitter image, favicon
- [x] JSON-LD — valid Organization schema with existing logo reference
- [x] Sitemap — includes all 11 published routes
- [x] robots.txt — allows crawling, blocks /api/
- [x] Security headers (X-Frame-Options, X-Content-Type-Options, etc.)
- [x] README rewritten from scratch
- [x] Starter assets removed from public/
- [x] Analytics helper structure (trackEvent, trackFormSubmit, trackCTAClick)
- [x] UTM capture hook with localStorage persistence
- [x] Console easter egg (ASCII cargo ship)
- [x] Clean .env.example with all required variables

## Implemented — Needs Business Verification

- [ ] Case study content — marked as illustrative, needs business approval
- [ ] Company description text — needs stakeholder review
- [ ] FAQ answers — needs operations team verification
- [ ] Service page content — needs confirmation of service scope accuracy

## Missing — Needs Business Input

- [ ] Real brand logo (SVG, PNG) — currently using placeholder
- [ ] OG image design (1200x630) — placeholder reference exists
- [ ] Company phone number
- [ ] Company WhatsApp number
- [ ] Physical office address
- [ ] Client logos (with permission)
- [ ] Verified operational metrics (if any)
- [ ] GTM container ID or GA4 measurement ID
- [ ] Privacy policy page content (legal review)
- [ ] Supabase production project credentials
- [ ] Custom domain DNS configuration

## Missing — Engineering

- [ ] GA4/GTM script injection (waiting for container ID)
- [ ] Form submit event tracking integration
- [ ] CTA click tracking integration
- [ ] Bilingual architecture (id/en)
- [ ] E2E smoke tests
- [ ] Image optimization (no real images yet)

---

## Build Status (2026-03-28)

```
npm run lint      — PASS (0 errors, 0 warnings)
npx tsc --noEmit  — PASS (strict mode, no errors)
npm run build     — PASS (17 routes generated, 4.8s compile)
```

### Routes Generated
- `/` (static)
- `/about` (static)
- `/faq` (static)
- `/contact` (static)
- `/case-studies` (static)
- `/api/leads` (dynamic)
- `/services/domestic-distribution` (static)
- `/services/international-freight` (static)
- `/services/import-dtd` (static)
- `/services/warehousing` (static)
- `/services/project-cargo` (static)
- `/services/blocspace` (static)
- `/robots.txt` (static)
- `/sitemap.xml` (static)
