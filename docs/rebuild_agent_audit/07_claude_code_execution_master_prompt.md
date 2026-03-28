# Claude Code – Master Execution Prompt

The following master prompt is intended for Claude Code to rebuild the
Utama Globalindo Cargo website from scratch.  It establishes non‑negotiable
business truths, sets creative and technical expectations, and defines strict
writing rules.  Claude must treat all instructions herein as authoritative.

---

## Overview

You are tasked with rebuilding the UGC Logistics (Utama Globalindo Cargo)
corporate website.  The current front‑end architecture and visual design
are to be treated as disposable.  Only the business truth (services, tagline,
industry facts) and certain backend utilities (Supabase lead capture) should
survive.  Your goal is to produce a conversion‑oriented, cinematic,
premium logistics website using Next.js 16+ (App Router) with TypeScript and
Tailwind CSS.  The outcome must align with the creative direction defined in
`docs/rebuild_agent_audit/04_final_creative_direction.md` and the UX/IA
blueprint in `docs/rebuild_agent_audit/05_final_ux_ia_blueprint.md`.

## Non‑Negotiable Business Truths

1. **Brand name** – UGC Logistics (Utama Globalindo Cargo).  Use consistently.
2. **Tagline** – “We Care What We Deliver” must appear as the brand signature
   (e.g. in the footer or About page).  Do not use it as the hero headline.
3. **Hero headline direction** – “One line of control across every handoff.”
   (Indonesian: “Satu kendali untuk setiap handoff.”).  This line introduces
   the promise of a single point of coordination across the supply chain.
4. **Service taxonomy** – Preserve the six main service categories and their
   sub‑services exactly as enumerated in
   `docs/rebuild_agent_audit/02_business_truth_ssot.md`.  Do not invent new
   services or remove existing ones.  Sub‑service names may be rephrased for
   clarity but their substance must remain.
5. **Industries served** – Manufacturing, commodities, FMCG, e‑commerce,
   pharmaceutical, energy.  Use these as guidance for industry pages and case
   studies.

## Creative & UX Direction

* Follow the cinematic, chapter‑based concept.  The site should transition
  between dark and light chapters, use authentic imagery of logistics
  operations, and guide visitors through a narrative journey.
* Avoid generic logistics templates, creative agency clones, cyberpunk
  gimmicks and flashy VFX for their own sake.  Motion must serve the
  narrative and respect user preferences.
* The navigation structure, page hierarchy and section logic must follow the
  blueprint in `05_final_ux_ia_blueprint.md`.
* Bilingual support (Indonesian and English) must be implemented using the
  Next.js i18n routing system or similar.  The tagline stays in English.
* Lead generation must use the existing Supabase integration.  Enhance the
  contact form as specified in the blueprint and ensure server‑side
  validation, RLS policies and UTM attribution remain secure.

## Technical Requirements

1. **Framework** – Next.js 16+ with the App Router.  Use TypeScript strict
   mode.  Use Tailwind CSS for styling.  Use React‑Hook‑Form and Zod for
   form handling.  Use Framer Motion for subtle animations where needed.
2. **Repository** – Start from a clean repository.  Remove all unused
   components, assets and placeholder content.  Preserve the Supabase
   migrations and server client files for lead capture.
3. **Environment variables** – Continue using `NEXT_PUBLIC_SUPABASE_URL`,
   `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` and add new
   variables as required (e.g. GA4 measurement ID, contact phone number).
4. **Accessibility** – Implement skip links, ARIA attributes, keyboard
   navigation and `prefers‑reduced‑motion` support.
5. **SEO** – Implement canonical URLs, Open Graph/Twitter metadata, JSON‑LD
   schema per page, local SEO (consistent name/address/phone).  Generate
   `sitemap.xml` and `robots.txt`.  Integrate multilingual metadata.
6. **Analytics** – Instrument GA4 or Matomo via environment variables.
   Track form submissions, CTA clicks and page views.  Persist UTM data with
   the existing hook.
7. **Testing & CI** – Include linting, type checking, and minimal e2e tests
   for form submission and page navigation.  Use GitHub Actions or similar.

## Writing Rules (MANDATORY)

Claude must generate all website copy (hero, sub‑headlines, service pages, about,
FAQ, contact instructions, case studies, CTA microcopy) following these rules:

1. **Human, sharp & credible** – Write like a senior logistics operator or
   strategist speaking to an executive audience.  Use clear, direct language.
2. **No robotic or AI‑sounding phrases** – Avoid filler like “we aim to
   revolutionise logistics”, “we are passionate about excellence” or other
   generic statements.  Do not use “delve”, “landscape”, “tapestry”,
   “realm”, “underscore”, “leverage”, “paramount”, “pivotal”, “nuance”,
   “in conclusion” or similar words.
3. **No em dashes** – Do not use em dashes (—) anywhere.  Use normal
   punctuation such as commas, periods or parentheses.
4. **No brochure‑style fluff** – Do not write like a corporate brochure.  Avoid
   over‑claiming (“kami terdepan di Indonesia”), grandiose language (“layanan
   terbaik di dunia”), or invented statistics.  If a metric is used, it
   must be real and approximate (“sekitar 40 %”).
5. **Grounded promises only** – Do not promise impossibilities (“always on
   time”, “zero delays”) or claim market leadership without proof.  Focus on
   what UGC actually does: coordination, documentation, compliance, space
   reservation, warehousing.
6. **Distinct tagline vs hero** – The tagline “We Care What We Deliver” is a
   brand signature; do not use it as a section heading or page title.  Use
   “One line of control across every handoff.” as the homepage hero headline
   unless you have a clearly justified alternative aligned with the blueprint.
7. **Localised conversational Indonesian** – When writing Indonesian copy,
   adopt a smart‑casual tone appropriate for Jakarta business professionals.
   Use natural particles like “kok”, “sih”, “dong” where appropriate, but do
   not over‑do them.  Avoid rigid translation or formal “Anda” when
   addressing the reader; be conversational but professional.

## Phased Implementation & Verification

The rebuild must proceed in phases.  A separate file
`08_claude_code_phase_prompts.md` defines detailed prompts for each phase.
Claude must not claim completion until all phases have passed their quality
gates.  After each phase, run linting, type checking and e2e tests.  Only
proceed to the next phase when current tasks pass.

## Quality Gates

Claude must adhere to the strict rules defined in
`docs/rebuild_agent_audit/09_strict_rules_and_quality_gates.md`.  These rules
specify acceptance criteria, forbidden behaviours and verification steps.  If
any rule is violated, Claude must fix the issue before marking the phase as
complete.

## Deliverables

At the end of the execution, Claude must produce:

* A fully functional Next.js project implementing the new design and content.
* All pages defined in the IA blueprint with proper navigation, SEO and
  multilingual support.
* Valid Supabase API integration for lead capture and UTM tracking.
* Clean and self‑documenting code with comments explaining complex logic.
* Updated `README.md`, `PROGRESS.md` and any additional docs required.

---

By following this master prompt and the associated phase prompts, Claude will
deliver a credible, premium logistics website that honours UGC’s brand truth
while elevating its digital experience.
