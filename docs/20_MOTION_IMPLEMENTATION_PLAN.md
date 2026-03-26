# 20 — Motion Implementation Plan & Checklist

> **Status tracker:** Setiap task yang selesai di-update dengan `[x]`. Session baru tinggal lanjut dari task yang belum checked.

---

## Inventory: Apa yang Sudah Ada

| Component | File | Status |
|-----------|------|--------|
| GSAP + ScrollTrigger | `package.json` (gsap ^3.14.2) | Installed |
| GSAPProvider | `components/motion/GSAPProvider.tsx` | Working |
| ParallaxDepth (GSAP) | `components/motion/ParallaxDepth.tsx` | Working, tapi cuma di decorative elements |
| ScrollReveal (Framer) | `components/motion/ScrollReveal.tsx` | Working, ada clip variant |
| SplitTextReveal (GSAP) | `components/motion/SplitTextReveal.tsx` | Working, chars + words mode |
| TextRevealByLine (GSAP) | `components/motion/TextRevealByLine.tsx` | Working, clip-path per word |
| ScrollVelocityText (GSAP) | `components/motion/ScrollVelocityText.tsx` | Working, speed reacts to scroll |
| CounterAnimation (vanilla) | `components/motion/CounterAnimation.tsx` | Working, IntersectionObserver |
| MagneticElement (GSAP) | `components/motion/MagneticElement.tsx` | Working, elastic return |
| HorizontalScroll (GSAP) | `components/motion/HorizontalScroll.tsx` | Working, pinned horizontal |
| PinnedReveal (GSAP) | `components/motion/PinnedReveal.tsx` | Working, stacked panels |
| PageTransition (Framer) | `components/motion/PageTransition.tsx` | Weak — simple opacity fade only |
| StaggeredReveal (Framer) | `components/motion/StaggeredReveal.tsx` | Exists |
| Hero | `components/sections/Hero.tsx` | Has char animation, mouse-follow, parallax orbs |

## Apa yang BELUM Ada

| Need | Gap Level |
|------|-----------|
| **Lenis smooth scroll** | Critical — native scroll jumpy |
| **Image-based parallax** (ParallaxImage) | Critical — parallax cuma di abstract elements |
| **Scroll-triggered reveals di semua section** | Critical — banyak section langsung visible |
| **Counter count-up yang terpasang** | Critical — component ada tapi belum dipakai di StatsBar |
| **Enhanced page transitions** (overlay wipe) | High |
| **Image clip-path reveal** component | High |
| **Card hover enhancement** (scale+shadow+icon) | High |
| **CTA magnetic hover** yang terpasang | High — component ada tapi belum di semua CTA |
| **Link underline slide-in** | High |
| **Custom cursor** (desktop) | Medium |
| **Preloader branded** | Medium |
| **Nav hamburger morph animation** | Low |
| **Testimonial carousel animated** | High |
| **Section background parallax** (images, bukan orbs) | High |
| **Staggered entrance di service cards** | High |

---

## PHASE 01: Foundation — Smooth Scroll & Basic Reveals
**Target: Scroll terasa smooth, semua element "hidup" saat masuk viewport**

### 1.1 Install & Setup Lenis
- [ ] `npm install lenis`
- [ ] Create `components/motion/LenisProvider.tsx` — client component wrapper
  - Init Lenis with `lerp: 0.1`, `smoothWheel: true`
  - Sync dengan GSAP ticker: `lenis.on('scroll', ScrollTrigger.update)` + `gsap.ticker.add`
  - `gsap.ticker.lagSmoothing(0)`
  - Import `lenis/dist/lenis.css`
  - Respect `prefers-reduced-motion` (disable smooth scroll)
  - Handle `data-lenis-prevent` untuk scrollable areas (dropdowns, modals)
- [ ] Wrap root layout `app/[locale]/layout.tsx` dengan LenisProvider
- [ ] Test: scroll harus terasa "gliding" bukan "jumping"

