# 17 — Build Checklist

Check items off as completed. Top items before bottom within each section. (BLOCKER) = must complete before downstream work.

---

## A. Infrastructure Setup

- [ ] (BLOCKER) Next.js 15 initialized (TypeScript, Tailwind, App Router)
- [ ] (BLOCKER) GitHub repo → Vercel connected, preview deploys working
- [ ] (BLOCKER) Supabase project created (cloud)
- [ ] (BLOCKER) Supabase tables created (quote_submissions, contact_submissions, articles, client_stories, seo_metadata, site_settings, files, tracking_queries)
- [ ] Supabase RLS policies configured (anon: insert forms, select published content; admin: full CRUD)
- [ ] Supabase Auth admin user(s) created
- [ ] GA4 property created
- [ ] GTM container created, base page_view tag
- [ ] Custom domain `utamaglobalindocargo.com` on Vercel with SSL
- [ ] Google Search Console verified
- [ ] SMTP credentials configured in Vercel env (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS)
- [ ] UGC logo assets uploaded from GDrive to `public/brand_assets/`

## B. Design System

- [ ] (BLOCKER) CSS custom properties defined (colors, spacing, typography)
- [ ] (BLOCKER) Tailwind config extended with design tokens
- [ ] Font loading (Inter, Instrument Serif, JetBrains Mono)
- [ ] Button component (primary, secondary, tertiary)
- [ ] Card component (flat, glass variants)
- [ ] GlassPanel with `@supports` fallback
- [ ] Input component with focus/error states
- [ ] Accordion component
- [ ] ProgressIndicator (quote form steps)
- [ ] Lucide icons integrated

## C. Layout Components

- [ ] (BLOCKER) Root layout with locale provider, GTM, fonts
- [ ] Header (desktop: sticky glassmorphism, mega-menu)
- [ ] Header (mobile: hamburger, full-screen overlay)
- [ ] MegaMenu (6 services with descriptions)
- [ ] Footer (4-column, bilingual)
- [ ] MobileBottomBar (WhatsApp +62 812-8459-6614 + Quote CTA)
- [ ] Breadcrumb
- [ ] Language toggle (route map lookup, generates correct alternate URL)

## D. Motion Components

- [ ] ScrollReveal (opacity + translateY, IntersectionObserver)
- [ ] StaggeredReveal (80ms delay, max 6)
- [ ] CounterAnimation (ease-out 1200ms, trigger once)
- [ ] PageTransition (Framer Motion crossfade)
- [ ] `prefers-reduced-motion` global override
- [ ] Mobile motion reduction (70% duration, no parallax)

## E. Bilingual Routing

- [ ] (BLOCKER) Route map config created (all pages, both locales)
- [ ] Middleware: locale detection, redirect `/` → `/{locale}`, set cookie
- [ ] Shared translation dictionaries (ID + EN)
- [ ] `useLocalizedRoute` hook
- [ ] Language toggle working on all pages
- [ ] Hreflang link generation in layout head

## F. Pages

### Home
- [ ] Hero section (serif headline, value prop, CTA, ambient motion)
- [ ] Service editorial grid (6 cards, asymmetric)
- [ ] Proof section (counter stats + WCA/IATA + Client Story highlight)
- [ ] Featured editorial section
- [ ] CTA band
- [ ] Content (ID + EN)
- [ ] Metadata + Organization + LocalBusiness schema

### About
- [ ] Hero (philosophy statement)
- [ ] Origin story section
- [ ] Operating philosophy (3-4 principles)
- [ ] Network/credentials (WCA, IATA)
- [ ] Client Stories section (2-3 featured stories)
- [ ] Content (ID + EN)
- [ ] Metadata

### Services Index
- [ ] All 6 services listed
- [ ] Content (ID + EN)
- [ ] Metadata

### Service Detail (x6)
- [ ] Template component built
- [ ] ProcessFlow component
- [ ] FAQSection with schema
- [ ] RecirculationModule (2 services + CTA + insight link)
- [ ] ClientStoryCard (contextual, tag-matched)
- [ ] Domestic Distribution content (ID + EN)
- [ ] International Freight content (ID + EN)
- [ ] Import DTD & Customs content (ID + EN)
- [ ] Blockspace & Charter content (ID + EN)
- [ ] Warehousing & 3PL content (ID + EN)
- [ ] Project Cargo content (ID + EN)
- [ ] All 6 metadata + Service schema + FAQ schema + BreadcrumbList
- [ ] Internal cross-links (min 2 per page)

