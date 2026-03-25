# Page Blueprint: Service Detail (Template)

Applies to all 6 service pages. Structure consistent, content customized per service.

## Page Goal
Educate about this service. Build confidence in UGC's expertise. Convert to quote with service pre-selected.

## Target Audience Intent
"Can they handle my specific shipment?" · "How do they do it?" · "Are they reliable for this?"

## Content Sections

**1. Hero**
Light bg. Breadcrumb: Home > Services > [Name]. Serif headline. One-liner hook. No CTA in hero — let content work first.

**2. Service Overview (2-3 paragraphs, 300-500 words)**
Operational specifics: modes, routes, cargo types, SLAs. Internal cross-links to related services embedded naturally.

**3. Capability Breakdown**
Cards or structured blocks per capability. E.g., Domestic: AF card + FCL card + LCL card + FTL card + LTL card. Each: mode name, description, key benefit, metric.

**4. Process Transparency**
"How it works" — 4-6 steps. Horizontal timeline (desktop), vertical steps (mobile).

**5. Proof**
Relevant stats/certifications. Plus contextual Client Story card: one anonymized story tag-matched to this service via `service_tags`. E.g., International Freight shows a story from "FMCG" industry about export challenges solved. Sourced from Supabase `client_stories` where `service_tags` contains this service. No client names.

**6. FAQ (3-5 questions)**
Accordion. Real questions. FAQ schema markup.

**7. Recirculation Module**
Two related service cards + CTA ("Request a quote for [service]" → `/quote?service=[key]`) + one insight link.

**8. CTA Band**
"Ready to ship?" + primary CTA pre-linked to quote with service.

## CTA Logic
Recirculation CTA → `/quote?service=[key]`. CTA band → same. Header persistent. Mobile bottom bar persistent.

## Trust Logic
Overview (knowledge) → Capabilities (scope) → Process (transparency) → Client Story (evidence) → FAQ (specificity)

## Motion
Hero: fade-in. Overview: scroll-reveal. Capability cards: staggered reveal. Process: step-by-step reveal. FAQ: accordion expand.

## Desktop Logic
Overview: 7/5 asymmetric. Capabilities: card grid. Process: horizontal timeline. FAQ: centered 720px.

## Mobile Logic
Single column. Capabilities stacked. Process vertical. FAQ full-width accordion.

## SEO Intent
Each service targets distinct keyword clusters (ID + EN separately optimized). Service schema + FAQ schema + BreadcrumbList.

## Analytics Events
`page_view` (service_name param), `scroll_depth`, `cta_click_quote_inline`, `recirculation_click`, `service_card_click`

## Per-Service Customization

| Service | Related Services | Client Story Industry Focus | FAQ Focus |
|---------|-----------------|---------------------------|-----------|
| Domestic | International, Warehouse | FMCG multi-island distribution | Transit times, FTL vs LTL |
| International | Domestic, Import DTD | Manufacturing export | FCL vs LCL, documentation |
| Import DTD | International, Domestic | Pharmaceutical import | Duty, prohibited goods, timeline |
| Charter | Domestic, Project Cargo | Time-critical industrial parts | Min weight, aircraft, lead time |
| Warehouse | Domestic, International | E-commerce fulfillment | Capacity, WMS, accuracy |
| Project Cargo | Charter, Domestic | Mining/energy heavy equipment | Max dimensions, permits, insurance |
