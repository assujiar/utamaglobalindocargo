# 00 — Current State Assessment

**Date**: 2026-03-28
**Basis**: Code inspection of repo at HEAD on `claude/production-ready-website-zcJPk`

---

## Overall Verdict

| Area | Score | Status |
|---|---|---|
| Visual direction | 7/10 | Implemented |
| Front-end structure | 6/10 | Implemented |
| Motion experimentation | 7/10 | Implemented, unverified for production |
| Information architecture | 4/10 | Partially implemented |
| Trust & credibility | 3/10 | Missing critical pieces |
| Lead capture quality | 3/10 | Broken error handling, thin fields |
| SEO foundation | 4/10 | Scaffolded, incomplete |
| Accessibility | 3/10 | Mostly missing |
| Production readiness | 2.5/10 | Not ready |

**Publish readiness (initial assessment): ~25-30%.**

---

## Phase 2 Status Update (2026-03-28)

The following items from the original assessment have been resolved:

### Lead Capture — FIXED
- [x] False-success on network error → proper error state with fallback contact
- [x] Form fields expanded: contact_person, phone_whatsapp, cargo_description, origin_destination, timeline, privacy_consent
- [x] Server-side Zod validation on /api/leads
- [x] Honeypot anti-spam field
- [x] Server Supabase client (supabaseServer.ts) — anon browser client removed as dead code
- [x] RLS enabled with insert-only anon policy (migration 00002)

### Trust & Credibility — FIXED
- [x] StatsCounter neutralized: displays capabilities, not unverified numbers
- [x] Case studies marked as illustrative scenarios (not verified company achievements)
- [x] Case study page/modal text corrected (NDA Protected → Skenario Ilustratif)
- [x] ClientLogos placeholder component deleted
- [x] README rewritten from scratch
- [x] PROGRESS.md rewritten honestly

### Still Needs Business Input
- [ ] Real brand assets (logo, OG image)
- [ ] Verified company stats (if any should be displayed)
- [ ] Client logos with permission
- [ ] Case study approval from stakeholders
- [ ] Contact details (phone, WhatsApp, address)
- [ ] Privacy policy text (legal review)
- [ ] GTM/GA4 container ID

---

## What Exists

### Pages (9 routes)
- `/` — Homepage (HeroSection + ServicesHorizontal + StatsCounter + CTA)
- `/contact` — 3-step lead capture form
- `/case-studies` — Grid of 6 anonymized case studies
- `/services/domestic-distribution`
- `/services/international-freight`
- `/services/import-dtd`
- `/services/warehousing`
- `/services/project-cargo`
- `/services/blocspace`

### API
- `POST /api/leads` — Supabase insert (broken error propagation)

### Components (17 total)
- `canvas/HeroGlobe.tsx` — WebGL particle globe (R3F + custom shaders)
- `layout/Header.tsx` — Sticky navbar, scroll-aware theme
- `layout/Footer.tsx` — 4-column footer
- `layout/HeroSection.tsx` — GSAP reveal + globe bg
- `layout/SmoothScroller.tsx` — Lenis + GSAP ticker sync
- `layout/JsonLd.tsx` — Organization schema
- `layout/ConsoleEasterEgg.tsx` — ASCII art in DevTools
- `sections/ServicesHorizontal.tsx` — GSAP scroll-hijack 6 panels
- `sections/StatsCounter.tsx` — Animated counters (UNVERIFIED data)
- `sections/ClientLogos.tsx` — Placeholder grid (NOT used on homepage)
- `case-studies/CaseStudyGrid.tsx` — Framer Motion layout
- `case-studies/CaseStudyCard.tsx` — Motion card
- `case-studies/CaseStudyModal.tsx` — Expanded modal
- `contact/ContactForm.tsx` — 3-step form (BROKEN error handling)
- `services/ServicePageLayout.tsx` — Template for service pages

### Infrastructure
- `src/lib/supabaseClient.ts` — Single client (anon key, no server split)
- `src/hooks/useUTMCapture.ts` — UTM extraction to localStorage
- `supabase/migrations/00001_create_leads_prospect.sql` — Schema, no RLS

### Config
- `next.config.ts` — Security headers, image optimization, compression
- `globals.css` — Tailwind v4 @theme inline
- `robots.ts` + `sitemap.ts` — Basic SEO

---

## What Is Broken

1. **ContactForm.tsx line 180-182**: `catch { setIsSuccess(true) }` — network errors show as success
2. **API route uses public anon key** in server context via shared `getSupabase()`
3. **No RLS** on `leads_prospect` table
4. **StatsCounter.tsx**: Displays unverified metrics (14+ countries, 340+ containers/mo, 99.7% on-time, $4.7M savings)
5. **JsonLd.tsx line 9**: References `logo.png` that does not exist
6. **public/**: Contains only Next.js starter SVGs — no brand assets
7. **README.md**: Default create-next-app template
8. **PROGRESS.md**: Claims 100% complete — factually incorrect

---

## What Is Missing

- About / Company page
- Industries page
- Coverage / Network page
- FAQ page
- Contact person name, phone/WhatsApp, cargo context fields in form
- Privacy/consent text on form
- Error state UI on form
- Server-side Supabase client
- RLS policies
- Rate limiting / honeypot on lead API
- Canonical URLs
- OG image / Twitter image
- Favicon / manifest
- prefers-reduced-motion handling
- aria-expanded on mobile menu
- Keyboard-safe modal (ESC close, focus trap)
- Skip-to-content link
- Analytics / GTM integration
- Real brand assets
