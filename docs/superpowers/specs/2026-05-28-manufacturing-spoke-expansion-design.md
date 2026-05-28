# Manufacturing Spoke Expansion Design

Date: 2026-05-28
Status: Approved for autonomous implementation
Owner: ITECS AI

## Summary

Expand the manufacturing vertical from a hub plus one PPV spoke into a broader manufacturing AI content cluster. The current pages remain the anchor:

- `/manufacturing`
- `/manufacturing/ppv-agent`

Add nine additional manufacturing use-case spokes:

1. `/manufacturing/demand-forecasting-sop-ai`
2. `/manufacturing/predictive-maintenance-ai`
3. `/manufacturing/inventory-working-capital-ai`
4. `/manufacturing/quality-traceability-ai`
5. `/manufacturing/customer-sku-profitability-ai`
6. `/manufacturing/production-scheduling-yield-ai`
7. `/manufacturing/contract-pass-through-intelligence`
8. `/manufacturing/energy-freight-scope-3-ai`
9. `/manufacturing/vendor-payment-anomaly-ai`

Each page gets a distinct buyer angle, operational context, chart concept, governance language, SEO metadata, JSON-LD, sitemap entry, and internal links.

## Goals

- Build topical authority around manufacturing AI beyond the PPV use case.
- Keep PPV as the first detailed finance proof point while linking it to adjacent manufacturing priorities.
- Make the manufacturing hub a true cluster hub with links to every spoke.
- Add enough page depth for human buyers and search engines to understand each use case independently.
- Preserve the Dallas-team trust signal without making the offer local-only.
- Maintain read-heavy, write-controlled, human-approved governance language across sensitive use cases.

## Non-Goals

- Do not publish pricing for any spoke.
- Do not create named customer case studies.
- Do not imply autonomous execution of purchases, hedges, work orders, production schedules, recalls, contract changes, ESG reports, or financial postings.
- Do not add external integrations, APIs, secrets, databases, or runtime services.
- Do not alter production infrastructure as part of page creation.

## Page Factory Architecture

Use a shared spoke-page content model and reusable components. Each page should be a thin static route that imports one content object and renders the shared page component.

The shared spoke page should include breadcrumbs, hero, executive pain section, unique metrics chart, capability cards, anonymized scenario, data inputs, workflow diagram, governance controls, engagement roadmap, traditional-vs-ITECS comparison, security guarantee, related use cases, FAQ, CTA, FAQ JSON-LD, and national Service JSON-LD.

## Visual Requirements

Every new spoke must include a professional metrics visualization. The same rendering component may be reused, but the chart data and chart mode must be distinct enough that pages do not feel duplicated.

Approved chart modes:

- Timeline: forecast, traceability, contract, or reporting sequence.
- Matrix: asset, schedule, risk, or anomaly scoring.
- Waterfall: margin, cash, cost, or recovery bridge.

## Navigation and Internal Links

Update the manufacturing hub use-case grid, Industries dropdown, mobile Industries menu, footer Industries column, and sitemap. The PPV page should remain linked prominently from the hub. New pages should link back to the hub and to adjacent manufacturing spokes where useful.

## SEO Requirements

Each page needs unique title, description, H1, keywords, canonical metadata, FAQ schema, Service schema, sitemap inclusion, and internal links from the hub, nav, and footer. Copy should answer the buyer's core question early in the page.

## Quality Bar

Run source-level manufacturing tests, TypeScript, ESLint, production build, SEO audit, and mobile Googlebot Smartphone smoke checks. The content audit should check duplicated chart concepts, generic AI language, local-only Dallas phrasing, and unsupported performance claims.