### 1.2 ScrollTrigger Batch Reveals — Homepage
Pasang `ScrollReveal` di SEMUA section yang belum punya entrance animation:
- [ ] `ServiceGrid` — setiap card staggered entrance (fade+translateY, 100ms stagger)
- [ ] `StatsBar` — section label + stats staggered
- [ ] `ClientStoryFeatured` — card entrance dengan clip-path reveal
- [ ] `CTABand` — heading + button staggered entrance
- [ ] `Footer` — link columns staggered entrance

### 1.3 ScrollTrigger Batch Reveals — Service Pages
- [ ] Service detail hero — heading split text reveal
- [ ] Process flow steps — staggered entrance per step
- [ ] FAQ section — accordion items staggered
- [ ] Service features/benefits — card grid staggered

### 1.4 Orchestrated Entrance Timing
Update semua reveals agar timing konsisten (Principle 02):
- [ ] Section label: delay 0ms (first)
- [ ] Heading: delay 150ms
- [ ] Body text: delay 300ms
- [ ] CTA/cards: delay 450ms
- [ ] Easing konsisten: `power2.out` atau `cubic-bezier(0.16, 1, 0.3, 1)`

---

## PHASE 02: Hero & Numbers — High Impact Zones
**Target: Hero dan stats section jadi showstopper**

### 2.1 Hero Parallax Layers Enhancement
- [ ] Add background image layer (logistics/port photography) with ParallaxDepth
- [ ] Image: `object-cover`, dark overlay gradient, parallax speed 0.15
- [ ] Keep existing glow orbs tapi kurangi opacity (supporting, bukan main visual)
- [ ] Hero text scroll-linked: scale down + fade + translateY saat scroll (sudah ada, verify working)

### 2.2 Counter Count-Up Integration
- [ ] Wire `CounterAnimation` ke `StatsBar` section (replace static numbers)
- [ ] Each stat: count from 0, suffix animate terpisah (+, %)
- [ ] Trigger on viewport entry, easing decelerate
- [ ] JetBrains Mono Bold styling at stat scale

### 2.3 Marquee Scroll-Speed Sync
- [ ] Verify `ScrollVelocityText` reacts to scroll direction (sudah ada di code)
- [ ] Ensure speed boost feels natural (clamp 1-5x)
- [ ] Add second marquee row going opposite direction for visual depth

### 2.4 Hero Badge Entrance Animation
- [ ] Trust badges (Sejak 1995, 150+ Negara, WCA & IATA) — staggered fade+scale entrance
- [ ] Delay after headline animation completes
- [ ] Subtle glow pulse on the colored dots

---

## PHASE 03: Hover & Micro-Interactions
**Target: Setiap element interaktif "merespon" user**

### 3.1 Service Card Hover Enhancement
- [ ] Image zoom (`scale(1.05)`) dalam overflow-hidden container
- [ ] Border glow intensify: `rgba(255,70,0,0.20)` → `rgba(255,70,0,0.35)`
- [ ] Card lift: `translateY(-6px)`
- [ ] Shadow glow appears: `0 8px 40px rgba(255,70,0,0.08)`
- [ ] Arrow icon slides in dari kanan (`translateX(0)` dari `translateX(-8px)`)
- [ ] Transition: 250ms `ease-out`

### 3.2 CTA Button Magnetic Hover
- [ ] Wrap semua primary CTA dengan `MagneticElement` (strength 0.35)
- [ ] Homepage: hero CTA, CTABand CTA
- [ ] Service pages: hero CTA, bottom CTA
- [ ] Glow intensify on hover: `0 0 40px` → `0 0 60px rgba(255,70,0,0.5)`

### 3.3 Link Hover — Underline Slide-In
- [ ] Create `AnimatedLink` component atau CSS utility
- [ ] Underline animates dari kiri ke kanan via `scaleX(0)` → `scaleX(1)`, `transform-origin: left`
- [ ] Color transition ke `--color-primary`
- [ ] Apply ke: nav links, footer links, inline text links
- [ ] Duration: 200ms ease-out

