# Current State Audit

This audit assesses the current Utama Globalindo Cargo (UGC) website from the
perspective of design, information architecture, content, UX, trust, technical
quality and repository hygiene.  The goal is to identify what works, what does
not, and why the front‑end should be treated as disposable while preserving
business truths.

## 1. Design & Visual Direction

### Strengths

* **Distinctive palette** – The use of the Logistics Orange (`#ff4600`) and
  Carbon Dark (`#111111`) provides a bold contrast and a strong brand signal.
* **Cinematic intent** – Large typography, alternating dark/light panels and
  considered spacing hint at a cinematic ambition rather than a generic
  logistics template.  The service pages’ alternating backgrounds and the
  structured layout of sub‑services feel well thought‑out.
* **Motion awareness** – The team explored GSAP and Lenis to create smooth
  scrolling and horizontal panels.  The case studies modal uses Framer Motion
  for subtle transitions rather than jarring pop‑ups.
* **Accessibility basics** – A skip‑to‑content link and a preference for reduced
  motion CSS demonstrate awareness of inclusive design.

### Weaknesses

* **Derivative creative influence** – Much of the visual language derives from
  creative‑studio websites (e.g. Buzzworthy) rather than logistics.  The hero
  uses an oversized dark section with minimal copy but does not communicate
  logistics operations or the brand promise.  Without context, visitors may
  assume this is a design agency rather than a freight forwarder.
* **Heavy horizontal scrolling** – The `ServicesHorizontal` component locks the
  viewport and forces users to scroll sideways through panels.  On desktop this
  feels like a gimmick, and on mobile it degrades to a long vertical list.
  The heavy GSAP pinning could impact accessibility and performance.
* **Placeholder graphics** – There are no real photographs or videos of trucks,
  warehouses, ports or team members.  A logistics website should showcase
  operational competence visually rather than rely solely on colored panels.
* **Stats section** – `StatsCounter` displays synthetic numbers (e.g. “340+ containers
  per month”, “$4.7 M biaya efisiensi”) without attribution.  According to
  industry guidance, trust is built through consistent branding and real proof
  rather than unsubstantiated metrics【506806882961271†L504-L509】.

## 2. Information Architecture

### Strengths

* **Clear route structure** – Each main service is given its own page, and the
  URL structure (`/services/domestic-distribution`, etc.) is intuitive.
* **Separation of concerns** – About, FAQ, case studies and contact are
  separated into dedicated pages, avoiding long single‑page sprawl.

### Weaknesses

* **Missing pages** – There is no dedicated page for industries served,
  geographic coverage or process/approach.  Visitors cannot learn whether UGC
  ships to East Indonesia, how customs are handled, or what typical SLAs look
  like.
* **Service hierarchy confusion** – Blocspace and charter services are hidden
  under `/services/blocspace`, while customs brokerage sits within the import
  door‑to‑door page.  Users who scan the navigation may not realise that
  customs brokerage is offered, and the grouping of blocspace with project
  cargo feels arbitrary.  The horizontal scroll on the homepage lists six
  service categories but does not include sub‑services or their benefits.
* **Navigation friction** – The service dropdown in the header only appears on
  hover and may be inaccessible on touch devices.  On mobile the menu is
  hidden behind a hamburger icon and requires multiple taps to discover all
  services.

## 3. Content & Copy

### Strengths

* **Informational** – Each service page lists detailed sub‑services with
  descriptions, key points and “best for” use cases.  This granularity
  demonstrates operational understanding of FTL/LTL, FCL/LCL and airfreight
  options.
* **Multi‑step form copy** – The contact form copy is friendly, explains
  optional fields and includes privacy consent text.  It sets expectations for
  response time (“kami akan merespons dalam 1 hari kerja”).

### Weaknesses

* **Absent tagline** – The official brand tagline “We Care What We Deliver” is
  nowhere to be found.  The hero uses generic copy (“Freight Forwarder
  Berbasis di Jakarta”) and does not differentiate UGC from any other forwarder.
* **Empty claims** – Many phrases (“Satu titik koordinasi untuk seluruh
  kebutuhan logistik”, “Kami tidak menawarkan paket template”) hint at quality
  without evidence.  There are no customer testimonials, regulatory
  accreditations or operational proofs.
* **No Indonesian localisation strategy** – All copy is in Indonesian, but
  there is no plan for an English version.  For an international freight
  forwarder, bilingual content is essential.
* **Synthetic case studies** – The case study summaries are illustrative and
  flagged as needing approval.  Publishing them without real data would harm
  credibility.  Industry guidance emphasises using case studies and guides to
  position your company as a trusted advisor【506806882961271†L562-L569】.

## 4. UX & Flow

### Strengths

* **Smooth interactions** – Lenis provides a smooth scroll feel and the multi‑step
  contact form guides the user through context, volume and contact details
  instead of presenting a long monolithic form.  The progress bar and success
  state are thoughtful touches.
* **Skip link** – An accessible skip link to the main content is included.
* **Direct contact fallback** – At the bottom of the contact page, an email
  address and city are provided for those who cannot use the form.

### Weaknesses

* **Conversion path** – The homepage call‑to‑action appears after a long
  horizontal scroll and a statistics section.  Key CTAs (“Diskusikan
  Kebutuhan Anda”) are buried deep in the page rather than being visible when
  a visitor first arrives.  There is no persistent contact button (e.g. in
  the header).
