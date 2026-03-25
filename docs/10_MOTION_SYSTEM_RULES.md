# 10 — Motion System Rules

## Motion Principles

Motion serves three functions — never decorative: (1) guiding attention via scroll-triggered reveals, (2) creating continuity via page/section transitions, (3) communicating interactivity via hover/click/focus feedback.

## Easing and Duration

All animations use easing curves. No linear transitions.

| Purpose | Duration | Easing |
|---------|----------|--------|
| Hover feedback | 150-200ms | `cubic-bezier(0.0, 0.0, 0.2, 1)` |
| Click feedback | 100ms | ease-out |
| Content reveal | 400-600ms | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Staggered reveal (per item) | 400ms + 80ms stagger | ease-out |
| Page transition | 500-700ms | `cubic-bezier(0.4, 0, 0.2, 1)` |
| Counter animation | 1200ms | ease-out |

## Scroll Choreography

Default reveal: `opacity: 0→1` and `translateY(24px)→0`. Trigger: element crosses 85% viewport threshold from bottom via `IntersectionObserver` with 0.15 threshold.

Staggered reveals for grids: 80ms delay per item, max 6 items in chain — remainder appears simultaneously.

Section entry: heading animates first, supporting elements follow with 120ms delay. Images scale from 0.97→1.0 with opacity.

Stats count up from 0 using ease-out over 1200ms. Count once only — re-scroll does not re-trigger.

### Parallax

Desktop only, sparingly. Background gradient fields at 10-15% rate. NEVER on text, interactive elements, or glass surfaces. Disabled entirely on mobile.

## Hover Interactions

**Cards:** lift `translateY(-4px)`, shadow increase. 200ms in, 300ms out. Glass cards brighten slightly.

**Nav links:** color transitions to `--color-primary`, underline slides in via `scaleX(0→1)` from left.

**Buttons:** primary darkens background. Secondary fills with `--color-primary-subtle`. No scale/bounce.

**Images (interactive):** `scale(1.03)` with container `overflow: hidden`. 400ms ease-out. Non-interactive images: no hover.

## Page Transitions

Route changes use crossfade: outgoing fades over 300ms, incoming fades in over 400ms with 100ms overlap. Content on incoming page uses standard reveal choreography triggered immediately.

Service-to-service: optional horizontal slide (outgoing left, incoming from right, 500ms). TODO-TECH: evaluate View Transitions API compatibility.

## Mobile Motion Behavior

**Allowed:** opacity, `translateY` (max 16px offset), press feedback on `active`, number counting, form focus transitions.

**Disabled:** all parallax, horizontal slide page transitions, stagger beyond 3 items, card lift hovers, animated `backdrop-filter`.

**Duration:** all mobile durations are 70% of desktop (e.g., 400ms → 280ms).

## Performance Safety

### Budget
Animation JS (Framer Motion): max 30KB gzipped. CSS-only where possible.

### GPU Rules
Only animate `opacity` and `transform`. Never: `width`, `height`, `top`, `left`, `margin`, `padding`. Apply `will-change` on interaction start, remove on end — never permanent.

### Intersection Observer
All scroll animations use `IntersectionObserver` (threshold 0.15). Elements marked "revealed" once, observer disconnects. No scroll-event listeners.

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

### Frame Rate
All animations target 60fps. If a sequence drops below 30fps on a ~$200 Android device, simplify or remove it.
