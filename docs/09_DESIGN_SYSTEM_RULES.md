# 09 — Design System Rules

## Core Principle

The design system creates a **cinematic editorial bold** experience. Every page feels like a composed film frame: dark canvas, warm glowing accents, layered depth through glassmorphism and parallax, and typography that commands attention. This is not a typical logistics website. It is a visual statement.

## Layout Principles

### Grid

Desktop: 12-column grid, 1440px max-width, 24px column gutters, 80px horizontal page margins. Asymmetric layouts are the default. A typical content section uses a 7/5 or 5/7 split. Full-width sections break the grid intentionally for visual impact.

Tablet (768-1024px): 8-column grid, 20px gutters, 40px margins.

Mobile (<768px): 4-column grid, 16px gutters, 20px margins. Content stacks vertically. No side-by-side layouts below 768px except small paired elements.

### Spacing Scale

8px base unit. Scale: 4, 8, 12, 16, 24, 32, 48, 64, 80, 96, 120, 160px. No arbitrary values. Section vertical padding: 96-140px desktop, 56-80px mobile. Component internal padding: 20-40px.

### Section Rhythm and Background Strategy

**Dark-first:** The default page canvas is `#09090B`. Light sections (`#FAF9F6`) are used as intentional contrast breaks, maximum 2 per page.

Pages alternate between immersive dark sections and contrasting light breaks. Never three dark sections consecutively without a light or gradient transition. Section transitions use gradient mesh fades or glow line dividers, never hard color cuts.

**Section dividers:** Between dark sections, use a horizontal glow line (`1px height, gradient from transparent to rgba(255,70,0,0.3) to transparent, max-width 60%`). Between dark and light sections, use a gradient mesh fade (24px height minimum).

### Breakpoints

| Name | Range | Grid |
|------|-------|------|
| Desktop XL | 1441px+ | 12-col, content centered |
| Desktop | 1024-1440px | 12-col |
| Tablet | 768-1023px | 8-col |
| Mobile | 0-767px | 4-col |

## Typography Rules

### Font Stack

```css
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
--font-display: 'Instrument Serif', Georgia, serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

### Type Scale (Desktop / Mobile)

| Token | Desktop | Mobile | Weight | Tracking | Usage |
|-------|---------|--------|--------|----------|-------|
| `display-hero` | 80-120px / 0.95 | 44-56px | 400 | -0.02em | Hero headlines, cinematic moments (Serif) |
| `display-lg` | 64-72px / 1.0 | 36-44px | 400 | -0.02em | Secondary hero headlines (Serif) |
| `heading-xl` | 52-64px / 1.1 | 34-40px | 700 | -0.025em | H1 (Inter) |
| `heading-lg` | 40-48px / 1.15 | 28-32px | 600 | -0.02em | H2 (Inter) |
| `heading-md` | 28-32px / 1.2 | 22-24px | 600 | -0.01em | H3 (Inter) |
| `body-lg` | 20px / 1.6 | 18px | 400 | 0 | Lead paragraphs |
| `body` | 16px / 1.6 | 16px | 400 | 0 | Standard body |
| `body-sm` | 14px / 1.5 | 13px | 400 | 0.01em | Captions, metadata |
| `label` | 12-13px / 1.4 | 11-12px | 600 | 0.12em | Section labels, tags (uppercase) |
| `stat` | 48-72px / 1.0 | 32-48px | 700 | -0.03em | Stat numbers (JetBrains Mono) |
| `mono` | 14px / 1.5 | 14px | 500 | 0.02em | Codes, tracking numbers |

### Display Serif Usage

Instrument Serif is used ONLY for: homepage hero, service page heroes, about page hero, pull quotes in client stories. NEVER for: navigation, CTAs, form labels, card titles, footer, metadata, or any functional UI text.

### Label Treatment

Section labels, category tags, service numbers, and metadata use **uppercase** with **wide letter-spacing** (0.08-0.15em) in Inter 600. Color: `--color-primary` or `--color-text-secondary` depending on context. This creates the editorial rhythm throughout the site.

### Stat Number Treatment

Stats are displayed at headline scale (48-72px desktop) in **JetBrains Mono Bold** with tight tracking. They are visual centerpieces with glow accents, not supporting footnotes. Each stat is followed by a label in `label` style underneath.

## Color System

### Primary Palette -- Warm Spectrum

```css
/* Primary Spectrum */
--color-primary: #FF4600;
--color-primary-dark: #CC3800;
--color-primary-light: #FF6B35;
--color-primary-subtle: rgba(255, 70, 0, 0.08);
--color-accent-warm: #FFAB40;
--color-accent-coral: #FF3D00;

