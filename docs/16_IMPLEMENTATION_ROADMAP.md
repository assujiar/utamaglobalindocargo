# 16 — Implementation Roadmap

## Phase Overview

| Phase | Scope | Duration | Outcome |
|-------|-------|----------|---------|
| Phase 0 | Setup | 1 week | Repo, Supabase, Vercel, GTM, design tokens |
| Phase 1 | MVP Launch | 5-6 weeks | Full website + admin portal + tracking |
| Phase 2 | Content & Ads | 3-4 weeks | Insights hub, landing pages, ads, A/B tests |
| Phase 3 | Growth | Ongoing | BCP integration, industry pages, advanced features |

---

## Phase 0 — Setup (Week 1)

All business decisions are resolved. Setup is unblocked.

- [ ] Initialize Next.js 15 project (TypeScript, Tailwind, App Router)
- [ ] GitHub repo created, connected to Vercel
- [ ] Vercel project live with preview deploys
- [ ] Custom domain `utamaglobalindocargo.com` configured on Vercel with SSL
- [ ] Supabase project created (cloud)
- [ ] Supabase tables created (all tables from doc 15 schema)
- [ ] Supabase RLS policies configured
- [ ] Supabase Auth admin user(s) created
- [ ] GA4 property created
- [ ] GTM container created, base page_view tag
- [ ] Google Search Console verified for `utamaglobalindocargo.com`
- [ ] Design tokens defined (CSS custom properties + Tailwind config)
- [ ] Font loading configured (Inter, Instrument Serif, JetBrains Mono)
- [ ] UGC logo assets uploaded from GDrive to repo (`public/brand_assets/`)
- [ ] SMTP credentials configured in Vercel env

## Phase 1 — MVP Launch (Weeks 2-7)

### Week 2: Foundation + Home

- [ ] Base UI components (Button, Card, GlassPanel, Input, Accordion, ProgressIndicator)
- [ ] Layout components (Header with mega-menu, Footer, MobileNav, MobileBottomBar, Breadcrumb)
- [ ] Language toggle component with route map lookup
- [ ] ScrollReveal, StaggeredReveal, CounterAnimation motion components
- [ ] `prefers-reduced-motion` global override
- [ ] Home page: hero, value prop, service grid, proof section (stats + Client Story highlight), featured editorial, CTA band
- [ ] Home page content (ID + EN)
- [ ] Home page SEO metadata + Organization + LocalBusiness schema
- [ ] **Begin service page content writing in parallel** (ID first, EN follows)

### Week 3: Services + Tracking Investigation

- [ ] Service detail page template component
- [ ] ProcessFlow, FAQSection, RecirculationModule, ClientStoryCard components
- [ ] Services index page
- [ ] All 6 service pages with content (ID + EN)
- [ ] Service FAQ content (3-5 per service, ID + EN)
- [ ] Service schema + FAQ schema + BreadcrumbList on all service pages
- [ ] Internal cross-links embedded in service content
- [ ] **Investigate current tracking system** at `utamaglobalindocargo.com/track` — document backend, API, data format
- [ ] Build tracking proxy API route based on investigation findings

### Week 4: About + Contact + Quote + Track

- [ ] About page: hero, origin story, philosophy, network/credentials, Client Stories section
- [ ] About page content (ID + EN)
- [ ] Contact page: channels grid, contact form, office location, map
- [ ] Contact form → Supabase handler
- [ ] Quote form: 4-step wizard with trust micro-copy, validation, progress
- [ ] Quote form → Supabase handler with UTM capture
- [ ] Email notification trigger (Supabase trigger + Nodemailer)
- [ ] Track Shipment page: input, results display, error states
- [ ] Track Shipment integration with backend (per investigation from Week 3)
- [ ] Success/confirmation states for all forms

### Week 5: Admin Portal

