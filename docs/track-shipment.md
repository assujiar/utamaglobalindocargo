# Page Blueprint: Track Shipment

## Page Goal
Provide existing and potential clients a utility to check shipment status. Build habit of returning to the site. Signal operational infrastructure. This is Phase 1 functionality — the current production site already has tracking at `utamaglobalindocargo.com/track`.

## Target Audience Intent
"Where is my cargo?" · "I need a status update" · "I want to check without calling"

## Content Sections

**1. Hero**
Light bg. "Track Your Shipment" / "Lacak Kiriman Anda." One-liner: "Enter your tracking number or reference ID below."

**2. Tracking Input**
Centered max-width 560px. Input placeholder: "AWB, BL, or reference number." Submit button: "Track" / "Lacak" (primary orange). Same line desktop, stacked mobile.

**3. Results Area**
Conditional display:
- **No query:** brief help text — "Your tracking number can be found in your booking confirmation email or shipping documents."
- **Loading:** skeleton/spinner.
- **Result found:** shipment status card showing: status label (e.g., "In Transit," "Delivered," "Customs Clearance"), origin → destination, last update timestamp, estimated delivery if available. Design as a clean card with status color indicator.
- **Not found:** "We couldn't find a shipment with that reference. Please verify the number or contact us directly." + WhatsApp (+62 812-8459-6614) and email (services@ugc.co.id) links.

**4. CTA Section**
For non-tracking visitors: "Need to ship something?" → Quote CTA. "Have a question?" → Contact/WhatsApp.

**5. Footer**

## Technical Implementation

The current site at `utamaglobalindocargo.com/track` already has a working tracking system. Phase 1 approach:

**Step 1 (Week 3):** investigate the current tracking backend. Options: (a) it calls an external carrier API, (b) it queries an internal database, (c) it uses a third-party tracking widget. Document the API endpoint, request format, and response format.

**Step 2 (Week 4):** build `/api/track` as a proxy route. The new frontend sends the tracking number to this API route, which calls the original backend and returns formatted results. This decouples the new UI from the old backend while preserving functionality.

**Step 3 (Phase 3):** when BCP has a shipment tracking module, replace the proxy with a direct Supabase query.

All tracking queries are logged in Supabase `tracking_queries` table (tracking number hash only, not the actual number — privacy).

## CTA Logic
Primary: tracking form is the utility. Secondary: Quote CTA for non-tracking visitors. WhatsApp fallback for not-found states.

## Trust Logic
Functional tracking = operational proof. It signals real infrastructure behind the marketing site.

## Motion
Minimal. Input focus glow. Results card fade-in. Loading skeleton pulse. No heavy animation on a utility page.

## Desktop Logic
Input centered. Results card centered below, max-width 640px. CTA section full-width strip below.

## Mobile Logic
Full-width input. Results full-width card. CTA stacked.

## SEO Intent
Keywords: "lacak kiriman ugc," "track shipment ugc logistics." Low search volume but important for branded queries.

## Analytics Events
`page_view`, `cta_click_track` (with has_result boolean), `cta_click_whatsapp` (from not-found), `cta_click_quote_inline`

## Recirculation
Quote form, Contact, Services overview.
