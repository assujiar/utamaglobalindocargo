# Utama Globalindo Cargo — Corporate Website

Corporate website for PT Utama Globalindo Cargo, a freight forwarding and logistics company based in Jakarta, Indonesia. Built for digital visibility and executive-level lead generation.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4
- **Animation**: GSAP, Framer Motion, Lenis (smooth scroll)
- **3D**: React Three Fiber + Three.js (WebGL particle globe)
- **Forms**: react-hook-form + Zod validation
- **Backend**: Supabase (PostgreSQL + JSONB lead storage)
- **Deployment**: Vercel

## Brand Identity

- **Primary Color**: `#ff4600` (Logistics Orange)
- **Secondary Color**: `#111111` (Carbon Dark)
- **Typography**: Inter / system sans-serif — bold, industrial feel

## Getting Started

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
# Fill in your Supabase project URL and keys

# Run development server
npm run dev

# Type check
npx tsc --noEmit

# Lint
npm run lint

# Production build
npm run build
```

## Environment Variables

| Variable | Required | Context | Description |
|---|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Client + Server | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Client only | Supabase anonymous/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Server only | Supabase service role key (for API routes) |

## Project Structure

```
src/
├── app/                    # App Router pages & layouts
│   ├── api/leads/          # Lead capture API endpoint
│   ├── about/              # Company page
│   ├── contact/            # Lead capture form
│   ├── case-studies/       # Anonymized case studies
│   ├── faq/                # Frequently asked questions
│   └── services/           # 6 service detail pages
├── components/
│   ├── canvas/             # WebGL/3D components
│   ├── layout/             # Header, Footer, Hero, etc.
│   ├── sections/           # Homepage sections
│   ├── contact/            # Contact form
│   └── services/           # Service page template
├── hooks/                  # Custom React hooks
├── lib/                    # Utilities (Supabase clients, analytics)
└── types/                  # TypeScript type definitions

supabase/
└── migrations/             # SQL migration files

docs/
├── rebuild_audit/          # SSOT audit documents
└── review-web-28-Maret-2026.md  # External review
```

## Architecture Constraints

- **No customer login portal** — site is exclusively for digital visibility and lead generation
- **No client authentication** — all compute freed for front-end rendering performance
- **No fabricated proof** — stats, logos, and case studies must be evidence-based

## Known Issues / TODO

- Brand assets (logo SVG, OG image) need final designs from business team
- Analytics GTM/GA4 container ID needs to be configured
- Case studies flagged as illustrative — need business approval
- Contact details (phone, address) need verification from operations
- Privacy/consent text needs legal review

## Supabase Setup

1. Create a Supabase project
2. Run migrations from `supabase/migrations/` in order
3. Verify RLS policies are active on `leads_prospect` table
4. Set environment variables in `.env.local` and Vercel dashboard

## Deployment

Configured for Vercel deployment. Push to main branch triggers production build.

```bash
# Verify before deploy
npm run lint && npx tsc --noEmit && npm run build
```