- [ ] Admin layout with Supabase Auth guard
- [ ] Admin dashboard (submission counts, article counts)
- [ ] Article CRUD (list, create, edit bilingual fields, publish toggle)
- [ ] Client Story CRUD (same structure)
- [ ] SEO Metadata editor (per-page overrides)
- [ ] Site Settings editor (company info, WhatsApp number, contacts)
- [ ] File upload manager (company profile PDF → Supabase Storage)
- [ ] Submission viewer (quote + contact, filterable, sortable)
- [ ] Seed initial Client Stories (3-5 stories, ID + EN)
- [ ] Upload company profile PDF via admin

### Week 6: SEO + Analytics + Polish

- [ ] All pages: locale-specific title tags, meta descriptions, OG images
- [ ] Hreflang tags on all pages
- [ ] XML sitemap generation (both locales)
- [ ] Robots.txt configuration (allow all, block /api/*, /admin/*)
- [ ] Canonical tags (self-referencing)
- [ ] All analytics events implemented (P0 and P1 events from tracking taxonomy)
- [ ] GTM debug mode verification for all events
- [ ] GA4 conversions configured
- [ ] Performance audit: Lighthouse desktop + mobile
- [ ] Accessibility audit: keyboard nav, contrast, alt text, focus indicators

### Week 7: QA + Launch

- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile testing: Chrome Android (Samsung A14 or equivalent)
- [ ] Mobile testing: Safari iOS (iPhone 12+)
- [ ] Glassmorphism fallback verified on Android 10
- [ ] Mobile bottom bar: no overlap with OS nav bars
- [ ] All forms end-to-end tested (submit → Supabase → email notification)
- [ ] Tracking end-to-end tested
- [ ] Content proofread final pass (ID + EN)
- [ ] Admin portal functionality verified
- [ ] DNS pointed to Vercel (if not already)
- [ ] SSL active
- [ ] GA4 receiving live data, GTM not in debug
- [ ] Sitemap submitted to Google Search Console
- [ ] Stakeholder sign-off
- [ ] Launch

### Dependencies

```
Design tokens → before any component build
Header/Footer → before any page build
Supabase tables → before any form or admin build
Service content writing → start Week 2, must complete by Week 3
Tracking investigation → Week 3, implementation Week 4
Admin portal → depends on Supabase schema (Phase 0)
GTM → before any analytics event implementation
```

---

## Phase 2 — Content & Ads (Weeks 8-11)

- [ ] Insights hub page with category filtering
- [ ] Insights article template with related content recirculation
- [ ] Write and publish 4-6 articles via admin portal (ID + EN)
- [ ] Build 2-3 campaign landing pages
- [ ] Set up Google Search Ads (IDR 10-15jt/month budget)
- [ ] Implement Meta Pixel for remarketing
- [ ] Build Looker Studio dashboard (Overview, Conversion, Content, Acquisition)
- [ ] A/B test quote form trust-element variations
- [ ] Source or schedule operational photography
- [ ] Replace typographic fallbacks with photography where available
- [ ] Google Search Console keyword monitoring
- [ ] Newsletter subscription (if capacity allows)

---

## Phase 3 — Growth (Ongoing)

- [ ] BCP tracking integration (Supabase RPC/Edge Function for live tracking)
- [ ] Industry pages (E-Commerce, Manufacturing, Pharma, Energy)
- [ ] Team/leadership section on About page (when photography available)
- [ ] Site search (when content exceeds 30 pages)
- [ ] Expand insights content (target 2/month)
- [ ] Ongoing SEO optimization from Search Console data
- [ ] Additional landing pages based on ad performance data

---

## Risk Points

| Risk | Phase | Mitigation |
|------|-------|------------|
| Service content not ready | Phase 1, Week 3 | Start writing in Week 2 (parallel). ID first, EN follows within 2-3 days. |
| Tracking backend unclear | Phase 1, Week 3 | Investigate immediately. Fallback: temporary iframe wrap if API is not documentable. |
| Admin portal scope creep | Phase 1, Week 5 | Keep it functional, not beautiful. CRUD only. No fancy UI. |
| Client Stories quality | Phase 1, Week 5 | Review all stories against realism criteria. No superlatives. Cross-check UGC capability. |
| Low organic traffic post-launch | Phase 2+ | Normal — takes 3-6 months. Phase 2 content hub + ads accelerate. |
