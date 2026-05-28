# itecs.ai

Business website for ITECS AI, the AI consulting, training, security, and
DevOps division of ITECS.

## Getting Started

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Common Commands

```bash
npm run lint
npm run build
docker compose up -d --build --remove-orphans web
```

## Documentation

- [Design system](./DESIGN.md)
- [Agent/codebase guidance](./CLAUDE.md)
- [Hidden web proposal workflow](./docs/proposals.md)

## Public Verticals

- `/manufacturing` — manufacturing AI hub for finance and operations leaders
- `/manufacturing/ppv-agent` — first manufacturing use-case spoke for PPV
  Agent: Purchase Price Variance and Commodity Cost Intelligence
- `/manufacturing/demand-forecasting-sop-ai` — demand forecasting and S&OP
  intelligence
- `/manufacturing/predictive-maintenance-ai` — downtime forecasting and asset
  reliability intelligence
- `/manufacturing/inventory-working-capital-ai` — inventory and working capital
  optimization
- `/manufacturing/quality-traceability-ai` — quality, traceability, and recall
  risk intelligence
- `/manufacturing/customer-sku-profitability-ai` — customer and SKU
  profitability intelligence
- `/manufacturing/production-scheduling-yield-ai` — production scheduling,
  yield, and labor planning intelligence
- `/manufacturing/contract-pass-through-intelligence` — contract intelligence
  and pass-through recovery
- `/manufacturing/energy-freight-scope-3-ai` — energy, freight, landed-cost,
  and Scope 3 reporting intelligence
- `/manufacturing/vendor-payment-anomaly-ai` — vendor payment and finance
  anomaly detection

## Proposal Pages

ITECS uses hidden `/p/<slug>` pages for client web proposals. The first live
proposal template is `/p/hasen-claude-work-order-phase-1-9ee3f0`. Proposal
pages are unlisted, noindex, excluded from the sitemap, and blocked in
`robots.ts`. Magic-link access is a lightweight presentation layer, not a
hardened client portal. See [docs/proposals.md](./docs/proposals.md).

## Deployment

Production runs in Docker Compose behind nginx on the shared ITECS server:

```bash
docker compose up -d --build --remove-orphans web
```
