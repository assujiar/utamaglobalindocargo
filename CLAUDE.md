# CLAUDE.md — UGC Logistics Website Rebuild

## Project Identity

You are building the company profile website for **UGC Logistics (PT Utama Globalindo Cargo)**, an Indonesian freight forwarding company operating since 1995. The website is a total rebuild from scratch — no code from the old site carries over. The goal is an editorial-premium, bilingual (Indonesian + English), conversion-focused web experience that looks nothing like a typical logistics website.

## Documentation System (SSOT)

All strategy, architecture, design, and implementation decisions are documented in `/docs/`. These documents are your single source of truth. **Read them before writing any code.** When in doubt, the docs win.

### Must-Read Before Any Work

Read these files in order before starting implementation:

1. `/docs/04_FINAL_DIRECTION_SSOT.md` — **master document**, wins all conflicts
1. `/docs/15_TECHNICAL_ARCHITECTURE.md` — stack, file structure, Supabase schema, admin portal
1. `/docs/09_DESIGN_SYSTEM_RULES.md` — grid, typography, color, glassmorphism, anti-patterns
1. `/docs/07_BILINGUAL_ROUTING_AND_SLUGS.md` — i18n routing with separate slug directories
1. `/docs/10_MOTION_SYSTEM_RULES.md` — animation specs and performance rules
1. `/docs/data/route-map.json` — complete bilingual route configuration
1. `/docs/data/tracking-taxonomy.json` — analytics event specifications

### Reference During Page Implementation

When building a specific page, read its blueprint:

- `/docs/page-blueprints/home.md`
- `/docs/page-blueprints/about.md`
- `/docs/page-blueprints/services-overview.md`
- `/docs/page-blueprints/service-template.md` (shared template for all 6 services)
- `/docs/page-blueprints/quote-entry.md`
- `/docs/page-blueprints/contact.md`
- `/docs/page-blueprints/track-shipment.md`
- `/docs/page-blueprints/blog-insights-template.md`
- `/docs/page-blueprints/landing-page-template.md`

### Cross-Reference for Specific Concerns

- Brand voice and messaging: `/docs/05_BRAND_NARRATIVE_AND_POSITIONING.md`
- Page hierarchy and navigation: `/docs/06_INFORMATION_ARCHITECTURE.md`
- Content models and CTA logic: `/docs/08_CONTENT_SYSTEM.md`
- Mobile vs desktop decisions: `/docs/12_MOBILE_DESKTOP_EXPERIENCE_SPLIT.md`
- Recirculation and discovery: `/docs/13_INFINITE_ACCESS_EXPERIENCE_SYSTEM.md`
- SEO, analytics, tracking: `/docs/14_SEO_SEM_ANALYTICS_TRACKING.md`
- Phase plan and dependencies: `/docs/16_IMPLEMENTATION_ROADMAP.md`
- Task checklist: `/docs/17_BUILD_CHECKLIST.md`
- All resolved decisions: `/docs/18_OPEN_QUESTIONS_AND_TODOS.md`

## Tech Stack

- **Framework:** Next.js 16 (App Router), TypeScript, React 19
- **Styling:** Tailwind CSS v4 + CSS custom properties for design tokens
- **Animation:** Framer Motion (tree-shaken, lazy-loaded, max 15KB gzipped per page)
- **Icons:** Lucide React (24px grid, 1.5px stroke)
- **Fonts:** Inter (primary), Instrument Serif (display headlines), JetBrains Mono (stats/data) — via `next/font`
- **Backend:** Supabase (cloud) — forms, content CMS, auth, file storage
- **Email:** Nodemailer + Supabase triggers, custom SMTP via Vercel env vars
- **Deployment:** Vercel
- **Analytics:** Google Tag Manager + Google Analytics 4
- **OG Images:** `@vercel/og` dynamic generation

## Critical Technical Decisions (Resolved)

These are final. Do not deviate.

- **Domain:** `utamaglobalindocargo.com`
- **Default locale:** `id` (Indonesian). Alternate: `en`.
- **Routing:** Separate slug directories per locale with shared page components. NOT middleware-based slug rewriting.
- **Page transitions:** Framer Motion layout animations. NOT View Transitions API.
- **Email notifications:** Supabase triggers + Nodemailer with SMTP env vars. NOT Resend/SendGrid.
- **CMS:** Supabase-as-CMS with admin portal CRUD. NOT Sanity/Contentlayer.
- **301 redirects:** None. Total rebuild, no URL preservation from old site.
- **WhatsApp CTA number:** +62 812-8459-6614
- **Form notification email:** services@ugc.co.id
- **Client logos:** NOT used. Replaced by anonymized Client Stories (see docs/08).
- **Tracking:** Must replicate existing tracking from utamaglobalindocargo.com/track. Phase 1 feature.
- **Company profile PDF:** Upload via admin portal, public download CTA.

## File Structure

Follow the structure defined in `/docs/15_TECHNICAL_ARCHITECTURE.md`. Summary:

