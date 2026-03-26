# 04 — Final Direction SSOT (Single Source of Truth)

This is the master document. When any other file in this documentation system conflicts with decisions stated here, this file wins.

**Last updated:** 25 March 2026 — design system overhauled to Cinematic Editorial Bold.

---

## Creative North Star

**"Logistics presented as a cinematic experience, not a corporate brochure."**

UGC's website must feel like stepping into a film title sequence that happens to be about logistics. Every section is a composed frame. Every scroll triggers a choreographed reveal. The experience communicates that UGC operates with precision and boldness, and that confidence shows in every pixel.

The north star is not "make a pretty logistics site." It is: "make a site so visually striking and technically polished that visitors remember it hours after closing the tab."

---

## Experience Thesis

The visitor experience follows cinematic pacing:

**Opening Frame** -- bold, immersive first impression. Dark canvas, glowing accents, typography that commands attention. Parallax depth layers create a sense of entering a world, not loading a page.

**Establishing Shot** -- immediately establish what UGC does and for whom. Value proposition delivered through motion-revealed text and ambient glow that draws the eye.

**Depth of Field** -- reveal capability through curated, layered content. Glassmorphism panels float over gradient mesh backgrounds. Information feels discovered, not listed.

**Evidence** -- embed social proof, operational specifics, and trust signals within the cinematic flow. Client Stories (anonymized, industry-based) replace traditional client logos. A specific story about solving a real logistics challenge is more persuasive than a logo strip.

**Call to Action** -- conversion opportunities appear as natural beats in the visual rhythm, not interruptions. CTAs glow and pulse subtly to draw attention without being aggressive.

**Next Scene** -- always offer a next path. Every page connects to deeper content, adjacent services, or fresh perspectives through recirculation modules with hover-tilt effects.

---

## Brand Expression Rules

**The brand is bold, not loud.** Oversized typography, dramatic reveals, and cinematic motion communicate confidence. The tone is authoritative and warm, never desperate or salesy.

**The brand is specific, not generic.** Never say "we provide excellent service." Say "our Jakarta warehouse processes 2,400 SKUs daily with 99.7% pick accuracy." Replace every claim with a fact, a number, or a story.

**The brand is cinematic, not gimmicky.** Parallax, glassmorphism, and ambient glow are core visual tools. They serve the narrative. If an effect does not guide the eye or reinforce the message, remove it.

**The brand speaks in two languages equally.** Indonesian and English are both first-class. Indonesian content sounds natural in Indonesian, not like translated English. Vice versa.

**Copywriting rule: NEVER use emdash (--) in user-facing content.** Use periods, commas, semicolons, or restructure the sentence instead. This applies to all page copy, service descriptions, FAQ answers, CTAs, and any text rendered to the visitor.

---

## Visual Rules

### Color System -- Warm Spectrum

The palette is dark-first with a warm accent spectrum radiating from the brand orange.

| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| Primary | UGC Orange | `#FF4600` | CTAs, active states, glow accents, section markers |
| Primary Dark | Deep Orange | `#CC3800` | Hover states, pressed states |
| Primary Light | Bright Orange | `#FF6B35` | Hover glows, gradient stops |
| Accent Warm | Amber | `#FFAB40` | Secondary accents, gradient warm end, stat highlights |
| Accent Coral | Deep Coral | `#FF3D00` | Gradient hot end, alert accents |
| Background Light | Warm Off-White | `#FAF9F6` | Light sections (used sparingly) |
| Background Dark | Rich Black | `#09090B` | Primary background, hero sections |
| Background Elevated | Dark Gray | `#141416` | Elevated dark surfaces, cards on dark |
| Surface Glass | White alpha 8 | `rgba(255,255,255,0.06)` | Glass panels on dark |
| Surface Glass Light | White alpha 50 | `rgba(255,255,255,0.50)` | Glass panels on light |
| Text Primary | Near White | `#F5F5F5` | Body text on dark |
| Text Primary Light | Charcoal | `#1A1A1A` | Body text on light sections |
| Text Secondary | Warm Gray | `#8A8A8A` | Supporting text, captions |
| Text Inverse | White | `#FFFFFF` | Emphasized text on dark |
| Border Dark | White alpha 10 | `rgba(255,255,255,0.10)` | Dividers on dark |
| Border Light | Warm Gray | `#E8E5E0` | Dividers on light |
| Glow Primary | Orange alpha 40 | `rgba(255,70,0,0.40)` | Glow effects behind CTAs, accents |
| Glow Ambient | Orange alpha 8 | `rgba(255,70,0,0.08)` | Large ambient background orbs |
| Success | Emerald | `#10B981` | Confirmation states |
| Warning | Amber | `#F59E0B` | Alert states |
| Error | Red | `#EF4444` | Error states |

