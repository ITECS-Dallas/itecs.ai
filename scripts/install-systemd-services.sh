#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
STACK_SERVICE_PATH="/etc/systemd/system/itecs-website.service"
RENEW_SERVICE_PATH="/etc/systemd/system/itecs-website-certbot-renew.service"
RENEW_TIMER_PATH="/etc/systemd/system/itecs-website-certbot-renew.timer"

sudo tee "$STACK_SERVICE_PATH" >/dev/null <<EOF
[Unit]
Description=ITECS Website Production Stack
After=network-online.target docker.service
Wants=network-online.target
Requires=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=${ROOT_DIR}
ExecStart=${ROOT_DIR}/scripts/prod-up.sh
ExecStop=${ROOT_DIR}/scripts/prod-down.sh
TimeoutStartSec=0

[Install]
WantedBy=multi-user.target
EOF

sudo tee "$RENEW_SERVICE_PATH" >/dev/null <<EOF
[Unit]
Description=Renew Let's Encrypt certificates for ITECS Website
After=docker.service
Requires=docker.service

[Service]
Type=oneshot
WorkingDirectory=${ROOT_DIR}
ExecStart=${ROOT_DIR}/scripts/certbot-renew.sh
EOF

sudo tee "$RENEW_TIMER_PATH" >/dev/null <<EOF
[Unit]
Description=Run ITECS Website certbot renewal twice daily

[Timer]
OnCalendar=*-*-* 02,14:00:00
Persistent=true
Unit=itecs-website-certbot-renew.service

[Install]
WantedBy=timers.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable --now itecs-website.service
sudo systemctl enable --now itecs-website-certbot-renew.timer

echo "Installed and enabled:"
echo " - itecs-website.service"
echo " - itecs-website-certbot-renew.timer"
