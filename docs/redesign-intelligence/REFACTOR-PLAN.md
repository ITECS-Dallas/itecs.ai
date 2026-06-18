# ITECS "Intelligence" Redesign — Sliced Refactor Plan

**Source of truth:** `HANDOVER.md` + `itecs-intelligence-reference.html` (canonical visual contract) in this folder.
**Goal:** Replace the current dark-only `#030712`/Geist/cyan-violet system with the light "Intelligence" system (ITECS blue `#004775`, angular motifs, Space Grotesk / IBM Plex Sans / IBM Plex Mono) across the whole site.

## Method & ordering principle

The site is **token-driven**: CSS custom properties in `globals.css` are bridged to Tailwind via `@theme inline`, and ~100 components consume semantic utilities (`bg-bg-void`, `text-text-primary`, `text-brand-accent`, …). That lets us flip the *foundation* once and cascade, then rebuild the high-visibility, motif-heavy surfaces by hand.

Slices are **dependency-ordered and each leaves `npm run build` green.** Earlier slices cascade into later ones (shared section primitives re-skin 8 hub pages + spokes at once), so visual coverage front-loads: Slices 1–5 land ~80% of the site; 6–7 mop up the long tail.

**Two explicit hero patterns (user-specified):**
- **Homepage hero** = the light faceted "Your IT, secured. / Your business, made intelligent." block (reference lines 143–175): light canvas, off-canvas blue blade bleeding top-right, knocked-out white shield, crease polyline + node, eyebrow + two-tone H1 + one primary CTA + demoted text link + stat row.
- **Sub-page heroes** = the dark "Beyond managed services. / Managed intelligence." panel (reference lines 181–230): navy plate, diagonal split, bright crease sliver, ops-grid texture, and the hex **AI Core** SVG on the right.

**Out of scope:** `/p/` proposal pages (intentionally bespoke, hidden, own template) and the `api/` routes. The untracked `itecs-ai-website/` dir at repo root is left untouched unless you say otherwise.

---

## Slice 0 — Plan & inventory ✅ (this doc)
Handover extracted into `docs/redesign-intelligence/`; codebase mapped; plan written.

## Slice 1 — Design foundation (tokens · fonts · motif primitives)
The keystone. Everything else depends on it.
- **Fonts:** swap `Geist`/`Geist_Mono` in `layout.tsx` for `next/font/google` `Space_Grotesk`, `IBM_Plex_Sans`, `IBM_Plex_Mono`; expose `--font-display/-body/-mono`. Remove `className="… dark"` from `<html>`.
- **Tokens:** rewrite `globals.css` `:root` to the Intelligence palette (Section 2/3 of handover). Re-point the **existing** legacy var names (`--bg-base`, `--text-primary`, `--brand`, `--brand-accent`, …) to light-mode Intelligence values so well-behaved token-using components flip to light automatically; add new semantic tokens (`--itecs-blue`, `--itecs-navy`, `--surface-1/2`, `--ink`, `--ink-body`, …). Add `coreGlow` keyframe; keep `prefers-reduced-motion`.
- **Tailwind bridge:** extend `@theme inline` with the new color/font tokens (`--color-itecs-blue`, `--color-surface-1`, `--color-ink`, …) while keeping legacy aliases pointed at new values.
- **Motif CSS utilities:** `.chamfer-sm/.md`, `.diamond(.sm)`, `.hex`, `.eyebrow` (lifted from the reference `<style>`).
- **Motif components** in `src/components/ui/` : `Chamfer`, `Diamond`, `Hex`, `Eyebrow`, `AICore` (the faceted-hex SVG), `FacetedBackdrop` (blade + crease + ops-grid). Rework `Button` variants → `primary` (blue fill, r=10), `on-dark` (white fill), `ghost-dark`, `text` (demoted link). Retire gradient sheen.
- **Exit check:** `tsc --noEmit` + `build` pass; site renders light with new type. Rough edges expected on un-migrated pages.

## Slice 2 — Global chrome (Header · Footer · AnnouncementBar)
On every page → highest leverage. Hick's-law nav (~5 items, logo left, one primary CTA right, light bar, `z-index` above hero art). Navy footer with white-knockout logo + mono location line. Re-skin `HeaderMenus` mega-menu to chamfer/diamond/eyebrow; keep conventional patterns (Jakob's Law).

