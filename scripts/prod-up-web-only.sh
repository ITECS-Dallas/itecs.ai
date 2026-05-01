#!/usr/bin/env bash
# Start only the Next.js web container (no nginx).
# Used when the website/chat stack's nginx handles TLS termination
# and proxying for both chat.itecs.ai and itecs.ai.
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

# Ensure the Docker Compose network exists so the website stack's
# nginx (which declares itecsai_default as external) can reach us.
docker compose up -d --remove-orphans web
