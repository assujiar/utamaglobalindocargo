# 01 — Gap Analysis

**Date**: 2026-03-28

---

## P0 — Blockers Before Publish

### 1. Lead Capture Is Broken
- **File**: `src/components/contact/ContactForm.tsx`
- **Issue**: Network errors caught and displayed as success (line 180-182)
- **Impact**: Leads can be silently lost. Ads spend wasted.
- **Fix**: Only show success when API returns `{ success: true }`. Add error state UI.

### 2. Form Fields Too Thin for Sales Follow-Up
- **File**: `src/components/contact/ContactForm.tsx`
- **Issue**: Only collects company_name + executive_email. No contact person, phone, cargo context, route, urgency, consent.
- **Impact**: Sales team cannot qualify or prioritize leads.
- **Fix**: Add contact_person, phone_whatsapp, service_interest, cargo_description, origin_destination, timeline, consent checkbox.

### 3. Supabase Client Not Split
- **File**: `src/lib/supabaseClient.ts`
- **Issue**: Single client uses `NEXT_PUBLIC_SUPABASE_ANON_KEY` for both browser and server routes.
- **Impact**: Server route (`/api/leads`) operates with public-facing credentials.
- **Fix**: Create `supabaseServer.ts` using `SUPABASE_SERVICE_ROLE_KEY` (server-only env var).

### 4. No RLS / Policies on leads_prospect
- **File**: `supabase/migrations/00001_create_leads_prospect.sql`
- **Issue**: Table has no Row Level Security. Anyone with anon key can read/write.
- **Fix**: Enable RLS, add insert-only policy for anon, deny select/update/delete for anon.

### 5. Unverified Metrics Displayed as Fact
- **File**: `src/components/sections/StatsCounter.tsx`
- **Data**: 14+ countries, 340+ containers/mo, 99.7% on-time, $4.7M savings
- **Issue**: No evidence these are real. Displaying them risks credibility.
- **Fix**: Replace with neutral operational descriptors or TODO markers. Do not display unverifiable numbers.

### 6. Case Studies Appear Synthetic
- **File**: `src/lib/caseStudiesData.ts`
- **Issue**: 6 case studies with specific metrics but no verifiable backing.
- **Fix**: Add internal disclaimer. Soften language. Flag as "illustrative scenarios based on operational patterns" or remove metrics.

### 7. Starter Assets in public/
- **Files**: `public/next.svg`, `vercel.svg`, `file.svg`, `globe.svg`, `window.svg`
- **Issue**: Default Next.js assets signal unfinished project.
- **Fix**: Delete all. Add favicon.ico, og-image placeholder, and brand SVG.

### 8. README Is Default Template
- **File**: `README.md`
- **Fix**: Rewrite with project purpose, stack, setup, architecture, known issues.

### 9. PROGRESS.md Oversells
- **File**: `PROGRESS.md`
- **Fix**: Rewrite honestly with "implemented", "unverified", "missing" categories.

---

## P1 — High Impact

### 10. No Company Trust Presence
- **Missing**: About page, company info, office/location, direct contact channels
- **Fix**: Create `/about` page with company positioning (no fabricated history).

### 11. No FAQ
- **Fix**: Create `/faq` with common logistics questions.

### 12. Homepage Doesn't Answer Core Questions
- **Current**: Motion showcase. Doesn't clearly state who/what/why/how.
- **Fix**: Add company intro section, trust strip, clear service overview, stronger CTA.

### 13. Accessibility Gaps
- No `prefers-reduced-motion` handling anywhere
- Mobile menu missing `aria-expanded`
- Case study modal: no ESC close, no focus trap
- No skip-to-content link
- Some text has insufficient contrast (white/30, white/20)

### 14. SEO Incomplete
- No canonical URLs
- No og:image or twitter:image assets
- JsonLd references non-existent logo.png
- No favicon/manifest strategy

### 15. No Analytics Instrumentation
- No GA4/GTM hooks
- No CTA click tracking
- No form submit event tracking
- UTM capture exists but no downstream attribution

---

## P2 — Polish

### 16. ServicesHorizontal Scroll Hijack
- `end: +=${panels.length * 1000}` is too aggressive
- Needs reduced-motion fallback
- Mobile vertical layout works but is long

### 17. HeroGlobe No Fallback
- No static fallback for low-power devices
- No reduced-motion alternative
- `handlePointerMove` callback defined but not primary input source

### 18. Service Pages Template-Driven
- All 6 pages use identical ServicePageLayout
- Missing: process flow, FAQ, coverage, use cases, proof
- Adequate for launch but should differentiate post-launch

### 19. ClientLogos.tsx Unused
- Component exists but not rendered on homepage
- Contains placeholder industry labels, not real logos
- **Fix**: Remove component entirely until real logos available.

---

## Resolution Status (Phase 2)

| # | Item | Status |
|---|---|---|
| 1 | Lead capture false-success | **RESOLVED** — proper error state + fallback |
| 2 | Form fields too thin | **RESOLVED** — 7 new fields added |
| 3 | Supabase client not split | **RESOLVED** — server client created, browser client removed |
| 4 | No RLS | **RESOLVED** — migration 00002 with insert-only anon policy |
| 5 | Unverified metrics | **RESOLVED** — replaced with capabilities grid |
| 6 | Case studies synthetic | **RESOLVED** — marked as illustrative scenarios |
| 7 | Starter assets | **RESOLVED** — deleted, brand placeholders added |
| 8 | README default | **RESOLVED** — rewritten |
| 9 | PROGRESS.md oversells | **RESOLVED** — rewritten honestly |
| 10 | No company trust pages | **RESOLVED** — /about and /faq created |
| 11-12 | Homepage IA | **RESOLVED** — company intro + capabilities added |
| 13 | Accessibility gaps | **RESOLVED** — reduced-motion, aria-expanded, ESC modal, skip-link |
| 14 | SEO incomplete | **PARTIALLY RESOLVED** — canonical, favicon, JSON-LD fixed. OG image needs real design. |
| 15 | No analytics | **PARTIALLY RESOLVED** — analytics.ts helpers created. GTM ID needed from business. |
| 16 | ServicesHorizontal | **RESOLVED** — rewritten with proper scroll-hijack + separate mobile stack |
| 17 | HeroGlobe | **RESOLVED** — replaced with static hero (animated paths de-scoped) |
| 18 | Service pages template | **ACKNOWLEDGED** — adequate for launch, differentiate post-launch |
| 19 | ClientLogos unused | **RESOLVED** — component deleted |