/* Dark Backgrounds */
--color-bg-dark: #09090B;
--color-bg-dark-elevated: #141416;
--color-bg-dark-card: #1A1A1E;

/* Light Backgrounds */
--color-bg-light: #FAF9F6;
--color-bg-light-elevated: #FFFFFF;

/* Text */
--color-text-primary: #F5F5F5;
--color-text-primary-light: #1A1A1A;
--color-text-secondary: #8A8A8A;
--color-text-inverse: #FFFFFF;
--color-text-muted: #5A5A5A;

/* Borders */
--color-border-dark: rgba(255, 255, 255, 0.10);
--color-border-light: #E8E5E0;
--color-border-glow: rgba(255, 70, 0, 0.20);

/* Glow Effects */
--glow-primary: rgba(255, 70, 0, 0.40);
--glow-primary-soft: rgba(255, 70, 0, 0.15);
--glow-ambient: rgba(255, 70, 0, 0.08);
--glow-warm: rgba(255, 171, 64, 0.12);

/* Semantic */
--color-success: #10B981;
--color-warning: #F59E0B;
--color-error: #EF4444;
```

### Color Usage Rules

**Dark-first:** `#09090B` is the default canvas. Body text on dark uses `#F5F5F5` (not pure white, reduces eye strain). Light sections are intentional contrast breaks.

**Warm glow:** `#FF4600` is the visual heartbeat. It appears as: CTA button fills and glow shadows, glass panel border accents, ambient background orbs (blurred, 8-15% opacity), stat number color, active nav indicators, section number labels.

**Gradient mesh backgrounds:** Sections can use radial gradients combining `--glow-ambient` and `--glow-warm` as large blurred orbs positioned absolutely behind content. This creates depth and warmth without flat color fills.

**Forbidden color uses:** `#FF4600` as a large flat background fill (use glow/gradient instead). Pure `#000000` anywhere (use `#09090B`). Pure `#FFFFFF` for body text on dark (use `#F5F5F5`). Gray body text below 4.5:1 contrast ratio.

## Glassmorphism 2.0

Glass is a **primary visual language**, not a subtle accent. It creates layered depth.

### Variants

```css
.glass-dark {
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
}

.glass-dark:hover {
  border-color: rgba(255, 70, 0, 0.20);
  background: rgba(255, 255, 255, 0.06);
}

.glass-tinted {
  background: rgba(255, 70, 0, 0.04);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 70, 0, 0.15);
  border-radius: 16px;
  box-shadow: 0 0 40px rgba(255, 70, 0, 0.06);
}

.glass-light {
  background: rgba(255, 255, 255, 0.60);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.80);
  border-radius: 16px;
  box-shadow: 0 4px 32px rgba(0, 0, 0, 0.06);
}

.glass-nav {
  background: rgba(9, 9, 11, 0.80);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

@supports not (backdrop-filter: blur(20px)) {
  .glass-dark { background: rgba(20, 20, 22, 0.97); }
  .glass-tinted { background: rgba(30, 15, 10, 0.97); }
  .glass-light { background: rgba(255, 255, 255, 0.97); }
  .glass-nav { background: rgba(9, 9, 11, 0.97); }
}
```