* **Scrolling fatigue** – The horizontal service strip and long case study page
  can be tiring.  The user must scroll down and then sideways to discover
  services.  Navigation to service pages requires clicking small arrows at the
  edges of the panels.
* **No mobile‑first optimisation** – While the layout adapts to smaller
  screens, the interactive elements (hover menus, large hero text) feel
  designed for desktop first.  There is no explicit mobile CTA like a fixed
  WhatsApp button.

## 5. Trust & Credibility

### Strengths

* **Privacy consent** – The contact form includes a clear privacy consent
  checkbox explaining how data will be used.
* **Metadata** – The layout component sets canonical URLs, open graph tags and
  structured data with JSON‑LD.  A robots.txt and sitemap are present.

### Weaknesses

* **No proof of experience** – There are no client testimonials, partner logos,
  certifications, or regulatory identifiers (e.g. NPWP/NIU, licence numbers).
* **Lack of company details** – The site does not list the company’s address,
  phone number or WhatsApp.  Best practice for logistics websites emphasises
  consistent NAP (Name/Address/Phone) information across all pages to build
  local trust【506806882961271†L544-L546】.
* **Fake metrics** – Displaying synthetic statistics undermines credibility.
  Without verified numbers the statistics block should be removed until true
  operational data can be published.

## 6. Lead Generation & Backend Flow

### Strengths

* **Structured lead capture** – The multi‑step form collects service interest,
  volume, cargo description, route, timeline, contact details and privacy
  consent.  It uses Zod for client‑side validation and re‑validates on the
  server.  A honeypot field helps deter bots.
* **Server‑side Supabase client** – API route uses a service‑role key on the
  server instead of the public anon key.  Validation errors return proper HTTP
  statuses.

### Weaknesses

* **UTM tracking incomplete** – The `useUTMCapture` hook stores UTM data but
  there is no integration with analytics or CRM.  Data is saved only to
  Supabase.
* **No phone field in success state** – After submitting the form, users only
  see a generic thank‑you message.  There is no immediate call to action or
  reassurance such as “we’ll call you from +62 xxx …” or the option to book a
  meeting.

## 7. SEO & Discoverability

### Strengths

* **Canonical and OG tags** – Each page defines a canonical URL, and open graph
  images are referenced (though the images are missing).  The `JsonLd`
  component inserts Organisation schema markup.
* **Route depth** – Service pages are statically generated and accessible via
  semantic URLs.  Each sub‑service is described with headings and lists.

### Weaknesses

* **Missing OG assets** – The referenced `og-image.png` is not present in
  `public/`, leaving social previews blank.  There is no `manifest.json` or
  PWA configuration.
* **Keyword strategy** – There is no intentional use of keywords.  Industry
  guidance recommends tailoring content around service‑specific terms,
  location‑based phrases and problem‑solving queries【506806882961271†L521-L529】.
* **No local SEO signals** – The absence of consistent contact information and
  an up‑to‑date Google Business Profile means the site will struggle in local
  search results【506806882961271†L544-L546】.

## 8. Technical Quality

### Strengths

* **Modern stack** – Next.js 16 with the App Router, Tailwind 4, TypeScript in
  strict mode and ESLint ensure a solid technical foundation.
* **Supabase integration** – Server‑side insertion of leads into a Postgres
  table with RLS policies is secure and scalable.
* **CI pipeline** – A GitHub workflow runs linting, type checking and the
  production build.

### Weaknesses

* **Performance risks** – Horizontal pinning and GSAP animations may cause
  layout jank on low‑powered devices.  There is no image optimisation pipeline
  or lazy loading for heavy assets.
* **Dead code risk** – There are leftover components (e.g. `StatsCounter`),
  placeholder case study data and unimplemented analytics helper functions.
* **Limited tests** – There are no unit or integration tests; only linting and
  type checking ensure baseline stability.  End‑to‑end form submission tests
  would catch regressions in the contact flow.

## 9. Repo Hygiene & Maintainability

### Strengths

* **Rewritten README** – The new README provides clear instructions for
  installation, environment variables, project structure and deployment.
* **Progress tracking** – `PROGRESS.md` documents what is implemented,
  verified, missing and needing business input.  It acknowledges the need for
  real assets, metrics and bilingual content.

### Weaknesses

* **Overstated completion** – The previous iteration claimed 100 % completion
  prematurely.  Although the updated progress file is more honest, there is
  still a risk that stakeholders assume the site is ready when critical trust
  elements and proof are missing.
* **Legacy design references** – The project still includes leftover motion
  patterns and component structures derived from experimentation rather than
  deliberate design decisions.  This increases cognitive load for future
  maintainers.

## 10. Rebuild Readiness

The current front‑end demonstrates design exploration and technical
experimentation but fails to convey trust, credibility and conversion in the
context of a premium logistics brand.  It also lacks the business tagline,
documented service categories and clear proof of competence.  Best practice
guidance emphasises that visual consistency and clear, trusted information
builds credibility【506806882961271†L504-L509】, and that case studies and
educational content should position a company as a trusted advisor【506806882961271†L562-L569】.
The present implementation misses these goals.

**Conclusion:** To achieve a cinematic, premium logistics experience, the
current front‑end should be rebuilt from the ground up.  Business truths (the
six service categories, tagline, headquarters and values) and the improved
multi‑step form logic can be preserved.  However, the visual system, content
architecture, copywriting, motion grammar and trust framework must be
redesigned.  Without this deep overhaul, the site will remain a polished
prototype rather than a credible, conversion‑oriented corporate presence.
