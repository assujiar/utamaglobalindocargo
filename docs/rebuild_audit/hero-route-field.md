# Hero System: Abstract Route Field

**Date**: 2026-03-28
**Replaces**: `HeroGlobe.tsx` (WebGL particle sphere)

---

## 1. Why HeroGlobe Was Removed

The globe-based hero had fundamental problems:

- **Central blowout**: Additive blending created a bright hot center that competed with the headline.
- **No semantic meaning**: A particle sphere has no obvious connection to freight forwarding or logistics operations.
- **Performance cost**: React Three Fiber + custom shaders for a decorative background that could be achieved more efficiently.
- **Readability**: The headline text sat on top of the brightest visual area, requiring muddy overlay hacks.
- **Brand fit**: The globe felt like a shader demo, not a premium logistics identity. It made the brand feel experimental, not credible.

## 2. What the New System Is

The Abstract Route Field is a 2D canvas-based background that visualizes a logistics operating model. Every visual element represents something real in freight operations.

### Architecture

```
AbstractRouteField.tsx (orchestrator)
├── AbstractRouteFieldCanvas.tsx (2D canvas renderer)
├── AbstractRouteFieldFallback.tsx (static CSS-only fallback)
├── usePrefersReducedMotion.ts (hook)
├── useDeviceTier.ts (hook)
└── routeFieldConfig.ts (data/config)
```

## 3. What Route Lines Represent

Route lines are **logistics corridors** — the lanes through which freight moves.

- **Primary lanes** (orange-tinted, 1.2px): Main freight corridors. Domestic trunk routes or international shipping lanes. These carry the most volume and are visually dominant.
- **Secondary lanes** (white, 0.8px): Branch routes. Regional distribution, feeder lanes, cross-dock connections.
- **Tertiary lanes** (faint white, 0.4px): Background intelligence traces. Data flows, tracking signals, operational telemetry.

Primary lanes have a parallel "double track" effect (faint offset line) implying high-capacity corridors.

## 4. What Nodes Represent

Nodes are **operational zones** — physical locations where logistics events happen.

- **Ingress zone** (bottom-left cluster): Origin points. Ports, factories, supplier locations where shipments begin.
- **Transfer zone** (center cluster, orange-highlighted): Hubs, cross-docks, consolidation points. The active node pulses subtly to indicate operational activity.
- **Fulfillment zone** (top-right cluster): Delivery endpoints. Warehouses, client facilities, final destinations.

## 5. What Pulses Represent

Pulses are **shipments in transit** — cargo moving along corridors.

- Orange pulses on primary lanes: Active freight movement.
- White pulses on secondary lanes: Supporting logistics flow.
- Each pulse has a faint trail, implying direction and momentum.
- Pulses wrap around continuously, suggesting ongoing operations.

## 6. Why It Is More Relevant to Logistics

The globe said: "We are global" (generic, unverifiable for this company).
The route field says: "We manage structured logistics operations" (specific, credible).

The visual language directly maps to what a freight forwarder actually does:
- Routes = shipping lanes
- Nodes = warehouses, ports, hubs
- Pulses = cargo in transit
- Grid = operational structure

A logistics prospect looking at this hero understands immediately that this company thinks in terms of routes, nodes, and controlled movement — not generic corporate imagery.

## 7. How Readability Was Improved

- **No center blowout**: The canvas has a deliberate readability mask — a dark radial gradient centered on the headline zone that reduces visual competition.
- **Content offset**: The headline is left-aligned, not centered over the busiest area. The route field fills the right and bottom areas of the viewport.
- **Layered vignettes**: Top and bottom vignettes darken the edges, framing the content naturally without muddy full-screen overlays.
- **Orange discipline**: `#ff4600` is used only on the accent word "Drama.", the primary CTA, the pretitle marker, and select route/node elements. Not flooded everywhere.

## 8. Mobile and Reduced-Motion Strategy

### Mobile (low-power tier)
- Simplified canvas: grid and pulses are disabled.
- Only lanes and nodes are drawn — still semantically meaningful.
- Readability overlays remain active.
- Content spacing is tightened for a bold, uncluttered first viewport.

### Reduced motion
- Pure CSS fallback (`AbstractRouteFieldFallback.tsx`).
- Static lanes, static nodes, no animation whatsoever.
- Same visual language, just frozen.
- GSAP animations in HeroSection are skipped; all content made immediately visible.

### Decision tree
```
prefers-reduced-motion? → Static CSS fallback
low-power device?       → Simplified canvas (no grid, no pulses)
high-power device?      → Full canvas
```

## 9. Performance Tradeoffs

| Metric | HeroGlobe (old) | Route Field (new) |
|---|---|---|
| Renderer | WebGL (R3F + custom shaders) | 2D Canvas API |
| Dependencies | three, @react-three/fiber, @react-three/drei | None (native canvas) |
| Particle count | 4000 3D particles | 6 polylines + 12 nodes + 4 pulses |
| GPU usage | High (vertex + fragment shaders per frame) | Minimal (2D path drawing) |
| Bundle impact | ~150KB+ (Three.js) | ~3KB (canvas code) |
| Fallback | Static gradient | Full CSS route field |
| Mobile optimization | None (same shader) | Simplified mode |

The new system is dramatically lighter while being more visually meaningful.

## 10. Future Optional Refinements

- **Pointer interaction**: Route lines or nodes could subtly react to cursor proximity (similar to old globe behavior, but restrained).
- **Scroll-linked parallax**: Different lane layers could drift at different speeds during scroll for depth.
- **Dynamic route config**: Route data could be loaded from a CMS or API to reflect actual operational routes.
- **Seasonal pulses**: Pulse density or color could change to reflect peak shipping seasons.
- **Connection lines**: Fine lines connecting nodes to nearby lane points could add more structural detail.

None of these are required for launch. The current implementation is complete and production-ready.
