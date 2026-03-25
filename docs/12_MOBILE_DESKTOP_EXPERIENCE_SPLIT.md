# 12 — Mobile Desktop Experience Split

## Philosophy

Mobile and desktop are not the same experience at different sizes. They are different contexts with different user behaviors, attention patterns, and interaction capabilities. The rebuild designs for both intentionally, not responsively.

## Navigation Differences

### Desktop
Persistent sticky header (64px). Logo left, primary nav center (Services with mega-menu on hover, About, Insights), utilities right (language toggle, Track, Request Quote CTA). Services mega-menu shows all six services with one-line descriptions in a two-column overlay.

### Mobile
Hamburger icon triggers full-screen dark overlay. Large tappable menu items (minimum 48px touch target, 16px gap between items). Services expand inline with chevron toggle. Quote CTA is a prominent bottom-anchored button in the overlay. No mega-menu — flat list with expandable sections.

Additionally, mobile has a persistent bottom bar with two utility actions: "WhatsApp" (left) and "Request Quote" (right). This bar appears after the hero section scrolls out of view and persists for the rest of the session. It uses `position: fixed` with 56px height, glassmorphism background, and safe-area-inset padding for notched devices.

## Content Hierarchy Differences

### Hero Sections

Desktop: full-viewport hero with display-XL serif headline (96px), supporting text, primary CTA, and ambient motion (parallax gradient or floating glass elements). The hero occupies 100vh and serves as a dramatic editorial opening.

Mobile: hero is 70-80vh. Headline drops to 48px display. Supporting text is shorter (one line instead of two). CTA is full-width. No parallax, no floating elements. The hero is confident but efficient — mobile users scroll faster and tolerate less decorative space.

### Service Cards

Desktop: editorial grid layout — services presented in a 2x3 or staggered asymmetric grid with generous spacing. Each card shows service name, one-liner, and a visual element (icon or image). Hover reveals a brief preview paragraph.

Mobile: vertical stack with full-width cards. Each card is a tappable block (72px minimum height) with service name, tag line, and right-arrow indicator. No hover preview — tap navigates directly to the service page. Cards are visually simpler: icon + text + arrow.

### Service Detail Pages

Desktop: asymmetric two-column layout for the capability breakdown section (text left, visual/supporting data right). Process flow is horizontal (step 1 → step 2 → step 3). FAQ uses an accordion that expands inline.

Mobile: single-column stack. Process flow is vertical (stacked steps). FAQ accordion remains but with larger touch targets (56px minimum per accordion header). Capability breakdown stacks with visual elements between text blocks instead of beside them.

### Insights Hub

Desktop: magazine-style grid with featured article (large card spanning 8 columns) and secondary articles (4-column cards). Category filter as horizontal tabs.

Mobile: single-column feed. Featured article is a full-width card. Secondary articles are compact list items (thumbnail left, title + meta right). Category filter becomes a horizontal scroll pill bar.

## Interaction Differences

### Scrolling

Desktop: smooth scroll with parallax depth, staggered reveals, and generous scroll-linked animations. Scroll progress indicator on long-form pages (insights articles).

Mobile: snappy scroll with minimal animation. No parallax. Reveals use opacity + short translateY only. No scroll progress indicator (screen width is too narrow). Momentum scrolling is native — do not override with custom scroll handling.

### Hover vs Touch

Desktop hover states (card lifts, link underlines, button darkens) do not exist on mobile. Mobile equivalents:

Cards: `active` state applies a subtle press effect (scale 0.98, slight shadow reduction). Feedback is instant (100ms) to feel responsive.

Links: `active` state changes color to `--color-primary`. No underline animation.

Buttons: `active` state darkens slightly. Transition is 100ms.

### Forms

Desktop: multi-step quote form with side-by-side fields where appropriate (origin/destination on one line). Step descriptions visible alongside the form. Progress bar is horizontal at the top.

Mobile: multi-step form with full-width stacked fields. One field visible at a time for narrow screens. Step descriptions appear above the form as a brief sentence. Progress is shown as step dots (1/4, 2/4...) rather than a bar. "Next" button is full-width and fixed at the bottom of the viewport during form interaction.

### Quote Form Specific

Desktop: the form panel is centered at 640px max-width with generous whitespace. Trust elements (WCA badge, response time promise) appear in a sidebar beside the form.

Mobile: form is full-width with 20px padding. Trust elements appear between steps as brief inline statements ("We respond within 2 business hours") rather than in a sidebar.

## Animation Behavior Differences

(Summarized from `10_MOTION_SYSTEM_RULES.md` — mobile-specific highlights)

Desktop animations translate to mobile as follows:

| Desktop Behavior | Mobile Equivalent |
|-----------------|-------------------|
| Parallax backgrounds | Static backgrounds |
| Card hover lift | Press-down scale (0.98) |
| Staggered reveal (6 items) | Stagger max 3, rest simultaneous |
| Horizontal page slide | Simple crossfade |
| Scroll-linked counter | Same, but triggers earlier (90% threshold) |
| Glass surface animation | Static glass, no animation |
| 400ms reveal duration | 280ms reveal duration |

## Conversion Pattern Differences

### Desktop
Primary CTA in hero + contextual inline CTAs within content + header sticky CTA. The visitor has many touchpoints but none are aggressive. The editorial pacing creates natural conversion moments.

### Mobile
Bottom sticky bar ("WhatsApp" + "Request Quote") is the persistent conversion mechanism. It appears once the hero scrolls away and stays visible. Inline CTAs within content are full-width buttons rather than inline text CTAs. The WhatsApp CTA is specifically important on mobile because mobile users can open WhatsApp directly — this is the lowest-friction conversion path for mobile visitors in Indonesia.

### WhatsApp Deep Link

Mobile WhatsApp CTA links to `https://wa.me/62XXXXXXXXXX?text=Halo%20UGC%2C%20saya%20tertarik%20untuk%20konsultasi%20pengiriman.` (Indonesian) or `...?text=Hi%20UGC%2C%20I%27d%20like%20to%20discuss%20shipping%20requirements.` (English). The phone number and pre-filled text are configured per locale.

TODO-BIZ: confirm official WhatsApp Business number for website CTA.

## Testing Requirements

Desktop testing: Chrome, Firefox, Safari, Edge on 1440px and 1920px viewports.

Mobile testing: Chrome on Android (test on a ~$200 device like Samsung A14 or Redmi Note), Safari on iPhone (test on iPhone 12 or newer). Test specifically: bottom sticky bar interaction with OS navigation bars, form input behavior with virtual keyboard, glassmorphism rendering on older Android WebView, and animation frame rate on mid-range Android.
