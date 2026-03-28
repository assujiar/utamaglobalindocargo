# 04 — Launch Readiness

**Date**: 2026-03-28
**Status**: NOT READY — rebuild in progress

---

## Pre-Launch Checklist

### Technical
- [ ] Build passes without errors
- [ ] Lint passes without errors
- [ ] TypeScript strict mode passes
- [ ] All routes render correctly
- [ ] Form submission works end-to-end with Supabase
- [ ] Security headers active (X-Frame-Options, X-Content-Type-Options, etc.)
- [ ] Environment variables documented and required ones validated at startup

### Content
- [ ] All displayed text is factual and authorized by business stakeholders
- [ ] No placeholder metrics visible to end users
- [ ] Case studies reviewed and approved (or marked as illustrative)
- [ ] Company info (address, phone, email) verified
- [ ] Privacy/consent text reviewed by legal or compliance

### SEO & Assets
- [ ] Favicon deployed
- [ ] OG image deployed
- [ ] Canonical URLs configured
- [ ] Sitemap includes all live routes
- [ ] robots.txt allows appropriate crawling
- [ ] JSON-LD schema validates without errors
- [ ] Page titles and descriptions unique per page

### Analytics
- [ ] GTM container ID configured (or GA4 measurement ID)
- [ ] Form submission events tracked
- [ ] CTA click events tracked
- [ ] UTM attribution persisted from landing to conversion

### Infrastructure
- [ ] Vercel project configured
- [ ] Environment variables set in Vercel dashboard
- [ ] Custom domain configured and DNS propagated
- [ ] SSL certificate active
- [ ] Supabase project in production mode
- [ ] RLS policies verified in Supabase dashboard

---

## Assumptions Requiring Business Input

These items cannot be resolved by engineering alone:

1. **Company stats** — Need real, evidence-based metrics from operations team
2. **Client logos** — Need permission and assets from clients
3. **Case studies** — Need approval that anonymized scenarios are truthful
4. **Contact details** — Need verified phone, WhatsApp, office address
5. **Privacy policy** — Need legal review of consent text
6. **Brand assets** — Need final logo files (SVG, PNG), OG image design
7. **Analytics IDs** — Need GTM container ID or GA4 measurement ID
8. **Domain** — Need DNS configuration for utamaglobalindocargo.com
9. **Supabase production** — Need production project credentials
10. **Career email** — Verify careers@utamaglobalindocargo.com exists (used in console easter egg)

---

## Risk Register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Form shows success on failure | HIGH (currently broken) | Lead loss | Fix error handling — P0 |
| Fake metrics challenged by prospect | MEDIUM | Trust damage | Remove until verified — P0 |
| Bot spam on lead form | MEDIUM | Data pollution | Honeypot + future Turnstile — P1 |
| WebGL crashes on low-end mobile | MEDIUM | Bounce | Add fallback — P1 |
| No analytics on launch | HIGH | Blind to ROI | Add GTM placeholder — P1 |
