# Manufacturing Vertical Hub and PPV Agent Spoke Design

Date: 2026-05-28
Status: Approved for implementation planning
Owner: ITECS AI

## Summary

Build the first manufacturing vertical presence on itecs.ai as two public pages:

- `/manufacturing` - a broad manufacturing AI hub for all manufacturing companies.
- `/manufacturing/ppv-agent` - the first detailed use-case spoke focused on "PPV Agent: Purchase Price Variance and Commodity Cost Intelligence."

The hub should sell a national manufacturing AI offer while using the Dallas ITECS team as a trust signal. Dallas should not make the page read like a local-only manufacturing offer. The first detailed spoke should be finance-grade and CFO-led, using the PPV agent as the proof point for how ITECS turns ERP, BI, procurement, and operational data into governed AI workflows.

## Current Project Context

The site is a Next.js App Router application with TypeScript and Tailwind CSS. Public service content is mostly driven from `src/lib/constants.ts`, with top-level service pages under `src/app/`. Existing service pages use shared sections such as breadcrumbs, hero blocks, pain points, capability grids, how-it-works sections, security guarantees, pricing/ROI comparisons, FAQs, and CTAs.

The current SEO pattern favors top-level URLs instead of nested `/services/...` pages. The manufacturing vertical should follow that style with `/manufacturing`, while use-case spokes can live under the vertical path.

The repository currently has unrelated dirty worktree changes. The manufacturing docs and future implementation should avoid reverting or modifying those unrelated files unless required by the manufacturing page build.

## Goals

- Establish ITECS AI as a credible AI partner for manufacturing executives.
- Make the manufacturing hub broad enough for discrete and process manufacturers.
- Lead with CFO-relevant operational economics: margin protection, purchase price variance, working capital, commodity exposure, supplier risk, downtime, waste, and chargebacks.
- Use the PPV agent as the first concrete use case and conversion path.
- Preserve the ability to add future manufacturing use-case pages later without rebuilding the hub.
- Keep public pricing off these pages for now. Use discovery and assessment CTAs instead.

## Non-Goals

- Do not build a full library of manufacturing use-case pages in the first release.
- Do not publish detailed implementation pricing, phase costs, managed service tiers, or pass-through infrastructure estimates on the public pages.
- Do not name Pegasus or imply the anonymized scenario is a public case study.
- Do not position the offer as Dallas-only manufacturing AI.
- Do not let the AI agent appear to autonomously execute POs, hedges, journal entries, or master-data changes.

## Audience and Positioning

### Primary Buyer

CFO, VP Finance, Controller, or FP&A leader at a mid-market manufacturing company.

Their concern is not AI novelty. Their concern is whether AI can protect margin, explain variance, improve forecasting, reduce working capital pressure, and make month-end and executive decision cycles less reactive.

### Secondary Buyers

- COO or VP Operations: throughput, downtime, yield, labor availability, quality holds, and schedule risk.
- CIO, IT director, or data leader: secure architecture, integrations, identity, governance, observability, and supportability.
- CEO, owner, or president: enterprise risk, competitiveness, capital allocation, and executive-level AI roadmap.

### Dallas Trust Signal

Use Dallas as provenance and credibility, not a geographic limiter. Examples of acceptable framing:

- "built by the ITECS team in Dallas"
- "backed by ITECS, a Dallas-based MSP operating since 2002"
- "from the Dallas ITECS team that has supported business infrastructure for more than two decades"

Avoid framing such as "AI solutions for Dallas manufacturing companies" as the main market label.

## Information Architecture

### Page 1: Manufacturing Hub

Route: `/manufacturing`

Purpose: introduce ITECS AI's manufacturing vertical, explain the business problems that justify AI investment, and route finance-led buyers toward the Manufacturing AI Readiness Assessment or the PPV Agent spoke.

Primary CTA: Manufacturing AI Readiness Assessment