### When to Use Glass

Navigation header (always, with dark glass). Service cards on dark backgrounds. Stat panels. Client story cards. Modal overlays. Tooltip panels. FAQ accordion containers.

### When NOT to Use Glass

Form inputs. Primary CTA buttons (use solid fill + glow shadow). Any element below 160px in either dimension. Text-only paragraphs.

Maximum two glass layers stacked. Never three.

## Component Patterns

### Cards

**Glass card (dark):** `glass-dark` surface, 24-32px padding, 16px radius. Hover: border brightens to `rgba(255,70,0,0.20)`, subtle lift `translateY(-4px)`, shadow glow appears. Transition: 250ms ease-out.

**Glass tinted card:** `glass-tinted` surface, used for highlighted or active items. Same hover behavior but glow intensifies.

**Flat card (light sections):** `#FFFFFF` background, `--color-border-light` border, 24px padding, 16px radius. Hover: warm shadow `0 8px 32px rgba(255,70,0,0.08)`, lift `translateY(-4px)`.

### Buttons

**Primary:** Solid `#FF4600`, white text, 48px height, 24px horizontal padding, 12px radius. Glow shadow: `0 0 40px rgba(255,70,0,0.35)`. Hover: glow intensifies to `0 0 60px rgba(255,70,0,0.5)`, scale(1.02). Active: scale(0.98), glow reduces. Transition: 200ms ease-out.

**Secondary:** Glass panel with orange border `rgba(255,70,0,0.30)`, orange text, same dimensions. Hover: background fills to `rgba(255,70,0,0.10)`, border brightens. No glow shadow.

**Tertiary:** Text link with animated arrow icon. Text color `#FF4600`. Hover: arrow translates 6px right, color brightens to `--color-primary-light`.

**Magnetic effect (desktop only):** Primary CTA buttons have a subtle magnetic cursor attraction within a 100px radius. The button shifts up to 4px toward the cursor. Disabled on mobile and when `prefers-reduced-motion` is active.

### Form Inputs

48px height, 16px padding, `rgba(255,255,255,0.08)` background on dark, `rgba(255,255,255,0.10)` border, 12px radius. Focus: border transitions to `#FF4600` with glow ring `0 0 0 3px rgba(255,70,0,0.15)`. Error: border `--color-error` with error glow. Labels above inputs, 8px gap, `label` style (uppercase, tracked).

## Imagery Direction

Photography style: documentary realism, natural light, warm grading, shallow DoF for people, medium DoF for environments. Subjects: real operational environments, workers, cargo, documentation. Never: staged handshakes, stock models, generic skylines. All standalone images use `border-radius: 16px` with a subtle warm shadow.

When photography is unavailable: bold typographic treatments over gradient mesh backgrounds (warm orange to charcoal radial gradients), or abstract warm gradient fields. Never use generic stock.

## Icon Rules

24px grid, 1.5px stroke, rounded caps/joins. Always paired with text. On dark backgrounds: `#8A8A8A` default, `#FF4600` active/hover. On light backgrounds: `#6B6B6B` default, `#FF4600` active/hover. Transition: 200ms ease-out.

## Anti-Patterns (Explicitly Forbidden)

- Carousel/slider for hero content
- Auto-playing video backgrounds
- Icon grids without text labels
- Full-width text exceeding 720px max-width
- Pure black (`#000000`) or pure white (`#FFFFFF`) as background
- Flat gray backgrounds (use dark or gradient mesh instead)
- Drop shadows heavier than `0 8px 40px rgba(0,0,0,0.15)`
- Gradient text (use solid color text over gradient backgrounds instead)
- Floating elements that obscure content without dismiss
- More than one sticky/floating CTA on mobile
- Emdash characters in any user-facing copywriting
- Light/white as the default page background (dark-first rule)
- Parallax on text content or interactive elements
- More than 3 ambient glow orbs per viewport
