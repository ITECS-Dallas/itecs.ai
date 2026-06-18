# ITECS.AI — Design Schematic ("Intelligence" System)

> Canonical visual contract: `docs/redesign-intelligence/HANDOVER.md` +
> `docs/redesign-intelligence/itecs-intelligence-reference.html`.
> This document is the working summary; the reference HTML wins any conflict.

## Identity

**itecs.ai** is ITECS's AI-vertical website — a dedicated showcase for ITECS's AI
service offerings. The parent company (itecsonline.com) is a Dallas-based MSP/MSSP
established in 2002, HQ in Plano TX. Positioning line: **"Business Strategist
Technologists."** Strategic thesis: ITECS is evolving **MSP → MSSP → MIP (Managed
Intelligence Provider)** — embedding AI across managed IT, security, and cloud.

## Prime directives

1. **Angular, never round.** Chamfered corners, diamonds, hexagons, faceted blades,
   straight crease lines. **No circles, no rounded blobs, no soft organic shapes.**
   Radius is reserved: **10px** on CTA buttons, **16px** (`--r-section`) on large
   section cards. Everything else is chamfered (`clip-path`) or square.
2. **Light canvas.** Page background is `--canvas` (`#F3F6F9`), never pure white.
   Cards are pure white (`--card`) to lift off it. Dark sections use `--itecs-navy`.
3. **Brand blue is earned.** `#004775` is primary (CTAs, links, wordmark);
   `#3288B6` is the bright accent (eyebrows, diamonds, crease lines) — a spice, not
   a base. Don't flood large fills with the bright accent.
4. **Three fonts, fixed roles.** Space Grotesk (display/headings/numbers),
   IBM Plex Sans (body/UI), IBM Plex Mono (eyebrows/tags/meta). Never substitute.
5. **Every section opens with a mono eyebrow** (`.eyebrow`) — the system's rhythm anchor.

## Color tokens (defined in `src/app/globals.css`)

```
--itecs-navy #0A1622   --itecs-blue #004775 (PRIMARY)   --itecs-blue-bright #3288B6 (ACCENT)
--itecs-navy-2 #08182a --itecs-blue-light #5BA8D8        --itecs-blue-pale #7fb4d8 (on-dark text)
--itecs-navy-3 #06314c --itecs-steel #326189
--canvas #F3F6F9  --canvas-sunken #E9EFF5  --card #FFFFFF  --hairline #dbe3eb  --card-line #e0e8f0
--ink #0A1622 (headings)  --ink-body #566876  --ink-muted #62717e  --ink-faint #879199 (mono meta)
```

Legacy semantic tokens (`--bg-base`, `--text-primary`, `--brand`, `--brand-accent`,
`--surface-*`, `--border-*`, …) are **re-pointed** to Intelligence values so existing
token-driven components cascade to the light system automatically. Prefer the new
Tailwind utilities for new work: `bg-canvas`, `bg-card`, `bg-canvas-sunken`,
`text-ink` / `text-ink-body` / `text-ink-muted` / `text-ink-faint`,
`bg-itecs-blue`, `text-itecs-blue`, `text-itecs-blue-bright`, `bg-itecs-navy`.

## Typography

- H1 (hero): Space Grotesk ~74px / **500**, `leading-[1.0]`, `tracking-[-0.025em]`; scales down on mobile.
- H2 (section): Space Grotesk 40–44px / **600**, `tracking-[-0.02em]`.
- H3 (card): Space Grotesk 17–20px / **600**.
- Body: IBM Plex Sans 14–19px / 400, `leading-relaxed`, `--ink-body`.
- **Eyebrow** (`.eyebrow`): IBM Plex Mono 12.5px, `letter-spacing:.22em`, UPPERCASE, `--itecs-blue-bright`.
- Headlines are tight and often **two-tone**: payoff phrase in `--itecs-blue` (light)
  or `--itecs-blue-pale` (dark), the rest in ink/white. **Never gradient text.**
- A global rule in `globals.css` sets `h1,h2,h3 { font-family: var(--font-display) }`.

