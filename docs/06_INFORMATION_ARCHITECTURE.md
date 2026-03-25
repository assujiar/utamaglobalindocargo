# 06 — Information Architecture

## Page Hierarchy

The site is organized into five levels of depth. Level 1 is the global entry. Level 2 is the primary section. Level 3 is the detail page. Level 4 is deep content (articles, case studies). Level 5 is utility pages.

```
L1  Home
├── L2  About
│   └── L3  Team (future)
│   └── L3  Certifications & Network
├── L2  Services
│   ├── L3  Domestic Distribution
│   ├── L3  International Freight Forwarding
│   ├── L3  Import DTD & Customs Clearance
│   ├── L3  Blockspace & Aircraft Charter
│   ├── L3  Warehousing & Fulfillment (3PL)
│   └── L3  Project Cargo & Heavy Duty
├── L2  Industries (future, Phase 2)
│   ├── L3  E-Commerce & Retail
│   ├── L3  Manufacturing & Industrial
│   ├── L3  Pharmaceutical & Healthcare
│   └── L3  Energy & Mining
├── L2  Insights (blog/content hub)
│   ├── L3  Article detail
│   └── L3  Category archive
├── L2  Quote
├── L2  Track Shipment
├── L5  Contact
├── L5  Privacy Policy
├── L5  Terms of Service
└── L5  Sitemap (SEO utility)
```

## Navigation Model

### Primary Navigation (Header)

Desktop header is persistent (sticky), slim (64px height), with glassmorphism background on scroll. Contains:

Left: UGC logo (links to home).
Center: primary links — Services (with mega-menu dropdown), About, Insights.
Right: language toggle (ID/EN), "Track" utility link, "Request Quote" primary CTA button.

The Services mega-menu opens on hover (desktop) or tap (mobile) and shows all six services with one-line descriptions and a "View all services" link. This gives immediate access to any service without requiring a visit to the services index page.

Mobile navigation uses a full-screen overlay triggered by a hamburger icon. The overlay is a dark backdrop with large, tappable menu items. Services expand inline with a chevron toggle. The quote CTA is visually prominent at the bottom of the overlay.

### Secondary Navigation (Footer)

The footer is a content-rich zone, not a link dump. It includes:

Column 1: UGC logo, tagline ("We Care What We Deliver"), brief company description, social links.
Column 2: Services — all six service links.
Column 3: Company — About, Contact, Insights, Careers (future).
Column 4: Resources — Track Shipment, Request Quote, FAQ (future), Download Company Profile.
Bottom bar: copyright, Privacy Policy, Terms of Service, language toggle.

### Contextual Navigation (In-Page)

Each service detail page includes: breadcrumb trail, "Other Services" cross-links, related insights articles, and a "Next logical step" CTA (e.g., "Ready to ship? Request a quote" or "Learn how our customs team handles pharmaceutical imports").

## Page Purpose Map

| Page | Primary Purpose | Visitor Intent |
|------|----------------|----------------|
| Home | Brand impression + routing | "Who is UGC and can they help me?" |
| About | Trust building + story | "Are they credible? How long have they been around?" |
| Services Index | Service discovery + routing | "What do they offer? Which service fits my need?" |
| Service Detail (x6) | Service education + conversion | "Can they handle my specific requirement?" |
| Quote | Conversion | "I want to get pricing / start a conversation." |
| Track Shipment | Utility + retention | "Where is my cargo?" |
| Insights Hub | Thought leadership + SEO | "I'm researching logistics topics." |
| Insight Article | Education + trust + SEO | "I want to understand this specific logistics challenge." |
| Contact | Communication | "I want to reach them directly." |
| Industries (future) | Vertical relevance | "Do they understand my industry?" |

## User Intention Flows

### Flow 1: "I need a logistics provider" (B2B procurement)

Home hero > Services index OR direct service page from mega-menu > Read service detail > See proof (stats, process, case study reference) > Click "Request Quote" > Complete quote form > Submission confirmation with next steps.

Expected journey: 3-4 pages, 4-8 minutes.

### Flow 2: "I'm comparing forwarders" (B2B evaluation)

Home hero > About page (trust and story) > Services index > 2-3 service detail pages > Return to About or Insights > Request Quote or download company profile.

Expected journey: 5-7 pages, 8-15 minutes.

### Flow 3: "I found this via search" (SEO entry)

Insight article OR service page (search landing) > Read content > See related services or insights > Navigate to relevant service > Request Quote.

Expected journey: 2-4 pages, 3-6 minutes.

### Flow 4: "I need to track a shipment" (Existing client)

Home or direct URL > Track shipment page > Enter tracking number > View status. Secondary path: explore insights or new services while waiting.

Expected journey: 1-2 pages, 1-2 minutes.

### Flow 5: "I need to ship something now" (Urgency)

Home > Request Quote immediately (within 10 seconds). OR Home > WhatsApp CTA.

Expected journey: 1 page, under 30 seconds to CTA.

## Cross-Linking Logic

Every page must connect to at least three other pages beyond the global navigation. Cross-links follow a principle of contextual relevance, not exhaustive listing.

Service pages link to: related services (e.g., International Freight links to Import DTD and Customs), relevant insights articles, and the quote page with pre-selected service type.

Insight articles link to: related service pages (embedded naturally in content), related articles (sidebar or bottom), and a quote CTA.

The homepage links to: all service pages, about page, featured insight, and quote.

## Dead-End Prevention Logic

No page should feel like a dead end. Every scroll-bottom includes at least one of the following: a contextual "next step" CTA, a recirculation module (related content cards), a persistent sticky CTA bar (on mobile), or a footer with rich navigation. Service pages specifically end with a three-element section: (1) inline quote CTA, (2) two related service cards, (3) one featured insight link. This ensures the visitor always has somewhere meaningful to go.
