# 15 — Technical Architecture

## Stack Summary

| Layer | Technology | Role |
|-------|-----------|------|
| Framework | Next.js 15 (App Router) | Routing, SSR/SSG, i18n, API routes |
| Language | TypeScript | Type safety |
| Styling | Tailwind CSS + CSS custom properties | Utility-first with design tokens |
| Animation | Framer Motion (confirmed T1) | Scroll choreography, page transitions, layout animations |
| Backend/DB | Supabase (cloud) | Form submissions, content management, tracking, auth for admin |
| Email | Nodemailer + Supabase triggers (confirmed T6) | Custom SMTP via Vercel env |
| Deployment | Vercel | Hosting, CDN, edge functions |
| Tag Management | Google Tag Manager | Analytics tags |
| Analytics | Google Analytics 4 | Traffic, behavior, conversion |
| Images | next/image + Vercel Image Optimization | WebP/AVIF, responsive, lazy loading |
| Fonts | next/font | Self-hosted Inter, Instrument Serif, JetBrains Mono |
| Icons | Lucide React | 24px grid, 1.5px stroke, MIT |

## Front-End Structure

```
app/
  [locale]/
    layout.tsx                  ← root layout: i18n provider, GTM, fonts
    page.tsx                    ← Home
    (marketing)/
      tentang/page.tsx          ← About (ID)
      about/page.tsx            ← About (EN)
      layanan/
        page.tsx                ← Services index (ID)
        distribusi-domestik/page.tsx
        freight-internasional/page.tsx
        import-dtd-kepabeanan/page.tsx
        blockspace-charter/page.tsx
        pergudangan-3pl/page.tsx
        kargo-proyek/page.tsx
      services/
        page.tsx                ← Services index (EN)
        domestic-distribution/page.tsx
        international-freight/page.tsx
        import-dtd-customs/page.tsx
        blockspace-charter/page.tsx
        warehousing-3pl/page.tsx
        project-cargo/page.tsx
      wawasan/
        page.tsx                ← Insights hub (ID)
        [slug]/page.tsx         ← Article detail (ID)
      insights/
        page.tsx                ← Insights hub (EN)
        [slug]/page.tsx         ← Article detail (EN)
    (conversion)/
      minta-penawaran/page.tsx  ← Quote (ID)
      request-quote/page.tsx    ← Quote (EN)
      kontak/page.tsx           ← Contact (ID)
      contact/page.tsx          ← Contact (EN)
    (utility)/
      lacak-kiriman/page.tsx    ← Track (ID)
      track-shipment/page.tsx   ← Track (EN)
      kebijakan-privasi/page.tsx
      privacy-policy/page.tsx
      syarat-ketentuan/page.tsx
      terms-of-service/page.tsx
  admin/
    layout.tsx                  ← Admin layout with Supabase Auth guard
    page.tsx                    ← Admin dashboard
    articles/page.tsx           ← Article CRUD
    articles/[id]/page.tsx      ← Article editor
    client-stories/page.tsx     ← Client Story CRUD
    client-stories/[id]/page.tsx
    seo/page.tsx                ← SEO metadata editor
    settings/page.tsx           ← Site settings (contact info, WhatsApp, company info)
    files/page.tsx              ← File upload (company profile PDF)
    submissions/page.tsx        ← View quote + contact form submissions
  api/
    quote/route.ts              ← Quote form handler → Supabase insert
    contact/route.ts            ← Contact form handler → Supabase insert
    track/route.ts              ← Tracking proxy (replicates current site tracking)
    og/route.ts                 ← Dynamic OG image via @vercel/og

components/
  layout/
    Header.tsx, Footer.tsx, MobileNav.tsx, MobileBottomBar.tsx
    MegaMenu.tsx, Breadcrumb.tsx
  ui/
    Button.tsx, Card.tsx, GlassPanel.tsx, Input.tsx
    Accordion.tsx, ProgressIndicator.tsx
  sections/
    Hero.tsx, ServiceGrid.tsx, StatsBar.tsx, CTABand.tsx
    RecirculationModule.tsx, FAQSection.tsx, ProcessFlow.tsx
    ClientStoryCard.tsx, ClientStoryFeatured.tsx
  motion/
    ScrollReveal.tsx, StaggeredReveal.tsx
    CounterAnimation.tsx, PageTransition.tsx
  admin/
    ArticleEditor.tsx, StoryEditor.tsx, SEOEditor.tsx
    SubmissionTable.tsx, FileUploader.tsx

lib/
  i18n/
    config.ts
    dictionaries/id.json, en.json
  content/
    services.ts                 ← static service data (both locales)
  supabase/
    client.ts                   ← Supabase client init
    admin.ts                    ← Supabase admin client (service role)
    types.ts                    ← typed table schemas
  analytics/
    events.ts, gtm.ts
  utils/
    routes.ts, seo.ts, cn.ts
```

### Route Group Strategy

`(marketing)`: full layout (header + footer + recirculation). `(conversion)`: focused layout (minimal header, no footer). `(utility)`: full layout. `admin/`: protected layout with Supabase Auth guard.

## Supabase Schema

### Core Tables

