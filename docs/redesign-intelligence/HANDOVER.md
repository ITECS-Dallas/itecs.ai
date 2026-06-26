# ITECS "Intelligence" Design System — Refactor Handover

**For:** Claude Code CLI (Opus 4.8)
**Goal:** Refactor the entire **itecs.ai** website — every page, section, and component — to adopt the new ITECS "Intelligence" visual system defined here.
**Companion file:** `itecs-intelligence-reference.html` — a complete, dependency-free reference implementation of the system. **Read it first and treat it as the canonical visual contract.** Every token, motif, and component pattern below is realized in that file with copy-paste-ready markup.

---

## 0. TL;DR / Prime directives

1. **Angular, never round.** The ITECS shield is a hard-edged heraldic mark. Its companions must match: chamfered corners, diamonds, hexagons, faceted blades, straight crease lines. **No circles, no rounded blobs, no soft pills** except the CTA buttons and the large section cards (which use a small `border-radius` only).
2. **Three fonts, fixed roles.** Space Grotesk (display), IBM Plex Sans (body), IBM Plex Mono (labels). Never substitute.
3. **Brand blue is earned.** `#004775` is the primary; `#3288B6` is the accent. Navy `#0A1622` anchors dark sections. Everything else is cool neutral.
4. **The narrative is the product.** ITECS is evolving **MSP → MSSP → MIP (Managed Intelligence Provider)**. The site should make AI feel like the natural next layer, not a bolt-on.
5. **Every section earns its layout via a UX law** (Section 4). Use them as the rationale for hierarchy decisions — don't ship the visible `◇` annotation tags from the demo into production.

---

## 1. Brand foundation

ITECS — MSP/MSSP and Managed Cloud Provider since 2002, HQ in Dallas TX, serving Dallas–Fort Worth. Positioning line: **"Business Strategist Technologists."** The strategic thesis driving this redesign: ITECS is becoming a **Managed Intelligence Provider (MIP)** — embedding AI across managed IT, security, and cloud — and wants to be there *before* the rest of the MSP industry realizes it has to be.

**Tone:** authoritative, enterprise, consultative. Audience: SMB / mid-market decision-makers. Confident but not hype-y; "we own it alongside you," not "revolutionary synergy."

### Real assets (hosted, hotlink-safe — already used in the reference file)
| Asset | URL |
|---|---|
| Horizontal logo (SVG) | `https://itecsonline.com/images/logos/itecs-horizontal-logo.svg` |
| Shield icon (SVG) | `https://itecsonline.com/images/logos/itecs-icon-darkblue.svg` |
| Hero background (WebP) | `https://itecsonline.com/images/hero/hero-background-itecs.webp` |
| Partner logos | `https://itecsonline.com/images/logos/partners/{sophos,checkpoint,cisco,sentinelone}-logo.svg` |
| Tech logos | `https://itecsonline.com/images/logos/tech/{azure,aws,veeam}.svg` |

> On a **dark** background, knock the logo/shield to white with `filter:brightness(0) invert(1)`. On light, use as-is. For production, download these into the repo's asset pipeline rather than hotlinking.

---

## 2. Color tokens

Sampled directly from the real ITECS logo and hero gradient. Use these exact values; expose them as CSS custom properties / theme tokens.

```css
/* BRAND CORE */
--itecs-navy:        #0A1622;  /* darkest — hero text, dark sections, footer */
--itecs-navy-2:      #08182a;  /* panel fill behind the AI core */
--itecs-navy-3:      #06314c;  /* crease-fold facet on the deep-blue blade */
--itecs-blue:        #004775;  /* PRIMARY — wordmark color, primary CTA, links */
--itecs-blue-bright: #3288B6;  /* ACCENT — eyebrows, diamonds, crease lines */
--itecs-blue-light:  #5BA8D8;  /* AI-core strokes / glow */
--itecs-blue-pale:   #7fb4d8;  /* accent text on dark */
--itecs-steel:       #326189;  /* tertiary (logo icon blue) */

/* LIGHT SURFACES */
--surface-0: #FFFFFF;  /* cards */
--surface-1: #F3F6F9;  /* page canvas */
--surface-2: #E9EFF5;  /* tinted band */
--hairline:  #dbe3eb;  /* dividers */
--card-line: #e0e8f0;  /* card borders */

/* TEXT */
--ink:       #0A1622;  /* headings */
--ink-body:  #566876;  /* body copy */
--ink-muted: #62717e;  /* secondary body */
--ink-faint: #879199;  /* mono labels / meta */
```