Secondary CTA: PPV Agent Discovery Workshop, preferably routed through the PPV spoke.

### Page 2: PPV Agent Spoke

Route: `/manufacturing/ppv-agent`

Purpose: explain the first detailed use case: a governed AI agent that decomposes purchase price variance, projects forward exposure, connects PPV to SKU/customer margin, and recommends actions for human approval.

Primary CTA: Schedule a PPV Agent Discovery Workshop

Secondary CTA: Start with a Manufacturing AI Readiness Assessment

## Manufacturing Hub Page Design

### Core Promise

ITECS helps manufacturers use secure AI systems to protect margin, forecast operational risk, improve working capital, and turn ERP, BI, plant, procurement, quality, and contract data into governed decisions.

The page should avoid generic "AI transformation" language. It should speak in the operating pressures manufacturers already feel:

- purchase price variance
- commodity swings
- supplier reliability
- machine downtime
- quality holds
- scrap, rework, and spoilage
- labor constraints
- inventory exposure
- production scheduling risk
- customer chargebacks
- warranty and field issue patterns
- contract escalator and pass-through leakage
- margin erosion by SKU, customer, plant, and program

### Manufacturing Breadth

The hub should clearly serve all manufacturing companies. It should balance examples between discrete and process manufacturing.

Discrete manufacturing examples:

- parts availability
- machine downtime
- changeovers
- supplier quality
- production schedule volatility
- warranty patterns
- field failure signals
- labor planning

Food and process manufacturing examples:

- formulas and BOMs
- commodity ingredients
- lot traceability
- spoilage and waste
- regulatory exposure
- allergen or quality holds
- contract pass-through terms
- BatchMaster/SAP and Power BI reporting patterns where relevant

### Proposed Section Flow

1. Breadcrumbs
2. Hero with direct answer, CFO-led H1, and Dallas trust signal
3. Trust/provenance section tying ITECS AI to ITECS managed IT and cybersecurity history
4. Manufacturing pressure section explaining margin, working capital, operations, quality, and data fragmentation
5. "Where AI Creates Measurable Value" use-case grid
6. Featured PPV Agent card with link to `/manufacturing/ppv-agent`
7. Manufacturing AI Readiness Assessment section
8. Security and governance section
9. Future use-case cards
10. FAQ
11. Final CTA

### Suggested Hub H1 Direction

Use an H1 that names manufacturing and business outcomes without sounding local-only. Final wording can be adjusted during implementation, but the approved direction is:

"AI Solutions for Manufacturing Finance and Operations"

Alternate direction:

"Manufacturing AI Solutions for Margin, Throughput, and Risk"

### Hub Use-Case Cards

The hub should include the following use cases. Only the PPV card links to a full use-case page in the first release.

1. PPV Agent: Purchase Price Variance and Commodity Cost Intelligence
2. Predictive Maintenance and Downtime Forecasting
3. Demand Forecasting and S&OP Intelligence
4. Quality Anomaly Detection
5. Inventory and Working Capital Optimization
6. Contract Intelligence and Pass-Through Tracking
7. Production Yield and Labor Planning

Cards without detail pages should either avoid links or point to the Manufacturing AI Readiness Assessment CTA, not to placeholder routes.

### Hub FAQ Topics

- What types of manufacturers can use ITECS manufacturing AI services?
- Is this only for Dallas manufacturers?
- Do we need a clean data warehouse before starting?
- Can ITECS work with our ERP and Power BI setup?
- How do you keep financial and plant data secure?
- What is the best first AI use case for a manufacturer?
- Why start with a readiness assessment instead of building an agent immediately?

## PPV Agent Spoke Page Design

### Core Promise

The PPV agent continuously answers:

"Are we paying what we expected to pay, why did variance move, what is exposed next, and which actions need approval?"

The page should read like a finance-grade manufacturing use-case page, not a generic chatbot or agent page.

### Agent Boundaries

The agent is read-heavy and write-controlled.

It can:

