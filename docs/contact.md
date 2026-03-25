# Page Blueprint: Contact

## Page Goal
Make it effortless to reach UGC through any preferred channel. Capture contact form submissions in Supabase. Provide physical address for credibility.

## Target Audience Intent
"I want to talk to someone directly" · "Where are they located?" · "What's the fastest way to reach them?"

## Content Sections

**1. Hero**
Light bg. Heading: "Let's Talk" / "Mari Bicara." Brief line: "Whether you have a shipment to discuss or a question to ask, we're here."

**2. Contact Channels Grid**
Three channel cards side by side (desktop) or stacked (mobile):
- **Email:** info@ugclogistics.co.id — icon + label + clickable mailto link
- **WhatsApp:** pre-filled message link — icon + label + deep link. Most prominent card (orange accent border) since WhatsApp is the preferred B2B communication channel in Indonesia.
- **Phone:** office number — icon + label + clickable tel link. TODO-BIZ: confirm phone number.

**3. Contact Form**
Light bg, centered max-width 640px. Fields: Name, Company (optional), Email, Phone, Message (textarea). Submit button: "Send Message" / "Kirim Pesan." On submit: Supabase insert + email notification to sales. Success state: inline confirmation message, no redirect.

**4. Office Location**
Address block: Jl. Prof Dr. Soepomo SH No. 45BZ, Blok C, Tebet, Jakarta Selatan 12810. Google Maps embed (static image with link to Google Maps, not a heavy iframe — performance consideration). Operating hours if applicable. TODO-BIZ: confirm operating hours.

**5. Footer**

## CTA Logic
WhatsApp card is the primary low-friction CTA. Contact form is the structured CTA. Header quote CTA remains for visitors who want pricing, not just conversation.

## Trust Logic
Physical address + map = legitimacy. Multiple channels = accessibility. Quick response promise = reliability.

## Motion
Minimal. Channel cards: staggered fade-in. Form: standard input focus transitions. No heavy motion on a utility page.

## Desktop Logic
Channel cards in 3-column row. Form centered below. Office location in a 7/5 split (address left, map right).

## Mobile Logic
Channel cards stacked full-width. Form full-width. Map below address, full-width.

## SEO Intent
Keywords: "kontak ugc logistics," "hubungi ekspedisi jakarta." LocalBusiness schema reinforced.

## Analytics Events
`page_view`, `cta_click_whatsapp`, `form_submit_contact`, `nav_click` (email/phone links)

## Recirculation
Services overview link, Quote form link (for visitors who need pricing).
