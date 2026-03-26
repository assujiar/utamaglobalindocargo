# 10 — Motion System Rules

## Motion Philosophy

Motion is **cinematic, not decorative**. Every animation serves one of four purposes: (1) creating spatial depth via parallax layers, (2) guiding attention via choreographed scroll reveals, (3) building atmosphere via ambient motion, or (4) providing interactive feedback via hover/click responses. If an animation does not serve one of these, remove it.

## Easing and Duration

All animations use easing curves. No linear transitions ever.

| Purpose | Duration | Easing | Notes |
|---------|----------|--------|-------|
| Hover feedback | 200ms | `cubic-bezier(0.0, 0.0, 0.2, 1)` | Cards, buttons, links |
| Click/press feedback | 120ms | ease-out | Scale down + release |
| Content reveal | 500-700ms | `cubic-bezier(0.16, 1, 0.3, 1)` | Scroll-triggered |
| Clip-path reveal | 700-900ms | `cubic-bezier(0.77, 0, 0.175, 1)` | Hero text, section reveals |
| Staggered reveal | 500ms + 100ms stagger | ease-out | Card grids, lists |
| Page transition | 600-800ms | `cubic-bezier(0.4, 0, 0.2, 1)` | Route changes |
| Counter animation | 1500ms | ease-out | Stats counting up |
| Ambient float | 15000-20000ms | ease-in-out | Background glow orbs |
| Gradient shift | 20000-30000ms | linear (exception) | Gradient mesh hue rotation |
| Magnetic cursor | continuous | spring(0.15) | Button attraction |

## Smooth Scroll (Lenis)

Lenis provides butter-smooth scroll behavior synced with GSAP ScrollTrigger.

- **Configuration:** `lerp: 0.1`, `smoothWheel: true`, `autoRaf: false` (GSAP ticker drives the RAF loop)
- **GSAP sync:** `lenis.on("scroll", ScrollTrigger.update)` + `gsap.ticker.add((time) => lenis.raf(time * 1000))` + `gsap.ticker.lagSmoothing(0)`
- **Scrollable children:** Lenis natively respects `[data-lenis-prevent]` on scrollable areas (dropdowns, modals, scrollable containers). Add this attribute to any element that needs native scroll.
- **Reduced motion:** If `prefers-reduced-motion: reduce` is active, Lenis is not initialized (native scroll behavior).
- **Cleanup:** `lenis.destroy()` on unmount.

## Parallax System

Desktop only. Creates cinematic depth by moving layers at different scroll rates.

### Layer Definitions

| Layer | Scroll Rate | Content Type | Z-Index |
|-------|-------------|--------------|---------|
| Deep background | 15-20% of scroll | Ambient glow orbs, gradient mesh | 0 |
| Mid background | 8-12% of scroll | Decorative elements, section numbers | 1 |
| Content | 0% (normal scroll) | Text, cards, interactive elements | 2 |

### Implementation Rules

- Use `transform: translateY()` driven by scroll position via GSAP ScrollTrigger scrub or Framer Motion `useScroll` + `useTransform`
- Only animate `transform` and `opacity`, never layout properties
- Parallax is applied to **decorative elements and images**: glow orbs, gradient backgrounds, floating accent shapes, hero/feature images
- NEVER parallax: text content, interactive elements, glass surfaces, images with text overlays
- Disable entirely on mobile and when `prefers-reduced-motion` is active
- Maximum parallax displacement: 120px total travel per element

### Image Parallax (ParallaxImage)

For hero and feature images. Container has `overflow: hidden` with the target aspect ratio. Image canvas is 120% height. GSAP ScrollTrigger scrub drives `translateY` from `-range%` to `+range%` (default ±10%). Optional `zoomOut` scales from 1.15 to 1.0 during scroll. Desktop only; mobile renders static image at center crop.

### Ambient Glow Orbs

Large, blurred circular elements positioned absolutely behind content. They create warm depth.

```
Size: 300-600px diameter
Blur: blur(100px) to blur(160px)
Color: --glow-ambient or --glow-warm
Opacity: 0.06 to 0.15
Animation: slow float (translateY + translateX oscillation, 15-20s cycle)
Parallax: yes, at deep background rate (15-20%)
Max per viewport: 3
```

## Scroll Choreography

### Default Content Reveal

