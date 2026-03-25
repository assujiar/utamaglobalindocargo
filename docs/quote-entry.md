# Page Blueprint: Quote Entry (Request a Quote)

## Page Goal
Convert visitors into qualified leads via guided 4-step form. Capture complete shipment requirements + UTM attribution in Supabase. Notification to services@ugc.co.id via Nodemailer.

## Target Audience Intent
"I want pricing" · "I'm ready to talk to a forwarder" · "I need to describe my shipment"

## Content Sections

**1. Hero**
Light bg. "Request a Quote" / "Minta Penawaran." Supporting: "Tell us about your shipment and we'll get back within 2 business hours."

**2. Multi-Step Form (4 Steps)**
Centered 640px max-width. Progress dots (1/4, 2/4...).

**Step 1 — Service Type:** "What are you shipping?" Five selectable cards: International, Domestic, Project/Special, Hazardous (B3), Medical/Pharmaceutical. Trust: "Not sure? Choose the closest — our team will refine it with you."

**Step 2 — Route:** "Where is it going?" Conditional on Step 1. International: origin/destination country+city, direction. Domestic: origin/destination city, mode preference. Trust: "We operate across 34 provinces and 150+ countries."

**Step 3 — Cargo:** "Tell us about the cargo." Weight, dimensions (optional), packages, description, special requirements (checkboxes). Trust: "Approximate details are fine — we'll confirm during consultation."

**Step 4 — Contact:** Name (required), Company (optional), Email (required), Phone/WhatsApp (required), Preferred method (Email/WhatsApp/Phone, default WhatsApp). Trust: "Your information is confidential. We respond within 2 business hours."

Submit: "Submit Request" / "Kirim Permintaan"

**3. Success State**
"Thank you! Reference: [ID]. Our team will contact you via [method] within 2 business hours." CTAs: "Explore services" + "Return to home."

**4. Minimal Footer** (no full nav, reduce exits)

## Form Submission Flow
1. Client-side validation per step.
2. POST `/api/quote` → Supabase `quote_submissions` insert (all fields + UTM + referrer + device + locale + session pages viewed).
3. Supabase trigger fires Nodemailer → `services@ugc.co.id` with submission details.
4. Return success + reference ID.

Pre-select: `?service=domestic` query param pre-selects Step 1.

## CTA Logic
Form is the single CTA. Header: logo + language toggle only. No competing navigation.

## Trust Logic
Micro-copy every step. "Approximate is fine" reduces friction. "2 business hours" sets expectation. Optional company = lower barrier for individuals.

## Motion
Step transitions: crossfade 300ms. Progress dots: fill on completion. Input focus: border glow. Submit: loading spinner → checkmark.

## Desktop Logic
Form 640px centered. Trust sidebar possible (WCA badge, response time).

## Mobile Logic
Full-width, 20px padding. "Next" fixed bottom. Trust lines inline between steps.

## SEO Intent
"minta penawaran ekspedisi," "request freight quote indonesia." Low SEO priority — conversion page.

## Analytics Events
`form_start_quote`, `form_step_quote` (step 1-4), `form_submit_quote` (service_type, route_type), `form_abandon_quote` (on beforeunload if steps > 0)
