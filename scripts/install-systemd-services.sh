#!/usr/bin/env bash
# Install systemd units for the itecs.ai web container and cert renewal.
#
# Architecture: This server runs two Docker Compose stacks:
#   1. itecsai (this repo)  — Next.js web container on itecsai_default network
#   2. website (/home/itecs/website) — chat.itecs.ai RAG app + master nginx
#
# The website stack's nginx handles TLS termination and proxying for BOTH
# chat.itecs.ai and itecs.ai. It joins the itecsai_default network to reach
# itecsai-web-1:3000. Therefore:
#   - itecsai.service starts FIRST (creates network + web container, no nginx)
#   - itecs-chat.service starts AFTER (its nginx needs the itecsai network)
#
# The itecs.ai stack still manages its own Let's Encrypt cert via certbot,
# since the website stack's certbot only covers chat.itecs.ai.
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

ITECSAI_SERVICE="/etc/systemd/system/itecsai.service"
ITECSAI_RENEW_SERVICE="/etc/systemd/system/itecsai-certbot-renew.service"
ITECSAI_RENEW_TIMER="/etc/systemd/system/itecsai-certbot-renew.timer"
CHAT_SERVICE="/etc/systemd/system/itecs-chat.service"

# ── 1. itecsai.service (web container only, no nginx) ───────────────────
sudo tee "$ITECSAI_SERVICE" >/dev/null <<EOF
[Unit]
Description=ITECS AI Website (web container only)
After=network-online.target docker.service
Wants=network-online.target
Requires=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=${ROOT_DIR}
ExecStart=${ROOT_DIR}/scripts/prod-up-web-only.sh
ExecStop=/usr/bin/docker compose -f ${ROOT_DIR}/docker-compose.yml down
TimeoutStartSec=120

[Install]
WantedBy=multi-user.target
EOF

# ── 2. Certificate renewal for itecs.ai ─────────────────────────────────
sudo tee "$ITECSAI_RENEW_SERVICE" >/dev/null <<EOF
[Unit]
Description=Renew Let's Encrypt certificate for itecs.ai
After=docker.service
Requires=docker.service

[Service]
Type=oneshot
WorkingDirectory=${ROOT_DIR}
ExecStart=${ROOT_DIR}/scripts/certbot-renew.sh
EOF

sudo tee "$ITECSAI_RENEW_TIMER" >/dev/null <<EOF
[Unit]
Description=Renew itecs.ai certificate twice daily

[Timer]
OnCalendar=*-*-* 01,13:30:00
Persistent=true
Unit=itecsai-certbot-renew.service

[Install]
WantedBy=timers.target
EOF

# ── 3. Patch itecs-chat.service to start AFTER itecsai.service ───────────
# Only patch if the unit file exists (the chat stack manages its own install)
if [ -f "$CHAT_SERVICE" ]; then
  if ! grep -q "itecsai.service" "$CHAT_SERVICE"; then
    echo "Patching itecs-chat.service to depend on itecsai.service..."
    sudo sed -i '/^After=/ s/$/ itecsai.service/' "$CHAT_SERVICE"
    sudo sed -i '/^Wants=/ s/$/ itecsai.service/' "$CHAT_SERVICE"
  else
    echo "itecs-chat.service already depends on itecsai.service."
  fi
fi

# ── 4. Reload and enable ────────────────────────────────────────────────
sudo systemctl daemon-reload
sudo systemctl enable itecsai.service
sudo systemctl enable itecsai-certbot-renew.timer

echo ""
echo "Installed and enabled:"
echo "  itecsai.service                 — starts web container on boot"
echo "  itecsai-certbot-renew.timer     — renews itecs.ai cert at 01:30 and 13:30 UTC"
echo ""
if [ -f "$CHAT_SERVICE" ]; then
  echo "Patched:"
  echo "  itecs-chat.service              — now starts after itecsai.service"
fi
echo ""
echo "Boot order: docker → itecsai (web) → itecs-chat (all services + nginx)"
