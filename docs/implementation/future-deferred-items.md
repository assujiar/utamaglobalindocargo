# Future and Deferred Items

## Intentionally Deferred (This Phase)

### 1. Shipment Tracking Module
- **Status**: Not built. Intentionally deferred per project requirements.
- **Note**: The site architecture does not block future integration. A dedicated `/tracking` route can be added without restructuring.

### 2. Rate Checker / Cost Calculator
- **Status**: Not built. Intentionally deferred per project requirements.
- **Note**: Contact form currently captures cargo details which can be used for manual quoting. A future calculator could pre-qualify leads.

### 3. Turnstile / reCAPTCHA
- **Status**: Deferred. Honeypot field active on lead form.
- **Recommendation**: Add Cloudflare Turnstile before significant ad spend to prevent bot spam.

### 4. Blog / Resources Section
- **Status**: Not built. Content marketing infrastructure deferred.
- **Recommendation**: Consider adding `/blog` with CMS integration (Sanity or equivalent) for SEO content.

### 5. CRM Integration
- **Status**: Leads go to Supabase only. No CRM webhook.
- **Recommendation**: Add webhook to push leads to CRM (HubSpot, Pipedrive, etc.) before scaling marketing.

### 6. Email Notification Webhooks
- **Status**: Not built. Sales team must check Supabase for new leads.
- **Recommendation**: Add email notification on form submission or connect via Supabase Edge Functions.

## Needs Real Business Data/Assets

### Required Before Public Launch
1. **GA4 Measurement ID** or GTM Container ID - Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` env var
2. **Real OG Image** - Design a 1200x630 branded image for social sharing
3. **Company Phone Number** - Set `NEXT_PUBLIC_CONTACT_PHONE` env var for WhatsApp/phone CTAs
4. **Office Address** - Update `addressFull` in footer dictionaries if more specific than "Jakarta, Indonesia"
5. **Supabase Production** - Production project credentials for `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`
6. **Domain DNS** - Configure DNS for utamaglobalindocargo.com pointing to Vercel

### Required for Trust Enhancement (Post-Launch)
7. **Real Client Logos** - With written permission from clients
8. **Team Photo** - Professional team/office photo to replace placeholder
9. **Case Studies** - Verified client outcomes to replace illustrative scenarios
10. **Certifications** - Any real industry certifications or compliance badges
11. **Office Photos** - Warehouse/operations facility imagery

## Technical Debt

### Low Priority
- Consider migrating middleware to proxy convention (Next.js deprecation warning)
- Add E2E smoke tests for critical paths (form submission, navigation)
- Consider adding `next/image` optimization for any future real images
- Add sitemap lastmod dates based on content updates