- reproduce historical PPV
- decompose PPV by commodity, vendor, plant, SKU, customer program, timing, freight, FX, and mix
- project forward PPV exposure against open commitments and current assumptions
- draft month-end PPV commentary
- flag vendor pricing drift from contracted formulas
- identify customer contracts where adverse variance may be recoverable
- recommend standard cost updates for review
- prepare purchase, hedge, or escalation recommendations for approval
- answer finance and procurement questions with traceable assumptions

It cannot autonomously:

- place purchase orders
- execute hedges
- update standard-cost master data
- post journal entries
- modify vendor master data
- override approval matrices
- silently change financial assumptions

### Proposed Spoke Section Flow

1. Breadcrumbs
2. Hero with PPV Agent name and zero-click answer summary
3. CFO pain section: month-end PPV arrives too late to protect margin
4. What the agent does: retrospective decomposition, forward exposure, anomaly detection, recommendations, pass-through tracking
5. Anonymized scenario using a mid-market manufacturer with BatchMaster/SAP and Power BI
6. Data inputs and integration pattern
7. Workflow and governance: read-heavy, human approval, audit logs, versioned assumptions
8. Implementation roadmap preview: discovery, retrospective PPV reproduction, forward exposure model, recommendation workflow
9. Security and controls
10. Business case and ROI language without public pricing
11. FAQ
12. Final CTA for PPV Agent Discovery Workshop

### Anonymized Scenario

The spoke may describe a mid-market manufacturer using BatchMaster/SAP and Power BI that wants to:

- reproduce 12-24 months of historical PPV
- decompose unfavorable variance by commodity, vendor, plant, SKU, and customer program
- connect ingredient, part, or packaging variance to finished-goods margin exposure
- identify variance recoverable through customer contract pass-through terms
- project forward exposure before month-end
- create executive-ready commentary and recommendations for finance and procurement leadership

Do not name Pegasus.

### Data Inputs

The page should describe data needs in plain English and avoid overpromising automatic integration before discovery.

Likely inputs:

- purchase orders
- goods receipts
- invoices
- standard cost master
- formula or BOM data
- vendor master and contract terms
- customer pricing and pass-through terms
- open commitments
- forecast or production schedule
- freight, FX, and market reference data where applicable
- Power BI semantic models or existing reports, if usable

### Technical Stack Language

The public spoke page should not over-index on framework names. It can mention integration categories:

- ERP and procurement data
- BI and reporting data
- contract documents
- market data
- secure cloud data platform
- human approval workflow
- audit logging and observability

Technical details such as Azure, Fabric, Logic Apps, LangGraph, LLM vendors, vector search, and observability tools belong in proposals or follow-up technical discovery unless needed for trust.

### Spoke FAQ Topics

- What is purchase price variance?
- What does a PPV agent do?
- Can the PPV agent work with BatchMaster/SAP and Power BI?
- Does the agent execute purchases or hedges automatically?
- What data is needed for a PPV discovery workshop?
- How does the agent handle standard cost recommendations?
- Can it connect PPV to customer pass-through clauses?
- How does ITECS keep finance and procurement data secure?

## Content and SEO Requirements

### Metadata Direction

Hub title direction:
"AI Solutions for Manufacturing Finance and Operations | ITECS AI"

Hub description direction:
"ITECS helps manufacturers use secure AI systems to protect margin, improve working capital, forecast operational risk, and connect ERP, BI, plant, procurement, and quality data."

PPV title direction:
"PPV Agent for Manufacturing Finance | ITECS AI"

PPV description direction:
"A governed AI agent for purchase price variance decomposition, commodity cost intelligence, forward exposure modeling, contract pass-through tracking, and finance-ready PPV commentary."

### Keyword Direction

Hub:

- manufacturing AI solutions
- AI for manufacturing finance
- AI for manufacturing operations
- manufacturing AI readiness assessment
- AI for process manufacturing
- AI for discrete manufacturing
- manufacturing AI consulting

