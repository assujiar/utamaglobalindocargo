# Claude Code – Phase Prompts

These phase prompts break down the rebuild into sequential steps.  Claude must
execute each phase in order, verifying completion before proceeding.  Each
phase builds on the previous one and must conform to the rules in the master
prompt and quality gates.

## Phase 1: Cleanup & Architecture Reset

**Objective:** Remove the existing front‑end, initialise a clean Next.js
project and preserve only the reusable backend infrastructure.

### Tasks

1. Delete all front‑end components, pages and assets that are not explicitly
   marked for preservation in `03_delete_preserve_reuse_map.md`.  Retain
   `src/lib/supabaseServer.ts`, the Supabase migrations and the API route for
   leads.
2. Initialise a fresh Next.js 16 app using the App Router.  Configure
   TypeScript strict mode and Tailwind CSS.  Preserve the `eslint.config.mjs`
   and `tsconfig.json` settings from the original project.
3. Configure i18n routing for Indonesian (`id`) and English (`en`).  Set
   Indonesian as the default locale.
4. Set up Tailwind with the brand colors, neutral palette and base styles as
   outlined in `06_visual_system_and_motion_grammar.md`.
5. Copy `.env.example` and update environment variables if needed.  Ensure
   Supabase credentials remain intact.
6. Commit the clean base with an initial `README.md` describing the rebuild
   purpose and updated `PROGRESS.md` reflecting Phase 1 completion.

### Verification

* Run `npm run lint` and `npx tsc --noEmit` to ensure no linting or typing
  errors.  Document results in `PROGRESS.md`.
* Verify that the development server starts without errors (`npm run dev`).
* Confirm that `src/app/page.tsx` renders a minimal stub page with locale
  support.

## Phase 2: Information Architecture & Content Foundation

**Objective:** Scaffold the page structure, navigation and data models based on
the IA blueprint.

### Tasks

1. Create top‑level routes for Home (`/`), Services (`/services`), each service
   category (`/services/<slug>`), Industries (`/industries` and `/industries/<slug>`),
   Case Studies (`/case-studies` and `/case-studies/<id>`), About (`/about`),
   FAQ (`/faq`) and Contact (`/contact`).  Use dynamic segments for sub‑pages.
2. Implement a shared layout component with header and footer.  Header should
   include navigation and a persistent contact CTA; footer should include
   service links, industry links, contact information, and the brand tagline.
3. Create a data model (e.g. TypeScript enums or JSON files) for service
   categories, sub‑services and industries.  Use this model to populate
   navigation and page content.
4. Implement a basic translation utility (e.g. dictionaries per locale) for
   navigation labels, headings and microcopy.
5. Add placeholder components for trust strips, process diagrams, case study
   highlights and industry teasers.  Do not implement visual design yet; focus
   on structure and data flow.
6. Preserve and refactor the contact form logic into a new component under
   `/contact`.  Ensure it supports multi‑language labels.
7. Update `PROGRESS.md` with completed tasks and remaining work.

### Verification

* Run the development server and navigate through each route in both languages.
* Ensure that clicking navigation links updates the URL and renders the correct
  page.  The pages may contain placeholder copy at this stage.
* Confirm that the data model exports the correct service taxonomy and can be
  consumed across the app without duplication.
* Confirm that the multi‑step contact form still validates and sends data to
  `/api/leads`.

## Phase 3: Homepage Rebuild

**Objective:** Implement the final homepage design and content according to the
creative direction and IA blueprint.

### Tasks

1. Design and implement the hero section.  Use a dark background with a
   cinematic image or video.  Display the hero headline (“One line of control
   across every handoff.”) and a concise sub‑headline in both languages.  Add
   two CTAs: one to explore services and one to contact UGC.
2. Implement the trust strip directly below the hero.  Insert real client
   logos (placeholder until provided), a short credibility statement and any
   regulatory badges.  Use a light background.
3. Build the services overview grid.  For each of the six categories, display
   the name, a one‑sentence description and a link to the respective page.
4. Implement the “How it works” chapter with a diagram or numbered steps.  Use
   icons and explanatory text.  Make sure the design is accessible and
   responsive.
5. Build a proof section that features one or two case studies.  Pull
   placeholder data or leave empty for now but implement the structure and
   linking.  Include a human quote if available.
6. Add an industries teaser that links to industry pages.  Use icons or
   photos to represent each industry.
7. Add a final CTA section encouraging visitors to discuss their needs.
8. Apply motion grammar guidelines: subtle transitions, parallax limits,
   reduced‑motion support.  No horizontal scroll hijacking.
9. Flesh out the hero and section copy in both languages using the writing
   rules.  Ensure no em dashes, no brochure fluff and credible promises.
10. Update `PROGRESS.md` with completion notes and any issues encountered.

### Verification

* Test the homepage on multiple viewport sizes and devices (via device
  emulation).  Ensure readability, button tap areas and layout integrity.
* Run Lighthouse or similar performance checks.  Aim for high scores in
  performance and accessibility.
* Verify that all links and CTAs navigate to the correct pages.
* Check that motion respects `prefers‑reduced‑motion` and that all animated
  elements fall back gracefully.

## Phase 4: Service Architecture Rebuild

**Objective:** Build the service overview page and individual service pages with
the appropriate content structure and calls to action.

### Tasks

