# Enterprise Dark Theme Redesign Status

Source of truth: `itecs-ai-website/itecs-ai-dark-theme-redesign-spec.md`.

## Current Branch

- Branch: `enterprise-dark-theme-rebuild`
- Latest completed epic: Epic 9 — Content and launch QA
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
- Performance remains measured but non-blocking per Brian's later direction; accessibility, SEO/schema, and layout correctness remain blocking.
- Epic 7 hardens shared controls rather than one-off pages: the base button sizes, footer links, breadcrumbs, article share controls, source links, and CTA-style text links now carry 44px+ touch targets where they behave as standalone controls.
- Inline links inside article body copy remain inline text links. The runtime tap-target audit treats those as the WCAG inline-text exception instead of forcing paragraph lines to 44px.
- ScrollReveal now keeps content visible on load with a non-gating reveal transform; parallax disables transform motion for reduced-motion users; decorative gradient orbs are hidden from assistive technology.
- The `backdrop-filter` enhancement now has a global solid-surface fallback for engines that do not support `backdrop-filter`.
- Cross-browser local coverage is Chromium and Firefox through Playwright. WebKit downloaded but cannot launch on this Linux host because system libraries are missing; native Safari and Edge are not available in this environment.
- Epic 8 reduced-motion hardening now disables reveal transforms, parallax, ambient animation classes, shimmer/lift transforms, and live-dot pulse animation under `prefers-reduced-motion: reduce`.
- Epic 8 technical SEO adds `/managed-intelligence-provider` to the sitemap and emits MIP Service schema alongside the existing BreadcrumbList and FAQPage schema.
- Epic 8 GEO files now describe Managed Intelligence Provider with a clear extractable definition and remove the previously unapproved `99.9% uptime` proof point from `public/llms.txt`.
- Case-study detail pages now expose a visible H1 via the shared `SectionHeading` component so sitemap routes satisfy the single-H1 contract.
- WCAG contrast fixes in Epic 8 keep brand blue as the primary fill while moving small blue text to AA-compliant `--brand-hover` or white text where needed.
- Epic 9 completed the broader altitude pass on primary public pages, service metadata, pricing, about, the insights listing, shared page-section comments, and core constants. ITECS-owned positioning now uses growth-stage, mid-market, enterprise, business-leader, or organization language while preserving the 10-300 employee fit.
- The only remaining `Small Business` wording in shipped public source is intentionally confined to the source-backed Anthropic product article about Claude for Small Business and its route slug. The official Anthropic announcement is dated May 13, 2026 and uses that product name, so those references are article/product context rather than ITECS positioning.
- Epic 9 adds static launch contracts in `scripts/validate-epic9-content-launch.mjs` and `scripts/validate-epic9-cross-page-launch.mjs` to keep approved proof, shared launch sections, dark-theme surfaces, sitemap/robots, analytics consent, and form wiring from regressing.
- Browser launch QA uses Googlebot Smartphone user-agent per `CLAUDE.md` while still capturing the required 390 / 768 / 1920 screenshots requested in the redesign work order.

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

## Epic 7 Checklist

- Story 7.1 — Responsive integrity: Passed for public routes in the local browser matrix. Intentional horizontally scrollable comparison/data tables stay inside overflow containers.
- Story 7.2 — WCAG 2.1 AA: Passed for static contracts, keyboard focus styling, reduced-motion handling, labeled/error-accessible forms, and automated axe critical scan.
- Story 7.3 — Cross-browser: Passed for Chromium and Firefox local smoke. CSS `backdrop-filter` fallback is implemented and statically validated. WebKit/Safari remains environment-limited on this Linux host.

## Epic 7 Validation

