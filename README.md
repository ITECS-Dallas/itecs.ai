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
docker compose up -d --build web
docker compose -f /home/itecs/website/docker-compose.yml up -d --force-recreate nginx
```

## Documentation

- [Design system](./DESIGN.md)
- [Agent/codebase guidance](./CLAUDE.md)
- [Hidden web proposal workflow](./docs/proposals.md)

## Public Verticals

- `/manufacturing` — manufacturing AI hub for finance and operations leaders
- `/manufacturing/ppv-agent` — first manufacturing use-case spoke for PPV
  Agent: Purchase Price Variance and Commodity Cost Intelligence

## Proposal Pages

ITECS uses hidden `/p/<slug>` pages for client web proposals. The first live
proposal template is `/p/hasen-claude-work-order-phase-1-9ee3f0`. Proposal
pages are unlisted, noindex, excluded from the sitemap, and blocked in
`robots.ts`. Magic-link access is a lightweight presentation layer, not a
hardened client portal. See [docs/proposals.md](./docs/proposals.md).

## Deployment

Production runs in Docker Compose behind nginx on the shared ITECS server:

```bash
docker compose up -d --build web
docker compose -f /home/itecs/website/docker-compose.yml up -d --force-recreate nginx
```
