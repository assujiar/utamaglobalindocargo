# CLAUDE.md

Persistent operational memory for the UGC Logistics corporate website.
This file reflects the actual current state of the repository.

## Tech Stack

- **Framework**: Next.js 16.2.1, App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 via `@theme inline` in globals.css
- **Animation**: Framer Motion (viewport-triggered, subtle)
- **Forms**: react-hook-form + Zod (client and server validation)
- **Backend**: Supabase (PostgreSQL, server-only client, RLS)
- **i18n**: Locale routing (`/id`, `/en`) via middleware + dictionary files
- **Analytics**: GA4 via env var, cookie consent, UTM capture hook
- **Deployment**: Vercel

## Brand Identity

- **Brand name**: UGC Logistics (Utama Globalindo Cargo)
- **Tagline**: "We Care What We Deliver" (brand signature, footer/about only)
- **Hero headline**: "One line of control across every handoff." / "Satu kendali untuk setiap handoff."
- **Primary color**: `#ff4600` (Logistics Orange)
- **Secondary color**: `#111111` (Carbon Dark)
- **Typography**: Inter, Geist Sans. Bold, industrial, legible.

## Architecture Constraints

**Forbidden:**
- Customer login portals, client dashboards, authentication flows
- WebGL, 3D scenes, particle effects, route globe experiments
- Horizontal scroll hijacking, heavy video backgrounds
- Fake statistics, fabricated client logos, invented proof
- Em dashes in any generated content

**This site is exclusively for:**
- Corporate digital visibility
- Executive-level B2B lead generation
- High-performance front-end rendering

## Directory Structure

```
src/
├── app/
│   ├── [locale]/        # i18n locale routing (id, en)
│   │   ├── page.tsx     # Homepage
│   │   ├── services/    # Landing + /[slug] detail pages
│   │   ├── industries/  # Landing + /[slug] detail pages
│   │   ├── case-studies/# Landing + /[slug] detail pages
│   │   ├── about/
│   │   ├── faq/
│   │   └── contact/
│   ├── api/leads/       # Server-side lead capture endpoint
│   ├── robots.ts
│   ├── sitemap.ts
│   ├── globals.css      # Tailwind theme, brand tokens, animations
│   └── layout.tsx       # Root layout
├── components/
│   ├── layout/          # Header, Footer
│   ├── home/            # Hero, TrustStrip, ServicesOverview, HowItWorks, etc.
│   ├── contact/         # ContactForm (multi-step, i18n)
│   ├── services/        # SubServiceAccordion, TrustElement
│   ├── faq/             # FaqAccordion
│   ├── case-studies/    # CaseStudyFilter
│   ├── analytics/       # GoogleAnalytics, CookieConsent
│   ├── seo/             # JsonLd
│   └── ui/              # Container, SectionHeading, AnimateOnScroll
├── data/                # services.ts, industries.ts, caseStudies.ts
├── i18n/                # config, getDictionary, dictionaries (id, en)
├── hooks/               # useUTMCapture
└── lib/                 # supabaseServer, analytics helpers
supabase/
└── migrations/          # SQL with RLS policies
e2e/
└── smoke.test.ts        # E2E smoke tests
```

## Service Taxonomy (Immutable)

Six service categories. Do not remove, merge, or invent services:
1. Domestic Distribution (FTL, LTL, FCL, LCL, Airfreight)
2. International Freight Forwarding (FCL/LCL/Airfreight Export & Import)
3. Import Door-to-Door & Customs Brokerage
4. Warehousing & Fulfillment (General, Bonded, Pick & Pack, Cross-Docking)
5. Project Cargo & Special Handling (Heavy Lift, DG, Temperature, Breakbulk)
6. Blocspace & Charter (Blocspace Allocation, Air Charter, Sea Charter)

## Writing Rules

- Never use em dashes
- Write like a sharp logistics operator, not a brochure
- No robotic or AI-sounding phrases
- No overclaiming, no fabricated stats
- Approximate language for unverified numbers ("sekitar", "roughly")
- Tagline and hero headline serve different roles. Do not collapse them.
- Indonesian copy: smart-casual Jakarta business tone, not rigid formal

## Placeholder Policy

All placeholder content must be clearly marked with `isPlaceholder: true`
or visible `[PLACEHOLDER]` labels. Never present placeholder data as
verified client outcomes.
