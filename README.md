# UGC Logistics (Utama Globalindo Cargo) - Corporate Website

Corporate website for PT Utama Globalindo Cargo, a freight forwarding and logistics company based in Jakarta, Indonesia. Built for digital visibility and executive-level lead generation.

**Tagline**: "We Care What We Deliver"

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion (subtle, purposeful)
- **Forms**: react-hook-form + Zod validation
- **Backend**: Supabase (PostgreSQL + JSONB lead storage)
- **i18n**: Indonesian (default) + English via `[locale]` routing
- **Analytics**: GA4 via environment variable
- **Deployment**: Vercel

## Brand Identity

- **Primary Color**: `#ff4600` (Logistics Orange)
- **Secondary Color**: `#111111` (Carbon Dark)
- **Typography**: Inter / Geist Sans, bold industrial feel
- **Hero Headline**: "One line of control across every handoff."

## Getting Started

```bash
npm install
cp .env.example .env.local
# Fill in your Supabase project URL and keys
npm run dev
```

## Environment Variables

| Variable | Required | Context | Description |
|---|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Client + Server | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Client only | Supabase anonymous/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Server only | Service role key (API routes only) |
| `NEXT_PUBLIC_SITE_URL` | No | Build | Canonical site URL |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | No | Client | GA4 measurement ID |
| `NEXT_PUBLIC_CONTACT_PHONE` | No | Client | Contact phone number |
| `NEXT_PUBLIC_CONTACT_EMAIL` | No | Client | Contact email |

## Project Structure

```
src/
├── app/
│   ├── [locale]/           # i18n locale routing (id, en)
│   │   ├── page.tsx        # Homepage
│   │   ├── services/       # Services landing + 6 detail pages
│   │   ├── industries/     # Industries landing + 6 detail pages
│   │   ├── case-studies/   # Case studies with filters
│   │   ├── about/          # Company page
│   │   ├── faq/            # FAQ with accordion
│   │   └── contact/        # Multi-step lead capture form
│   ├── api/leads/          # POST endpoint (Zod validated, Supabase insert)
│   ├── robots.ts           # robots.txt generation
│   └── sitemap.ts          # sitemap.xml with hreflang
├── components/
│   ├── layout/             # Header, Footer
│   ├── home/               # Hero, TrustStrip, ServicesOverview, HowItWorks, etc.
│   ├── contact/            # ContactForm (3-step, i18n)
│   ├── faq/                # FaqAccordion
│   ├── case-studies/       # CaseStudyFilter
│   ├── seo/                # JsonLd
│   ├── analytics/          # GoogleAnalytics
│   └── ui/                 # Container, SectionHeading
├── data/                   # Services, industries, case studies data
├── i18n/                   # Config, dictionaries (id, en), types
├── hooks/                  # useUTMCapture
└── lib/                    # supabaseServer, analytics helpers

supabase/
└── migrations/             # SQL migrations with RLS policies
```

## Architecture Constraints

- **No customer login portal** - site is exclusively for digital visibility and lead generation
- **No client authentication** - all compute freed for front-end rendering
- **No fabricated proof** - stats, logos, and case studies must be evidence-based (placeholders marked)

## Bilingual Support

The site supports Indonesian (default) and English via URL-based routing:
- `/id/...` for Indonesian
- `/en/...` for English

The middleware auto-detects browser language and redirects accordingly.
The tagline "We Care What We Deliver" stays in English in both versions.

## Services (6 Categories)

1. Domestic Distribution (FTL, LTL, FCL, LCL, Airfreight)
2. International Freight Forwarding (FCL/LCL/Airfreight Export & Import)
3. Import Door-to-Door & Customs Brokerage
4. Warehousing & Fulfillment (General, Bonded, Pick & Pack, Cross-Docking)
5. Project Cargo & Special Handling (Heavy Lift, DG, Temperature Controlled, Breakbulk)
6. Blocspace & Charter (Blocspace Allocation, Air Charter, Sea Charter)

## Supabase Setup

1. Create a Supabase project
2. Run migrations from `supabase/migrations/` in order
3. Verify RLS policies are active on `leads_prospect` table
4. Set environment variables in `.env.local` and Vercel dashboard

## Deployment

Configured for Vercel. Push to main branch triggers production build.

```bash
npm run lint && npx tsc --noEmit && npm run build
```
