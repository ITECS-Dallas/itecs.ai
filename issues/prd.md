## Problem Statement

ITECS AI needs a manufacturing-specific public website presence that speaks to the real operating economics of manufacturers rather than generic AI adoption. The current site explains broad AI services, but it does not yet give manufacturing executives a page that connects AI to margin protection, purchase price variance, working capital, downtime, quality exposure, supplier risk, and production planning.

The first vertical release should establish a broad manufacturing hub and a detailed PPV use-case page. The hub must be relevant to all manufacturing companies while the PPV spoke gives CFOs and finance leaders a concrete reason to engage ITECS for a discovery workshop.

## Solution

Create two planned public pages:

1. `/manufacturing` - a broad manufacturing AI hub for all manufacturing companies, nationally positioned and backed by the ITECS Dallas team's operational and cybersecurity credibility.
2. `/manufacturing/ppv-agent` - a detailed use-case page for "PPV Agent: Purchase Price Variance and Commodity Cost Intelligence."

The hub will route buyers to a Manufacturing AI Readiness Assessment and feature the PPV agent as the first deep use case. The spoke will explain how a governed AI agent can reproduce historical PPV, decompose variance, project forward exposure, draft finance-ready commentary, flag contract drift, and prepare recommendations for human approval.

## User Stories

1. As a manufacturing CFO, I want to understand how AI can protect gross margin, so that I can evaluate AI as a finance investment instead of a technology experiment.
2. As a VP Finance, I want to see manufacturing-specific AI use cases, so that I can quickly separate useful ideas from generic AI marketing.
3. As a controller, I want to understand how a PPV agent supports month-end variance commentary, so that I can reduce manual close effort.
4. As an FP&A leader, I want forward PPV exposure explained, so that I can forecast margin risk before the close.
5. As a procurement leader, I want to know whether AI can detect vendor pricing drift, so that contract leakage is caught earlier.
6. As a CFO, I want to understand whether adverse variance can be tied to customer pass-through clauses, so that recoverable margin is not missed.
7. As a manufacturing executive, I want a broad AI readiness assessment CTA, so that I can start without committing to a full custom build.
8. As a finance buyer, I want a PPV discovery workshop CTA, so that I can explore the specific agent use case with ITECS.
9. As a COO, I want the hub to mention downtime, yield, quality, labor, scheduling, and inventory, so that the page feels relevant beyond finance.
10. As a CIO, I want the pages to explain security, governance, and approval boundaries, so that I can judge whether the solution is supportable.
11. As a CEO, I want the page to connect AI to capital allocation and operational risk, so that I can decide whether this belongs on the leadership agenda.
12. As a discrete manufacturer, I want examples around parts, machines, suppliers, scheduling, warranty, and field issues, so that the hub does not feel limited to food manufacturing.
13. As a food or process manufacturer, I want examples around formulas, BOMs, lot traceability, commodities, spoilage, and pass-through clauses, so that the hub feels specific to my world.
14. As a CFO, I want to know that the PPV agent will not place POs or execute hedges automatically, so that I can trust the governance model.
15. As an IT director, I want to see that the agent is read-heavy and write-controlled, so that security and approval design is explicit.
16. As a buyer using BatchMaster/SAP and Power BI, I want those systems referenced as plausible integration sources, so that the scenario feels realistic.
17. As a privacy-conscious executive, I want to know that Pegasus is not named, so that the page avoids implying a public case study.
18. As a website visitor, I want clear links between the manufacturing hub and the PPV spoke, so that I can move from broad context to detailed use case.
19. As a future implementation team member, I want the hub to include future use-case cards, so that later pages can be added under the same vertical structure.
20. As an SEO-focused stakeholder, I want top-level `/manufacturing` and nested `/manufacturing/ppv-agent` routes, so that the site has a clear vertical hub and spoke pattern.
21. As a sales leader, I want public pages that avoid detailed project pricing, so that commercial terms can be handled in discovery and proposal conversations.
22. As a finance buyer, I want the PPV page to explain data inputs, so that I understand what ITECS will ask for in discovery.
23. As an operations buyer, I want the hub to show future AI use cases beyond PPV, so that ITECS appears capable of supporting a broader manufacturing AI roadmap.
24. As a manufacturing CFO, I want business-case language around margin, working capital, and variance capture, so that I can justify the next conversation internally.
25. As an IT buyer, I want the pages to mention identity, access, encryption, audit logs, and managed operations, so that I can assess risk early.
26. As a Dallas-based ITECS stakeholder, I want Dallas used as a trust signal, so that the site benefits from ITECS's local operating history without narrowing the market.
27. As a national manufacturing buyer, I want the offer to feel available to my company regardless of location, so that I do not self-disqualify.
28. As a content editor, I want reusable data structures for manufacturing vertical content, so that future use-case pages can be added consistently.
29. As a developer, I want clear acceptance criteria, so that implementation can be validated without re-litigating strategy.
30. As a user on mobile, I want the manufacturing pages to be readable and tappable, so that Googlebot Smartphone and real users can consume the content without layout issues.