## Slice 3 — Homepage (`/`)
Rebuild `src/app/page.tsx` section-by-section from the reference, wired to `constants.ts`:
light faceted **Hero** → dark **Evolution** band w/ AI Core (MSP→MSSP→**MIP**, last item highlighted) → **Services** 4-chunk chamfer cards → **Advantage** tinted band (4 identical top-ruled cards) → **Proof** peak (navy testimonial + hex avatar + stat tiles) → **CTA** band (blue, goal-gradient 3-step path, big target) → footer. Replace/retire `Hero`, `AIOperationsConsole`, gradient-text, glow backgrounds.

## Slice 4 — Sub-page hero + shared service section primitives
- **`ServiceHero`** → rebuilt as the dark navy "Managed intelligence" panel + **AI Core** (the user's sub-page-hero spec). Data-driven from `SERVICES`, so all 8 hubs + spokes get it at once.
- Re-skin the shared, data-driven sections used across hubs: `ServiceFeatures`, `ServiceStats`, `HowItWorks`, `FAQ`, `CTASection`, `Integrations`, `ServicesGrid`, `Card`, `SectionHeading`, `StatCounter` → chamfer cards, diamond bullets, mono eyebrows, hex step badges. This single slice re-skins most of the hub/spoke surface area.

## Slice 5 — Hub & spoke + commercial pages
Walk the 8 hubs (`/consulting`, `/custom-ai-agents`, `/automation`, `/training`, `/ai-receptionist`, `/crm-sales-ai`, `/ai-knowledge-base`, `/data-audit`) + `/managed-intelligence-provider` (uses **AI Core as its hero motif**), `/services`, `/pricing`, and their bespoke components (workflow/RAG/call-flow diagrams, `ComparisonTable`, `PricingTable`, `MIPEvolutionDiagram`, `MIPComparison`). Apply UX laws per page: one dominant CTA, chunk to ~4, end on a proof peak.

## Slice 6 — Insights + Manufacturing + AI-SEO verticals
`InsightsHero`, `InsightCards`, `InsightArticleLayout`, `ArticleShareBar`; the `/manufacturing` hub + 11 spokes (`ManufacturingHero`, metrics charts, use-cases, proof); `/ai-optimized-seo` (+ foundation/momentum/velocity) and their bespoke sections. Most inherit Slice-4 primitives; re-skin the bespoke pieces.

## Slice 7 — Forms · Contact · About · Assessment · Case studies + one-offs
`ContactForm`, `AIReadinessAssessmentForm`, `FormControls`, `TurnstileWidget` styling; `/about` (`AboutTimeline`, `Heritage`, `LocalFootprint`), `/assessment`, `/contact`, `/case-studies/[slug]`. Chamfer inputs, diamond bullets, Tesler's/Postel's law on forms (ask minimum, accept liberally).

## Slice 8 — Effects reconciliation & doc update
Enforce the hard "don'ts": retire/replace round-blob effects (`GradientOrb`, `CursorGlow`), the grain overlay, gradient-soup, and all gradient text. Convert `CircuitTrace` + the 10 `effects/circuits/*` to straight crease-line `polyline`s (1.5px `--itecs-blue-bright`, ~0.5 opacity) with diamond/circle nodes — no curved organic traces. Sweep for stray circles/`rounded-full`/emoji. Rewrite `DESIGN.md` and the Design/Conventions sections of `CLAUDE.md` to the Intelligence system so future work stays consistent.

## Slice 9 — QA · accessibility · build · (gated) deploy
`npm run build` + `npx tsc --noEmit` + `npm run lint` clean. Playwright **mobile-first (Googlebot Smartphone 412×915)** pass on representative templates: home, one hub, the MIP page, an insight, contact. Verify contrast (accent-on-dark, ink-on-light), keyboard nav, `prefers-reduced-motion`, real asset paths. **Production deploy (cpba/deploy) is a gated final step — I'll stop and confirm before pushing to production**, since it's outward-facing.

---

## Risks / decisions baked in
- **Dark→light inversion:** components hardcoding `text-white` / gradients / glows on now-light backgrounds are the main breakage class; fixed per-slice, not all at once.
- **Token aliasing keeps the build green** between slices instead of a big-bang flip.
- **Asset pipeline:** handover hotlinks `itecsonline.com` SVGs/WebP; for production we localize them under `public/images/` during the slices that first use each asset.
- **Content unchanged:** this is a re-skin — copy in `constants.ts` stays unless a section's structure requires it.
