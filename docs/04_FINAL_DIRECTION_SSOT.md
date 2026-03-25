# 04 — Final Direction SSOT (Single Source of Truth)

This is the master document. When any other file in this documentation system conflicts with decisions stated here, this file wins.

**Last updated:** 25 March 2026 — all business decisions resolved.

---

## Creative North Star

**"Logistics presented with the confidence and craft of editorial design."**

UGC's website must feel like opening a premium publication, not visiting a corporate brochure. Every page is a composed spread. Every scroll reveals something worth reading. The experience communicates that UGC thinks deeply about logistics — and that depth of thought translates to depth of service.

The north star is not "make a pretty logistics site." It is: "make a site so well-crafted that visitors unconsciously trust the company behind it."

---

## Experience Thesis

The visitor experience follows editorial pacing:

**Hook** — bold, confident first impression (hero typography, motion, brand energy).
**Context** — immediately establish what UGC does and for whom (value proposition, positioning).
**Depth** — reveal capability through curated content, not long-winded descriptions.
**Proof** — embed social proof, operational specifics, and trust signals within content flow. Client Stories (anonymized, industry-based) replace traditional client logos due to NDA/privacy considerations. This is stronger: a specific story about solving a real logistics challenge is more persuasive than a logo strip.
**Action** — present conversion opportunities naturally within the editorial rhythm.
**Discovery** — always offer a next path. Every page connects to deeper content, adjacent services, or fresh perspectives.

---

## Brand Expression Rules

**The brand is confident, not aggressive.** Bold typography and strong layout choices communicate confidence. But the tone is knowledgeable and warm, not shouty or salesy.

**The brand is specific, not generic.** Never say "we provide excellent service." Say "our Jakarta warehouse processes 2,400 SKUs daily with 99.7% pick accuracy." Replace every claim with a fact, a number, or a story.

**The brand is modern, not trendy.** Glassmorphism and editorial motion are the visual tools, not the identity. If a design trend fades, the underlying composition must still work.

**The brand speaks in two languages equally.** Indonesian and English are both first-class. Indonesian content sounds natural in Indonesian, not like translated English. Vice versa.

---

## Visual Rules

### Color System

| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| Primary | UGC Orange | `#FF4600` | CTAs, active states, editorial accents, section markers |
| Primary Dark | Deep Orange | `#CC3800` | Hover states, pressed states |
| Background Light | Off-White | `#FAFAF8` | Default light background |
| Background Dark | Near-Black | `#0A0A0C` | Dark sections, footer |
| Surface Glass | White α12 | `rgba(255,255,255,0.12)` | Glass panels on dark |
| Surface Glass Light | White α60 | `rgba(255,255,255,0.60)` | Glass panels on light |
| Text Primary | Charcoal | `#1A1A1A` | Body text on light |
| Text Secondary | Gray | `#6B6B6B` | Supporting text, captions |
| Text Inverse | White | `#FFFFFF` | Text on dark |
| Border | Light Gray | `#E5E5E3` | Dividers, card borders |
| Success | Green | `#00875A` | Confirmation states |
| Warning | Amber | `#FFAB00` | Alert states |

### Typography

Primary: **Inter** (variable weight). Display: **Instrument Serif** or **Playfair Display** for editorial headlines only. Monospace: **JetBrains Mono** for stats, route codes, tracking numbers.

| Element | Desktop | Mobile | Weight | Typeface |
|---------|---------|--------|--------|----------|
| Display Hero | 72-96px | 40-48px | 400 | Serif |
| H1 | 48-56px | 32-36px | 700 | Inter |
| H2 | 36-40px | 24-28px | 600 | Inter |
| H3 | 24-28px | 20-22px | 600 | Inter |
| Body Large | 20px | 18px | 400 | Inter |
| Body | 16px | 16px | 400 | Inter |
| Caption | 13-14px | 13px | 500 | Inter |
| Data/Stats | 14-16px | 14px | 500 | JetBrains Mono |

### Layout

12-column grid on desktop (1440px max-width, 24px gutter). 4-column on mobile (16px gutter). Asymmetric compositions preferred.

### Glassmorphism

Glass panels: `backdrop-filter: blur(24px)`, subtle border, context-dependent fill. Max two glass layers stacked. `@supports` fallback for older browsers. Never use glass on: body text containers, form inputs, primary CTAs.

### Imagery

Photography from GDrive assets folder (`1sDlXlWnx8D-qw9M8EGNNI1iWLezEG7Sb`). Logo variants (Vertical + Horizontal) confirmed. Operational photography: use typographic treatments and gradient fields as fallback where real photography is unavailable. Never use generic stock photos.

### Icons

Lucide Icons (MIT licensed, 24px grid, 1.5px stroke). Always paired with text. Color follows context.

---

## Interaction Rules

**Hover states are information, not decoration.** A hover on a service card reveals a brief descriptor or preview.

**Clicks are commitments.** Reduce unnecessary clicks. Use scroll-reveal and expansion panels.