- Story validators: `scripts/validate-epic7-responsive.mjs`, `scripts/validate-epic7-wcag-motion.mjs`, and `scripts/validate-epic7-cross-browser.mjs` passed.
- Regression validators: all `scripts/validate*.mjs` passed with `for f in scripts/validate*.mjs; do node "$f"; done`.
- Typecheck: `npx tsc --noEmit --pretty false` passed.
- Lint: `npm run lint` passed.
- Build: `npm run build` passed.
- Purple retirement scan: no shipped public source hits for retired purple tokens/gradients.
- Component/page hex scan: no hardcoded hex hits outside `src/app/globals.css` token definitions and excluded proposal surfaces.
- Responsive matrix: 46 public routes passed document-level horizontal overflow checks at 390, 768, and 1920px.
- Mobile tap-target smoke: 46 public routes passed for visible standalone controls at 390px; inline article text links were excluded as inline-text links.
- Axe: 0 critical violations across `/`, `/assessment`, `/contact`, `/managed-intelligence-provider`, `/services`, `/insights/ceo-guide-ai-roi`, and `/manufacturing/ppv-agent`.
- Lighthouse on `/`: accessibility 96, performance 88, LCP 3.8s, CLS 0, TBT 50ms.
- Lighthouse on `/managed-intelligence-provider`: accessibility 97, performance 91, LCP 3.4s, CLS 0, TBT 40ms.
- Cross-browser smoke: Chromium passed and Firefox passed on `/` and `/managed-intelligence-provider` at 390px. WebKit could not launch due missing host libraries.
- Screenshots captured: `epic7-home-390.png`, `epic7-home-768.png`, `epic7-home-1920.png`, `epic7-mip-390.png`, `epic7-mip-768.png`, `epic7-mip-1920.png`, `epic7-ppv-390.png`, `epic7-ppv-768.png`, `epic7-ppv-1920.png`.

## Epic 8 Checklist

- Story 8.1 — Motion system: Passed. ScrollReveal is one-shot and stagger-capable without hiding content; live pulse uses the sanctioned cyan dot; reduced motion disables reveal/parallax/shimmer/lift transforms.
- Story 8.2 — Core Web Vitals: Partially passed and measured. Image/font/third-party hygiene passed; Lighthouse Performance remains below the original target on `/` and `/managed-intelligence-provider`, treated as non-blocking by explicit product direction.
- Story 8.3 — Technical SEO and schema: Passed. Public sitemap routes have canonical metadata, descriptions, single visible H1s, and MIP emits Organization, LocalBusiness, BreadcrumbList, Service, and FAQPage schema.
- Story 8.4 — GEO / answer-engine optimization: Passed. MIP has a direct extractable definition and the public AI crawler files reference the canonical MIP route without disputed proof points.

## Epic 8 Validation

- Story validators: `scripts/validate-epic8-motion-system.mjs`, `scripts/validate-epic8-cwv-performance.mjs`, `scripts/validate-epic8-technical-seo-schema.mjs`, and `scripts/validate-epic8-geo-answer-engine.mjs` passed.
- Regression validators: all `scripts/validate*.mjs` passed with `for f in scripts/validate*.mjs; do node "$f"; done`.
- Typecheck: `npx tsc --noEmit --pretty false` passed.
- Lint: `npm run lint` passed.
- Build: `npm run build` passed.
- Browser SEO smoke: 45 sitemap routes passed at 390px with exactly one visible H1, canonical metadata, meta descriptions, and no document-level horizontal overflow.
- MIP structured data smoke: `/managed-intelligence-provider` emitted `Organization`, `LocalBusiness`, `BreadcrumbList`, `Service`, and `FAQPage` JSON-LD.
- Reduced-motion smoke: with `prefers-reduced-motion: reduce`, reveal transform was `none`, live pulse display was `none`, and H1 opacity remained `1`.
- Axe serious/critical smoke: 0 serious or critical violations on `/`, `/managed-intelligence-provider`, `/assessment`, and `/case-studies/pegasus-foods-zero-downtime-relocation`.
- Lighthouse on `/`: accessibility 100, SEO 100, performance 88, LCP 3868ms, CLS 0, TBT 48ms.
- Lighthouse on `/managed-intelligence-provider`: accessibility 100, SEO 100, performance 88, LCP 3411ms, CLS 0, TBT 200ms.
- Lighthouse on `/assessment`: accessibility 100, SEO 100, performance 96, LCP 2807ms, CLS 0, TBT 37ms.
- Screenshots captured: `epic8-home-390.png`, `epic8-home-768.png`, `epic8-home-1920.png`, `epic8-mip-390.png`, `epic8-mip-768.png`, and `epic8-mip-1920.png`.