```
app/
  [locale]/
    layout.tsx                  — root layout: i18n, GTM, fonts
    page.tsx                    — Home
    (marketing)/                — full layout (header + footer + recirculation)
      tentang/page.tsx          — About ID
      about/page.tsx            — About EN
      layanan/                  — Services ID
      services/                 — Services EN
      wawasan/                  — Insights ID (Phase 2)
      insights/                 — Insights EN (Phase 2)
    (conversion)/               — focused layout (minimal header, no footer)
      minta-penawaran/page.tsx  — Quote ID
      request-quote/page.tsx    — Quote EN
      kontak/page.tsx           — Contact ID
      contact/page.tsx          — Contact EN
    (utility)/                  — full layout
      lacak-kiriman/page.tsx    — Track ID
      track-shipment/page.tsx   — Track EN
      kebijakan-privasi/page.tsx
      privacy-policy/page.tsx
      syarat-ketentuan/page.tsx
      terms-of-service/page.tsx
  admin/                        — Supabase Auth protected
    layout.tsx
    page.tsx                    — Dashboard
    articles/                   — Article CRUD
    client-stories/             — Client Story CRUD
    seo/                        — SEO metadata editor
    settings/                   — Site settings
    files/                      — File upload manager
    submissions/                — Form submission viewer
  api/
    quote/route.ts
    contact/route.ts
    track/route.ts
    og/route.ts

components/
  layout/     — Header, Footer, MobileNav, MobileBottomBar, MegaMenu, Breadcrumb
  ui/         — Button, Card, GlassPanel, Input, Accordion, ProgressIndicator
  sections/   — Hero, ServiceGrid, StatsBar, CTABand, RecirculationModule, FAQSection, ProcessFlow, ClientStoryCard, ClientStoryFeatured
  motion/     — ScrollReveal, StaggeredReveal, CounterAnimation, PageTransition
  admin/      — ArticleEditor, StoryEditor, SEOEditor, SubmissionTable, FileUploader

lib/
  i18n/       — config, dictionaries (id.json, en.json)
  content/    — services.ts (static service data both locales)
  supabase/   — client.ts, admin.ts, types.ts
  analytics/  — events.ts, gtm.ts
  utils/      — routes.ts, seo.ts, cn.ts (clsx + twMerge)
```

## Design System Rules (Summary)

Full specs in `/docs/09_DESIGN_SYSTEM_RULES.md`. Key rules:

**Colors:**

```css
--color-primary: #FF4600;
--color-primary-dark: #CC3800;
--color-bg-light: #FAFAF8;
--color-bg-dark: #0A0A0C;
--color-text-primary: #1A1A1A;
--color-text-secondary: #6B6B6B;
--color-text-inverse: #FFFFFF;
--color-border: #E5E5E3;
```

**Typography:** Inter for all UI. Instrument Serif for editorial hero headlines ONLY. JetBrains Mono for stats/codes.

**Grid:** 12-col desktop (1440px max, 24px gutter). 4-col mobile (16px gutter). Asymmetric layouts preferred.

**Glassmorphism:** `backdrop-filter: blur(24px)` with `@supports` fallback. Max 2 glass layers. Never on form inputs or primary CTAs.

**Buttons:** Primary = solid #FF4600, 48px height, 8px radius. Secondary = outline. Tertiary = text + arrow.

**Anti-patterns (FORBIDDEN):** Carousels, parallax on text, auto-playing video, icon grids without labels, body text wider than 720px, heavy drop shadows, gradient text, multiple sticky CTAs on mobile.

## Motion Rules (Summary)

Full specs in `/docs/10_MOTION_SYSTEM_RULES.md`. Key rules:

- All animation uses easing curves, never linear
- Reveals: 400-600ms, `cubic-bezier(0.16, 1, 0.3, 1)`, opacity + translateY(24px)
- Hover: 150-200ms ease-out
- Page transitions: 500-700ms crossfade via Framer Motion
- Mobile: 70% desktop durations, opacity + translateY only, NO parallax
- IntersectionObserver for scroll triggers (threshold 0.15), disconnect after trigger
- Only animate `opacity` and `transform`. Never width/height/margin/padding.
- `prefers-reduced-motion` kills all non-essential animation
- Stagger max 6 items, 80ms delay each

## Supabase Schema

Full SQL in `/docs/15_TECHNICAL_ARCHITECTURE.md`. Tables:

- `quote_submissions` — form data + UTM attribution
- `contact_submissions` — contact form
- `articles` — bilingual CMS content
- `client_stories` — anonymized case stories
- `seo_metadata` — per-page SEO overrides
- `site_settings` — key-value config store
- `files` — uploaded files (company profile PDF)
- `tracking_queries` — tracking lookup logs

RLS: public anon = INSERT on forms, SELECT on published content. Admin = full CRUD.

## Content Language

All user-facing content must be bilingual. Indonesian and English are NOT translations of each other — they are independently written for natural fluency and keyword optimization. Shared UI text (nav labels, button text, form labels) uses dictionaries. Page content uses per-locale data.

## Performance Targets

- LCP < 2.5s, FID < 100ms, CLS < 0.1
- Initial JS bundle < 150KB gzipped
- Lighthouse Performance > 90 desktop, > 80 mobile
- Images: next/image, WebP/AVIF, lazy below fold, priority for hero
- Fonts: subsetted, `display: swap`
- Third-party (GTM): `afterInteractive`

## Coding Conventions

- TypeScript strict mode
- Component props as typed interfaces, no `any`
- Use `cn()` utility (clsx + twMerge) for className composition
- Design tokens as CSS custom properties, referenced in Tailwind config
- No inline styles except dynamic values (e.g., stagger delay from index)
- All motion components accept `disabled` prop for testing/accessibility
- Co-locate translations: ID and EN versions near each other, never in disconnected folders
- Use `next/font` for font loading, never CDN links
- Prefer Server Components. Use `'use client'` only when needed (interactivity, hooks, Framer Motion)