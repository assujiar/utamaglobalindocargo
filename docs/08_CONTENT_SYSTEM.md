# 08 — Content System

## Content Philosophy

Content serves exactly one of four purposes: educate, prove, route, or convert. If a content block does not do one of these, it should not exist.

## Content Architecture: Code vs Supabase

Per confirmed decision (Assumption 5), content is split between code-managed and Supabase-managed:

**Code-managed (static page structure):** page layouts, component structure, navigation, shared UI copy (button labels, form labels, error messages), design tokens. Changes require code deploy.

**Supabase-managed (dynamic content via admin portal):** insight articles, client stories, SEO metadata overrides, site settings (company info, contact details, WhatsApp number), file uploads (company profile PDF), quote/contact form submissions, UTM tracking data. Changes via admin CRUD — no code deploy needed.

Service page body content starts as code-managed in Phase 1 (changes infrequently) but can migrate to Supabase if update frequency increases.

## Content Model Per Page Type

### Home Page

Content blocks: (1) Hero with brand statement and primary CTA. (2) Value proposition strip. (3) Services editorial grid — six services as magazine-style cards. (4) Proof section — key stats with contextual labels + WCA/IATA badges + featured Client Story highlight. (5) Featured editorial — one highlighted insight or client story. (6) CTA section. (7) Footer.

### Service Detail Page

Content blocks: (1) Hero — service name, one-sentence hook, breadcrumb. (2) Service overview — 2-3 paragraphs with operational specifics. (3) Capability breakdown — modes, routes, SLAs as structured cards. (4) Process transparency — step-by-step "how it works." (5) Proof — stats, certifications, contextual Client Story reference. (6) FAQ — 3-5 questions with schema markup. (7) Related services — 2 contextual links. (8) CTA — quote pre-filled with this service. (9) Related insights. (10) Footer.

### About Page

Content blocks: (1) Hero — philosophy statement. (2) Origin story — 200-300 word founding narrative. (3) Operating philosophy — "We Care What We Deliver" expanded into 3-4 principles. (4) Network and credentials — WCA, IATA, global agent network with context. (5) Client Stories section — 2-3 featured stories showing UGC impact across industries. (6) CTA.

### Insights Article

Standard editorial: headline, lead paragraph, body with subheadings, key takeaways, related services/articles, CTA. Articles stored in Supabase `articles` table with bilingual fields.

### Quote Page

4-step guided form with trust micro-copy at each step. Submissions to Supabase with full UTM attribution.

### Client Story (New Content Type)

Each Client Story follows a consistent structure stored in Supabase `client_stories` table:

```
Schema: client_stories
- id: uuid
- industry_id, industry_en: string (e.g., "Farmasi & Kesehatan", "Pharmaceutical & Healthcare")
- challenge_id, challenge_en: text (2-3 sentences describing the logistics problem)
- solution_id, solution_en: text (2-3 sentences describing UGC's approach)
- result_id, result_en: text (1-2 sentences with measurable outcome)
- service_tags: string[] (which services are relevant: domestic, international, import-dtd, etc.)
- display_quote_id, display_quote_en: string (one-line pull quote for card display)
- featured: boolean (show on home page)
- status: enum (draft, published)
- created_at, updated_at: timestamp
```

Content rules for Client Stories:
- No company names, no logos, no identifying details.
- Industry sector is named (e.g., "FMCG," "Pharmaceutical," "E-Commerce," "Mining & Energy").
- Challenge must be a real, specific logistics problem (not generic "they needed shipping").
- Solution must describe what UGC actually did (modes used, timeline, coordination involved).
- Result must include a measurable outcome where possible (percentage improvement, time saved, cost reduced). If no number is available, describe the qualitative outcome specifically.
- All content must be realistic and grounded. No superlatives. No overclaiming. If the claim sounds like an ad, rewrite it to sound like a case report.

### Landing Page (Campaign Template)

Single-purpose conversion pages: headline matching ad/search intent, 3-4 value propositions, social proof strip (stats + certifications + Client Story excerpt), simplified form, trust badges. No global navigation.

## Editorial Hierarchy

H1: one per page, primary keyword, display serif (editorial) or Inter Bold (functional). H2: section headings, scannable, secondary keywords. H3: subsection headings, card titles. Body: 16px minimum, Inter 400, 1.6 line-height.

## CTA Placement Logic

First CTA above the fold. Secondary at content midpoint. Final near page bottom before recirculation. CTA types: Primary (solid orange → quote), Secondary (outline → deeper content), Tertiary (text link → cards/recirculation), Utility (icon-led → track/WhatsApp).

WhatsApp CTA links to `https://wa.me/6281284596614?text=...` with locale-appropriate pre-filled message.

## Trust Element Placement

Stats distributed throughout the site, not concentrated on one page. WCA/IATA badges: footer (persistent), about page (prominent), service pages (contextual). Client Stories: home page (featured highlight), about page (credentials section), service pages (contextual, tag-matched). Tracking functionality: header utility link + dedicated page.

## Reuse Rules for Bilingual Content

Shared translation dictionary for UI elements (nav labels, button text, form labels, error messages). Page-specific content independently authored per locale in Supabase (articles, client stories) or code (service descriptions, about narrative). Content parity enforced: both language fields required for `published` status.