## Motifs (utilities in `globals.css`, components in `src/components/ui/`)

- **Chamfer** — the signature notched corner. `.chamfer-sm/-md/-lg` (clip-path) or the
  `<Chamfer>` component. Apply to every card, chip, tag, and stat tile. A `border`
  (often `border-l-2 border-itecs-blue` or a top rule) shows through the clip to color the edge.
  Chamfer clips drop-shadows, so chamfered cards rely on **border + canvas contrast**, not shadow.
- **Diamond** — rotated square (`.diamond`, `<Diamond>`). The universal bullet / list marker. Replaces every round dot.
- **Hex** — `.hex` / `<Hex>`. The AI mark: step badges, avatar frames, icon chips. Never a circle.
- **AI Core** — `<AICore>` (`src/components/ui/AICore.tsx`): faceted-hex SVG with facet lines,
  node dots, glowing center, slow `coreGlow` pulse. The brand's AI signifier; monochrome-blue on navy.
- **Faceted backdrop** — `<FacetedBackdrop>`: diagonal dark plate + bright crease sliver +
  faint `.ops-grid` + AI Core. Used by the Evolution band and every sub-page hero.
- **Faceted blades / crease lines** — large off-canvas `clip-path` polygons in `--itecs-blue`
  with a `--itecs-navy-3` fold facet; thin straight `polyline`s (1.5px `--itecs-blue-bright`,
  ~0.5 opacity) with node dots. The homepage hero backdrop. Never curves.

## Heroes (the two canonical patterns)

- **Homepage hero** (`src/components/sections/Hero.tsx`): light faceted block —
  off-canvas blue blade bleeding top-right, knocked-out white shield
  (`/images/logos/itecs-icon-darkblue.svg` + `brightness(0) invert(1)`), crease polyline +
  nodes, mono eyebrow, two-tone Space Grotesk H1, **one** primary CTA + a demoted text link, stat row.
- **Sub-page heroes** (`ServiceHero`, `ManufacturingHero`, Evolution band): the dark
  **navy "Managed intelligence" panel** — `--itecs-navy` rounded plate, diagonal split,
  bright crease sliver, `.ops-grid` texture, and the hex **AI Core** on the right.

## Buttons (`src/components/ui/Button.tsx`)

`primary` (solid `--itecs-blue`, white text, soft brand shadow, r=10) · `secondary`
(outline on light) · `tertiary` (demoted text link + arrow) · `ondark` (white fill, blue
text — for the blue CTA band) · `ghost` (transparent, hairline white border — on dark) · `icon`.

## Layout & motion

- Content max-width `max-w-7xl`; horizontal padding 24px mobile / 32px desktop.
- Section rhythm ~`py-24 md:py-32`. Card grids: 4-col → 2-col `<1100px` → 1-col mobile.
- Layout with flex/grid + `gap`. Decorative faceted art is `hidden lg:block` (hides on mobile).
- Framer Motion for scroll reveals/parallax; CSS `coreGlow` for the AI core. Respect
  `prefers-reduced-motion`. Keep interactions < 400ms (Doherty).

## Hard "don'ts"

- ❌ No circles, rounded blobs, or soft organic shapes (`GradientOrb` is retired to a no-op).
- ❌ No gradient-soup backgrounds, no glassmorphism for its own sake, **no gradient text**.
- ❌ No font substitutions (no Geist/Inter/Roboto/Arial).
- ❌ No emoji.
- ❌ Don't flood large areas with the bright accent `#3288B6`.
- ❌ Don't ship the reference demo's visible `◇` UX-law annotation chips.

## Laws of UX (preserve the intent when extending)

Nav → Hick's (≤5 top-level) · Hero → Aesthetic-Usability + Von Restorff (one dominant CTA) ·
Evolution → Serial Position (ends on MIP) · Services → Miller/Chunking + Common Region (≈4 cards) ·
Advantage → Similarity · Proof → Peak-End · CTA → Fitts + Goal-Gradient (big target + 3-step path).
Also: Jakob's (conventional patterns), Tesler's/Postel's (forms ask minimum, accept liberally).