### Quote Form
- [ ] 4-step wizard UI
- [ ] Step 1: Service type (5 cards)
- [ ] Step 2: Route (conditional on service)
- [ ] Step 3: Cargo details
- [ ] Step 4: Contact info
- [ ] Trust micro-copy at each step
- [ ] Progress indicator
- [ ] Client-side validation
- [ ] Supabase submission handler (with UTM capture)
- [ ] Email notification (Supabase trigger + Nodemailer → services@ugc.co.id)
- [ ] Success confirmation with reference ID
- [ ] Pre-select service from `?service=` query param

### Contact
- [ ] Channel cards (Email, WhatsApp +62 812-8459-6614, Phone)
- [ ] Contact form → Supabase
- [ ] Address + map
- [ ] Metadata

### Track Shipment
- [ ] Investigate current tracking backend at utamaglobalindocargo.com/track
- [ ] Build tracking proxy API route
- [ ] Tracking input UI
- [ ] Result display (status, route, last update)
- [ ] Not-found state with WhatsApp/email fallback
- [ ] Metadata

### Legal Pages
- [ ] Privacy Policy content (ID + EN, referencing UU PDP No. 27/2022, UU ITE)
- [ ] Terms of Service content (ID + EN, referencing Indonesian commercial law)

## G. Client Stories

- [ ] ClientStoryCard component
- [ ] ClientStoryFeatured component (home page)
- [ ] Create 3-5 anonymized stories (ID + EN) — realistic, grounded, not overclaimed
- [ ] Seed stories into Supabase via admin portal
- [ ] Stories display on Home (featured), About (section), Service pages (contextual)

## H. Admin Portal

- [ ] Admin layout with Supabase Auth guard
- [ ] Admin dashboard (counts)
- [ ] Article CRUD (list, create, edit, bilingual fields, publish/draft toggle)
- [ ] Client Story CRUD
- [ ] SEO Metadata editor
- [ ] Site Settings editor
- [ ] File upload manager (company profile PDF)
- [ ] Submission viewer (quote + contact, filterable)
- [ ] Company profile PDF uploaded and download CTA working

## I. SEO

- [ ] All pages: locale-specific title tags
- [ ] All pages: locale-specific meta descriptions
- [ ] All pages: OG title, description, image (@vercel/og)
- [ ] All pages: hreflang alternate links
- [ ] Breadcrumb schema on inner pages
- [ ] FAQ schema on service pages
- [ ] Organization schema on home
- [ ] Service schema on service pages
- [ ] XML sitemap (both locales)
- [ ] Robots.txt (allow all, block /api/*, /admin/*)
- [ ] Canonical tags (self-referencing)
- [ ] Image alt text

## J. Analytics

- [ ] GTM container live
- [ ] GA4 page_view on all pages
- [ ] scroll_depth (25/50/75/90)
- [ ] cta_click_quote_header
- [ ] cta_click_quote_inline
- [ ] cta_click_whatsapp
- [ ] form_start_quote
- [ ] form_step_quote (per step)
- [ ] form_submit_quote
- [ ] form_abandon_quote
- [ ] nav_click
- [ ] service_card_click
- [ ] recirculation_click
- [ ] All events verified in GTM debug
- [ ] GA4 conversions configured

## K. Quality Assurance

- [ ] Lighthouse performance > 90 desktop, > 80 mobile
- [ ] Lighthouse accessibility > 95
- [ ] Lighthouse SEO > 95
- [ ] CLS < 0.1, LCP < 2.5s
- [ ] Chrome desktop tested
- [ ] Safari desktop tested
- [ ] Firefox tested
- [ ] Chrome Android real device (Samsung A14 class)
- [ ] Safari iOS real device
- [ ] Glassmorphism fallback on older Android
- [ ] All forms submit end-to-end
- [ ] Tracking end-to-end
- [ ] All links correct in both locales
- [ ] Language toggle correct on every page
- [ ] Keyboard navigation
- [ ] Color contrast WCAG AA
- [ ] Indonesian proofread
- [ ] English proofread

## L. Launch

- [ ] DNS pointed to Vercel
- [ ] SSL active
- [ ] Sitemap submitted to Search Console
- [ ] GA4 live, GTM not in debug
- [ ] Admin portal credentials shared with authorized team
- [ ] Company profile PDF uploaded and downloadable
- [ ] Client Stories seeded and published
- [ ] Stakeholder sign-off
- [ ] Launch announcement prepared
