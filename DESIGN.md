# ITECS.AI — Design Schematic

## Identity

**itecs.ai** is ITECS's AI-vertical website — not a sub-brand, but a dedicated showcase for ITECS's AI service offerings. The parent company (itecsonline.com) is a Dallas-based MSP established in 2002. This site positions ITECS as a forward-looking AI consultancy embedded within a battle-tested IT operations firm.

### Logo
- ITECS shield icon: circuit-trace nodes emerging from a shield silhouette
- Primary icon color: `#081821` (deep navy-black) with white strokes
- SVG assets: `/home/itecs/itecs-icon-white-blkback.svg` and `.png`
- On dark backgrounds: white icon on transparent or `#081821` fill

---

## Visual Direction

**Reference sites:** Palantir, SentinelOne, Apple
**Mood:** Futuristic, aggressive, authoritative — not corporate-sterile. Think command-center aesthetics, not SaaS landing pages.

### Core Principles
1. **Dark-first** — Deep blacks and near-blacks dominate. Light elements are surgical, never backgrounds.
2. **Motion as meaning** — Animations convey intelligence, precision, autonomy. Nothing decorative.
3. **Sparse typography** — Thin/light weights. Headlines breathe. No bold walls of text.
4. **Depth through light** — Subtle glows, gradients, and translucency create layering without clutter.

---

## Color System

### Backgrounds
| Token | Hex | Usage |
|---|---|---|
| `--bg-void` | `#030712` | Primary page background (near-black) |
| `--bg-surface` | `#0a1120` | Card/section surfaces |
| `--bg-elevated` | `#111827` | Elevated panels, modals, nav |

### Brand Colors
| Token | Hex | Usage |
|---|---|---|
| `--brand-primary` | `#081821` | ITECS deep navy — logo fills, anchoring elements |
| `--brand-accent` | `#06b6d4` | Cyan — primary accent, CTAs, active states, glows |
| `--brand-accent-bright` | `#22d3ee` | Bright cyan — hover states, emphasis |
| `--brand-purple` | `#8b5cf6` | Violet — secondary accent, gradients, tags |

### Text
| Token | Hex | Usage |
|---|---|---|
| `--text-primary` | `#f1f5f9` | Primary text (slate-100) |
| `--text-secondary` | `#94a3b8` | Secondary/muted text (slate-400) |
| `--text-dim` | `#64748b` | Tertiary labels, captions (slate-500) |

### Effects
| Token | Hex | Usage |
|---|---|---|
| `--glow-cyan` | `rgba(6, 182, 212, 0.15)` | Ambient glow behind CTAs, icons |
| `--glow-purple` | `rgba(139, 92, 246, 0.10)` | Secondary glow for gradient overlays |
| `--border-subtle` | `rgba(255, 255, 255, 0.06)` | Card borders, dividers |
| `--border-active` | `rgba(6, 182, 212, 0.3)` | Active/hover borders |

---

## Typography

### Font Stack
- **Primary (display + body):** Geist Sans (already loaded via `next/font/google`)
- **Monospace (code, data, stats):** Geist Mono

### Scale & Weight
| Element | Size | Weight | Tracking |
|---|---|---|---|
| Hero headline | `text-5xl` → `text-7xl` | 200 (extralight) | `-0.03em` |
| Section headline | `text-3xl` → `text-5xl` | 300 (light) | `-0.02em` |
| Subheadline | `text-xl` → `text-2xl` | 300 (light) | Normal |
| Body | `text-base` → `text-lg` | 350–400 | Normal |
| Caption / label | `text-sm` | 400 | `0.05em` (uppercase) |
| Stat / number | `text-6xl` → `text-8xl` | 100 (thin) | `-0.04em` |

**Key rule:** Headlines never exceed `font-weight: 300`. Body text stays at 350–400. Bold (`600+`) is reserved for tiny labels and micro-interactions only.

---

## Animation & Motion

### Stack
- **Framer Motion** — scroll-triggered reveals, layout animations, gesture responses
- **CSS animations** — ambient effects (glows, pulses, gradients)
- **SVG path animations** — circuit traces, shield icon, data-flow visualizations

### Animation Patterns

**1. Scroll Reveals (Framer Motion)**
- Fade-up with slight Y translation (`y: 30 → 0, opacity: 0 → 1`)
- Staggered children with `0.1s` delay between items
- `viewport: { once: true, amount: 0.3 }` — trigger at 30% visibility, don't re-trigger

**2. Parallax Layers**
- Background elements move at `0.3x` scroll speed
- Foreground content at `1x` (normal)
- Floating orbs/glows at `0.5x` — creates depth without being distracting
- Implement via Framer Motion `useScroll()` + `useTransform()`

**3. Ambient Effects (CSS)**
- Slow-rotating gradient orbs behind sections (`animation: rotate 20s linear infinite`)
- Pulsing glow behind the ITECS shield icon
- Grid-line backgrounds that subtly shift on scroll
- Grain/noise texture overlay at 2–4% opacity for depth

