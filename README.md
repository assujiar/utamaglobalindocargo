# UGC Logistics (Utama Globalindo Cargo)

Corporate website for PT Utama Globalindo Cargo, a Jakarta-based freight forwarder and logistics company. Built for digital visibility and B2B lead generation.

**Tagline**: "We Care What We Deliver"

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion
- **Forms**: react-hook-form + Zod
- **Backend**: Supabase (PostgreSQL, server-only client, RLS)
- **i18n**: Indonesian (default) + English via `[locale]` routing
- **Analytics**: GA4 via environment variable
- **Deployment**: Vercel

## Getting Started

```bash
npm install
cp .env.example .env.local
# Fill in Supabase credentials
npm run dev
```

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Service role key (server only) |
| `NEXT_PUBLIC_SITE_URL` | No | Canonical site URL |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | No | GA4 measurement ID |
| `NEXT_PUBLIC_CONTACT_PHONE` | No | Phone / WhatsApp number |
| `NEXT_PUBLIC_CONTACT_EMAIL` | No | Contact email |

## Services

Six service categories, each with sub-services:

1. Domestic Distribution (FTL, LTL, FCL, LCL, Airfreight)
2. International Freight Forwarding (FCL/LCL/Airfreight Export & Import)
3. Import Door-to-Door & Customs Brokerage
4. Warehousing & Fulfillment
5. Project Cargo & Special Handling
6. Blocspace & Charter

## Bilingual Support

URL-based routing: `/id/...` for Indonesian, `/en/...` for English. Middleware auto-detects browser language. Tagline stays in English in both versions.

## Architecture

- No customer login portals or authentication
- All compute dedicated to front-end rendering and lead generation
- Server-side Supabase client for lead capture (service role key never exposed to browser)
- Placeholder content clearly marked, never presented as verified proof

## Scripts

```bash
npm run dev       # Development server
npm run build     # Production build
npm run lint      # ESLint
npm run test:e2e  # E2E smoke tests (requires running server on :3099)
```

## Supabase Setup

1. Create a Supabase project
2. Run migrations from `supabase/migrations/` in order
3. Verify RLS policies on `leads_prospect` table
4. Set credentials in `.env.local`