Primary: `opacity: 0 to 1` combined with `translateY(32px) to 0`. Trigger: element crosses 85% viewport threshold (IntersectionObserver threshold 0.15). Duration: 600ms. Once triggered, observer disconnects.

### Clip-Path Mask Reveal (Premium)

For hero headlines and section titles. Content is clipped with `inset(100% 0 0 0)` and animates to `inset(0 0 0 0)` combined with a subtle `translateY(20px) to 0`. Duration: 800ms with `cubic-bezier(0.77, 0, 0.175, 1)`. Use sparingly: max 4 clip-path reveals per page. Desktop only; falls back to opacity + translateY on mobile.

### Text Split Animation (Hero Only)

Hero headline words animate in individually with stagger. Each word: `opacity 0 to 1`, `translateY(40px) to 0`, 80ms stagger between words. Total sequence: ~800ms. Used ONLY on the homepage hero and service page heroes. Never on body text or secondary headings.

### Staggered Grid Reveal

For card grids and list items. Container triggers, children stagger in. Delay: 100ms per item. Maximum 6 items in stagger chain; items beyond 6 appear simultaneously with the 6th. Each item: `opacity 0 to 1`, `translateY(24px) to 0`, 500ms duration.

### Section Entry Choreography

When a section enters the viewport:
1. Background glow orbs are already visible (ambient, always animating)
2. Section label animates first (opacity + translateY, 400ms)
3. Heading follows (clip-path reveal or opacity, 600ms, 100ms delay)
4. Body text / cards follow (staggered reveal, 200ms delay from heading)

### Stat Counter Animation

Numbers count from 0 to target value. Duration: 1500ms. Easing: ease-out (fast start, slow finish). Trigger: element enters viewport. Count once only; re-scroll does not re-trigger. Display in JetBrains Mono Bold at stat scale. Suffix (+, %, etc.) appears with the number, no separate animation.

### Marquee / Velocity Ticker

GSAP-powered continuous horizontal scroll with scroll-velocity boost. Two rows: primary (left direction, faster) + secondary (right direction, slower, accent color). Speed responds to scroll velocity (clamped 1x-5x desktop, 1x-2x mobile). Mobile: 40% of desktop base velocity. Duplicate content for seamless loop. Max 1 marquee section per page.

## Hover Interactions

### Cards (Desktop Only)

Glass cards: lift `translateY(-6px)`, border color transitions to `rgba(255,70,0,0.20)`, subtle glow shadow appears `0 8px 40px rgba(255,70,0,0.08)`. Duration: 250ms ease-out in, 350ms ease-out out.

Flat cards (light sections): lift `translateY(-4px)`, warm shadow appears `0 8px 32px rgba(255,70,0,0.08)`. Same timing.

### Buttons

**Primary:** Glow shadow intensifies from `0 0 40px` to `0 0 60px`. Scale to 1.02. Background color stays the same (do not lighten/darken).

**Secondary:** Background fills to `rgba(255,70,0,0.10)`. Border brightens.

**Tertiary:** Arrow icon translates 6px right. Text color brightens to `--color-primary-light`.

### Magnetic Cursor Effect (Primary CTAs, Desktop Only)

When the cursor enters a 100px radius around a primary CTA button, the button shifts up to 4px toward the cursor position. Spring physics: stiffness 150, damping 15. When cursor leaves the radius, button returns to center. Disabled when `prefers-reduced-motion` is active. Disabled on mobile/touch devices.

### Navigation Links

Color transitions to `--color-primary`. Active indicator is a small glow dot or underline that slides in via `scaleX(0 to 1)` from left. Duration: 200ms.

### Images (Interactive)

`scale(1.04)` with container `overflow: hidden`. Duration: 500ms ease-out. Non-interactive images: no hover effect.

## Page Transitions

Route changes use a **multi-step cinematic transition**:

1. **Exit phase:** Current content fades out (`opacity 0`) + scales down (`scale 0.97`), 300ms
2. **Overlay wipe:** Dark overlay (`#09090B`) wipes up via `clip-path: inset(100% 0 0 0)` to `inset(0 0 0 0)`, 400ms with `cubic-bezier(0.77, 0, 0.175, 1)`
3. **Glow hold:** Primary color glow pulse in center of overlay, 150ms
4. **Reveal:** Overlay slides away via `clip-path: inset(0 0 100% 0)`, 350ms
5. **Enter phase:** New content fades in (`opacity 1`) + scales up (`scale 1.0`), 400ms

