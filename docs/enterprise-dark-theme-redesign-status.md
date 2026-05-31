# Enterprise Dark Theme Redesign Status

Source of truth: `itecs-ai-website/itecs-ai-dark-theme-redesign-spec.md`.

## Current Branch

- Branch: `enterprise-dark-theme-rebuild`
- Latest completed epic: Epic 5 — Trust system, remaining stories
- Status date: 2026-05-31

## Decisions

- Approved live proof stays in use: `24+` years, `92%` retention, and `200+` engagements.
- The MIP page uses shared section components for governance, outcomes proof, conversion, and footer instead of duplicating legacy page-local bands.
- No new MIP-specific proof numbers or case studies were invented. The proof section reuses sourced public ITECS case studies from the shared proof system.
- MIP FAQ content now lives in `constants.ts` and feeds both the accessible accordion and FAQPage schema.
- Epic 5 certification badges are sourced from public ITECS pages where available. Microsoft is represented with verified public workload language from `itecsonline.com/managed-cloud/managed-azure-cloud` instead of inventing a missing designation tier.
- Epic 5 case studies use public ITECS case-study sources only: Pegasus Foods, OpenText, and PepsiCo. The new detail route is generated from the shared `TRUST_CASE_STUDIES` data.
- Testimonials now require named attribution. Entries without a real person/company are filtered out rather than replaced with filler.
- Third-party validation is limited to locally/publicly sourced items: Google rating, G2 rating, PRNewswire anniversary coverage, Top MSP 2024, and BusinessRate Best of 2026. No Clutch or analyst claim is shown because no safe source was found during this slice.
- Performance remains measured but non-blocking for this slice per Brian's later direction; accessibility and layout correctness remain blocking.

## Epic 5 Checklist

- Story 5.1 — Preserve & elevate existing proof: Passed in earlier slice and retained.
- Story 5.2 — Add certifications & compliance badges: Passed.
- Story 5.4 — Case studies: Passed.
- Story 5.5 — Testimonials: Passed.
- Story 5.6 — Awards / third-party validation: Passed with available sourced items only.

## Epic 5 Validation

- Story validators: `scripts/validate-epic5-*.mjs` passed.
- Regression validators: `scripts/validate*.mjs` passed with `set -e`.
- Typecheck: `npx tsc --noEmit --pretty false` passed.
- Lint: `npm run lint` passed.
- Build: `npm run build` passed.
- Purple retirement scan: no shipped source hits for retired purple tokens/gradients.
- Component hex scan: no component/page hardcoded hex hits outside existing proposal email templates.
- Screenshots captured: `epic5-home-390.png`, `epic5-home-768.png`, `epic5-home-1920.png`, `epic5-case-390.png`, `epic5-case-768.png`, `epic5-case-1920.png`.
- Overflow check: `/` and `/case-studies/pegasus-foods-zero-downtime-relocation` passed at 390, 768, and 1920 with no offenders.
- Lighthouse on `/`: accessibility 96, performance 64, LCP 6.2s, CLS 0, TBT 250ms.
- Lighthouse on `/case-studies/pegasus-foods-zero-downtime-relocation`: accessibility 100, performance 59, LCP 5.0s, CLS 0, TBT 680ms.

## Remaining Risks

- Broader non-MIP pages still need the later Epic 9 content and altitude pass for legacy small-business wording outside the rebuilt homepage and MIP page.
- AI Readiness Assessment still routes through `/contact` until Epic 6 builds the dedicated assessment flow.
- Performance scores were recorded but not optimized in this slice by explicit product direction.
