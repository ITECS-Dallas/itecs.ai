# Enterprise Dark Theme Redesign Status

Source of truth: `itecs-ai-website/itecs-ai-dark-theme-redesign-spec.md`.

## Current Branch

- Branch: `enterprise-dark-theme-rebuild`
- Latest completed epic: Epic 4 — Managed Intelligence Provider subpage
- Status date: 2026-05-31

## Decisions

- Approved live proof stays in use: `24+` years, `92%` retention, and `200+` engagements.
- The MIP page uses shared section components for governance, outcomes proof, conversion, and footer instead of duplicating legacy page-local bands.
- No new MIP-specific proof numbers or case studies were invented. The proof section reuses sourced public ITECS case studies from the shared proof system.
- MIP FAQ content now lives in `constants.ts` and feeds both the accessible accordion and FAQPage schema.
- Performance remains measured but non-blocking for this slice per Brian's later direction; accessibility and layout correctness remain blocking.

## Epic 4 Checklist

- Story 4.1 — Hero + evolution narrative: Passed.
- Story 4.2 — Definition + what's included: Passed.
- Story 4.3 — MSP vs MIP comparison table: Passed.
- Story 4.4 — Methodology + SLAs/KPIs: Passed.
- Story 4.5 — Shared bands: Passed.
- Story 4.6 — FAQ accordion + schema: Passed.

## Epic 4 Validation

- Story validators: `scripts/validate-mip-*.mjs` passed.
- Regression validators: `scripts/validate*.mjs` passed.
- Typecheck: `npx tsc --noEmit --pretty false` passed.
- Lint: `npm run lint` passed.
- Build: `npm run build` passed.
- Purple retirement scan: no shipped source hits for retired purple tokens/gradients.
- Component hex scan: no component/page hardcoded hex hits outside existing proposal email templates.
- Screenshots captured: `epic4-mip-390.png`, `epic4-mip-768.png`, `epic4-mip-1920.png`.
- Overflow check: 390, 768, and 1920 all passed with no offenders.
- Lighthouse on `/managed-intelligence-provider`: accessibility 96, performance 89, LCP 3.5s, CLS 0, TBT 170ms.

## Remaining Risks

- Broader non-MIP pages still need the later Epic 9 content and altitude pass for legacy small-business wording outside the rebuilt homepage and MIP page.
- AI Readiness Assessment still routes through `/contact` until Epic 6 builds the dedicated assessment flow.
