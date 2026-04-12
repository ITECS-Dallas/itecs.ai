# Project Overview

**Name:** itecs.ai
**Purpose:** Business/MSP website for ITECS (itecs.ai), a managed services provider based in Dallas.
**Repository:** https://github.com/ITECS-Dallas/itecs.ai

## Tech Stack
- **Framework:** Next.js 16 with App Router
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 via `@tailwindcss/postcss`
- **Icons:** lucide-react
- **Fonts:** Geist Sans and Geist Mono (via `next/font/google`)
- **Runtime:** Node.js 20+
- **Deployment:** Docker Compose (multi-stage standalone build) behind nginx reverse proxy
- **SSL:** Let's Encrypt via Cloudflare DNS-01 challenge (certbot/dns-cloudflare)
- **System:** Linux (Ubuntu)

## Codebase Structure
- `src/app/` — Next.js App Router pages, layouts, and global styles
- `infra/nginx/` — nginx reverse proxy config (TLS termination, proxy to port 3000)
- `infra/certbot/` — Cloudflare DNS-01 certbot entrypoint script
- `infra/docker/web.Dockerfile` — Multi-stage Docker build (standalone output)
- `scripts/` — Deployment and systemd installation scripts
- `docker-compose.yml` — web + nginx + certbot services
- `public/` — Static assets

## Path Alias
`@/*` maps to `./src/*` (configured in tsconfig.json)