**4. SVG Animations**
- Circuit trace paths draw on scroll (`pathLength` animation)
- Shield icon assembles on first load
- Data-flow lines connecting service cards
- Node-pulse animations at circuit intersections

**5. Micro-interactions**
- Buttons: scale `1.02` on hover + glow intensifies
- Cards: subtle `translateY(-2px)` + border glow on hover
- Navigation links: underline slides in from left
- Cursor-following glow on hero section (optional, performant via CSS `radial-gradient`)

### Performance Rules
- All animations use `transform` and `opacity` only (GPU-composited)
- `will-change` only on actively animating elements
- `prefers-reduced-motion` media query disables all motion
- Lazy-load below-fold animations via Intersection Observer

---

## Layout & Spacing

### Grid
- Max content width: `1280px` (Tailwind `max-w-7xl`)
- Horizontal padding: `px-6` mobile → `px-8` desktop
- Section vertical spacing: `py-24` → `py-32` (generous whitespace, Apple-style)

### Section Architecture
```
[Full-bleed hero — viewport height, parallax bg]
[Services grid — 3-col, staggered reveal]
[Feature deep-dive — alternating left/right with parallax images]
[Stats bar — large thin numerals, count-up animation]
[Testimonials / Trust logos — subtle carousel]
[CTA section — centered, glow backdrop]
[Footer — minimal, dark]
```

---

## Component Patterns

### Navigation
- Fixed top, transparent → `backdrop-blur-xl` + `bg-surface/80` on scroll
- Logo left, links center, CTA right
- Slim height: `h-16`
- Mobile: slide-in overlay (not dropdown), full-screen dark

### Hero Section
- Full viewport height (`min-h-screen`)
- Centered or left-aligned text
- Animated gradient mesh or particle field background
- Single strong headline (extralight), one sentence subline, one CTA
- Shield icon animated in

### Cards
- `bg-surface` with `border-subtle` border
- `rounded-xl` corners
- Hover: border transitions to `border-active`, subtle glow, slight lift
- Icon (lucide-react) at top, light weight text below

### Buttons
- Primary: `bg-brand-accent text-void` — solid cyan, dark text
- Secondary: `border border-brand-accent text-brand-accent` — ghost button
- Both: `rounded-lg px-6 py-3 text-sm font-medium tracking-wide uppercase`
- Hover: glow halo + slight scale

### Stats / Metrics
- Large thin numerals (`font-weight: 100, text-7xl`)
- Count-up animation on scroll entry
- Label below in small uppercase (`text-dim`)
- Examples: "92% compliance rate", "3.2x ROI", "45% faster deployment"

---

## Page Structure (Sitemap)

```
/                   — Homepage (hero, services overview, stats, CTA)
/services           — All AI services
/services/[slug]    — Individual service detail
/about              — ITECS AI story, team, mission
/contact            — Contact form, consultation booking
```

### Service Categories (from itecsonline.com AI offerings)
1. **AI Consulting & Strategy** — Readiness assessments, ROI modeling, governance
2. **Custom AI Development** — ML models, copilots, RAG systems
3. **AI Integration** — Azure OpenAI, Microsoft Fabric, Databricks, legacy modernization
4. **AI Security & Compliance** — HIPAA, FINRA, SOX alignment, PHI/PII redaction
5. **AI-Optimized SEO / GEO** — Generative engine optimization

---

## File Organization

```
src/
├── app/
│   ├── layout.tsx              # Root layout, fonts, global providers
│   ├── page.tsx                # Homepage
│   ├── services/
│   │   ├── page.tsx            # Services listing
│   │   └── [slug]/page.tsx     # Service detail
│   ├── about/page.tsx
│   └── contact/page.tsx
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # Fixed nav
│   │   └── Footer.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── SectionHeading.tsx
│   │   └── StatCounter.tsx
│   ├── sections/               # Page-level sections
│   │   ├── Hero.tsx
│   │   ├── ServicesGrid.tsx
│   │   ├── StatsBar.tsx
│   │   ├── FeatureShowcase.tsx
│   │   └── CTASection.tsx
│   └── effects/
│       ├── ParallaxWrapper.tsx
│       ├── ScrollReveal.tsx
│       ├── GradientOrb.tsx
│       ├── GridBackground.tsx
│       └── CircuitTrace.tsx    # SVG circuit animation
└── lib/
    └── constants.ts            # Service data, stats, nav links
```

---

## Dependencies

| Package | Purpose |
|---|---|
| `next` 16 | Framework |
| `react` 19 | UI |
| `tailwindcss` v4 | Styling |
| `framer-motion` | Scroll animations, parallax, gestures |
| `lucide-react` | Icons |
| `geist` (via next/font) | Typography |
