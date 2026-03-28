# 03 — Quality Gates

**Date**: 2026-03-28

---

## Gate 1 — Repo Hygiene

- [ ] README rewritten (not default template)
- [ ] All starter assets deleted from public/
- [ ] PROGRESS.md reflects actual state
- [ ] .env.example documents all required vars
- [ ] No dead components shipped without purpose

## Gate 2 — Brand & Content Truth

- [ ] No public-facing stats that lack evidence
- [ ] No placeholder client logos displayed
- [ ] No case study metrics presented as verified fact without backing
- [ ] All copy matches company positioning
- [ ] Brand favicon + OG image in place

## Gate 3 — IA & Conversion

- [ ] Homepage answers: who, what services, why credible, how to contact
- [ ] Clear CTA path to /contact on every page
- [ ] Contact page has form + fallback direct channels
- [ ] Service pages have scope, description, CTA
- [ ] About/company presence exists

## Gate 4 — Lead Capture & Backend

- [ ] Form shows success ONLY when backend confirms insert
- [ ] Error state is user-facing and clear
- [ ] Server-side validation active on /api/leads
- [ ] Anti-spam minimum (honeypot) active
- [ ] Supabase server client used for inserts (not anon key)
- [ ] RLS enabled on leads_prospect
- [ ] Lead payload includes name, phone, service, cargo context, consent

## Gate 5 — Motion, Responsiveness, Accessibility

- [ ] Mobile experience clean and functional
- [ ] ServicesHorizontal usable on mobile (vertical stack)
- [ ] HeroGlobe has reduced-motion fallback
- [ ] `prefers-reduced-motion` respected sitewide
- [ ] Case study modal closeable via ESC
- [ ] Mobile menu has aria-expanded
- [ ] Skip-to-content link present

## Gate 6 — SEO, Analytics, Visibility

- [ ] Canonical URL set
- [ ] og:image and twitter:image set and pointing to real asset
- [ ] JSON-LD valid (logo asset exists)
- [ ] Favicon present
- [ ] Analytics/GTM placeholder ready
- [ ] Sitemap includes all published routes
- [ ] robots.txt correct

## Gate 7 — Production Validation

- [ ] `npm run lint` passes
- [ ] `npx tsc --noEmit` passes
- [ ] `npm run build` passes
- [ ] No critical console errors
- [ ] All routes build successfully
