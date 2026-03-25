# 07 — Bilingual Routing and Slugs

## Route Structure

All routes are locale-prefixed. Indonesian (`id`) is the default locale. English (`en`) is the alternate. Root `/` performs language detection via `Accept-Language` header and redirects to `/{detected_locale}`. Default fallback: `/id`.

**Production domain:** `utamaglobalindocargo.com`

### Complete Route Map

| Page | Indonesian Route | English Route |
|------|-----------------|---------------|
| Home | `/id` | `/en` |
| About | `/id/tentang` | `/en/about` |
| Services Index | `/id/layanan` | `/en/services` |
| Domestic Distribution | `/id/layanan/distribusi-domestik` | `/en/services/domestic-distribution` |
| International Freight | `/id/layanan/freight-internasional` | `/en/services/international-freight` |
| Import DTD & Customs | `/id/layanan/import-dtd-kepabeanan` | `/en/services/import-dtd-customs` |
| Charter | `/id/layanan/blockspace-charter` | `/en/services/blockspace-charter` |
| Warehousing & 3PL | `/id/layanan/pergudangan-3pl` | `/en/services/warehousing-3pl` |
| Project Cargo | `/id/layanan/kargo-proyek` | `/en/services/project-cargo` |
| Quote | `/id/minta-penawaran` | `/en/request-quote` |
| Track Shipment | `/id/lacak-kiriman` | `/en/track-shipment` |
| Insights Hub | `/id/wawasan` | `/en/insights` |
| Insight Article | `/id/wawasan/[slug]` | `/en/insights/[slug]` |
| Contact | `/id/kontak` | `/en/contact` |
| Privacy Policy | `/id/kebijakan-privasi` | `/en/privacy-policy` |
| Terms of Service | `/id/syarat-ketentuan` | `/en/terms-of-service` |
| Sitemap | `/id/peta-situs` | `/en/sitemap` |
| Industries (Phase 2) | `/id/industri/[slug]` | `/en/industries/[slug]` |

## Slug Rules

Indonesian slugs use natural Indonesian phrasing, not transliterated English. Correct: `/id/layanan/distribusi-domestik`. Incorrect: `/id/layanan/domestic-distribution`. Slugs are lowercase, hyphen-separated, no special characters. Maximum slug depth: 3 segments after locale prefix.

## Metadata Localization

Every page has locale-specific metadata — separately keyword-optimized, not translated.

### Example: Domestic Distribution

**Indonesian:**
```
title: "Distribusi Domestik Indonesia - Ekspedisi Darat, Laut, Udara | UGC Logistics"
description: "Layanan distribusi domestik ke 34 provinsi via darat (FTL/LTL), laut (FCL/LCL), dan udara. Pengiriman cepat dan aman dari PT Utama Globalindo Cargo."
```

**English:**
```
title: "Domestic Freight Distribution Indonesia - Land, Sea & Air | UGC Logistics"
description: "Domestic distribution services across 34 Indonesian provinces via land (FTL/LTL), sea (FCL/LCL), and air freight. Reliable delivery by UGC Logistics."
```

SEO metadata for articles and dynamic pages is managed in Supabase via the admin portal, enabling marketing to update metadata without code deploys.

## Hreflang Implementation

Every page includes hreflang link elements:

```html
<link rel="alternate" hreflang="id" href="https://utamaglobalindocargo.com/id/layanan/distribusi-domestik" />
<link rel="alternate" hreflang="en" href="https://utamaglobalindocargo.com/en/services/domestic-distribution" />
<link rel="alternate" hreflang="x-default" href="https://utamaglobalindocargo.com/id/layanan/distribusi-domestik" />
```

`x-default` points to Indonesian. Hreflang is bidirectional. Handled automatically through Next.js layout metadata per locale.

## Translation Governance

**Literal translation** (facts, legal, technical): stats, legal pages, specifications, addresses, certifications.

**Localized rewrite** (marketing, editorial, CTAs): service descriptions, headlines, CTAs, insight articles, about narrative. Meaning and intent match, but phrasing and keyword targeting differ per language.

**Shared elements** (no translation): proper nouns (UGC Logistics, WCA, IATA), email addresses, phone numbers, route codes, tracking numbers.

### Content Parity Rule

A page cannot publish in one language without the other. The Supabase content model enforces this for dynamic content — articles and client stories require both `_id` and `_en` fields populated before publishing status can be set to `published`.

## Next.js Implementation

Separate slug directories per locale with shared page components (confirmed decision T8):

```
app/
  [locale]/
    tentang/page.tsx      → imports AboutPage component
    about/page.tsx        → imports AboutPage component
    layanan/
      page.tsx            → imports ServicesPage component
      distribusi-domestik/page.tsx → imports ServiceDetailPage
    services/
      page.tsx            → imports ServicesPage component
      domestic-distribution/page.tsx → imports ServiceDetailPage
    ...
```

Middleware handles: locale detection from URL, redirect from `/` to `/{locale}`, setting locale cookie. Middleware does NOT handle slug resolution — that is handled by the file structure.

Language toggle reads current route, looks up alternate locale's route in the route map (`lib/utils/routes.ts`), and generates the correct link.
