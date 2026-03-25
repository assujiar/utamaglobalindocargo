# 18 — Open Questions and TODOs (RESOLVED)

All business decisions have been resolved by Director/Ari as of 25 March 2026. This document now serves as a decision log and remaining task tracker.

---

## Business Decisions — RESOLVED

| # | Question | Decision | Impact on Docs |
|---|----------|----------|----------------|
| B1 | Production domain | **`utamaglobalindocargo.com`** | Update all example URLs in docs 07, 14. No new domain acquisition. |
| B2 | WhatsApp Business number | **+62 812-8459-6614** | Ready for mobile bottom bar, contact page, quote fallback. |
| B3 | Client logos on website | **No logos or client names** due to NDA/privacy. Use **anonymized Client Stories** instead — industry, problem, solution, result. Content must be realistic, grounded, not overclaimed. | Major trust architecture change. Affects docs 04, 05, 08, 11, page blueprints. |
| B4 | Client testimonials | **Create realistic anonymized testimonials** as part of Client Story system. | Content creation task. |
| B5 | Photography | **Use GDrive assets** (`1sDlXlWnx8D-qw9M8EGNNI1iWLezEG7Sb`). Logo variants (Vertical + Horizontal) confirmed. Operational photos: typographic/gradient fallback where needed. | Logo assets resolved. Non-logo imagery uses fallback system. |
| B6 | Company profile PDF | **Exists.** Upload/download managed via admin portal. | Admin portal scope expanded. Download CTA live Phase 1. |
| B7 | Shipment tracking | **Tracking already exists** on `utamaglobalindocargo.com/track`. Must be replicated/integrated in rebuild. | Track Shipment promoted from Phase 3 to **Phase 1**. Affects docs 15, 16, track-shipment blueprint. |
| B8 | Form notification email | **services@ugc.co.id** | Ready for implementation. |
| B9 | Privacy Policy & Terms | **Create content** referencing Indonesian legal framework (UU PDP No. 27/2022, UU ITE, PP 71/2019). | Content creation task with legal compliance. |
| B10 | Ads budget | **IDR 10-15jt/month** for Phase 2. Google Search Ads first. | Landing pages + remarketing pixels = Phase 2 priority. |

---

## ASSET Items — STATUS

| # | Asset | Status | Action |
|---|-------|--------|--------|
| A1 | Operational photography | PARTIAL | GDrive logos confirmed. Operational photos: fallback for Phase 1, source/shoot Phase 2. |
| A2 | Team/leadership photography | DEFERRED | Not a priority. Skip. |
| A3 | Client logos | NOT USED | Replaced by Client Story system (B3). |
| A4 | Line-icon set | DECIDED | Lucide Icons (MIT, 24px, 1.5px stroke). |
| A5 | OG image template | DECIDED | @vercel/og dynamic generation. |
| A6 | Company profile PDF | RESOLVED | Exists. Upload via admin portal. |
| A7 | UGC logo SVG | CONFIRMED | GDrive (Vertical + Horizontal). Ari uploads to GitHub/Supabase. |
| A8 | Favicon + manifest icons | CONFIRMED | Available. Ari uploads. |

---

## COPY Items — ALL TO BE CREATED

All content is assigned for creation as part of the build. Bilingual (ID + EN). Realistic, specific, never overclaimed.

| # | Content | Status | Constraints |
|---|---------|--------|-------------|
| C1 | Home hero headline + supporting text | TO CREATE | Editorial quality. Not generic. |
| C2 | Home value proposition (one sentence) | TO CREATE | What UGC does, for whom. |
| C3 | Service descriptions (6x, 300-500 words) | TO CREATE | Operational specifics from Dewi/Firman/April/Ricky knowledge. |
| C4 | Service FAQ (3-5 per service) | TO CREATE | Real client questions. |
| C5 | About origin story | TO CREATE | 200-300 words. Founding narrative. |
| C6 | Operating philosophy | TO CREATE | 3-4 principles from "We Care What We Deliver." |
| C7 | Quote form micro-copy | TO CREATE | Trust lines per step. |
| C8 | Privacy Policy | TO CREATE | Must reference UU PDP No. 27/2022, UU ITE, Indonesian data protection law. |
| C9 | Terms of Service | TO CREATE | Must reference Indonesian commercial/digital law. |
| C10 | Insights articles (4-6) | TO CREATE (Phase 2) | FCL vs LCL, customs 101, air vs sea, cold chain, e-commerce fulfillment. Regulatory references where relevant. |
| C11 | Client Stories (3-5 anonymized) | TO CREATE | Industry, problem, solution, result. No names. Realistic and grounded. |

---

## TECH Items — RESOLVED

