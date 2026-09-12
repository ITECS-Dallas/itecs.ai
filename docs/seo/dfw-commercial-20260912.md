# Dallas/DFW commercial decision support

Work order: `ITECS-AI-DFW-SEO-20260912-R1`.

## Ownership and boundaries

- `/training` remains the general employee-training hub. Its new decision guide links to the existing Copilot, ChatGPT Codex, and Claude Cowork pages; it explicitly distinguishes everyday ChatGPT training from Codex engineering work.
- `/automation` remains the workflow-automation hub. Its guide distinguishes predictable rules, tasks requiring interpretation, and ongoing operating ownership, with contextual links to consulting, custom agents, and managed intelligence.
- `SERVICE_DECISION_GUIDES` in `src/lib/constants.ts` owns the new copy. `ServiceDecisionGuide` is a server-rendered section using the existing design system. No new routes, dependencies, client interactions, schema types, or analytics events are introduced.
- `generateOrganizationSchema` attributes the parent's 2002 founding date to the parent Organization, not the AI division. Existing IDs, Dallas address, phone, and visible company-history wording are preserved. This follows the entity-specific meaning of [foundingDate](https://schema.org/foundingDate) and [parentOrganization](https://schema.org/parentOrganization).

Revalidate the guides when approved training paths or service scopes change. The copy offers scoping guidance, not product eligibility, delivery, savings, or ranking guarantees. Initial enquiries should contain sanitized workflow descriptions, not confidential files or credentials.

## Validation and measurement

Run `node --test tests/dfw-commercial-seo.test.mjs`, the full repository tests, lint, typecheck/build, and `npm run seo:audit`. For release, inspect the two guides and contact journeys in the repository's Googlebot Smartphone profile, then compare all canonical pages against the accepted public baseline. Only the two added sections and the parent identity correction should differ; preserve existing titles, copy, links, canonicals, robots, and sitemap.

Use exactly 28 inclusive dates for GSC/GA4 comparisons, with the configured finalization lag. Separate page-level commercial visibility from regional query-term visibility and from GA4 organic landing activity. CTA clicks are not verified qualified leads. No provider settings or timers are changed by this batch.

For a September 12 release, inspect the first 14 full post-release days (September 13–26) on September 29, and 28 days (September 13–October 10) on October 13. These are review checkpoints, not newly scheduled jobs. Compare equal-length preceding windows; report impressions, clicks, impression-weighted position, organic landing engagement, and available conversion evidence separately. Low volume or no change is inconclusive and does not justify another copy rewrite. Concurrent editorial and performance changes prevent causal attribution from a simple before/after comparison.

The release must preserve the resident accepted-source overlay, which includes separate proposal-retirement and performance work not yet on main. A focused SEO commit alone must not be deployed from stale main if it would discard that overlay. Keep the exact previous image and private source manifest for web-only rollback. GitHub governance and merge remain with the owner.