**Dark-first rule:** The default page background is dark (`#09090B`). Light sections (`#FAF9F6`) are used as intentional contrast breaks, maximum 2 per page. This is the opposite of a typical logistics site.

**Glow rule:** Primary CTAs have a glow shadow (`0 0 40px rgba(255,70,0,0.35)`). Glass panels on dark have a subtle warm border glow. Background gradient orbs use `blur(120px+)` for ambient warmth.

### Typography

Primary: **Inter** (variable weight, wide tracking for labels). Display: **Instrument Serif** for cinematic hero headlines only. Monospace: **JetBrains Mono** for stats, route codes, tracking numbers.

| Element | Desktop | Mobile | Weight | Typeface | Tracking |
|---------|---------|--------|--------|----------|----------|
| Display Hero | 80-120px | 44-56px | 400 | Serif | -0.02em |
| H1 | 52-64px | 34-40px | 700 | Inter | -0.025em |
| H2 | 40-48px | 28-32px | 600 | Inter | -0.02em |
| H3 | 28-32px | 22-24px | 600 | Inter | -0.01em |
| Body Large | 20px | 18px | 400 | Inter | 0 |
| Body | 16px | 16px | 400 | Inter | 0 |
| Label | 12-13px | 11-12px | 600 | Inter | 0.12em, uppercase |
| Data/Stats | 48-72px | 32-48px | 700 | JetBrains Mono | -0.03em |
| Caption | 13-14px | 13px | 500 | Inter | 0.02em |

**Label treatment:** Section labels, category tags, and metadata use uppercase with wide letter-spacing (0.08-0.15em). This creates visual rhythm and editorial structure.

**Stat numbers:** Displayed at headline scale (48-72px desktop) in JetBrains Mono bold with tight tracking, not buried in small text. Stats are a visual centerpiece, not supporting detail.

### Layout

12-column grid on desktop (1440px max-width, 24px gutter). 4-column on mobile (16px gutter). Asymmetric compositions preferred. Dark background is the default canvas.

**Section rhythm:** Alternate between immersive dark sections and contrasting light breaks. No more than 3 dark sections consecutively without a light break. Section transitions use gradient mesh fades or glow line dividers, never hard color cuts.

### Glassmorphism 2.0

Glass is a primary visual language, not a subtle accent.

**Glass Dark:** `backdrop-filter: blur(20px)`, `background: rgba(255,255,255,0.04)`, border with warm tint `rgba(255,255,255,0.08)`, optional glow border on hover.

**Glass Tinted:** Same as Glass Dark but with orange tint: `background: rgba(255,70,0,0.04)`, border `rgba(255,70,0,0.15)`. Used for highlighted cards, active states.

**Glass Light:** `backdrop-filter: blur(24px)`, `background: rgba(255,255,255,0.60)`, warm shadow. Used only in light sections.

Max two glass layers stacked. `@supports` fallback for older browsers. Never use glass on: form inputs, primary CTA buttons.

### Imagery

Photography from GDrive assets folder. Logo variants (Vertical + Horizontal) confirmed. When photography is unavailable: bold typographic treatments over gradient mesh backgrounds, or abstract warm gradient fields (orange to charcoal). Never use generic stock photos.

### Icons

Lucide Icons (MIT licensed, 24px grid, 1.5px stroke). Always paired with text. On dark: `#8A8A8A` default, `#FF4600` active/hover. On light: `#6B6B6B` default, `#FF4600` active/hover.

---

## Interaction Rules

**Hover states are cinematic micro-moments.** Cards lift, glow intensifies, borders brighten. Service cards reveal a brief descriptor with a smooth expand. Desktop cursor triggers magnetic pull on primary CTAs.

**Scroll is the director.** Content reveals through choreographed scroll sequences: parallax layers shift, text clips in, stats count up, glass panels emerge from blur. The scroll position drives the visual narrative.

**Clicks are commitments.** Reduce unnecessary clicks. Use scroll-reveal and expansion panels to show depth without navigation.

**Forms are conversations.** The quote form includes reassurance and value statements at each step.

---

## Motion Principles

All motion uses **Framer Motion** (confirmed decision). Motion is cinematic, not decorative.

**Parallax:** Multi-layer depth on desktop. Background orbs at 15% scroll rate, midground elements at 8%, content at 0% (normal). Creates a sense of spatial depth. Disabled on mobile.

**Reveals:** Default is clip-path mask reveal (content wipes in from bottom) or opacity + translateY. Text headlines can use split-character animation for hero moments. Staggered reveals with 100ms delay, max 6 items.

**Ambient motion:** Floating glow orbs shift slowly (15-20s cycle). Gradient mesh backgrounds subtly rotate hue. These create a "living" feel even when the user is not scrolling.

