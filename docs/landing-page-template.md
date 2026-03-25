# Page Blueprint: Landing Page (Campaign Template)

## Phase
Phase 2 — created per campaign.

## Page Goal
Single-purpose conversion page for paid ad campaigns or targeted SEO long-tail queries. Strip everything except the conversion path. Maximum focus, minimum distraction.

## Target Audience Intent
"I searched for [specific query] and this page matches exactly" · "I clicked an ad and want to act quickly"

## Content Sections

**1. Headline Block**
Match the ad copy or search query intent exactly. H1 headline + 1-2 supporting sentences. No global header navigation — only UGC logo (links to home) and language toggle. This is a closed page.

**2. Value Propositions (3-4)**
Icon + heading + one-sentence benefit. Focused on the specific service/offer this landing page promotes. E.g., for an "Import from China" landing page: "Door-to-door from any Chinese city," "Full customs clearance included," "Track every step in real-time," "Fixed pricing, no hidden fees."

**3. Social Proof Strip**
Compact: "25+ years · WCA member · IATA accredited · 150+ countries." Client logos if available. One testimonial quote if available.

**4. Conversion Form**
Simplified version of the quote form — fewer fields for lower friction. Fields: Name, Company (optional), Email, Phone, Shipment description (textarea). Submit: "Get a Free Quote" / "Dapatkan Penawaran Gratis." Connects to same Supabase table with a `source` field marking it as a landing page submission.

**5. Trust Reinforcement**
Below form: "We respond within 2 business hours. Your information is confidential." WCA + IATA badges.

**6. Minimal Footer**
Company name, address, phone, email. Privacy policy link. No full navigation.

## CTA Logic
Single CTA: the form. No competing links. Logo links to home (escape hatch) but that's the only exit.

## SEO Intent
Each landing page targets one specific long-tail keyword. URL slug is keyword-optimized. Meta title and description are ad-aligned.

## Analytics Events
`page_view` (landing_page_slug), `form_start_landing`, `form_submit_landing` (with campaign UTMs), `scroll_depth`

## UTM Handling
Landing pages are the primary destination for UTM-tagged campaigns. All UTM params are captured and stored with the form submission. The landing page slug itself serves as a campaign identifier.

## Example Landing Pages

| Slug (EN) | Slug (ID) | Target Query |
|-----------|-----------|-------------|
| `/en/import-from-china` | `/id/import-dari-china` | import from china freight forwarder indonesia |
| `/en/ecommerce-fulfillment-jakarta` | `/id/fulfillment-ecommerce-jakarta` | ecommerce fulfillment service jakarta |
| `/en/domestic-freight-java-bali` | `/id/ekspedisi-darat-jawa-bali` | ekspedisi darat jawa bali |
| `/en/project-cargo-heavy-equipment` | `/id/kargo-proyek-alat-berat` | pengiriman alat berat indonesia |
