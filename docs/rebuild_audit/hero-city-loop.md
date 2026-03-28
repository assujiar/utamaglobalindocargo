# Hero System: City Loop

**Date**: 2026-03-28
**Replaces**: Abstract Route Field (2D canvas corridor bundles)

---

## 1. What Was Removed

- `src/components/canvas/AbstractRouteField.tsx` — orchestrator
- `src/components/canvas/AbstractRouteFieldCanvas.tsx` — 2D canvas renderer
- `src/components/canvas/AbstractRouteFieldFallback.tsx` — CSS fallback
- `src/lib/hero/routeFieldConfig.ts` — corridor bundle config + generation

The abstract route field was semantically meaningful but visually too weak — it read as thin decorative line art rather than a premium logistics visual. It did not convey the scale, movement, and spatial energy appropriate for a primary homepage hero.

## 2. New Visual Concept

**Dark futuristic cityscape with glowing orange highway loop corridors.**

The scene presents a dark urban-industrial environment at altitude. Procedural city building silhouettes provide scale and spatial framing. Glowing orange tube-like highway loops weave through the lower scene plane, creating the impression of controlled logistics flow — cargo routing, traffic intelligence, and operational movement.

This is NOT a literal map or a realistic city render. It is an atmospheric spatial experience that communicates:
- movement at scale
- route orchestration
- controlled flow
- operational depth
- premium confidence

## 3. Why This Fits Better

| Criteria | Abstract Route Field | City Loop |
|---|---|---|
| Visual impact | Subtle, atmospheric | Cinematic, commanding |
| Scale impression | Flat, abstract | Spatial, volumetric |
| Movement energy | Thin pulse dots | Flowing light trails |
| Premium feel | Modest | High |
| Logistics relevance | Abstract corridors | Visible route circulation |
| Brand differentiation | Could be any tech site | Distinctly logistics |

The city loop concept directly visualizes "logistics movement at urban scale" — which is exactly what a freight forwarder does.

## 4. Scene Architecture

```
CityLoopHero.tsx (orchestrator)
├── CityLoopHeroScene.tsx (R3F 3D scene)
│   ├── CityBuildings — procedural instanced box silhouettes (66 instances)
│   ├── HighwaySystem — 5 glowing tube loops with shader-based pulse animation
│   ├── GroundPlane — dark reflective floor
│   ├── Atmosphere — 3 orange point lights + ambient
│   ├── CameraDrift — slow horizontal drift + breathing
│   └── Fog — depth-based scene fade
├── CityLoopHeroFallback.tsx (static CSS fallback)
├── usePrefersReducedMotion.ts (hook)
└── useDeviceTier.ts (hook)
```

### Key technical choices:

- **React Three Fiber** for declarative 3D composition
- **Procedural geometry only** — no imported 3D models, no textures
- **InstancedMesh** for 66 buildings in a single draw call
- **Custom ShaderMaterial** for highway glow with UV-based pulse animation
- **CatmullRomCurve3** for smooth loop curves
- **TubeGeometry** for tube-like highway corridors
- **Three.js fog** for atmospheric depth
- **Additive blending** on highway tubes for natural glow buildup

## 5. Performance Decisions

- Buildings use InstancedMesh — 66 boxes in 1 draw call
- Highway shaders are minimal (no textures, no lighting computation)
- No shadow maps, no post-processing, no reflection
- Low-power devices get reduced DPR and disabled antialiasing
- Scene fog handles far-plane culling naturally
- Dynamic import with `ssr: false` — zero server-side cost
- Total unique geometries: ~7 (1 box + 1 plane + 5 tube curves)

## 6. Mobile Adaptation

- `simplified` prop reduces DPR to [1, 1] and disables antialiasing
- The fog and camera settings remain unchanged (scene naturally adapts)
- Content area has stronger readability veil on the dark scene
- Headline spacing tightens for mobile
- CTA buttons stack vertically on small screens

## 7. Fallback Strategy

**CityLoopHeroFallback.tsx** — pure CSS, zero JavaScript:
- Dark base with CSS-only building silhouettes (15 positioned divs)
- Orange gradient glow trails mimicking highway light
- Atmospheric haze gradients
- Matches the visual language of the 3D scene in static form
- Used when: prefers-reduced-motion OR WebGL unavailable

## 8. Tradeoffs

| Decision | Tradeoff |
|---|---|
| Three.js re-added as dependency | ~150KB bundle impact, justified by the visual quality jump |
| 3D vs 2D canvas | Higher GPU cost, but scene is minimal (no shadows, no PBR, no textures) |
| Procedural buildings | Less detailed than models, but zero asset loading latency |
| No @react-three/drei | Kept dependency footprint smaller — only fiber + three needed |
| Fog-based depth | Simple but effective; no volumetric rendering needed |
| Additive blending on highways | Creates natural glow without post-processing bloom |
