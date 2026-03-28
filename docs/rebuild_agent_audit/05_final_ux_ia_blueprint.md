# Final UX & Information Architecture Blueprint

This blueprint outlines the recommended structure for the rebuilt UGC website,
including page hierarchy, section logic, navigation, trust placement, lead
capture and bilingual considerations.  It is designed to support the cinematic
premium logistics concept while maximising clarity and conversion.

## Top‑Level Navigation

The primary navigation should be simple and explicit.  Recommended items:

1. **Home** – Introduces the brand promise and funnels visitors into deeper
   pages.
2. **Services** – Dropdown or mega‑menu listing the six main service
   categories.  Clicking a category takes the user to a service overview page
   with sub‑services.  Avoid hidden hover‑only menus; support tap on mobile.
3. **Industries** – New section describing key industries (manufacturing,
   commodities, FMCG, e‑commerce, pharma, energy).  Each industry page can
   highlight typical challenges and how UGC solves them.
4. **Case Studies** – Real success stories organised by service or industry.
   Each case study should have its own page with problem, solution and results.
5. **About** – Company history, mission, leadership, certifications and the
   brand tagline.  Include office locations and contact details here.
6. **FAQ** – Common questions about services, process, documentation,
   timelines and payment terms.
7. **Contact** – Multi‑step inquiry form plus direct phone/WhatsApp/email.
   Should be persistently linked via a distinct CTA button in the header.

On mobile, include a secondary bar with a call button or WhatsApp link for
immediate contact.

## Homepage Architecture

The homepage should be structured as a scrollable narrative.  Each section
should fit within one viewport height on desktop to create a cinematic
“chapter” feel.

1. **Hero** – Dark backdrop with the hero headline (“One line of control…”) and a
   concise sub‑headline explaining UGC’s scope.  Primary CTA: “Explore
   Services”.  Secondary CTA: “Discuss Your Needs” linking to the contact page.
2. **Trust strip** – Immediately following the hero, a light strip with
   credibility signals: brief text (“Trusted by manufacturers, retailers and
   innovators across Indonesia”), a set of approved client logos (only
   real clients), and maybe a regulatory/licence badge.
3. **Services overview** – A grid or carousel summarising the six service
   categories.  Each item shows the name, a one‑sentence description and a
   link to its detail page.  Avoid horizontal scroll; use a responsive grid or
   slide.
4. **How it works** – A diagram or numbered sequence explaining the typical
   logistics flow: enquiry → planning → execution → delivery → reporting.
   Illustrate the one‑point‑of‑contact promise.  Include icons and brief
   descriptions.
5. **Proof & case stories** – Highlight one or two flagship case studies with
   images and a two‑sentence summary.  A “See All Case Studies” link leads to
   the case studies page.  Include a short quote from a real client to add
   human voice.
6. **Industries served** – Teaser section linking to the industries pages.
   Could use icons or photos to represent manufacturing, FMCG, etc.
7. **Secondary CTA** – Encourage visitors to contact UGC for a consultation.
   Emphasise the human support (“Talk to our logistics specialists”).
8. **Footer** – Dark section containing navigation links, service list, industry
   list, contact information (address, phone, WhatsApp, email), social media
   links, privacy policy and the brand tagline.  Also include the tagline
   “We Care What We Deliver” prominently.

## Services Architecture Presentation

* **Service overview pages** – `/services` can optionally be a landing page
  summarising all six categories with brief descriptions and call‑to‑actions.
  Each category (e.g. domestic distribution) then has its own page that
  contains:
  - Section header with category label, hero headline (e.g. “Distribusi
    Domestik”) and sub‑headline.
  - Intro paragraph explaining the category’s role and typical use cases.
  - **Sub‑service cards** – For each sub‑service, display the name, a short
    description, an icon/photo and a “Learn more” link.  Clicking reveals
    details either inline via accordion or navigates to an anchor section.
  - **Process & SLA** – Outline the typical process, lead times, minimum
    volumes and what clients should prepare (documentation, HS codes,
    equipment).  Use diagrams or bullet lists.
  - **Best for** – A bulleted list describing the types of clients or
    shipments that fit the sub‑service.
  - **CTA** – At the bottom, a call to discuss requirements.

* **Blocspace & charter** – Since this category is less well known, include an
  educational block that explains what blocspace allocation means, why it
  matters and how UGC secures charter capacity.

## Trust & Proof Placement

Trust must be woven throughout the site rather than confined to one page.

* Use a trust strip on the homepage and service pages to showcase real client
  logos, regulatory certifications, partner networks and membership in
  associations (e.g. INFA, FIATA).
* Create a dedicated case studies page with filters by service and industry.
  Each case study should have its own URL for SEO and sharing.
* Feature testimonials or quotes in relevant places (homepage, service pages).
  Only use real, approved quotes; do not fabricate praise.
* Include an “About” sub‑section on the contact page with company number,
  licences and compliance details.

## Contact & Inquiry Model

* **Multi‑step form** – Retain the three‑step flow (service interest,
  operational volume & cargo context, contact details & consent).  Fields
  should be revisited to align with sales needs: add fields for lane
  preferences, cargo dimensions, current logistics pain points.
* **Direct contact channels** – Provide a phone number, WhatsApp button and
  email address.  On mobile, these should be one‑tap actions.  Display office
  hours and response time expectations.
* **Post‑submit experience** – After form submission, offer the user a
  scheduling link (e.g. Calendly) or confirm when they will be contacted.
  Reinforce the human promise (“One of our specialists will call you within
  24 hours”).
* **Analytics & UTM** – Capture UTM parameters through the existing hook and
  send them to analytics and CRM systems.  Use hidden fields to track source,
  medium and campaign.

## Bilingual & Locale Strategy

* Start with Indonesian as the default locale.  Provide a language toggle
  (e.g. EN/ID) in the header.  URL structure can be `/id/...` and `/en/...` or
  rely on Next.js i18n routing.
* Maintain consistent messaging across languages.  Do not translate the brand
  tagline; instead, keep “We Care What We Deliver” in both versions and
  translate supporting copy.
* Ensure meta tags, structured data and sitemap are generated per locale.

## Mobile Experience Principles

* **Finger‑friendly CTAs** – Use large, easy‑to‑tap buttons and ensure
  dropdowns/accordions are touch‑friendly.
* **Condensed navigation** – Collapse the navigation into a drawer with clear
  labels and icons.  Include a persistent contact button.
* **Reduced motion** – Respect `prefers‑reduced‑motion` and provide manual
  controls to skip animations.  Avoid heavy parallax or pinned scroll effects.
* **Performance optimisation** – Lazy‑load images, compress assets and avoid
  large video files on mobile.  Ensure the site remains fast even on 3G.

## Overall IA Summary

The rebuilt IA emphasises clarity: each service, industry and proof element has
its own home.  Visitors will no longer be forced through horizontal scrolls or
gimmicky animations; instead, they can scan, click and contact with ease.  The
site will serve both domestic and international audiences with bilingual
support, accurate metadata and trustworthy content.
