# PROGRESS.md

**Last updated**: 2026-03-29

## Project Status: Engineering scaffold complete. Business proof and brand polish pending.

### What is solid
- [x] Next.js 16 App Router with TypeScript strict mode
- [x] Bilingual routing (Indonesian default, English) with middleware
- [x] All page routes per IA blueprint: home, services (6), industries (6), case studies, about, FAQ, contact
- [x] Service taxonomy: 6 categories, 26 sub-services, matches business SSOT exactly
- [x] Multi-step contact form with Zod validation, honeypot, UTM attribution, privacy consent
- [x] Supabase lead capture via server-only client with RLS policies
- [x] Framer Motion viewport animations with prefers-reduced-motion support
- [x] JSON-LD structured data on all major page types
- [x] sitemap.xml, robots.txt, canonical URLs, hreflang alternates
- [x] GA4 integration ready (needs measurement ID)
- [x] Cookie consent banner
- [x] E2E smoke tests (31 passing)
- [x] Security headers configured

### What is placeholder or incomplete
- [ ] Client logos on trust strip: replaced with capability messaging (no fake logos)
- [ ] Case studies: relabeled as illustrative operational scenarios, not verified outcomes
- [ ] Team photo on About page: placeholder marked, awaiting photo session
- [ ] OG/Twitter share images: not yet designed
- [ ] Company phone number and WhatsApp: awaiting business input
- [ ] Physical office address: awaiting business input
- [ ] GA4 measurement ID: awaiting business input
- [ ] Real brand logo: awaiting final design

### What needs business input before publish
- Company phone, WhatsApp, physical address
- Client logos (with permission) for trust strip
- Real case study data from verified engagements
- Team photo from photo session
- GA4 measurement ID
- OG image design (1200x630)
- Supabase production credentials
- Privacy policy content (legal review)

### Build Status
```
npm run lint      - PASS
npx tsc --noEmit  - PASS
npm run build     - PASS (49 pages)
npm run test:e2e  - PASS (31/31)
```

### Notes
- E2E tests are smoke-level. They verify routes, content presence, API validation, and SEO basics. They do not replace visual QA, accessibility audit, or browser-realistic testing.
- Lighthouse audit not yet run. Target >90 for performance and accessibility.
- All placeholder content is clearly marked. Nothing is presented as verified proof.
