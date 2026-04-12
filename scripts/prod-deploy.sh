#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

mkdir -p infra/certbot/letsencrypt infra/certbot/lib

echo "Provisioning/refreshing Let's Encrypt certificate via Cloudflare DNS challenge..."
docker compose run --rm certbot init

echo "Building and starting production stack..."
docker compose up -d --build --remove-orphans

echo "Production deployment complete."
