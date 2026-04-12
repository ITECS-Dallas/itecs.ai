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
- **`src/components/`** — Organized by role: `layout/` (Header, Footer), `sections/` (page-level composites like Hero, ServicesGrid, CTASection), `ui/` (Button, Card, SectionHeading, StatCounter), `effects/` (animations: ScrollReveal, ParallaxWrapper, GradientOrb, CircuitTrace, GridBackground, CursorGlow), `seo/` (Breadcrumbs, JsonLd).
- **`src/lib/`** — `constants.ts` is the single source of truth for all structured content (site config, nav links, services array, stats). `metadata.ts` generates per-page Next.js Metadata. `seo.ts` generates JSON-LD schemas (Organization, LocalBusiness, Service, FAQPage, BreadcrumbList).
- **`infra/nginx/`** — nginx reverse proxy config. Terminates TLS, proxies to Next.js on port 3000. `conf.d/default.conf` has the server blocks for `itecs.ai` and `www.itecs.ai`.
- **`infra/certbot/`** — Cloudflare DNS-01 certbot setup. `scripts/certbot-dns.sh` is the entrypoint used by the docker certbot service.
- **`infra/docker/web.Dockerfile`** — Multi-stage build (deps → build → runner) using Next.js standalone output mode.
- **`docker-compose.yml`** — Services: `web` (Next.js), `nginx` (TLS termination), `certbot` (ops profile for cert management).

### Service Pages

Service pages live at `src/app/services/[slug]/page.tsx`. Slugs are defined in `src/lib/constants.ts` in the `SERVICES` array. Current slugs: `ai-consulting`, `managed-ai`, `ai-chatbot-development`, `ai-security-compliance`, `ai-seo`. Each service page uses `generateStaticParams()` for static generation and renders shared section components (ServiceHero, ServiceFeatures, ServiceStats, FAQ, CTASection) driven by the data in `constants.ts`.

### SEO Strategy

Every page uses `generatePageMetadata()` from `src/lib/metadata.ts` for OpenGraph/Twitter/robots metadata. The root layout injects Organization and LocalBusiness JSON-LD globally. Service pages add per-service JSON-LD, FAQ schema, and breadcrumbs. `robots.ts` and `sitemap.ts` at the app root handle crawl directives and XML sitemap generation.

## Design

Full design schematic is in `DESIGN.md`. Key points:

- **Dark mode only** — `#030712` void background, no light theme.
- **Brand accent**: Cyan `#06b6d4` primary, Violet `#8b5cf6` secondary. ITECS navy `#081821`.
- **Typography**: Extralight/light headlines (weight 200–300), never bold walls of text.
- **Motion**: Framer Motion for scroll reveals and parallax. CSS for ambient glows. SVG path animations for circuit traces.
- **Style references**: Palantir, SentinelOne, Apple — futuristic, aggressive, sparse.

## Key Conventions

- **Icons**: Use `lucide-react` for all icons.
- **Styling**: Tailwind CSS v4 via `@tailwindcss/postcss`. Global styles in `src/app/globals.css`. CSS custom properties define the color system, bridged to Tailwind via `@theme inline` block (e.g., `bg-bg-void`, `text-brand-accent`).
- **Animations**: Use `framer-motion` for scroll-triggered and layout animations. Use CSS for ambient/looping effects (keyframes defined in `globals.css`). Respect `prefers-reduced-motion`.
- **Fonts**: Geist Sans (display + body) and Geist Mono (code/data) loaded via `next/font/google`.
- **Content data**: All structured content (services, stats, nav links, site config) lives in `src/lib/constants.ts`. Pages and components import from there — never hardcode content in components.
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