**Usage rules**
- Page background is `--surface-1`, never pure white. Cards are pure white to lift off it.
- Dark sections use `--itecs-navy`. The **primary CTA band** uses `--itecs-blue` (the lighter brand blue) so it reads as an invitation, not a void.
- `--itecs-blue-bright` is the *accent* — small doses: eyebrows, diamonds, crease strokes, the highlighted "MIP" rule. Don't flood large fills with it.
- Two background tones max per page (a light and a dark). Don't introduce gradients-as-decoration.

---

## 3. Typography

```css
--font-display: 'Space Grotesk', sans-serif;  /* headings, stats, big numbers */
--font-body:    'IBM Plex Sans', sans-serif;  /* paragraphs, nav, UI text */
--font-mono:    'IBM Plex Mono', monospace;   /* eyebrows, tags, meta, years, step #s */
```

Load: `https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap`

**Type scale & rules**
| Role | Font | Size / weight | Notes |
|---|---|---|---|
| H1 (hero) | Space Grotesk | 74px / 500, `line-height:1.0`, `letter-spacing:-.025em` | scales down to 48px < 1100px |
| H2 (section) | Space Grotesk | 40–44px / 600, `letter-spacing:-.02em` | |
| H3 (card) | Space Grotesk | 17–20px / 600 | |
| Body | IBM Plex Sans | 14–19px / 400, `line-height:1.6` | `--ink-body` |
| **Eyebrow** | IBM Plex Mono | 12.5px / 500, **`letter-spacing:.22em`**, UPPERCASE | `--itecs-blue-bright`; precedes most headlines |
| Meta / labels / years / step numbers | IBM Plex Mono | 11–12px | `--ink-faint` on light |

- Headlines are tight (negative tracking, ~1.0 line-height) and often **two-tone**: the payoff phrase in `--itecs-blue` or `--itecs-blue-pale`, the rest in ink/white.
- Every major section opens with a **mono eyebrow**. This is the system's rhythm anchor.

---

## 4. Laws of UX — how each section is justified