1. Implement `/services` as a landing page summarising all six categories
   using cards or a list.  Each card should include a short descriptor and
   link to the category page.
2. For each category page (`/services/<slug>`), implement:
   - A hero with the category label, headline and sub‑headline.
   - An introduction explaining the category’s role and when clients choose
     it.
   - A list or grid of sub‑services.  Use collapsible panels or anchor
     navigation to display each sub‑service’s description, key points,
     best‑for scenarios, process steps, lead times and minimums.
   - A trust element (e.g. case study highlight or testimonial) relevant to
     the category.
   - A CTA inviting discussion or linking to the contact page.
3. Write new content for all service pages and sub‑services using the
   guidelines: sharp, credible, specific, free of fluff.  Provide English and
   Indonesian versions.
4. Incorporate diagrams or infographics where beneficial (e.g. the flow of a
   door‑to‑door import).  Use accessible SVGs and descriptive alt text.
5. Update `PROGRESS.md` accordingly.

### Verification

* Validate that each service page displays the correct data from the service
  model.  Links to sub‑service anchors should scroll smoothly.
* Test the collapsible panels or anchors for keyboard accessibility.
* Review the copy for adherence to writing rules (no exaggeration, no em
  dashes).
* Ensure each page includes structured data (e.g. `Product` or `Service`
  schema) and appropriate meta tags.

## Phase 5: Trust, Proof, Contact, FAQ & About

**Objective:** Build the supporting pages that convey credibility and capture
leads.

### Tasks

1. **Case studies** – Implement `/case-studies` as an index with filters by
   service and industry.  Each case study gets its own page with sections:
   challenge, solution, results and client testimonial.  Use real cases when
   available; until then use placeholders flagged for replacement.  Include
   images where possible.
2. **Industries** – Create an `/industries` page summarising the key sectors.
   Each industry page should describe typical logistics challenges and how
   UGC addresses them, linking to relevant services and case studies.
3. **About** – Write an authentic company story: founding, mission, values,
   leadership team, certifications and regulatory compliance.  Include the
   brand tagline prominently.  Embed a team photo or short video.
4. **FAQ** – Expand the FAQ to include genuine customer questions about
   documentation, customs, transit times, payment terms and risk mitigation.
   Structure the FAQ in an accessible accordion with metadata for SEO.
5. **Contact** – Refine the multi‑step contact form: review field names,
   add lane and cargo dimension fields, update consent text.  Provide direct
   phone and WhatsApp links.  After submission, guide users to schedule a
   call or meeting.  Ensure all copy adheres to the writing rules.
6. **Trust strip reuse** – Place trust elements (logos, testimonials,
   certifications) at appropriate points across About, contact and service
   pages.
7. Update `PROGRESS.md`.

### Verification

* Ensure that case studies, industries, about, FAQ and contact pages are
  reachable from the navigation and from cross‑links on other pages.
* Check that every FAQ entry has a descriptive question and answer with
  appropriate heading levels and ARIA roles.
* Validate that the contact form still inserts leads into Supabase and logs
  UTM data.
* Proofread all new copy for adherence to the writing rules and tone.

## Phase 6: SEO, Analytics, Polish & Launch Gates

**Objective:** Finalise technical details, polish the design, integrate
analytics and pass quality gates before declaring completion.

### Tasks

1. **Metadata & structured data** – Ensure every page defines `title`,
   `description`, canonical URL, Open Graph/Twitter cards, locale
   alternates and JSON‑LD schema (Organisation, Service, Article, FAQ, etc.).
2. **Local SEO** – Insert company name, address and phone/WhatsApp number
   consistently across the site.  Update the Google Business Profile if
   applicable (outside the codebase).
3. **Analytics integration** – Implement GA4/Matomo via environment
   variables.  Track page views, form submissions, CTA clicks.  Send UTM
   parameters into the analytics payload.  Add cookie consent banner if
   required by Indonesian/EU law.
4. **Performance optimisation** – Optimise images via `next/image`, enable
   static optimisation and caching, remove unused CSS and JavaScript, lazy‑load
   below‑the‑fold content.  Run Lighthouse audits and fix low‑scoring areas.
5. **Accessibility checks** – Use tools like axe or Lighthouse to detect
   accessibility violations.  Fix contrast issues, missing alt text, ARIA
   attributes and keyboard traps.
6. **Testing** – Write or update end‑to‑end tests covering page navigation,
   form submission and language toggling.  Run tests in CI.  Fix any failures.
7. **Documentation** – Update `README.md` with build instructions,
   environment variables, architecture overview and translation guidelines.
   Update `PROGRESS.md` marking all tasks complete.
8. **Quality gate verification** – Ensure all rules in
   `09_strict_rules_and_quality_gates.md` are satisfied.  Do not declare the
   project done until each gate passes.  If a gate fails, fix the issue and
   rerun the checks.

### Verification

* Run `npm run build` and ensure the site builds without warnings or errors.
* Run the final e2e test suite.  All tests must pass.
* Review pages on multiple devices and languages.  Ensure translations are
  correct and no text overflows.
* Validate structured data via Google’s Rich Results Test.
* Confirm that analytics events fire properly and privacy consents are
  honoured.

## Completion

Only after Phase 6 verification should Claude update `PROGRESS.md` to
indicate completion and notify stakeholders that the website is ready for
deployment.  If any rule is violated or any verification step fails, Claude
must rectify the issue before claiming completion.
