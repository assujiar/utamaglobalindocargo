# 09 — Design System Rules

## Core Principle

The design system exists to make the editorial concept reproducible and consistent. Every new page, component, or content block must feel like it belongs to the same publication without requiring the original designer to approve it.

## Layout Principles

### Grid

Desktop: 12-column grid, 1440px max-width, 24px column gutters, 80px horizontal page margins. Asymmetric layouts are the default — a typical content section uses a 7/5 or 5/7 split. Full-width sections break the grid intentionally for visual punctuation.

Tablet (768-1024px): 8-column grid, 20px gutters, 40px margins.

Mobile (<768px): 4-column grid, 16px gutters, 20px margins. Content stacks vertically. No side-by-side layouts below 768px except small paired elements.

### Spacing Scale

8px base unit. Scale: 4, 8, 12, 16, 24, 32, 48, 64, 80, 96, 120, 160px. No arbitrary values. Section vertical padding: 80-120px desktop, 48-64px mobile. Component internal padding: 16-32px.

### Section Rhythm

Pages alternate between "open" sections (generous whitespace, large typography) and "dense" sections (cards, grids, detail). Never three dense or three open sections consecutively.

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
--font-display: 'Instrument Serif', 'Playfair Display', Georgia, serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

### Type Scale (Desktop / Mobile)

| Token | Desktop | Mobile | Weight | Usage |
|-------|---------|--------|--------|-------|
| `display-xl` | 96px / 1.0 | 48px | 400 | Hero headlines (editorial) |
| `display-lg` | 72px / 1.05 | 40px | 400 | Hero headlines (standard) |
| `heading-xl` | 48px / 1.15 | 32px | 700 | H1 |
| `heading-lg` | 36px / 1.2 | 24px | 600 | H2 |
| `heading-md` | 28px / 1.25 | 22px | 600 | H3 |
| `body-lg` | 20px / 1.6 | 18px | 400 | Lead paragraphs |
| `body` | 16px / 1.6 | 16px | 400 | Standard body |
| `body-sm` | 14px / 1.5 | 13px | 400 | Captions, metadata |
| `mono` | 14px / 1.5 | 14px | 500 | Stats, codes |

### Serif Display Usage

Instrument Serif is used ONLY for: homepage hero, service page heroes, about page hero, pull quotes, insight article heroes. NEVER for: navigation, CTAs, form labels, card titles, footer, metadata, or any functional UI text.

## Color System

```css
/* Primary */
--color-primary: #FF4600;
--color-primary-dark: #CC3800;
--color-primary-light: #FF6B33;
--color-primary-subtle: rgba(255, 70, 0, 0.08);

/* Neutrals */
--color-bg-light: #FAFAF8;
--color-bg-dark: #0A0A0C;
--color-bg-dark-elevated: #141416;
--color-text-primary: #1A1A1A;
--color-text-secondary: #6B6B6B;
--color-text-inverse: #FFFFFF;
--color-border: #E5E5E3;
--color-border-dark: rgba(255, 255, 255, 0.12);

/* Semantic */
--color-success: #00875A;
--color-warning: #FFAB00;
--color-error: #DE350B;
```

### Color Usage Rules

`#FF4600` is used for: primary CTAs, active navigation, editorial accents (section numbers, pull quote borders), hover accents. NOT for: large background fills, body text, decorative borders. Maximum two dark sections (`#0A0A0C`) per page — hero + one editorial break. The rest is light.

## Glassmorphism Rules

### When to Use

Navigation header on scroll, service cards overlaying hero images, stat panels overlaying dark backgrounds, modal overlays, tooltip panels.

### When NOT to Use

Body text containers, form inputs, primary CTA buttons, mobile nav overlays, any element below 200px in either dimension.

### Implementation

```css
.glass-dark {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
}

.glass-light {
  background: rgba(255, 255, 255, 0.60);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.80);
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
}

.glass-nav {
  background: rgba(250, 250, 248, 0.80);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

@supports not (backdrop-filter: blur(24px)) {
  .glass-dark { background: rgba(20, 20, 22, 0.95); }
}
```

Maximum two glass layers stacked. Never three.

## Imagery Direction

Photography style: documentary realism, natural light, warm grading, shallow DoF for people, medium DoF for environments. Subjects: real operational environments, workers, cargo, documentation. Never: staged handshakes, stock models, generic skylines. All standalone images use `border-radius: 12px`.

When photography is unavailable: bold typographic treatments, abstract gradient fields (warm orange to charcoal), or geometric compositions. Never use generic stock.

TODO-ASSET: commission photography set covering Jakarta warehouse, HQ interior, port operations, fleet.

## Icon Rules

24px grid, 1.5px stroke, rounded caps/joins. Always paired with text. Color follows context: `--color-text-primary` on light, `--color-text-inverse` on dark, `--color-primary` for active states.

TODO-ASSET: design or source line-icon set for logistics concepts.

## Component Patterns

### Cards

**Flat card:** light background, subtle border, 16-24px padding, 12px radius. Hover lifts with shadow.
**Glass card:** glassmorphism surface, 24px padding, 16px radius. Hover increases opacity.

### Buttons

**Primary:** solid `#FF4600`, white text, 48px height, 24px padding, 8px radius. Hover darkens.
**Secondary:** outline `#FF4600`, same dimensions. Hover fills subtle.
**Tertiary:** text link with arrow icon. Hover translates arrow 4px right.

### Form Inputs

48px height, 16px padding, `--color-border` border, 8px radius. Focus: `--color-primary` border with subtle shadow ring. Error: `--color-error` border. Labels above inputs, 8px gap.

## Anti-Patterns (Explicitly Forbidden)

- Carousel/slider for hero content
- Parallax on images containing text
- Auto-playing video backgrounds
- Icon grids without text labels
- Full-width text exceeding 720px max-width
- Drop shadows heavier than `0 4px 24px rgba(0,0,0,0.08)`
- Gradient text
- Floating elements that obscure content without dismiss
- More than one sticky/floating CTA on mobile
