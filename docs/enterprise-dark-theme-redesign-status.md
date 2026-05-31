# Enterprise Dark Theme Redesign Status

Source of truth: `itecs-ai-website/itecs-ai-dark-theme-redesign-spec.md`.

## Current Branch

- Branch: `enterprise-dark-theme-rebuild`
- Latest completed epic: Epic 6 — Conversion and lead generation
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
- Epic 6 uses `/assessment` as the dedicated AI Readiness Assessment route. Primary assessment CTAs now point there; secondary architect/contact paths still point to `/contact`.
- AI Readiness Assessment submissions route to ITECS by email through a dedicated `/api/assessment` handler using the existing Microsoft Graph mailer, Cloudflare Turnstile, honeypot, and a process-local rate limit.
- No calendar embed URL was invented. The success state gives a clear scheduling/next-step path through `/contact` and phone because no source-backed assessment booking embed exists in the repo.
- Analytics are consent-gated. Google Analytics no longer loads from the root layout before consent; CTA clicks, form starts/completions, and scroll-depth events are defined without form values or other PII in event payloads.
- Performance remains measured but non-blocking for this slice per Brian's later direction; accessibility and layout correctness remain blocking.

## Epic 6 Checklist

- Story 6.1 — AI Readiness Assessment: Passed.
- Story 6.2 — Persistent conversion paths: Passed for the shared nav CTA, hero CTA, MIP CTA, and shared closing conversion band. Legacy pages that still import `CTASection` now delegate to `ConversionBand`.
- Story 6.3 — Contact page upgrade: Passed.
- Story 6.4 — Analytics and lead tracking: Passed with consent-gated analytics and PII-safe event payloads.

## Epic 6 Validation

- Story validators: `scripts/validate-epic6-*.mjs` passed.
- Regression validators: `scripts/validate*.mjs` passed with `set -e`.
- Typecheck: `npx tsc --noEmit --pretty false` passed.
- Lint: `npm run lint` passed.
- Build: `npm run build` passed.
- Purple retirement scan: no shipped source hits for retired purple tokens/gradients.
- Component hex scan: no component/page hardcoded hex hits outside existing proposal email templates.
- API smoke: `/api/assessment` returned 400 for invalid JSON, 200 for honeypot, 400 for a valid payload missing Turnstile, and 429 on the sixth repeated attempt from the same test IP.
- Assessment inline validation: empty 390px submission shows accessible errors with two `aria-invalid` fields and no form top/width document-position shift.
- Analytics consent smoke: Google Analytics script count was 0 before consent, then 1 after choosing "Allow analytics"; consent persisted as `itecs.analytics.consent=granted`.
- Screenshots captured: `epic6-assessment-390.png`, `epic6-assessment-768.png`, `epic6-assessment-1920.png`, `epic6-contact-390.png`, `epic6-contact-768.png`, `epic6-contact-1920.png`.
- Overflow check: `/assessment`, `/contact`, and `/` passed at 390, 768, and 1920 with no offenders.
- Lighthouse on `/assessment`: accessibility 96, performance 87, LCP 2.8s, CLS 0, TBT 370ms.
- Lighthouse on `/contact`: accessibility 97, performance 57, LCP 7.3s, CLS 0, TBT 510ms.

## Remaining Risks

- Broader non-MIP pages still need the later Epic 9 content and altitude pass for legacy small-business wording outside the rebuilt homepage and MIP page.
- Performance scores were recorded but not optimized in this slice by explicit product direction.
- The assessment rate limit is process-local, which matches the current standalone Node runtime but is not a distributed abuse-control layer.
- The contact page Google Maps iframe may appear blank in headless/local browser screenshots when the external embed does not load, but the verified map link and structured location content remain present.