PPV spoke:

- PPV agent
- purchase price variance AI
- manufacturing PPV analysis
- commodity cost intelligence
- AI for purchase price variance
- manufacturing finance AI agent
- BatchMaster SAP Power BI PPV

### Schema

Use existing SEO utilities where possible. The pages should include:

- Breadcrumb JSON-LD
- FAQ JSON-LD
- Service schema or a new vertical/service schema if the existing utility fits cleanly

Do not force these pages into the existing `SERVICES` array if that creates awkward content coupling. A new manufacturing vertical constant can be added if implementation is cleaner.

## Component and Data Model Decisions

### Preferred Implementation Pattern

Use existing section components when they match the content:

- `Breadcrumbs`
- `PainPoint`
- `ServiceFeatures`
- `HowItWorks`
- `Integrations`
- `SecurityGuarantee`
- `PricingROI`
- `FAQ`
- `CTASection`
- `JsonLd`

Create manufacturing-specific page sections only where the generic service components become awkward.

Likely new components:

- `ManufacturingHero` or a generic `IndustryHero`
- `ManufacturingUseCases`
- `ManufacturingAssessment`
- `PPVAgentWorkflowDiagram`
- `PPVDataInputs`

Likely new constants:

- `MANUFACTURING_VERTICAL`
- `MANUFACTURING_USE_CASES`
- `PPV_AGENT_USE_CASE`

### Navigation

The first release does not need to add a top-level navigation item unless implementation review decides it improves discoverability. At minimum:

- add both pages to the sitemap
- cross-link from relevant service pages where natural, especially Custom AI Agents, AI DevOps, Consulting, Data Audit, and Services
- link the hub to the PPV spoke
- link the PPV spoke back to the hub and readiness assessment CTA

## Visual Direction

Follow the existing ITECS AI dark design system: command-center, precise, technical, and executive. Avoid generic stock manufacturing imagery unless high-quality, relevant assets are available. Prefer diagrams and data-flow visuals that show ERP, BI, contracts, market data, and approval workflows converging into finance-ready recommendations.

The hub visual should signal manufacturing operations broadly, not only food manufacturing. The PPV visual can be more finance/data oriented.

## Security and Governance Requirements

Both pages should emphasize:

- private, client-controlled data boundaries
- read-only discovery where appropriate
- identity and role-based access
- encrypted secrets and credentials
- audit logs for agent recommendations
- human approval before financial actions
- alignment with the client's existing IT and security posture
- ITECS's Dallas-based MSP and cybersecurity history

The PPV page must explicitly state that the agent does not autonomously execute financial or procurement actions.

## Testing and Verification Plan

When implementation begins, run:

- `npm run lint`
- `npx tsc --noEmit`
- `npm run build`
- `npm run seo:audit` if the implementation changes sitemap, metadata, or structured content

Use Playwright with the required Googlebot Smartphone configuration from `CLAUDE.md` to verify:

- `/manufacturing`
- `/manufacturing/ppv-agent`
- mobile layout has no horizontal overflow
- hero text fits
- CTA links work
- breadcrumb links work
- FAQ sections render
- JSON-LD does not break page rendering
- no placeholder routes are linked from future use-case cards

## Acceptance Criteria

- `/manufacturing` exists and positions ITECS AI for all manufacturing companies.
- `/manufacturing/ppv-agent` exists and explains the PPV agent in CFO-grade detail.
- Dallas is used as a credibility signal, not a market limiter.
- The hub balances discrete and process manufacturing examples.
- The PPV spoke uses an anonymized scenario and does not name Pegasus.
- Public pricing ranges are not published.
- The PPV page clearly describes human approval and agent boundaries.
- Future use-case cards exist on the hub without creating dead-end placeholder pages.
- Pages are included in sitemap and have metadata, breadcrumbs, FAQ schema, and internal links.
- Implementation follows existing ITECS AI design and content patterns.
