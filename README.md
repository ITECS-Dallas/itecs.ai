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

## Proposal Pages

ITECS uses hidden `/p/<slug>` pages for client web proposals. The first live
proposal is `/p/fcc-proposal-b2630d`. These pages are unlisted, noindex,
excluded from the sitemap, and blocked in `robots.ts`, but they are not
login-protected portals. See [docs/proposals.md](./docs/proposals.md).

## Deployment

Production runs in Docker Compose behind nginx on the shared ITECS server:

```bash
docker compose up -d --build --remove-orphans web
```
