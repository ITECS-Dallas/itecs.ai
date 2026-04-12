# Suggested Commands

## Development
- `npm run dev` — Start Next.js dev server (localhost:3000)
- `npm run build` — Production build
- `npm run start` — Start production server
- `npm run lint` — Run ESLint
- `npx tsc --noEmit` — Type check without emitting files

## Production Deployment
- `./scripts/prod-deploy.sh` — Full deploy: cert provisioning + docker compose up
- `./scripts/prod-up.sh` — Start stack (provisions cert if missing)
- `./scripts/prod-down.sh` — Stop stack
- `./scripts/certbot-renew.sh` — Renew SSL cert + reload nginx
- `./scripts/install-systemd-services.sh` — Install systemd units for auto-start + cert renewal

## Utility Commands (Linux)
- `git status`, `git diff`, `git log` — Version control
- `docker compose ps` — Check running services
- `docker compose logs -f web` — Tail web service logs
- `docker compose logs -f nginx` — Tail nginx logs
