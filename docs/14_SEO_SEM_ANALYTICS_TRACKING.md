# 14 — SEO, SEM, Analytics & Tracking

## Part 1: SEO Architecture

### Page-Level Keyword Intent Map

| Page | Primary Keyword (ID) | Primary Keyword (EN) | Intent |
|------|---------------------|----------------------|--------|
| Home | jasa ekspedisi indonesia, cargo jakarta | freight forwarder indonesia, logistics company jakarta | Branded + Navigational |
| About | profil perusahaan ekspedisi ugc | about ugc logistics indonesia | Navigational |
| Domestic Distribution | ekspedisi domestik indonesia, pengiriman antar pulau | domestic freight indonesia, inter-island shipping | Commercial |
| International Freight | jasa freight forwarding internasional, ekspor impor jakarta | international freight forwarding indonesia, export import jakarta | Commercial |
| Import DTD & Customs | jasa import door to door, kepabeanan indonesia | import door to door indonesia, customs clearance service | Commercial |
| Charter | sewa pesawat cargo, blockspace cargo indonesia | aircraft charter cargo indonesia, blockspace freight | Commercial |
| Warehousing & 3PL | jasa gudang fulfillment jakarta, 3PL indonesia | warehousing fulfillment jakarta, 3PL logistics indonesia | Commercial |
| Project Cargo | pengiriman kargo besar, project cargo indonesia | project cargo indonesia, heavy lift shipping | Commercial |
| Quote | minta penawaran ekspedisi | request freight quote indonesia | Transactional |
| Track | lacak kiriman ugc | track shipment ugc logistics | Navigational |
| Insights Hub | berita logistik indonesia | indonesia logistics news | Informational |

### Metadata System

Title formula: `[Primary Keyword] — [Differentiator] | UGC Logistics`. Max 60 chars. ID and EN independently keyword-optimized.

Description: one sentence explaining the page + one value proposition/trust signal. Max 155 chars.

OG and Twitter meta: match page meta. OG image generated via `@vercel/og` with branded template.

SEO metadata for dynamic pages (articles, client stories) is managed in Supabase via admin portal — marketing can update without code deploy.

### Schema Markup (JSON-LD)

**Organization:** every page. Name, logo, URL, contactPoint (phone, email: services@ugc.co.id), sameAs (social profiles), address.

**LocalBusiness:** Home and Contact. Address (Jl. Prof Dr. Soepomo SH No. 45BZ, Blok C, Tebet, Jakarta Selatan 12810), geo coordinates, hours.

**Service:** each service detail page. Service name, description, provider (Organization ref), areaServed.

**BreadcrumbList:** all pages with breadcrumb navigation.

**FAQ:** service pages with FAQ sections.

**Article:** insights articles. Headline, author (UGC Logistics), datePublished, dateModified, image.

### Internal Linking Strategy

Hub pages (Services Overview, Insights Hub) link to all spokes. Spokes (services, articles) link back to hub and cross-link to 2-3 related spokes. Every service page contains minimum 2 in-body links to other pages. Every article contains minimum 1 service link and 1 article link.

### Landing Page Strategy (Phase 2)

Funded by confirmed IDR 10-15jt/month ads budget. Google Search Ads first.

| Landing Page | Target Query |
|-------------|-------------|
| `/en/import-from-china` | import from china freight forwarder indonesia |
| `/id/pengiriman-darat-jawa` | ekspedisi darat jawa bali sumatera |
| `/en/ecommerce-fulfillment-jakarta` | ecommerce fulfillment service jakarta |
| `/id/cargo-proyek-alat-berat` | pengiriman alat berat indonesia |

### Technical SEO

Canonical tags: self-referencing on every page. Hreflang: ID/EN pairs with x-default to ID. XML sitemap at `https://utamaglobalindocargo.com/sitemap.xml` (both locales). Robots.txt: allow all, block `/api/*` and `/admin/*`. No 301 redirects from old site (confirmed decision T7 — total rebuild). Clean URLs, no query params for content. SSG for all content pages. Image alt text. Core Web Vitals targets met.

---

## Part 2: Analytics & Tracking Architecture

### Tag Management

Google Tag Manager (GTM). Single container, both locales. Tags organized by: GA4 (page views, events), Conversion (form submit, WhatsApp clicks), Remarketing (Meta Pixel, Google Ads — Phase 2 when ads launch).

### Event Taxonomy

Full event specification in `data/tracking-taxonomy.json`. Summary of key events:

| Event | Trigger | Priority |
|-------|---------|----------|
| `page_view` | Every page load | P0 |
| `scroll_depth` | 25%, 50%, 75%, 90% | P0 |
| `cta_click_quote_header` | Header quote button | P0 |
| `cta_click_quote_inline` | In-page quote CTA | P0 |
| `cta_click_whatsapp` | WhatsApp button | P0 |
| `form_start_quote` | Quote form step 1 | P0 |
| `form_step_quote` | Each form step completed | P0 |
| `form_submit_quote` | Final submission | P0 |
| `form_abandon_quote` | Leave form incomplete | P1 |
| `cta_click_track` | Track shipment submit | P1 |
| `service_card_click` | Service card clicked | P1 |
| `recirculation_click` | Cross-link clicked | P1 |
| `language_switch` | Language toggle | P2 |
| `download_click` | Company profile downloaded | P2 |

### UTM Taxonomy

```
utm_source:   google | meta | linkedin | tiktok | email | whatsapp | referral | organic
utm_medium:   cpc | social | email | referral | display | organic
utm_campaign: yyyy-mm_{service}_{objective}
utm_content:  creative variant
utm_term:     paid search keyword only
```

UTM values stored in Supabase alongside form submissions. Managed and viewable via admin portal.

### Quote Form Funnel

| Step | Event | Target |
|------|-------|--------|
| Arrives at form | `form_start_quote` | 100% |
| Step 1 (Service) | `form_step_quote` step=1 | > 80% |
| Step 2 (Route) | `form_step_quote` step=2 | > 65% |
| Step 3 (Cargo) | `form_step_quote` step=3 | > 50% |
| Step 4 (Submit) | `form_submit_quote` | > 35% |

### KPI Framework (Weekly to Director)

| KPI | Source | Target |
|-----|--------|--------|
| Total sessions | GA4 | Growth trend |
| Unique visitors | GA4 | Growth trend |
| Quote submissions | Supabase + GA4 | > 20/month by month 3 |
| Form completion rate | GA4 funnel | > 35% |
| Pages per session | GA4 | > 2.5 |
| Bounce rate (home) | GA4 | < 40% |
| WhatsApp clicks | GTM | Growth trend |
| Language split | GA4 | Monitor |
| Device split | GA4 | Track mobile % |

### Dashboard

Looker Studio connected to GA4. Page 1: Overview (sessions, visitors, bounce, pages/session, device, language). Page 2: Conversion (funnel, submissions by service, by source). Page 3: Content (top pages, entry pages, article engagement). Page 4: Acquisition (source/medium, UTM campaigns, organic keywords via Search Console).

### Supabase Tracking Role

Supabase stores form submissions with full attribution. Tables: `quote_submissions` (all form fields + UTM + session data), `contact_submissions`, `tracking_queries` (logs shipment lookups). Admin portal provides submission views without needing GA4 access.
