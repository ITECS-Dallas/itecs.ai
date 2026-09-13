#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

# Activate a tested immutable web image; never touch shared ingress/certificates.
# See docs/seo/indexnow.md for candidate preparation, receipts and rollback.
sudo -n docker compose --project-name itecsai --project-directory "$ROOT_DIR" \
  --env-file "$ROOT_DIR/.env" --file "$ROOT_DIR/docker-compose.yml" \
  up -d --no-deps --no-build --force-recreate web

# Notify the resulting public content; provider errors are retried with notify,
# not another deployment. The caller has already built/tagged itecsai-web:latest.
exec node scripts/indexnow.mjs notify "$@"
