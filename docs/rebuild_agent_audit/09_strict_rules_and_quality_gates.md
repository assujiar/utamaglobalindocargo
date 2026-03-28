# Strict Rules & Quality Gates for Claude Code

This document defines binding rules and quality gates that Claude Code must
follow during the rebuild.  Violations of these rules constitute failure and
must be remedied before proceeding to the next phase or declaring completion.

## Non‑Negotiable Rules

1. **Business truths** – The brand name, tagline, hero headline and service
   taxonomy defined in the SSOT must remain unaltered.  Do not change, omit
   or invent services.  Do not merge the tagline with the hero headline.
2. **Writing rules** – The mandatory writing rules from the master prompt
   must be observed at all times: no robotic or brochure language, no em
   dashes, no exaggerated or impossible claims, approximate metrics only when
   real, and a clear distinction between tagline and hero.
3. **Visual and motion grammar** – Follow the guidelines in
   `06_visual_system_and_motion_grammar.md`: do not introduce heavy 3D,
   horizontal scroll hijacks, neon gradients or cyberpunk elements.  Motion
   must be subtle, optional and compliant with `prefers‑reduced‑motion`.
4. **Information architecture** – Implement the IA blueprint exactly.  All
   pages and sections listed must be created; no shortcuts (e.g. merging
   Services and About into a single page) are permitted.  If additional
   pages are needed, document them and update the blueprint.
5. **Accessibility** – All interactive elements must be keyboard navigable,
   have focus states and ARIA roles where appropriate.  Colour contrast must
   meet WCAG AA.  Provide skip links and reduced‑motion support.
6. **SEO & structured data** – Each page must have proper meta tags,
   canonical URLs and JSON‑LD schema.  Local SEO (consistent name, address
   and phone) must be implemented.  Missing OG images or alt text are
   unacceptable.
7. **Bilingual support** – The site must support Indonesian and English
   content via the chosen i18n framework.  All copy must be translated and
   consistent across languages.  The brand tagline stays in English.
8. **Supabase integration** – Lead capture must route through the server‑side
   Supabase client using RLS policies.  Do not expose service role keys to
   the client.  UTM data must be captured and stored.
9. **Progress tracking** – Update `PROGRESS.md` after each phase with
   completed tasks and outstanding items.  Misreporting progress is a
   violation.
10. **Real assets only** – Do not publish placeholder logos, fake case
    studies, synthetic statistics or generic stock photos.  If real assets are
    unavailable, mark the content clearly as a placeholder and flag it for
    business input.  Never fabricate proof or client names.

## Forbidden Behaviours

* **Using the existing front‑end architecture** – Do not migrate or reuse
  layout, hero, stats or service presentation patterns from the old build.
* **Gimmicks** – Avoid creative‑agency gimmicks like 3D particle globes,
  infinite scroll hijacks, heavy video backgrounds, or non‑semantic
  animations.
* **Prompt drift** – Do not ignore or override writing rules or the IA
  blueprint.  Always refer back to the master prompt and SSOT when making
  decisions.
* **Fake data** – Never invent numbers, clients or quotes.  Placeholder data
  must be marked and replaced before launch.
* **Early “done” claims** – Do not declare a phase complete until all tasks
  have been executed and verified.  Do not declare the project complete until
  all quality gates have been checked and passed.

## Quality Gates & Acceptance Criteria

Each phase will be evaluated against specific gates.  Failure to pass a gate
requires fixes before proceeding.

### Gate 1: Clean Base

* The codebase contains only the clean architecture with reusable backend
  pieces.  No leftover components or placeholder content remain.  The app
  compiles without errors.  i18n is configured.

### Gate 2: Scaffold & Navigation

* All routes exist as per the IA.  Navigation works on desktop and mobile.
  The contact form functions and stores data.  A basic translation system
  outputs copy in two languages.

### Gate 3: Homepage Experience

* The homepage implements all specified sections: hero, trust strip, services
  overview, process, proof, industries teaser, final CTA and footer.  Copy
  follows writing rules.  Motion is subtle and optional.  All links
  navigate correctly.

### Gate 4: Service & Industry Pages

* Each service page displays correct sub‑services, process flows, benefits,
  best‑for lists and call‑to‑actions in both languages.  The services
  overview page works.  Industry pages exist and link back to services and
  case studies.  Structured data is attached to services.

### Gate 5: Trust & Supporting Pages

* Case studies have proper structure.  About, FAQ and contact pages are
  complete, credible and accessible.  The contact form inserts to Supabase
  with UTM data.  No placeholder logos or fake metrics are present.

### Gate 6: SEO, Analytics & Polish

* All pages have valid meta tags, structured data and OG assets.  The site
  scores well (>90) on Lighthouse performance and accessibility.  Analytics
  events fire correctly.  The sitemap and robots files are generated.  E2E
  tests pass.  The final design aligns with the visual grammar.

## Failure Conditions

Claude fails if any of the following occur:

1. Publishes copy that reads like AI or brochureware.
2. Uses em dashes in any generated content.
3. Introduces unapproved services or removes required services.
4. Includes placeholders or fake data without marking them and flagging for
   replacement.
5. Neglects accessibility or SEO basics.
6. Claims a phase is complete without passing its quality gate.
7. Deviates from the brand, creative or IA directives without documented
   justification.

## Verification Steps

For each gate, Claude must document:

* **Lint & type check results.**  Attach console logs to `PROGRESS.md`.
* **Link crawl.**  List every route and confirm it renders.
* **Accessibility audit summary.**  List any issues and how they were fixed.
* **Performance audit summary.**  Provide Lighthouse scores and note any
  performance improvements applied.
* **Manual copy review.**  Confirm adherence to writing rules.  Highlight
  any phrases that were rewritten to avoid AI or brochure language.
* **Test results.**  Include e2e test outputs.

Only when all steps are completed and documented should Claude proceed.  If
stakeholders review and request changes, those changes must be incorporated
before moving forward.
