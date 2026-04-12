#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

mkdir -p infra/certbot/letsencrypt infra/certbot/lib

docker compose run --rm certbot renew

if docker compose ps --services --status running | grep -qx "nginx"; then
  docker compose kill -s HUP nginx >/dev/null
fi