**Forms are conversations.** The quote form includes reassurance and value statements at each step.

**Scroll is the primary interaction.** Content reveals, visual transitions, and progressive depth feel earned through scrolling.

---

## Motion Principles

All motion uses **Framer Motion** (confirmed decision). Easing curves always, no linear. Default: 300-500ms for reveals, 200ms for feedback, 600-800ms for page transitions. Mobile reduces all motion to opacity + translateY only. `prefers-reduced-motion` kills all non-essential animation.

---

## Conversion Logic

**Primary conversion: Quote request.** Available from every page via sticky header CTA and contextual in-page CTAs. 4-step form with trust-building micro-content at each step. Submissions go to Supabase `quote_submissions` table. Notification sent to **services@ugc.co.id** via Supabase triggers + Nodemailer.

**Secondary conversions:**
Track a shipment (existing tracking system integrated from current site — Phase 1).
Download company profile (PDF managed via admin portal).
WhatsApp direct (**+62 812-8459-6614**) — lowest friction conversion for Indonesian mobile users.
Subscribe to insights (Phase 2).

**CTA hierarchy per page:**
One primary CTA (usually quote-related), one secondary CTA (contextual), one persistent CTA (header + WhatsApp float).

**CTA design:**
Primary: solid `#FF4600`, white text, 48px height, 8px radius. Secondary: outline `#FF4600`. Tertiary: text link with arrow.

---

## Trust Logic

Trust is built through specificity, not claims. Five layers:

**Layer 1 — Ambient trust.** Design quality, fast load times, bilingual fluency.

**Layer 2 — Factual trust.** Specific numbers: 25+ years, 150+ countries, 34 provinces, 98% on-time, WCA and IATA certifications. Distributed throughout the site.

**Layer 3 — Narrative trust.** Operational stories, process transparency, service detail depth. Lives on service pages and insights hub.

**Layer 4 — Client Story trust.** Anonymized, industry-based case stories. Each story covers: industry sector, challenge faced, solution UGC provided, measurable outcome. No client names or logos due to NDA/privacy considerations. 3-5 stories distributed across Home (featured), About, and service pages (contextual). All stories must be realistic, grounded, and never overclaimed.

**Layer 5 — Operational trust.** Tracking functionality (integrated from current site), company profile download, real contact channels (WhatsApp, email, phone).

---

## Bilingual Architecture Rules

Indonesian is the default language. English is the alternate. Both first-class. Route structure: `/{locale}/...` where locale is `id` or `en`. Root `/` redirects based on browser language, default to `/id`.

Content is localized, not translated. Separate slug directories per locale with shared page components. Domain: **`utamaglobalindocargo.com`**.

---

## SEO/SEM Logic

Every page targets a specific keyword cluster, separately optimized per language. Schema markup site-wide. Internal linking follows topical clusters. Phase 2 adds campaign landing pages funded by confirmed IDR 10-15jt/month ads budget.

---

## Analytics Logic

GTM + GA4. Supabase captures form submissions with full UTM attribution. Event taxonomy defined in `data/tracking-taxonomy.json`. KPIs reported weekly to Director.

---

## Technical Guardrails

Stack: React + Next.js 16 (App Router) + Supabase + Vercel. Framer Motion for animation. Nodemailer + Supabase triggers for email notifications. Dynamic content (articles, SEO metadata, client stories, site settings, UTM tracking, inquiries) managed in Supabase with admin portal CRUD from Phase 1. Static page structure in code.

---

## Performance Guardrails

| Metric | Target |
|--------|--------|
| LCP | < 2.5s |
| FID | < 100ms |
| CLS | < 0.1 |
| Total page weight | < 500KB initial |
| Lighthouse Performance | > 90 |

---

## Accessibility Guardrails

WCAG 2.1 AA minimum. Keyboard navigable. Alt text. Labels. 4.5:1 contrast. `prefers-reduced-motion`. Correct lang attribute per locale.

---

## Risks and Mitigation

| Risk | Severity | Mitigation |
|------|----------|------------|
| Content production bottleneck | High | All C1-C11 content items assigned for creation. AI-assisted drafting with human review. |
| Client Stories quality | Medium | Stories must be reviewed for realism. No superlatives, no overclaiming. Cross-check against actual UGC operational capability. |
| Photography gaps | Medium | GDrive logo assets confirmed. Typographic/gradient fallback designed into the system for non-logo imagery. |
| Motion performance on low-end devices | Medium | Mobile motion limited to opacity + translate. Framer Motion lazy-loaded and tree-shaken. |
| Bilingual content parity | Medium | Supabase content model enforces parity — both language versions required. |
| Admin portal scope creep | Medium | Admin portal is lightweight: CRUD for articles, client stories, SEO metadata, site settings, file uploads. Not a full CMS. |
| Tracking integration from current site | Medium | Existing tracking at utamaglobalindocargo.com/track must be reverse-engineered or API documented. |