Scroll-to-top on pathname change. `prefers-reduced-motion` bypasses all animation (instant cut). Service-to-service navigation: same transition.

## Preloader

First-visit preloader with UGC branding:

- **Content:** UGC logo SVG with scale entrance (`scale 0.8 → 1.0`), glow pulse animation, horizontal progress line
- **Timing:** Minimum 1.2s, maximum 2s. Actual duration follows `document.readyState`
- **Exit:** Clip-path reveal `inset(0 0 0 0)` to `inset(0 0 100% 0)`, 600ms
- **Return visits:** Skip via `sessionStorage` flag
- **Reduced motion:** Skip entirely

## Custom Cursor

GSAP-powered custom cursor for desktop:

- **Default state:** 8px dot, `mix-blend-mode: difference`
- **Interactive state:** Expands to 40px ring on hover over links, buttons, interactive elements
- **Contextual text:** Elements with `data-cursor-text="TEXT"` show label inside the cursor ring
- **Performance:** Uses `gsap.quickTo()` for smooth lerp follow (no RAF loop)
- **Dynamic elements:** `MutationObserver` watches for dynamically added interactive elements
- **Disabled on:** Touch devices, `prefers-reduced-motion`, mobile viewports

## Section Transitions

Scroll-linked transitions between sections using Framer Motion `useScroll` + `useTransform`:

- **Scale type:** Section scales from `0.95 → 1.0` as it enters viewport. Best for feature sections.
- **Overlap type:** Section translates from `translateY(80px) → 0` creating an overlap-slide effect. Best for contrasting sections.
- **Gradient type:** Section fades from `opacity 0.6 → 1.0`. Best for editorial/text-heavy sections.
- **Scroll offset:** `["start end", "start 0.3"]` for natural pacing.

## Orchestrated Entrance Timing

Within each section, elements enter in a choreographed sequence:

1. **Section label** (0ms delay): `opacity + translateY(16px)`, 500ms
2. **Heading** (150ms delay): SplitTextReveal word-by-word or clip-path reveal
3. **Body text** (300ms delay): `opacity + translateY(20px)`, 600ms
4. **CTA / interactive** (450ms delay): `opacity + translateY(16px)` or scale entrance

## Mobile Motion Behavior

### Allowed on Mobile

- Opacity transitions (all durations at 70% of desktop)
- `translateY` reveals (max 16px offset, not 32px)
- Press/active feedback (scale 0.97 on buttons)
- Number counting animation
- Form focus transitions
- Ambient glow orbs (static position, no float animation)

### Disabled on Mobile

- All parallax effects
- Clip-path mask reveals (fall back to opacity + translateY)
- Text split animations (fall back to opacity + translateY)
- Magnetic cursor effect
- Card lift hovers (touch has no hover)
- Stagger beyond 3 items
- Marquee animation (show static row instead)
- Animated `backdrop-filter` transitions

### Duration Rule

All mobile durations are 70% of desktop values. Example: 600ms desktop reveal becomes 420ms mobile.

## Performance Safety

### Budget

Animation JS (Framer Motion + GSAP + Lenis): budget accordingly. Prefer CSS transitions where possible (hover states, focus rings, underline slide-ins). GSAP for: scroll-linked parallax, velocity marquee, scrub animations, magnetic interactions, custom cursor. Framer Motion for: staggered reveals, page transitions, counter animations, AnimatePresence. Lenis for: smooth scroll.

### GPU Rules

Only animate `opacity` and `transform` (translate, scale, rotate). Never: `width`, `height`, `top`, `left`, `margin`, `padding`, `backdrop-filter` (transitions). Apply `will-change: transform` on interaction start, remove on end. Never permanent `will-change`.

### Intersection Observer

All scroll-triggered reveal animations use `IntersectionObserver` (threshold 0.15). Elements marked "revealed" once, observer disconnects. Scroll-linked animations (parallax, velocity marquee, scrub) use GSAP ScrollTrigger synced with Lenis. Framer Motion `useScroll` used for section transitions and hero parallax effects.

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

When `prefers-reduced-motion` is active: all reveals become instant (no animation). Parallax disabled. Ambient glow orbs are static. Counters show final value immediately. Page transitions are instant cuts. Magnetic cursor disabled.

### Frame Rate

All animations target 60fps. If a sequence drops below 30fps on a ~$200 Android device, simplify or remove it. Test parallax on mid-range hardware before shipping.