### 3.4 Navigation Menu Transitions
- [ ] Mobile nav: staggered link entrance saat menu open (each link fades+slides in)
- [ ] MegaMenu: columns stagger reveal
- [ ] Hamburger icon: morph animation (3 lines → X) via CSS/GSAP

### 3.5 Image Clip-Path Reveal Component
- [ ] Create `components/motion/ImageReveal.tsx`
- [ ] Props: `direction` (top/bottom/left/right/center), `duration`, `delay`
- [ ] Clip-path: `inset(100% 0 0 0)` → `inset(0)` (configurable direction)
- [ ] Combine with subtle scale (1.1 → 1.0)
- [ ] ScrollTrigger activated
- [ ] Apply ke: service page images, about page photos, case study images

---

## PHASE 04: Parallax & Depth
**Target: Multi-layer depth perception seperti Buzzworthy studio page**

### 4.1 ParallaxImage Component
- [ ] Create `components/motion/ParallaxImage.tsx`
- [ ] Wraps `next/image` dengan scroll-linked `translateY`
- [ ] Container: `overflow-hidden`, defined aspect ratio
- [ ] Image: 120% height (extra canvas for parallax travel)
- [ ] Scroll-linked: `translateY(+10%)` → `translateY(-10%)`
- [ ] Optional: scale from 1.1 → 1.0 (zoom-out effect)
- [ ] Desktop only, static on mobile
- [ ] Uses GSAP ScrollTrigger scrub

### 4.2 Section Background Parallax
- [ ] Hero: background image parallax (slowest layer)
- [ ] StatsBar: background image (aerial Indonesia / shipping routes)
- [ ] Editorial section: side image with parallax offset
- [ ] About page hero: multi-layer composition (3+ layers at different speeds)

### 4.3 Testimonials Carousel
- [ ] Create animated testimonial carousel/slider
- [ ] Multiple testimonials (minimum 3)
- [ ] Avatar images with parallax offset saat scroll
- [ ] Quote text fade transition between slides
- [ ] Navigation dots with glow on active
- [ ] Auto-advance optional, pause on hover
- [ ] Smooth easing transitions between slides

### 4.4 Section Transition Variety
Replace uniform glow-line dividers dengan variety:
- [ ] Type A: Parallax overlap — next section bg starts behind current
- [ ] Type B: Scale reveal — next section scales 0.95 → 1.0
- [ ] Type C: Gradient morph — bg color smoothly transitions
- [ ] Apply different types across homepage sections

### 4.5 Footer Reveal Animation
- [ ] Footer enters with clip-path reveal from bottom
- [ ] "LET'S TALK" / CTA section: full-width, magnetic hover
- [ ] Link columns staggered entrance
- [ ] Social icons individual hover animations

---

## PHASE 05: Polish & Advanced
**Target: Awwwards-tier level, cherry on top**

### 5.1 Enhanced Page Transitions
- [ ] Upgrade `PageTransition.tsx` dari simple opacity ke multi-step:
  - Step 1: Current page content fades + scales down (300ms)
  - Step 2: Dark overlay slides up (`clip-path: inset(100% 0 0 0)` → `inset(0)`) (400ms)
  - Step 3: Brief hold with subtle brand glow pulse (200ms)
  - Step 4: Overlay slides away revealing new page (400ms)
  - Step 5: New page content choreography triggers
- [ ] Use Framer Motion `AnimatePresence` with shared overlay component
- [ ] Scroll reset to top on route change

### 5.2 Custom Cursor (Desktop Only)
- [ ] Create `components/motion/CustomCursor.tsx`
- [ ] Default: small dot (8px) following cursor with lerp delay
- [ ] On interactive elements: dot scales up (40px) + border ring
- [ ] On project/service cards: "VIEW" text appears in cursor
- [ ] On CTA buttons: cursor blends/hides (magnetic takes over)
- [ ] Disable on touch devices + `prefers-reduced-motion`
- [ ] Use GSAP `quickTo` for smooth follow

