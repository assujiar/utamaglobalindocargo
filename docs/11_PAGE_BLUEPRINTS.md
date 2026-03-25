# 11 — Page Blueprints

## Overview

Each key page has a dedicated blueprint in `/page-blueprints/`. Blueprints define: page goal, target audience intent, content sections, CTA logic, trust logic, motion ideas, desktop and mobile behavior, SEO intent, analytics events, and recirculation logic.

## Page Template Index

| Page | Blueprint File | Priority | Phase |
|------|---------------|----------|-------|
| Home | `page-blueprints/home.md` | P0 — must launch | Phase 1 |
| About | `page-blueprints/about.md` | P0 | Phase 1 |
| Services Overview | `page-blueprints/services-overview.md` | P0 | Phase 1 |
| Service Detail (x6) | `page-blueprints/service-template.md` | P0 | Phase 1 |
| Request Quote | `page-blueprints/quote-entry.md` | P0 | Phase 1 |
| Contact | `page-blueprints/contact.md` | P0 | Phase 1 |
| Track Shipment | `page-blueprints/track-shipment.md` | P1 | Phase 1 |
| Insights Hub | `page-blueprints/blog-insights-template.md` | P1 | Phase 2 |
| Landing Page (Campaign) | `page-blueprints/landing-page-template.md` | P2 | Phase 2 |

## Page Composition Philosophy

Every page follows the editorial pacing model: Hook → Context → Depth → Proof → Action → Discovery. The intensity of each beat varies by page type.

**Home:** Hook is dominant (hero), Depth is light (service previews not details), Discovery is strong (multiple exit paths).

**Service Detail:** Hook is brief (hero title + one-liner), Depth is dominant (operational detail, process, capabilities), Proof is strong (stats, case reference), Action is prominent (contextual quote CTA).

**About:** Hook is emotional (philosophy statement), Depth is narrative (origin story, operational principles), Proof is credential-heavy (WCA, IATA, network).

**Quote:** Hook is reassuring (you're in the right place), the rest is form-driven with micro-trust at each step.

**Insights:** Hook is editorial (headline + lead), Depth is content (article body), Discovery is strong (related articles, related services).

## Six Service Pages

All six services use the same template structure (defined in `service-template.md`) with content adapted per service. The six services are:

1. Domestic Distribution (Land/Sea/Air)
2. International Freight Forwarding (Export/Import)
3. Import DTD & Customs Clearance
4. Blockspace & Aircraft Charter
5. Warehousing & Fulfillment (3PL)
6. Project Cargo & Heavy Duty

Each service page's unique content includes: service-specific process flow, relevant certifications (e.g., IATA for air, customs license for import DTD), service-specific FAQ (3-5 questions), and pre-selected service type on the CTA link to quote form.