This site was composed against [lawsofux.com](https://lawsofux.com/). Each section applies a specific principle; preserve the *intent* when you rebuild and extend.

| Section | Law(s) | What it means for the build |
|---|---|---|
| **Nav** | **Hick's Law** | Keep top-level nav to ~5 items. More choices = slower decisions. Push depth into mega-menus, not the top bar. |
| **Hero** | **Aesthetic-Usability Effect**, **Von Restorff (Isolation) Effect**, **Hick's Law** | Polished visuals raise perceived usability. Exactly **one** visually dominant primary CTA; the secondary action is demoted to a plain text link so the primary "pops." |
| **Evolution band** | **Serial Position Effect** | People best remember the **first and last** items in a series. The MSP→MSSP→**MIP** timeline ends on MIP, which is visually highlighted (brand-blue rule, white text) so the AI story is what sticks. |
| **Services** | **Miller's Law / Chunking**, **Law of Common Region** | Group offerings into **~4 chunks** (not 7+). Each chunk sits inside its own bordered card so a shared boundary signals "these belong together." |
| **Advantage** | **Law of Similarity** | All four advantage cards share identical treatment (same size, same top-rule, same type) → the brain reads them as one coherent set. |
| **Proof** | **Peak-End Rule** | Place the highest-emotion moment (a strong testimonial) right before the close, so the visit *ends* on a high. |
| **CTA** | **Fitts's Law**, **Goal-Gradient Effect** | Make the target **big and unmissable** (large padding, high contrast). Show a visible **3-step path** ("Book a call → Free assessment → Your roadmap") so the goal feels close, increasing completion. |

**Additional laws to apply as you extend to other pages**
- **Jakob's Law** — users expect your site to work like other sites they know. Keep conventional patterns (logo top-left links home, nav top, footer with sitemap) even inside this bold aesthetic.
- **Law of Proximity** — group related controls/labels tightly; separate unrelated groups with whitespace, not borders, where possible.
- **Tesler's Law (conservation of complexity)** — for forms (contact, assessment request), absorb complexity for the user; ask the minimum, default the rest.
- **Doherty Threshold** — keep interactions < 400ms; the `coreGlow` animation and button hovers are intentionally subtle and fast.
- **Postel's Law** — be liberal in what forms accept (phone formats, etc.), strict in what you submit.

---

## 5. Motifs — the load-bearing visual language

These are what make it unmistakably ITECS. Reuse relentlessly; invent nothing rounder.

### 5.1 Chamfer (notched corner) — the signature
Every card, chip, tag, and stat tile has **one corner sliced at 45°** (bottom-left in the reference). This echoes the shield's cut shoulders.
```css
.chamfer-sm{clip-path:polygon(0 0,100% 0,100% 100%,14px 100%,0 calc(100% - 14px));}
.chamfer-md{clip-path:polygon(0 0,100% 0,100% 100%,18px 100%,0 calc(100% - 18px));}
```
Scale the notch (14–18px) with the element. A `border` or `border-top` still shows through the clip and is used to color the card (e.g. advantage cards get a 2px `--itecs-blue` top rule).

### 5.2 Diamond — the bullet/marker
A rotated square. The **universal list marker and accent dot** — replaces every round bullet. Mirrors the circuit-node dots on the shield.
```css
.diamond{width:8px;height:8px;background:var(--itecs-blue-bright);transform:rotate(45deg);}
```

### 5.3 Hexagon — the "intelligence" / AI mark
Hard-edged six-plane polygon. Used for the **AI core graphic**, avatar frames, and **step badges**. Never a circle.
```css
.hex{clip-path:polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%);}
```

### 5.4 The AI Core (hero/intelligence graphic)
A faceted hexagon SVG with internal facet lines radiating to node dots, a glowing center, and a slow `coreGlow` pulse (3s, respects `prefers-reduced-motion`). It is the brand's **AI signifier** — use it anywhere "Intelligence/MIP" is the subject. Full SVG is in the reference file's Evolution section. Keep it monochrome-blue on navy.

### 5.5 Faceted blades & crease lines
Large off-canvas **angular shapes** (`clip-path:polygon(...)`) in `--itecs-blue` with a darker fold facet (`--itecs-navy-3`) imply a knife-cut, Lamborghini-style plane. Thin **straight `polyline`s** (1.5px, `--itecs-blue-bright`, ~0.5 opacity) with a node dot at the bend act as "circuit traces." Use these as the hero backdrop and as section accents. **Never replace these with curves or circles** — that was an explicit, rejected direction.

### 5.6 Diagonal split panels
Dark feature panels (Evolution, Proof) cut the composition on a **diagonal** via `clip-path`, with a 2px bright `--itecs-blue-bright` sliver on the crease and a faint 34px ops-grid (`linear-gradient` 1px lines at .06 opacity) inside the dark region. This is the "command/NOC" texture.

---

## 6. Components catalog (all realized in the reference file)

| Component | Key traits |
|---|---|
| **Nav bar** | Logo left, ~5 text links center, one filled CTA right. `position:relative;z-index:6` so it sits above hero art. |
| **Primary button** | `--itecs-blue` fill, white text, `border-radius:10px`, generous padding (17px 32px), soft brand-tinted shadow, `translateY(-2px)` on hover. |
| **On-dark button** | White fill, `--itecs-blue` text (for the blue CTA band). |
| **Ghost button** | Transparent, 1px white-40% border (secondary on dark). |
| **Text link CTA** | The demoted secondary action — plain colored text + arrow. |
| **Eyebrow** | Mono, `.22em` tracking, uppercase, accent color. |
| **Stat tile** | Space Grotesk number (38–40px) over a mono/sans label. Used in hero row and proof column. |
| **Service/advantage card** | White, chamfered, diamond + mono index, H3, body, "Explore →". Min-height to equalize. |
| **Evolution timeline** | 3 equal columns, top rules; last column (MIP) highlighted. |
| **AI core panel** | Diagonal dark plate + crease sliver + ops grid + hex AI core SVG. |
| **Testimonial** | Navy card, Space Grotesk quote at 26px/500, hex-framed initials avatar. |
| **CTA band** | `--itecs-blue` bg, faint white shield watermark, faceted shape, goal-gradient step row, big target. |
| **Footer** | Navy, white logo left, mono location line right. |

---

## 7. Layout & spacing

- **Content max-width 1440px**, centered (`.wrap`). Horizontal padding **60px** desktop, 28px on small. The design targets a 1440-wide viewport (MacBook Pro 14" M4) — make it look intentional there first, then degrade gracefully.
- Section vertical rhythm: ~70–92px top/bottom on major sections.
- **Layout with flex/grid + `gap`** — never margin-stacked inline elements. Card grids: `repeat(4,1fr)` → `repeat(2,1fr)` < 1100px → 1 col on mobile.
- Radius is reserved: `10–11px` on buttons, `16px` on large section cards. **Everything else is chamfered or square.**

---

## 8. Responsive

The reference includes a `@media (max-width:1100px)` block: padding shrinks, H1→48px, 4-col→2-col, splits stack, and decorative `.hero-art` elements hide (they're positioned for the wide canvas). Extend this pattern: **decorative faceted shapes hide on mobile; content reflows to a single column.** Keep CTAs full-tap-width (≥44px tall) on mobile.

---

## 9. Refactor plan (suggested order)

1. **Tokenize.** Drop Section 2/3 tokens into the site's theme layer (CSS vars, Tailwind config, or styled-system theme). Load the three fonts globally.
2. **Build the motif primitives** as reusable classes/components: `Chamfer`, `Diamond`, `Hex`, `Eyebrow`, `Button` variants, `AICore`, `FacetedBackdrop`. The reference file's `<style>` block is your starting CSS.
3. **Rebuild shared chrome** (Nav, Footer) first — they appear on every page.
4. **Port the homepage** section-by-section from the reference, wiring real CMS/content.
5. **Template the inner pages** (Services detail, Cybersecurity, Cloud, Intelligence/AI, Industries, Company, Contact) by recomposing the same components. Each page: mono eyebrow + Space Grotesk H2 + the relevant cards/panels. Use the AI Core motif on the Intelligence/AI page as its hero.
6. **Apply the UX laws** (Section 4) to every new page's hierarchy — one dominant CTA per view, chunk lists to ~4, end flows on a proof peak, etc.
7. **Strip demo annotations.** The `◇`-tagged "law" chips from the original demo are teaching aids — do **not** ship them.
8. **QA:** accessible color contrast (navy/blue on light passes; verify accent text on dark), keyboard nav, `prefers-reduced-motion`, real asset paths, Lighthouse.

---

## 10. Hard "don'ts"

- ❌ No circles, rounded blobs, or soft organic shapes. (Explicitly rejected by the client.)
- ❌ No gradient-soup backgrounds, no glassmorphism for its own sake.
- ❌ No font substitutions; no Inter/Roboto/Arial.
- ❌ No emoji.
- ❌ Don't flood large areas with the bright accent `#3288B6` — it's a spice, not a base.
- ❌ Don't ship the demo's visible UX-law annotation chips.
- ❌ Don't center long rows of cards such that they overflow; use the responsive grid.

---

*Reference implementation: `itecs-intelligence-reference.html`. Open it in a browser to see the full system live; read its source for exact, copy-ready markup of every token, motif, and component listed above.*
