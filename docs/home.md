# Page Blueprint: Home

## Page Goal
Bold first impression, route to services within 15s, convert high-intent within 30s.

## Target Audience Intent
"Who is UGC?" · "What do you offer?" · "I need a quote now"

## Content Sections

**1. Hero (100vh desktop, 70-80vh mobile)**
Dark bg. Display serif headline white 96px/48px. One-liner supporting text. Primary CTA: "Discuss Your Requirements." Subtle ambient motion: floating glass shapes or gradient shift.

**2. Value Proposition Strip**
Light bg. Single body-lg sentence: what UGC does, for whom, differently.

**3. Services Editorial Grid**
Asymmetric 2+4 layout — Domestic and International larger. Cards: section number (mono, orange), name, one-liner, icon, "Explore →" link. Hover reveals preview. Mobile: vertical stack.

**4. Proof Section**
Dark bg. Three elements side by side (desktop) or stacked (mobile):
- **Stats block:** 3-4 counter-animated stats with contextual labels ("25+ years continuous operation since 1995"). WCA + IATA badges.
- **Client Story highlight:** one featured Client Story card (glass variant). Shows: industry tag, one-line display quote, "Read the story →" link. Content sourced from Supabase `client_stories` table where `featured = true`.
- No client logos — replaced entirely by Client Story card per B3 decision.

**5. Featured Editorial**
Light bg. One glass card linking to featured insight (Phase 2) or service spotlight (Phase 1 fallback).

**6. CTA Band**
Dark bg. "Ready to Move?" + large quote CTA + trust line ("We respond within 2 business hours").

**7. Footer**

## CTA Logic
Hero → `/quote` · Service cards → service pages · CTA band → `/quote` · Header CTA persistent · Mobile bottom bar: WhatsApp (+62 812-8459-6614) + Quote

## Trust Logic
Design quality (implicit) → Stats + certs (explicit) → Client Story highlight (narrative proof) → Content depth (expertise)

## Motion
Hero: parallax gradient + staggered word reveal (desktop). Service grid: staggered card reveal. Stats: counter animation. Client Story card: fade-in. Mobile: opacity + translateY only.

## SEO Intent
Keywords: "freight forwarder indonesia," "jasa ekspedisi jakarta." Schema: Organization, LocalBusiness.

## Analytics Events
`page_view`, `scroll_depth`, `cta_click_quote_header`, `cta_click_quote_inline`, `cta_click_whatsapp`, `service_card_click`, `recirculation_click`

## Recirculation
All 6 services, About, Insights hub, Quote.