### 5.3 Preloader Branded
- [ ] Create `components/motion/Preloader.tsx`
- [ ] Fixed overlay: `bg-[--color-bg-dark]` z-[9999]
- [ ] Center: UGC wordmark or "UGC" letters animate in
- [ ] Progress line or glow pulse
- [ ] Duration: min 800ms, max 2s
- [ ] Exit: clip-path reveal (bottom to top)
- [ ] Only on initial page load (not route changes)
- [ ] Use `sessionStorage` to skip on return visits

### 5.4 Performance Optimization
- [ ] Audit `will-change` usage — apply on interaction start, remove on end
- [ ] Lazy init GSAP ScrollTriggers (only when section approaches viewport)
- [ ] `prefers-reduced-motion`: kill ALL non-essential animation
- [ ] Test on mid-range Android (~$200 device) — target 60fps
- [ ] Framer Motion tree-shake: ensure < 35KB gzipped
- [ ] Lenis: verify < 4KB gzipped addition
- [ ] Lighthouse audit: Performance > 90 desktop, > 80 mobile

### 5.5 Mobile-Specific Motion
- [ ] All durations at 70% of desktop
- [ ] translateY reveals: max 16px (not 32px)
- [ ] Disable: parallax, clip-path reveals, magnetic cursor, card hover lifts
- [ ] Touch feedback: scale(0.97) on button press
- [ ] Stagger max 3 items on mobile
- [ ] Marquee: static or very slow on mobile
- [ ] Test touch scrolling with Lenis (no jank)

---

## Document Updates Required

After implementation, update these docs:

- [ ] `docs/09_DESIGN_SYSTEM_RULES.md` — Revise anti-patterns:
  - Allow parallax on hero text (scroll-linked scale+opacity+Y)
  - "Carousel forbidden" → "Auto-rotate carousel forbidden; manual horizontal scroll allowed"
  - "Auto-playing video forbidden" → "Allow inline muted video in case studies"
  - Add visual density rule
  - Add image treatment specs
  - Increase clip-path limit 2 → 4 per page
- [ ] `docs/10_MOTION_SYSTEM_RULES.md` — Add:
  - Lenis smooth scroll spec
  - Image-based parallax layer
  - Enhanced page transition (multi-step overlay)
  - Preloader spec
  - Custom cursor spec
  - Orchestrated entrance timing pattern
  - Section transition variety specs
- [ ] `docs/04_FINAL_DIRECTION_SSOT.md` — Add Lenis to tech stack, note GSAP ScrollTrigger as primary animation engine

---

## Tech Additions Summary

| Package | Purpose | Size | Priority |
|---------|---------|------|----------|
| `lenis` | Smooth scroll | ~4KB gzip | Phase 01 |
| *(GSAP already installed)* | ScrollTrigger, animations | — | — |
| *(Framer Motion already installed)* | Page transitions, layout | — | — |

**No SplitType needed** — `SplitTextReveal.tsx` already does manual char/word splitting with GSAP.

**No Barba.js needed** — Framer Motion `AnimatePresence` handles page transitions in Next.js.

**No Three.js yet** — Focus 2D motion first. 3D/WebGL is future scope.

---

## Catatan Penting

1. **Phase 1-2 saja sudah bikin UGC 80% selevel Buzzworthy** dan jauh lebih premium dari 95% website freight forwarder Indonesia
2. **Phase 3-5 menaikkan ke Awwwards-tier** yang bisa bersaing dengan agency-level sites
3. **Semua phase compatible** dengan Next.js 16 + Vercel stack yang sudah berjalan
4. **6 Principles harus diterapkan di semua phase:**
   - Easing consistency (power2.out / cubic-bezier family)
   - Orchestrated entrance (headline → subheading → body → CTA, bukan barengan)
   - Scroll = cinematic director
   - Hover = dialogue, not decoration
   - Performance is part of design (60fps minimum)
   - Mobile ≠ Desktop-Lite (own animation set)
