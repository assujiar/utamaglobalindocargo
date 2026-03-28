# Visual System & Motion Grammar

This document outlines the visual and motion principles for the rebuilt UGC
website.  The goal is to create a distinct, cinematic aesthetic that supports
the brand narrative without overwhelming users or sacrificing performance.

## Color Logic

1. **Logistics Orange (`#ff4600`)** – Primary accent used for CTAs, links,
   highlights and micro‑interactions.  Should be used sparingly to draw
   attention to actions and important elements.
2. **Carbon Dark (`#111111`)** – Primary background colour for hero sections,
   footers and dark chapters.  Paired with Logistics Orange, it conveys
   strength and premium quality.
3. **Off‑White / Light Grey (`#f7f7f7` to `#f0f0f0`)** – Background for
   content sections.  Provides contrast against dark chapters and improves
   readability.  Avoid pure white to reduce eye strain.
4. **Neutral Greys (`#333333` to `#666666`)** – Text colour on light
   backgrounds.  Use varying opacities to create depth in copy (e.g.
   headings at 90 %, body copy at 70 %, footnotes at 50 %).
5. **Secondary accents** – Use muted blues or greens sparingly for
   illustrations or icons to differentiate categories without competing
   against the Logistics Orange.  Keep the palette restrained; too many
   colours dilute the brand.

### Chapter‑Based Palette Shifts

* Start with a **dark chapter** (hero) that draws the visitor in.  Use a
  cinematic background image or video and white/orange text.
* Transition to a **light chapter** (services overview, process) with light
  backgrounds and dark text.  Use orange as section dividers and callouts.
* Alternate between dark and light for subsequent chapters (proof, case
  stories, industries) to create rhythm.  Ensure transitions are smooth and
  accessible (no sudden flashes).
* End with a dark footer that anchors the page and contains the tagline.

## Typography Strategy

* **Primary typeface** – Use a robust sans‑serif family (e.g. Inter,
  Geist Sans) with multiple weights.  The typeface should evoke industrial
  reliability while remaining modern and legible.
* **Headings** – Set headings in bold uppercase or title case with tight
  tracking.  Use a large x‑height and maintain consistent scale: H1 for hero
  (~3–5 rem), H2 for section titles (~2–3 rem), H3/H4 for subsections.
* **Body copy** – Use regular or medium weights.  Keep line length between
  50–70 characters to improve readability.  Line height should be around
  1.4 – 1.6.
* **Numbers & data** – Use a monospace or tabular variant for numbers in
  charts, tables and metrics.  Do not animate numbers counting up; display
  them statically with approximate language when necessary.

## Recurring Motifs

* **Angled shapes** – Incorporate diagonal lines or slanted corners in
  section dividers, buttons and icons.  The angle can reference the tilt of
  a shipping container or crane boom, reinforcing the “handoff” metaphor.
* **Thin lines** – Use thin lines to separate content blocks or as accents on
  headings.  Animated lines can trace paths in process diagrams or maps.
* **Container and route imagery** – Photographs or illustrations of
  containers, cargo nets, cranes, trucks, ships and maps should be used
  consistently.  Avoid generic stock imagery; instead source or commission
  high‑quality assets that reflect Indonesian and international routes.

## Image & Art Direction

* **Cinematic photography** – Favour images with controlled lighting,
  deep shadows and rich colours.  Use depth of field to draw attention to
  subjects (e.g. a forklift operator, a loaded container).  When showing
  landscapes (ports, warehouses, airports), choose compositions with strong
  leading lines to suggest movement.
* **Human element** – Include people whenever possible: truck drivers,
  warehouse staff, customs brokers.  Convey professionalism and focus.  Do
  not use posed stock photos of smiling corporate actors; authenticity is
  paramount.
* **Environmental context** – Show weather, time of day and geography to
  underscore the complexity of logistics (e.g. night‑time port operations,
  tropical rain on a tarmac).  This adds drama and realism.

## Motion Grammar

Motion should enhance comprehension, not steal attention.  Principles:

1. **Purposeful transitions** – Use fade‑in, slide‑up or cross‑fade to signal
   a change of section or reveal additional information.  Avoid overshooting,
   bouncing or elastic animations which feel playful rather than premium.
2. **Parallax with limits** – A gentle parallax effect can create depth when
   scrolling past images.  Keep offsets small (e.g. 10 % of scroll distance)
   and disable parallax when `prefers‑reduced‑motion` is set.
3. **Triggered animations** – Only animate elements when they enter the
   viewport.  Do not continuously loop animations in the background.  Use the
   Intersection Observer API or Framer Motion hooks.
4. **Reduced motion** – Provide a global toggle to reduce or eliminate
   motion.  For users who prefer reduced motion, replace animations with
   instant state changes.
5. **No horizontal hijacking** – Do not lock the scroll axis or force
   horizontal swipes.  If presenting panels, use carousels with clear
   controls or allow natural vertical scrolling.

## What Not to Do

* **No heavy 3D gimmicks** – Avoid complex WebGL scenes or particle effects
  that distract from the message and slow down devices.  Use subtle 2D
  animations instead.
* **No loading spinners for content** – Preload assets and use skeleton
  states if necessary.  Prevent long blank screens.
* **No neon gradients or cyberpunk motifs** – The brand is premium logistics,
  not a digital agency or gaming studio.  Colours should remain grounded.
* **No em dashes in copy** – Avoid typographic em dashes entirely.  Use
  standard punctuation and short sentences to improve readability.
* **No auto‑playing background video with audio** – Any video used as
  background should be silent, loop seamlessly and be optional on mobile.

## Memorable Without Chaos

The combination of controlled palette shifts, authentic imagery, sharp
typography, purposeful motion and human stories will make the site memorable.
Visitors should recall a sense of being guided through a well‑orchestrated
journey.  By avoiding noisy animations and derivative templates, UGC will
stand apart as a logistics partner that is both premium and credible.
