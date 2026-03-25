# UGC Logistics Website Rebuild — Documentation Hub

## What This Is

This folder contains the complete strategy, architecture, design, and implementation documentation for the UGC Logistics (PT Utama Globalindo Cargo) website rebuild. It replaces the current `utamaglobalindocargo.com` and `utamaglobalindocargo.vercel.app` with a single, unified, production-grade web experience.

This is not a mood board. This is not a pitch deck. This is a build-ready documentation system.

## Single Source of Truth

**`04_FINAL_DIRECTION_SSOT.md`** is the master document. When any other file conflicts with it, the SSOT wins.

## Reading Order

If you are a **director or stakeholder**, read:
1. `01_EXECUTIVE_SUMMARY.md` — what's wrong, what we're building, why
2. `03_CONCEPT_TERRITORIES.md` — the three creative options explored, and final pick
3. `05_BRAND_NARRATIVE_AND_POSITIONING.md` — how UGC will talk and feel

If you are a **designer**, read:
1. `04_FINAL_DIRECTION_SSOT.md` — the creative north star
2. `09_DESIGN_SYSTEM_RULES.md` — visual rules, grids, typography, color
3. `10_MOTION_SYSTEM_RULES.md` — animation, transitions, scroll behavior
4. `12_MOBILE_DESKTOP_EXPERIENCE_SPLIT.md` — platform-specific design logic
5. `11_PAGE_BLUEPRINTS.md` + `/page-blueprints/*` — per-page design specs

If you are an **engineer**, read:
1. `15_TECHNICAL_ARCHITECTURE.md` — stack, routing, data, deployment
2. `07_BILINGUAL_ROUTING_AND_SLUGS.md` — i18n routing rules
3. `06_INFORMATION_ARCHITECTURE.md` — page hierarchy and navigation model
4. `14_SEO_SEM_ANALYTICS_TRACKING.md` — tracking implementation specs
5. `16_IMPLEMENTATION_ROADMAP.md` — phased build plan
6. `17_BUILD_CHECKLIST.md` — task-level checklist

If you are **marketing/content**, read:
1. `05_BRAND_NARRATIVE_AND_POSITIONING.md` — messaging framework
2. `08_CONTENT_SYSTEM.md` — content models, editorial hierarchy, CTA logic
3. `14_SEO_SEM_ANALYTICS_TRACKING.md` — keyword map, metadata, measurement

## Strategy vs Implementation Files

| File | Type |
|------|------|
| 01 Executive Summary | Strategy |
| 02 Current State Audit | Analysis |
| 03 Concept Territories | Strategy |
| 04 SSOT | Strategy + Implementation |
| 05 Brand Narrative | Strategy |
| 06 Information Architecture | Implementation |
| 07 Bilingual Routing | Implementation |
| 08 Content System | Strategy + Implementation |
| 09 Design System | Implementation |
| 10 Motion System | Implementation |
| 11 Page Blueprints | Implementation |
| 12 Mobile/Desktop Split | Implementation |
| 13 Infinite Access System | Strategy + Implementation |
| 14 SEO/Analytics/Tracking | Implementation |
| 15 Technical Architecture | Implementation |
| 16 Implementation Roadmap | Implementation |
| 17 Build Checklist | Implementation |
| 18 Open Questions | Operations |

## Folder Structure

```
/docs/ugc-rebuild/
  00_README.md                          ← you are here
  01–18_*.md                            ← core documentation
  page-blueprints/                      ← per-page design + content specs
    home.md
    about.md
    services-overview.md
    service-template.md
    contact.md
    quote-entry.md
    blog-insights-template.md
    landing-page-template.md
  data/                                 ← structured data for implementation
    route-map.json
    page-inventory.json
    tracking-taxonomy.json
```

## Conventions

All TODO items follow this format:
- `TODO-ASSET` — needs a visual/brand asset
- `TODO-COPY` — needs final copywriting
- `TODO-TECH` — needs technical investigation or decision
- `TODO-BIZ` — needs business input or stakeholder decision
