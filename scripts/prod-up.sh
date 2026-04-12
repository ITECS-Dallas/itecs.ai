#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

mkdir -p infra/certbot/letsencrypt infra/certbot/lib

cert_found="false"
if ls infra/certbot/letsencrypt/live/*/fullchain.pem >/dev/null 2>&1; then
  cert_found="true"
fi

token_value="$(grep -E '^CLOUDFLARE_DNS_API_TOKEN=' .env 2>/dev/null | tail -n 1 | cut -d= -f2- | tr -d '[:space:]' || true)"

if [[ "$cert_found" == "false" ]]; then
  if [[ -z "$token_value" ]]; then
    echo "No TLS certificate found and CLOUDFLARE_DNS_API_TOKEN is empty."
    echo "Starting core services without nginx. Set CLOUDFLARE_DNS_API_TOKEN and run ./scripts/prod-deploy.sh to enable HTTPS."
    docker compose up -d --remove-orphans web
    exit 0
  fi

  echo "No certificate found; attempting initial certificate provisioning."
  docker compose run --rm certbot init
fi

docker compose up -d --remove-orphans web nginx