| # | Decision | Resolution |
|---|----------|------------|
| T1 | Page transitions | **Framer Motion layout animations.** |
| T2 | BCP tracking API | No public API. Phase 1 replicates existing tracking from current site. Phase 3 builds BCP-native. |
| T3 | CMS approach | **Supabase-as-CMS** with admin portal CRUD. |
| T4 | Glassmorphism testing | QA task Phase 1 Week 5-6. Samsung A14, Redmi Note 12, Android 10. |
| T5 | Framer Motion bundle | Tree-shake, lazy-load, max 15KB gzipped. |
| T6 | Email notification | **Supabase triggers + Nodemailer custom SMTP via Vercel env.** |
| T7 | 301 redirects | **Not needed.** Total rebuild, no URL preservation. |
| T8 | Locale slug strategy | **Separate slug directories** per locale with shared components. |

---

## Assumptions — VALIDATED

| # | Assumption | Status |
|---|-----------|--------|
| 1 | Domain = `utamaglobalindocargo.com` | **Confirmed.** |
| 2 | Indonesian = primary/default locale | **Confirmed.** |
| 3 | Six-service taxonomy stable | **Confirmed.** |
| 4 | No user auth on public site | **Confirmed.** Portal = BCP. |
| 5 | Content in code for Phase 1 | **CHANGED.** Dynamic content (articles, SEO metadata, UTM, inquiries) uses **Supabase from Phase 1** with admin portal CRUD. Static page structure in code. |
| 6 | Photography budget | GDrive assets now. Professional shoot TBD Phase 2. |
| 7 | 2 articles/month | **Confirmed** with AI assistance. |
| 8 | GA4 + GTM | **Confirmed.** |

---

## CASCADING CHANGES REQUIRED

These decisions create ripple effects across the documentation system. Three changes are high-impact.

### Change 1: Supabase for Dynamic Content from Phase 1 (Assumption 5)

Previously Phase 1 was code-managed content. Now Supabase handles articles, SEO metadata, content management, UTM tracking, and inquiry data from day one, with admin portal providing CRUD interface.

This adds to Phase 1 scope: Supabase content table schemas (articles, client_stories, seo_metadata, site_settings), admin portal UI (protected routes with Supabase Auth), and API routes for CRUD operations. The admin portal is a lightweight Next.js protected section, not a separate application.

**Docs to update:** `15_TECHNICAL_ARCHITECTURE.md` (add Supabase content schema, admin portal architecture), `16_IMPLEMENTATION_ROADMAP.md` (add admin portal to Phase 1 scope, ~1 extra week), `17_BUILD_CHECKLIST.md` (add admin portal tasks), `08_CONTENT_SYSTEM.md` (content model becomes database-driven for dynamic content, code-based for page structure).

### Change 2: Client Stories Replace Client Logos (B3)

Trust architecture shifts fundamentally. No logo strip anywhere on the site. Instead, 3-5 anonymized Client Stories distributed across Home (featured story), About (credentials section), and service pages (relevant story per service). Each story covers: industry sector, challenge faced, UGC solution provided, and measurable outcome. All content is realistic and grounded — no superlatives, no overclaiming.

This changes the proof section on the Home page from "logo strip + stats" to "Client Story highlight + stats + certifications." The About page shifts from logo parade to narrative proof. Service pages gain contextual story references.

**Docs to update:** `04_FINAL_DIRECTION_SSOT.md` (trust logic Layer 4 rewritten from logos to stories), `05_BRAND_NARRATIVE_AND_POSITIONING.md` (proof logic updated), `08_CONTENT_SYSTEM.md` (Client Story content model added), `page-blueprints/home.md` (proof section redesigned), `page-blueprints/about.md` (credentials section updated), `page-blueprints/service-template.md` (add contextual story reference).

### Change 3: Tracking is Phase 1, Not Phase 3 (B7)

The current production site has a working tracking page at `utamaglobalindocargo.com/track`. This must be replicated or integrated in the rebuild, not deferred. The tracking functionality needs investigation: what backend powers it, what data format does it return, can the API be reused.

**Docs to update:** `15_TECHNICAL_ARCHITECTURE.md` (tracking integration approach), `16_IMPLEMENTATION_ROADMAP.md` (track shipment moved to Phase 1 Week 4-5), `page-blueprints/track-shipment.md` (redesign from fallback to functional).

### Medium Impact Changes

**T6: Nodemailer + Supabase triggers** replaces Resend. Affects `15_TECHNICAL_ARCHITECTURE.md` stack table.

**T7: No 301 redirects.** Removes redirect inventory task from roadmap and checklist. Simplifies launch.

**B1: Domain confirmed as `utamaglobalindocargo.com`.** Update hreflang examples in `07_BILINGUAL_ROUTING_AND_SLUGS.md` and canonical references in `14_SEO_SEM_ANALYTICS_TRACKING.md`.

**B6: Company profile PDF via admin portal.** Adds file management to admin portal scope in `15_TECHNICAL_ARCHITECTURE.md`.
