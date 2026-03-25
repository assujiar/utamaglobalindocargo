# 02 — Current State Audit

## Sites Audited

| Property | URL | Role |
|----------|-----|------|
| Production domain | utamaglobalindocargo.com | Business/service truth (robots.txt blocks crawlers) |
| Vercel deployment | utamaglobalindocargo.vercel.app | Implementation reference, bilingual build |

Both sites appear to serve the same Next.js application. The Vercel deployment is the actively maintained version.

## Current Page Inventory

| Page | EN Route | ID Route | Content Depth |
|------|----------|----------|---------------|
| Home | `/en` | `/id` | Medium — hero + stats + service cards + CTA |
| About | `/en/about` | `/id/about` | Thin — philosophy + values list |
| Services Index | `/en/services` | `/id/services` | Thin — 6 service cards only |
| Domestic Distribution | `/en/services/domestic` | `/id/services/domestic` | Thin — 1 paragraph + 5 bullet features |
| International Freight | `/en/services/international` | `/id/services/international` | Thin — 1 paragraph + 5 bullet features |
| Import DTD & Customs | `/en/services/import-dtd` | `/id/services/import-dtd` | Thin — 1 paragraph + features |
| Blockspace & Charter | `/en/services/charter` | `/id/services/charter` | Thin — 1 paragraph + features |
| Warehousing & 3PL | `/en/services/warehouse` | `/id/services/warehouse` | Thin — 1 paragraph + features |
| Project Cargo | `/en/services/project-cargo` | `/id/services/project-cargo` | Thin — 1 paragraph + features |
| Quote (multi-step) | `/en/quote` | `/id/quote` | Medium — 4-step wizard |
| Privacy Policy | `/en/privacy` | `/id/privacy` | Unknown |
| Terms of Service | `/en/terms` | `/id/terms` | Unknown |

**Total unique content pages: 12.** This is extremely thin for a company with 25+ years of operations and 6 service verticals.

## Strengths — What to Keep

These elements work and should carry forward:

**Service taxonomy is clean.** The six-service structure (Domestic, International, Import DTD, Charter, Warehouse, Project Cargo) maps well to actual business units and customer needs. Keep this as the foundation.

**Multi-step quote form is a good idea.** Breaking the inquiry into Service > Route > Cargo > Contact reduces cognitive load. The concept is right even if the execution needs improvement.

**Bilingual routing structure exists.** The `/en` and `/id` prefix pattern is a solid foundation. It just needs consistency and completeness.

**"We Care What We Deliver" tagline has potential.** It is specific enough to be ownable and emotional enough to be memorable. It needs better prominence and integration.

**Core stats are real differentiators.** 25+ years, 150+ countries, 98% on-time, WCA and IATA membership — these are legitimate trust signals when properly presented with proof.

## Weaknesses — What Is Broken

### Content Failures

Every service page follows the exact same template: one paragraph of description, five numbered feature bullets, then a cross-link to other services. A procurement manager comparing UGC against three competitors will find nothing on these pages that distinguishes UGC's domestic distribution from any other forwarder's.

There are zero case studies, zero client testimonials, zero operational details, zero thought-leadership articles, zero downloadable resources, zero industry insights. The site is content-poor in a way that directly hurts both SEO and sales credibility.

The About page lists four corporate values (Integrity, Reliability, Solutions, Partnership) with single-sentence descriptions. These are the same values every logistics company claims. There is no story, no founder narrative, no team presence, no operational philosophy detail.

### UX Failures

**Dead-end pages.** After reading a service page, the only paths are: other services or request a quote. There is no "learn more about how we handle customs for pharmaceutical imports" or "see how we solved a complex project cargo challenge." The user journey is one layer deep.

**No progressive trust building.** The homepage shows stats, but stats without stories are just numbers. There is no trust escalation — no "here is what we do" > "here is proof we do it well" > "here is what it means for your business" > "let us show you specifically."

**Quote form is clinically cold.** The multi-step form asks what you want to ship but never tells you why UGC is the right choice. No social proof at form steps. No reassurance. No value hooks. Drop-off is likely high at steps 2-3.

**Navigation is minimal.** Header has Home, About, Services, Quote. No utility navigation (track shipment, check rates, FAQ). No discovery navigation (insights, industries, network).

### Brand/Visual Failures

**Generic logistics aesthetic.** The numbered card layout for services, the stats counter, the hero tagline pattern — these are templates. They do not communicate UGC's personality or premium positioning.

**No visual identity beyond the logo.** The site uses `#FF4600` as an accent but does not build a distinctive visual system around it. Typography is generic. Layout composition is safe. There is nothing a visitor would remember visually after leaving.

**Photography appears absent.** No operational photography, no team images, no facility shots, no cargo imagery. The site relies entirely on icons and text.

### SEO Failures

**No keyword targeting.** Service page titles are generic ("Domestic Distribution") rather than optimized ("Domestic Freight Distribution Indonesia — Air, Sea & Land | UGC Logistics"). No long-tail keyword strategy.

**No content hub.** Zero indexable content beyond the 12 pages. No blog, no insights, no resource library. The site has no mechanism to capture informational search intent.

**No schema markup visible.** No Organization, LocalBusiness, Service, FAQ, or BreadcrumbList structured data.

**No internal linking strategy.** Service pages link to each other but not contextually. No anchor-text-optimized cross-links.

**Robots.txt issue.** The production domain appears to block crawlers entirely, which is a critical SEO problem if intended to receive organic traffic.

### Analytics/Tracking Failures

No visible Google Tag Manager container. No Facebook Pixel. No conversion event instrumentation. The multi-step quote form — the single most important conversion point — has no step-completion tracking. The business is flying blind on website performance.

### Mobile Failures

The site is responsive but not mobile-redesigned. The same layout shrinks. Mobile users get the same content hierarchy, the same motion timing, the same navigation patterns. There are no mobile-specific interactions (swipe, tap-to-expand, bottom-sheet navigation) that acknowledge how mobile users actually browse.

## Keep / Improve / Remove

| Element | Verdict | Reason |
|---------|---------|--------|
| 6-service taxonomy | **Keep** | Maps to real business structure |
| Bilingual `/en` `/id` routing | **Improve** | Keep pattern, fix consistency and metadata |
| Multi-step quote form | **Improve** | Add trust elements, value hooks, step tracking |
| "We Care What We Deliver" | **Improve** | Elevate from tagline to brand narrative anchor |
| Core stats (25y, 150 countries, 98% OT) | **Improve** | Pair with stories and proof, not just numbers |
| Numbered service cards | **Remove** | Generic template pattern, replace with editorial layout |
| Single-paragraph service pages | **Remove** | Replace with deep, structured, proof-rich content |
| Values list on About page | **Remove** | Replace with narrative, team, operational story |
| Current visual language | **Remove** | Replace entirely with editorial-motion system |
| Current navigation model | **Remove** | Replace with layered, discovery-oriented navigation |

## Differences Between the Two Sites

The production domain (`utamaglobalindocargo.com`) and the Vercel deployment serve the same application. The production domain has robots.txt configuration issues that prevent crawling. The Vercel deployment is the de facto live site. **Recommendation: consolidate to a single canonical domain with proper DNS, SSL, and robots.txt configuration before or during the rebuild.**