```sql
-- Quote form submissions
create table quote_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  locale text not null,
  service_type text,
  origin text, destination text, direction text,
  cargo_weight numeric, cargo_dimensions text,
  cargo_description text, special_requirements text[],
  contact_name text not null, contact_company text,
  contact_email text not null, contact_phone text not null,
  contact_method text default 'whatsapp',
  utm_source text, utm_medium text, utm_campaign text,
  utm_content text, utm_term text,
  referrer_url text, landing_page text,
  device_type text, session_pages_viewed integer,
  status text default 'new'
);

-- Contact form submissions
create table contact_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  name text not null, company text,
  email text not null, phone text,
  message text not null, locale text,
  status text default 'new'
);

-- Insight articles (Supabase-as-CMS)
create table articles (
  id uuid primary key default gen_random_uuid(),
  slug_id text unique not null, slug_en text unique not null,
  title_id text not null, title_en text not null,
  excerpt_id text, excerpt_en text,
  body_id text not null, body_en text not null,
  category text not null,
  tags text[] default '{}',
  seo_title_id text, seo_title_en text,
  seo_description_id text, seo_description_en text,
  og_image_url text,
  featured boolean default false,
  status text default 'draft',
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Anonymized client stories
create table client_stories (
  id uuid primary key default gen_random_uuid(),
  industry_id text not null, industry_en text not null,
  challenge_id text not null, challenge_en text not null,
  solution_id text not null, solution_en text not null,
  result_id text not null, result_en text not null,
  display_quote_id text, display_quote_en text,
  service_tags text[] default '{}',
  featured boolean default false,
  status text default 'draft',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- SEO metadata overrides (for pages managed via admin)
create table seo_metadata (
  id uuid primary key default gen_random_uuid(),
  page_key text unique not null,
  title_id text, title_en text,
  description_id text, description_en text,
  og_image_url text,
  updated_at timestamptz default now()
);

-- Site settings (key-value store)
create table site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz default now()
);

-- File uploads (company profile PDF, etc.)
create table files (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  file_url text not null,
  file_type text,
  public boolean default true,
  created_at timestamptz default now()
);

-- Tracking queries log
create table tracking_queries (
  id uuid primary key default gen_random_uuid(),
  tracking_number_hash text not null,
  result_found boolean,
  locale text, device_type text,
  created_at timestamptz default now()
);
```

### RLS Policies

Public (anon): INSERT only on `quote_submissions`, `contact_submissions`, `tracking_queries`. SELECT on `articles`, `client_stories`, `seo_metadata`, `site_settings`, `files` where `status = 'published'` or `public = true`.

Admin (authenticated): full CRUD on all tables.

### Supabase Triggers for Email

Database trigger on `quote_submissions` INSERT fires a Supabase Edge Function (or Vercel API route webhook) that sends notification email to `services@ugc.co.id` via Nodemailer with SMTP credentials from Vercel environment variables.

```
SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS → Vercel env
Notification to: services@ugc.co.id
Template: plain text with submission details (service type, route, cargo, contact info)
```

## Admin Portal

The admin portal is a lightweight set of protected Next.js pages under `/admin/*`. It is NOT a separate application.

Authentication: Supabase Auth with email/password. Only authorized admin users (Ari + designated marketing team member). Auth guard in admin layout checks session before rendering.

Pages: Dashboard (recent submissions count, article count), Article CRUD (list, create, edit with bilingual fields), Client Story CRUD (same structure), SEO Metadata editor (per-page overrides), Site Settings (company info, WhatsApp number, contact details), File Manager (upload company profile PDF to Supabase Storage), Submission Viewer (quote + contact form submissions with filters).

Admin is Phase 1 scope. It does not need to be beautiful — it needs to be functional and reliable.

## Tracking Integration

The current production site (`utamaglobalindocargo.com/track`) has a working tracking page. This must be replicated in the rebuild as Phase 1 functionality.

Investigation needed: what backend powers the current tracking? Options:

**Option A: API proxy.** If the current tracking uses a backend API, replicate the API call in a Next.js API route (`/api/track`) that proxies the request. The new frontend sends tracking queries to `/api/track`, which calls the original backend.

**Option B: Direct integration.** If the current tracking queries an external service (carrier APIs, third-party tracking platform), integrate that service directly.

**Option C: Embedded.** If the tracking is an iframe or embedded widget, wrap it in the new design temporarily.

Priority: investigate current tracking implementation immediately. This is a Phase 1 Week 3-4 task.

## Vercel Configuration

Deployment: Git-push from `main` branch. Preview deployments for feature branches. Custom domain: `utamaglobalindocargo.com` with SSL. Edge middleware for locale detection. `next/image` optimization. API routes for form handlers, tracking proxy, OG generation.

Environment variables:
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
NEXT_PUBLIC_GTM_ID
NEXT_PUBLIC_WA_NUMBER=6281284596614
```

## Static vs Dynamic

| Page | Rendering | Reason |
|------|-----------|--------|
| Home | SSG | Content rarely changes |
| About | SSG | Static content |
| Services (all) | SSG | Static content |
| Insights Hub | SSG with ISR (1hr) | Articles added via Supabase |
| Insight Article | SSG with ISR | Individual articles static once published |
| Quote Form | Client-side | Dynamic form state |
| Track Shipment | Client-side + API | Runtime queries |
| Contact | Client-side | Form submission |
| Admin pages | Client-side | Auth-protected, dynamic CRUD |
| Privacy/Terms | SSG | Rarely changes |

## Performance Constraints

Total initial JS bundle: < 150KB gzipped. Framer Motion: lazy-loaded, code-split, tree-shaken (max 15KB per page). Fonts: subsetted Latin + Latin Extended via `next/font` with `display: swap`. Images: `loading="lazy"` below fold, `priority` for hero. Third-party (GTM): `afterInteractive` strategy.

## Maintainability

TypeScript strict. Design tokens as CSS custom properties + Tailwind config. Motion components accept `disabled` prop. Translation files co-located. Supabase types auto-generated from schema.