## Epic 9 Checklist

- Story 9.1 — Content load: Passed for approved live proof stats, real logos, certifications, case studies, testimonials, and primary public copy altitude. No unapproved 95% retention / 75 clients / generic 99.9% uptime proof set appears in public AI crawler files.
- Story 9.2 — Cross-page consistency: Passed. Shared `TrustBar`, `SecurityGovernanceBand`, `MethodologySteps`, `OutcomesProof`, `ConversionBand`, and `Footer` contracts remain composed across Home, MIP, assessment, contact, services, and legacy CTA surfaces.
- Story 9.3 — Launch QA gate: Passed with local browser route/link, screenshot, 404, safe form-boundary, analytics, Lighthouse accessibility/SEO, typecheck, lint, and build validation. Performance remains reported but non-blocking by product direction.

## Epic 9 Validation

- Story validators: `scripts/validate-epic9-content-launch.mjs` and `scripts/validate-epic9-cross-page-launch.mjs` passed.
- Regression validators: all `scripts/validate*.mjs` passed with `for f in scripts/validate*.mjs; do node "$f"; done`.
- Typecheck: `npx tsc --noEmit --pretty false` passed.
- Lint: `npm run lint` passed.
- Build: `npm run build` passed.
- Browser launch QA: captured `epic9-home-390.png`, `epic9-home-768.png`, `epic9-home-1920.png`, `epic9-mip-390.png`, `epic9-mip-768.png`, and `epic9-mip-1920.png`.
- Browser launch QA: 44 sitemap routes and 48 internal links returned non-error statuses; `/__launch-qa-missing` returned 404.
- Browser launch QA: Home and MIP had no document-level horizontal overflow at 390, 768, and 1920 after excluding intentionally scrollable data tables.
- Form boundary smoke: `/api/assessment` returned 400 for invalid payload, 200 for honeypot, and 400 for a valid payload missing Turnstile; `/api/contact` returned 400 for invalid payload.
- Analytics smoke: Google Analytics script count was 0 before consent and 1 after choosing "Allow analytics"; a tracked assessment CTA emitted one `cta_click` event.
- Lighthouse on `/`: accessibility 100, best practices 100, SEO 100, performance 81, LCP 4536ms, CLS 0, TBT 66ms.
- Lighthouse on `/managed-intelligence-provider`: accessibility 100, best practices 100, SEO 100, performance 72, LCP 3941ms, CLS 0, TBT 600ms.

## Remaining Risks

- Performance scores were recorded with Lighthouse mobile/Googlebot emulation but not deeply optimized in this slice by explicit product direction. Home and MIP still miss the original LCP <2.5s target.
- Lighthouse lab runs report TBT rather than field INP; no production field data was mutated or queried in this slice.
- The assessment rate limit is process-local, which matches the current standalone Node runtime but is not a distributed abuse-control layer.
- Valid assessment email delivery was not triggered during local launch QA because that requires a real Cloudflare Turnstile token and would send an external email. The handler wiring, validation, honeypot, rate limit, and missing-token path were verified locally.
- The contact page Google Maps iframe may appear blank in headless/local browser screenshots when the external embed does not load, but the verified map link and structured location content remain present.
- Native Safari/Edge verification is not available from this Linux environment. Playwright WebKit also cannot launch until host packages such as GTK/GStreamer/WebKit dependencies are installed.
