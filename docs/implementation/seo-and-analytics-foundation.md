# SEO and Analytics Foundation

## Technical SEO Implemented

### Metadata
- Page-specific `<title>` tags on all pages
- Page-specific `<meta name="description">` on all pages
- Title template pattern: `%s | UGC Logistics`

### Internationalization
- `hreflang` alternate links on ALL pages (both locale variants)
- Canonical URLs on all pages
- Locale-specific OpenGraph locale (id_ID, en_US)

### Structured Data (JSON-LD)
- **Homepage**: Organization schema with service types, area served
- **About**: AboutPage schema with Organization entity
- **Services Landing**: Service schema
- **Service Detail**: Service schema with provider and area
- **Industry Detail**: WebPage schema
- **Case Study Detail**: Article schema
- **FAQ**: FAQPage schema with all Q&A pairs
- **Contact**: ContactPage schema

### Crawlability
- `robots.txt` allowing all crawlers, disallowing /api/
- Dynamic `sitemap.xml` with all pages, both locales, alternate links
- googleBot directives for max image preview and snippet length
- Clean URL structure with no query parameter dependencies

### Page Performance
- Static generation (SSG) for all public pages
- `text-wrap: balance` for headings (improved CLS)
- `text-wrap: pretty` for paragraphs
- Reduced motion media query respect

## Analytics Instrumentation

### Current
- GA4 script loader ready (needs NEXT_PUBLIC_GA_MEASUREMENT_ID)
- `trackEvent()` helper for custom events
- `trackFormSubmit()` fires on successful lead submission
- `trackCTAClick()` available for CTA instrumentation
- UTM parameter capture on first visit (stored in localStorage)
- Cookie consent with accept/decline (GA4 only loads after consent)

### Needs Business Input
- GA4 measurement ID or GTM container ID
- Conversion event definitions
- Goal values for lead form submissions

## Internal Linking Strategy
- Service pages link to related industries
- Industry pages link to relevant services
- Case study pages link to both related service and industry
- Footer contains full service and company navigation
- Homepage flows: Hero > Trust > Why UGC > Services > Process > Proof > Industries > CTA
- Breadcrumbs on all interior pages for crawl path clarity

## Content Optimization Notes
- FAQ targets long-tail search queries (e.g., "customs clearance time Indonesia")
- Service pages target service-specific queries
- Industry pages target sector-specific logistics queries
- All content written around realistic search intent
