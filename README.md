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

## Intelligence OS

The sitewide ITECS Intelligence OS is an on-demand interactive product demo with
a deterministic security incident, an AI solution configurator, sourced proof,
and a live ITECS-only advisor. The full client is loaded only after a visitor
opens it, and it is suppressed on private `/p/*` proposal routes.

The advisor calls the OpenAI Responses API only through
`/api/intelligence/stream`. Configure these server-only variables:

```bash
OPENAI_API_KEY=
OPENAI_CHAT_MODEL=gpt-5.6-terra
OPENAI_SCOPE_MODEL=gpt-5.6-luna
```

The API key must never use a `NEXT_PUBLIC_` prefix. If it is absent or the
provider is unavailable, the terminal identifies itself as unavailable and
keeps the deterministic OS tools usable. See
[`docs/intelligence-os.md`](./docs/intelligence-os.md) for the content,
guardrail, and operating contract.

The advisor classifies input scope, grounds a private draft in current public
ITECS content, applies inline moderation, and runs a second fail-closed output
verification before any model text reaches the browser. Only approved answers
are released through the SSE route.
