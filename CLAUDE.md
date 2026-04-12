# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Business/MSP website for ITECS (itecs.ai). Next.js 16 with App Router, TypeScript, Tailwind CSS v4, deployed behind nginx with Let's Encrypt SSL via Cloudflare DNS-01 challenge.

## Commands

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint
npx tsc --noEmit     # Type check without emitting
```

### Production Deployment

```bash
./scripts/prod-deploy.sh              # Full deploy: cert provisioning + docker compose up
./scripts/prod-up.sh                  # Start stack (provisions cert if missing)
./scripts/prod-down.sh                # Stop stack
./scripts/certbot-renew.sh            # Renew SSL cert + reload nginx
./scripts/install-systemd-services.sh # Install systemd units for auto-start + cert renewal timer
```

## Architecture

- **`src/app/`** — Next.js App Router pages and layouts. `@/*` path alias maps to `./src/*`.
- **`infra/nginx/`** — nginx reverse proxy config. Terminates TLS, proxies to Next.js on port 3000. `conf.d/default.conf` has the server blocks for `itecs.ai` and `www.itecs.ai`.
- **`infra/certbot/`** — Cloudflare DNS-01 certbot setup. `scripts/certbot-dns.sh` is the entrypoint used by the docker certbot service.
- **`infra/docker/web.Dockerfile`** — Multi-stage build using Next.js standalone output mode.
- **`docker-compose.yml`** — Services: `web` (Next.js), `nginx` (TLS termination), `certbot` (ops profile for cert management).

## Key Conventions

- **Icons**: Use `lucide-react` for all icons.
- **Styling**: Tailwind CSS v4 via `@tailwindcss/postcss`. Global styles in `src/app/globals.css`.
- **Fonts**: Geist Sans and Geist Mono loaded via `next/font/google`.
- **Output mode**: `next.config.ts` uses `output: "standalone"` for Docker builds.
- **SSL**: Cloudflare DNS API token in `.env` (`CLOUDFLARE_DNS_API_TOKEN`). Cert lives in `infra/certbot/letsencrypt/`. Renewal runs via systemd timer twice daily.

## MCP Servers

This project is configured with three MCP servers in `.mcp.json`:

- **Serena** — Code understanding and navigation (LSP-based). Always activate this project in Serena. Run onboarding at least once (`mcp__serena__onboarding`).
- **Context7** — Library/code reference lookups. Use for checking current API docs of dependencies.
- **Playwright** — Browser automation and testing. Use for visual testing and end-to-end validation.

## Environment

Copy `.env.example` to `.env` and fill in:
- `CLOUDFLARE_DNS_API_TOKEN` — Cloudflare API token with Zone:Read + DNS:Edit for itecs.ai zone
- `LETSENCRYPT_EMAIL` — Email for Let's Encrypt registration
- `GITHUB_TOKEN` — GitHub PAT for CI/deployment
