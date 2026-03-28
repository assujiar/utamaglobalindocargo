# Hero System: Abstract Route Field — Corridor Bundle Architecture

**Date**: 2026-03-28 (updated)
**Replaces**: `HeroGlobe.tsx` (WebGL particle sphere)
**Current version**: Corridor bundle system (v2)

---

## 1. Why HeroGlobe Was Removed

- **Central blowout**: Additive blending created a bright hot center competing with the headline.
- **No semantic meaning**: A particle sphere has no connection to freight forwarding.
- **Performance cost**: React Three Fiber + custom shaders for a decorative background.
- **Readability**: Headline sat on the brightest visual area.
- **Brand fit**: Felt like a shader demo, not a logistics identity.

## 2. Why the First Route Field (v1) Was Insufficient

The v1 implementation used isolated polylines. Problems:
- Lines were too thin, sparse, and decorative
- No corridor grouping — each line looked independent, not part of a throughput system
- Nodes were too small and didn't read as operational zones
- No visible connection between hubs — handoff logic was missing
- Background still read as "abstract line art" rather than "logistics operating model"

## 3. The Corridor Bundle Architecture (v2)

The system now models logistics visually through three layers:

### 3.1 Corridor Bundles

Each corridor is defined by a **spine** (center path) and generates **multiple parallel lanes** at varying offsets and opacities. This creates the visual impression of a throughput corridor — not a single line.

| Corridor | Role | Lanes | Visual Effect |
|---|---|---|---|
| `corridor-main` | Primary | 5 bundled lanes | Main freight throughput — dominant diagonal |
| `corridor-main-2` | Primary | 4 bundled lanes | Second main corridor — converges at transfer hub |
| `corridor-branch-upper` | Secondary | 3 bundled lanes | Upper feeder route into transfer hub |
| `corridor-branch-mid` | Secondary | 3 bundled lanes | Mid-field distribution |
| `trace-upper` | Tertiary | 1 lane | Planning / telemetry trace |
| `trace-lower` | Tertiary | 1 lane | Planning / telemetry trace |

**Total generated lanes**: ~19 (from 6 corridor definitions).

Lane generation uses perpendicular offset from the spine:
- Center lanes are brightest and thickest (core throughput)
- Edge lanes are fainter and thinner (capacity margin)
- Primary corridors use orange-tinted colors
- Secondary corridors use white
- Tertiary traces are barely visible

### 3.2 Hub Zones

Each hub is an operational zone with:
- A **primary node** (largest, at center)
- **Secondary nodes** arranged around it (varying sizes)
- A **perimeter ring** (dashed for transfer hub)
- A **zone glow** (subtle radial gradient)
- **Connection lines** from primary node to all secondary nodes

| Hub | Role | Position | Nodes | Visual |
|---|---|---|---|---|
| `hub-ingress` | Origin/intake | Bottom-left | 5 | White, modest |
| `hub-transfer` | Consolidation/customs | Center-right | 7 | Orange, prominent, double ring, breathing |
| `hub-fulfillment` | Destination | Upper-right | 5 | White, clean |

The **transfer hub** is the visual anchor — largest, orange-accented, with a pulsing primary node and dashed perimeter ring. This reads as the main operational logic center.

### 3.3 Inter-Hub Connections

Dashed lines connect hub centers: Ingress → Transfer → Fulfillment. This implies the handoff flow — cargo moves from origin through processing to destination.

### 3.4 Pulses

5 pulses move along corridor spines with trails:
- 3 orange pulses on primary corridors (active freight)
- 2 white pulses on secondary corridors (supporting flow)
- Trails imply direction and momentum

## 4. Semantic Mapping

| Visual Element | Logistics Meaning |
|---|---|
| Primary corridor bundle | Main shipping lane / trunk route |
| Secondary corridor bundle | Branch route / feeder / alternative path |
| Tertiary trace | Planning signal / telemetry / data flow |
| Ingress hub | Port, factory, supplier origin zone |
| Transfer hub | Customs, consolidation, cross-dock, warehouse |
| Fulfillment hub | Client warehouse, delivery endpoint |
| Hub connection lines | Handoff flow between operational zones |
| Orange pulse on primary | Active freight shipment in transit |
| White pulse on secondary | Supporting logistics movement |
| Grid | Operational structure / planning field |

## 5. Composition

- **Corridor activity is concentrated in the lower-left to upper-right diagonal** — away from the headline center
- **The readability mask darkens the center** where text sits
- **Hub activity is at the edges and mid-field** — not directly behind the headline
- **The transfer hub sits at ~(52%, 54%)** — below and to the right of center, not competing with text

## 6. Code Architecture

```
routeFieldConfig.ts
├── Corridor definitions (spine + laneCount + spread)
├── Hub definitions (center + radius + nodeCount)
├── Pulse definitions (routeId + speed + offset)
├── Color system
├── generateLanes() → GeneratedLane[]    (expands corridors into lane bundles)
└── generateHubNodes() → GeneratedNode[] (expands hubs into positioned nodes)

AbstractRouteFieldCanvas.tsx
├── drawGrid()
├── drawCorridorBundles() — renders all generated lanes
├── drawHubConnections() — dashed inter-hub lines
├── drawHubs() — glow, rings, connection lines, nodes
├── drawPulses() — shipments along spines
└── drawReadabilityMask() — center, top, bottom vignettes

AbstractRouteFieldFallback.tsx — static CSS matching corridor bundle visual language
AbstractRouteField.tsx — orchestrator (reduced-motion / device-tier decision)
```

## 7. Mobile and Reduced-Motion Strategy

Same decision tree as before:
- **Reduced motion**: Pure CSS fallback with static corridor bundles and hub nodes
- **Low-power device**: Simplified canvas (corridor bundles + hubs, no grid/pulses/connections)
- **High-power device**: Full canvas

## 8. Performance

| Metric | HeroGlobe | Route Field v1 | Route Field v2 |
|---|---|---|---|
| Renderer | WebGL | 2D Canvas | 2D Canvas |
| Dependencies | Three.js (~150KB) | None | None |
| Elements drawn | 4000 particles | ~16 paths | ~19 lanes + 17 nodes + 5 pulses + 3 hubs |
| GPU usage | High | Minimal | Minimal |
| Mobile | No optimization | Simplified | Simplified |

Still dramatically lighter than HeroGlobe. The additional corridor lanes and hub nodes add minimal rendering cost since they're simple 2D paths and arcs.