**Hover:** Cards lift with glow intensify. Buttons have magnetic cursor attraction (desktop only, subtle). 200ms ease-out.

**Transitions:** Page transitions use a dark overlay wipe (300ms out, 400ms in). Not a simple crossfade.

**Mobile:** All motion reduced to opacity + translateY. No parallax, no clip-path, no magnetic cursor. Durations at 70% of desktop values. `prefers-reduced-motion` kills all non-essential animation.

---

## Conversion Logic

**Primary conversion: Quote request.** Available from every page via sticky header CTA (with glow accent) and contextual in-page CTAs. 4-step form with trust-building micro-content at each step. Submissions go to Supabase `quote_submissions` table. Notification sent to **services@ugc.co.id** via Supabase triggers + Nodemailer.

**Secondary conversions:**
Track a shipment (existing tracking system integrated from current site, Phase 1).
Download company profile (PDF managed via admin portal).
WhatsApp direct (**+62 812-8459-6614**), lowest friction conversion for Indonesian mobile users.
Subscribe to insights (Phase 2).

**CTA hierarchy per page:**
One primary CTA (usually quote-related), one secondary CTA (contextual), one persistent CTA (header + WhatsApp float).

**CTA design:**
Primary: solid `#FF4600`, white text, 48px height, 12px radius, glow shadow `0 0 40px rgba(255,70,0,0.35)`. Hover: glow intensifies, slight scale(1.02). Secondary: glass panel with orange border. Tertiary: text link with animated arrow.

---

## Trust Logic

Trust is built through specificity, not claims. Five layers:

**Layer 1 -- Ambient trust.** Cinematic design quality, fast load times, bilingual fluency. The site itself is the first proof of competence.

**Layer 2 -- Factual trust.** Specific numbers displayed at headline scale: 25+ years, 150+ countries, 34 provinces, 98% on-time. WCA and IATA certifications. Distributed throughout the site as visual anchors.

**Layer 3 -- Narrative trust.** Operational stories, process transparency, service detail depth. Lives on service pages and insights hub.

**Layer 4 -- Client Story trust.** Anonymized, industry-based case stories in glassmorphism cards. Each story covers: industry sector, challenge faced, solution UGC provided, measurable outcome. No client names or logos. 3-5 stories distributed across Home (featured), About, and service pages (contextual). All stories must be realistic, grounded, and never overclaimed.

**Layer 5 -- Operational trust.** Tracking functionality (integrated from current site), company profile download, real contact channels (WhatsApp, email, phone).

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

Stack: React + Next.js 16 (App Router) + Supabase + Vercel. Framer Motion for declarative UI animation. GSAP + ScrollTrigger as the primary scroll-linked animation engine (parallax, velocity marquee, scrub-based reveals, magnetic interactions). Lenis for smooth scroll (synced with GSAP ticker, `autoRaf: false`). Nodemailer + Supabase triggers for email notifications. Dynamic content (articles, SEO metadata, client stories, site settings, UTM tracking, inquiries) managed in Supabase with admin portal CRUD from Phase 1. Static page structure in code.

---

## Performance Guardrails

| Metric | Target |
|--------|--------|
| LCP | < 2.5s |
| FID | < 100ms |
| CLS | < 0.1 |
| Total page weight | < 500KB initial |
| Lighthouse Performance | > 90 desktop, > 80 mobile |

---

## Accessibility Guardrails

WCAG 2.1 AA minimum. Keyboard navigable. Alt text. Labels. 4.5:1 contrast (verified against dark backgrounds). `prefers-reduced-motion` removes all non-essential animation. Correct lang attribute per locale.

---

## Risks and Mitigation

| Risk | Severity | Mitigation |
|------|----------|------------|
| Content production bottleneck | High | All C1-C11 content items assigned for creation. AI-assisted drafting with human review. |
| Client Stories quality | Medium | Stories must be reviewed for realism. No superlatives, no overclaiming. Cross-check against actual UGC operational capability. |
| Photography gaps | Medium | GDrive logo assets confirmed. Typographic/gradient fallback designed into the system for non-logo imagery. |
| Motion performance on low-end devices | Medium | Mobile motion limited to opacity + translate. Framer Motion lazy-loaded and tree-shaken. Parallax desktop only. |
| Bilingual content parity | Medium | Supabase content model enforces parity, both language versions required. |
| Admin portal scope creep | Medium | Admin portal is lightweight: CRUD for articles, client stories, SEO metadata, site settings, file uploads. Not a full CMS. |
| Tracking integration from current site | Medium | Existing tracking at utamaglobalindocargo.com/track must be reverse-engineered or API documented. |
| Dark-first accessibility | Medium | All text on dark backgrounds must meet 4.5:1 contrast. Test with WAVE and axe. Use `#F5F5F5` not pure white for body text to reduce eye strain. |
