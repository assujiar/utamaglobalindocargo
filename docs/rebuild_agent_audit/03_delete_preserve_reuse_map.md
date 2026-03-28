# Delete / Preserve / Reuse / Rewrite Map

This map classifies files, components and concepts from the current repository
into four categories: **Delete**, **Preserve as Business Truth**, **Reuse
Technically**, and **Rewrite From Scratch**.  These recommendations assume a
full rebuild with a new front‑end architecture while retaining the business
substance.

## DELETE

Items that should not survive into the new codebase.  They either embody
undesired design patterns, contain synthetic or placeholder content, or are
irrelevant to the final concept.

| File/Component | Reason |
| --- | --- |
| `src/components/sections/StatsCounter.tsx` | Displays unverified operational numbers.  Synthetic metrics damage credibility and should not be shown until real data is available. |
| `src/components/sections/ServicesHorizontal.tsx` | Implements a horizontal scroll hijacking pattern that feels gimmicky and impedes scanning.  Replace with a more conventional service overview grid or carousel. |
| `src/components/layout/HeroSection.tsx` (in its current form) | The current hero design is derivative and does not use the official tagline or recommended hero headline.  A new hero component aligned with the cinematic concept is needed. |
| `src/lib/caseStudiesData.ts` | Contains illustrative case studies with fabricated metrics.  Remove until real case studies are supplied by the business. |
| `src/components/case-studies/*` (as currently used) | Dependent on placeholder data.  The modal and grid patterns can be repurposed, but without real data the current implementation should not be published. |
| Placeholder assets under `public/` (e.g. `favicon.svg` if not the final logo, missing `og-image.png`) | These are temporary.  Final branded assets must replace them. |
| Any unused or dead code imported from past experiments (e.g. 3D/globe components removed from the main build) | They increase cognitive load and should be removed from the clean codebase. |

## PRESERVE AS BUSINESS TRUTH

Items that encode immutable facts about the business.  These should be carried
forward verbatim or in translated form.  They are non‑negotiable.

| Item | Location | Notes |
| --- | --- | --- |
| **Official brand name** | Not explicitly referenced in code – should be injected into metadata and copy. | Utama Globalindo Cargo / UGC Logistics must be used consistently. |
| **Tagline “We Care What We Deliver”** | Not present in current build. | Must be added to the new site as the brand signature. |
| **Recommended hero headline “One line of control across every handoff.” (ID: “Satu kendali untuk setiap handoff.”)** | Not present in current build. | Use as the primary statement on the homepage hero. |
| **Service taxonomy** | `src/app/services/*` pages. | The six service categories and their sub‑services (FTL, LTL, FCL Domestik, LCL Domestik, Airfreight Domestik; FCL Export, etc.) must remain.  Names can be clarified but content cannot be invented or removed. |
| **One‑point‑of‑contact promise** | Expressed on About page. | Preserve the narrative that UGC offers a single point of coordination across the entire supply chain. |
| **Industries served** | About page. | Manufacturing, commodities, FMCG, e‑commerce, pharma, energy. |

## REUSE TECHNICALLY

Technical patterns, utilities and structures that are sound and can be
carried forward into the new codebase with minimal modification.

| Item | Location | Rationale |
| --- | --- | --- |
| **Supabase integration** | `src/lib/supabaseServer.ts`, `supabase/migrations/*`, `src/app/api/leads/route.ts` | The server‑side Supabase client pattern, RLS policies and API route provide a secure lead insertion flow.  This can be reused in the new build. |
| **Multi‑step contact form logic** | `src/components/contact/ContactForm.tsx` | The three‑step flow, Zod validation, honeypot and privacy consent are solid foundations.  Field labels and copy should be revised but the structure can remain. |
| **UTM capture hook** | `src/hooks/useUTMCapture.ts` | Captures UTM parameters to localStorage for lead attribution.  Useful for analytics in the rebuild. |
| **Metadata & SEO scaffolding** | `src/app/layout.tsx`, `robots.ts`, `sitemap.ts`, `JsonLd.tsx` | Sets canonical URLs, robots rules, sitemap generation and JSON‑LD schema.  These patterns should be refined but the basic approach is sound. |
| **TypeScript strictness & ESLint config** | `tsconfig.json`, `eslint.config.mjs` | Strict typing and linting increase reliability.  Continue using these configurations. |
| **ServicePageLayout component** | `src/components/services/ServicePageLayout.tsx` | Encapsulates a clear pattern for sub‑services and could be adapted to the new visual design (alternating backgrounds, call‑to‑action). |
| **Form validation using Zod** | Throughout forms. | Provides clear schema validation both client‑ and server‑side.  Reuse this approach for new forms (e.g. newsletter, quote requests). |

## REWRITE FROM SCRATCH

Everything not explicitly preserved or reused should be rewritten to fit the
cinematic, premium logistics experience.  This includes the visual system,
component architecture and much of the content.

| Area | Reason |
| --- | --- |
| **Homepage structure & copy** | Needs to reflect the new hero headline, brand tagline, proof points, service overview, process description and call‑to‑action without heavy scroll hijacking. |
| **Hero design** | Must be re‑imagined to convey UGC’s premium control with cinematic rhythm.  The current hero fails to differentiate UGC or convey the brand promise. |
| **Navigation & header/footer** | Should be redesigned for clarity, mobile friendliness and bilingual readiness.  Include direct contact information and persistent CTAs. |
| **Service page copy** | The existing descriptions are verbose and occasionally duplicative.  Rewrite with sharp, human language that focuses on benefits, scope and process. |
| **About, FAQ and contact pages** | Require new copy and layout aligned with the new concept.  About should include company history, leadership and certifications.  FAQ should answer real customer concerns with empathetic tone.  Contact should support both form and direct phone/WhatsApp channels. |
| **Case studies** | Develop a new case studies framework once real projects are available.  Structure should allow storytelling with clear challenges, solutions and quantified results. |
| **Visual and motion grammar** | All colors, typography, spacing, animations and interactive patterns need to be defined centrally and applied consistently.  The current piecemeal approach leads to inconsistency and visual noise. |
| **SEO content strategy** | Introduce keyword research, local SEO (consistent NAP information), structured data per service and metadata for each locale.  The current copy does not target any keywords or regions【506806882961271†L521-L529】. |
| **Analytics & tracking** | Expand beyond stub functions.  Integrate GA4/Matomo and track form submissions, CTA clicks and page engagement. |