## Implementation Decisions

- Build two planned public routes: `/manufacturing` and `/manufacturing/ppv-agent`.
- Position `/manufacturing` as a broad manufacturing hub for all manufacturing companies.
- Position `/manufacturing/ppv-agent` as the first detailed use-case spoke.
- Use "PPV Agent: Purchase Price Variance and Commodity Cost Intelligence" as the approved public label for the first use case.
- Use CFO and finance leadership as the primary audience, with operations, IT, and executive leadership as secondary audiences.
- Use Dallas as an ITECS credibility signal, not as a local-only market label.
- Avoid naming Pegasus publicly.
- Keep the anonymized BatchMaster/SAP and Power BI scenario available for the PPV page.
- Do not publish detailed pricing ranges on either page.
- Use Manufacturing AI Readiness Assessment as the hub's primary CTA.
- Use PPV Agent Discovery Workshop as the PPV spoke's primary CTA.
- Include future use-case cards on the hub for predictive maintenance, demand/S&OP forecasting, quality anomaly detection, inventory and working capital optimization, contract intelligence, and production yield/labor planning.
- Do not create placeholder routes for future use cases in the first release.
- Reuse existing site components where they fit, and create manufacturing-specific sections only where needed.
- Add sitemap entries, metadata, breadcrumbs, FAQ schema, and internal links when implemented.
- Keep agent capabilities audit-friendly and human-approved.

## Testing Decisions

Good tests should validate external behavior and page output, not internal implementation details. The future implementation should be tested as a public website feature: routes render, links work, metadata is present, schema does not break rendering, content is responsive, and CTAs lead to the intended destination.

Modules and surfaces to validate:

- Manufacturing hub route rendering
- PPV spoke route rendering
- Breadcrumb behavior
- CTA links
- Future use-case card links or non-link behavior
- FAQ rendering
- JSON-LD injection
- Sitemap inclusion
- Mobile layout under Googlebot Smartphone viewport

Relevant validation commands:

- `npm run lint`
- `npx tsc --noEmit`
- `npm run build`
- `npm run seo:audit` when sitemap or SEO metadata changes

Use Playwright with the Googlebot Smartphone configuration required by the project guidance for visual and layout verification.

## Out of Scope

- Building additional manufacturing use-case pages beyond the PPV spoke.
- Publishing detailed implementation pricing.
- Creating a full proposal page.
- Naming Pegasus.
- Building the actual PPV agent application.
- Integrating with BatchMaster/SAP, Power BI, ERP systems, market feeds, or contracts.
- Creating autonomous purchasing, hedging, journal entry, or master-data writeback behavior.
- Adding a full industry navigation system unless future implementation review determines it is needed.

## Further Notes

The manufacturing vertical should be written with enterprise operations discipline. The goal is not to sound like an AI vendor with generic use cases. The goal is to sound like ITECS understands manufacturing economics, finance controls, plant realities, data quality constraints, and the approval boundaries required before an AI system can be trusted in production.

The PPV spoke is the first proof point. Future spokes should follow the same pattern: define a concrete operating question, identify the systems and data involved, explain the workflow and approval boundaries, show where the business value appears, and route the buyer to a focused workshop or readiness assessment.
