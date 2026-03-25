# Page Blueprint: Blog / Insights (Hub + Article Template)

## Phase
Phase 2 — launches after MVP with 4-6 pre-written articles.

## Page Goal

**Hub page:** establish UGC as a thinking brand. Provide a browsable content library that captures informational search traffic and builds SEO authority.

**Article page:** educate the reader on a specific logistics topic. Build trust through demonstrated expertise. Route readers to relevant services.

---

## Insights Hub

### Target Audience Intent
"I'm researching logistics topics" · "What does UGC know about my industry?" · "I want to learn before I buy"

### Content Sections

**1. Hero**
Light bg. Heading: "Insights" / "Wawasan." Subline: "Perspectives on logistics, supply chain, and Indonesian trade."

**2. Featured Article**
Large card spanning 8 columns (desktop), full-width (mobile). Article hero image (or typographic fallback), title, category tag, reading time, date, 2-line excerpt.

**3. Category Filter**
Horizontal tabs (desktop) / horizontal scroll pills (mobile). Categories: All, Logistics Operations, Supply Chain Strategy, Industry News, Guides. Categories are tags, not separate routes — filtering is client-side.

**4. Article Grid**
3-column card grid (desktop), single-column list (mobile). Each card: thumbnail (or category-colored header block), title, date, reading time, category tag. Pagination or "Load More" at bottom.

**5. Newsletter CTA**
Inline module: "Get logistics insights delivered." Email capture field + subscribe button. Stores in Supabase `newsletter_subscribers` table. TODO-TECH: decide email delivery mechanism (Resend, SendGrid, or manual).

**6. Footer**

### SEO Intent
Keywords: "berita logistik indonesia," "logistics news indonesia," "panduan ekspor impor." Hub page targets broad informational keywords. Individual articles target long-tail queries.

---

## Article Detail Template

### Target Audience Intent
"I want to understand [specific logistics topic]" · "I'm comparing options / methods" · "I found this via Google"

### Content Sections

**1. Article Header**
Light bg. Breadcrumb: Home > Insights > [Article Title]. Category tag + date + reading time. Display serif headline (editorial treatment). Lead paragraph (1-2 sentences answering "why read this?"). Hero image or typographic treatment.

**2. Article Body**
Long-form content, max-width 720px for readability. Uses standard editorial hierarchy: H2 for main sections, H3 for subsections. In-body cross-links to service pages (at least 1) and other articles (at least 1). Pull quotes styled with orange left-border and serif italic. Data or stats in monospace blocks.

**3. Key Takeaways**
Boxed summary at article end: 3-5 bullet points summarizing the main insights. Glass card treatment on subtle bg.

**4. Author/Source**
"Published by UGC Logistics." Brief company description. Link to About page.

**5. Related Content Module**
2-3 related articles (tag-matched). 1 related service link. "Request a Quote" CTA.

**6. Footer**

### Motion
Article header: fade-in headline + image. Body: minimal — reading pages should not distract with motion. Related content: staggered card reveal.

### Desktop Logic
Article body centered at 720px max-width. Related content full-width grid below.

### Mobile Logic
Article full-width with 20px padding. Related content as vertical card stack.

### Analytics Events
`page_view` (article_slug, category), `scroll_depth`, `insights_article_read` (triggered at 75% scroll), `recirculation_click`, `cta_click_quote_inline`

### Article Schema
JSON-LD Article schema: headline, author (UGC Logistics), datePublished, dateModified, image, publisher.

## Suggested First 6 Articles (TODO-COPY)

| # | Topic | Primary Keyword (ID) | Primary Keyword (EN) | Related Service |
|---|-------|---------------------|---------------------|-----------------|
| 1 | FCL vs LCL: choosing the right container | fcl vs lcl perbedaan | fcl vs lcl difference | International Freight |
| 2 | Guide to Indonesia customs clearance | panduan kepabeanan indonesia | indonesia customs clearance guide | Import DTD |
| 3 | When to use air freight vs sea freight | kapan pakai kargo udara | air freight vs sea freight | Domestic + International |
| 4 | E-commerce fulfillment in Indonesia | fulfillment ecommerce indonesia | ecommerce fulfillment indonesia | Warehousing & 3PL |
| 5 | Project cargo planning checklist | checklist kargo proyek | project cargo planning guide | Project Cargo |
| 6 | Understanding incoterms for Indonesian exporters | incoterms untuk eksportir | incoterms guide exporters | International Freight |
