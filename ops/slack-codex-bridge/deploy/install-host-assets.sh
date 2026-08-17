#!/bin/sh
set -eu

source_root=/home/itecs/itecs.ai/ops/slack-codex-bridge/deploy

if [ "$(id -u)" -eq 0 ]; then
  echo "Run this installer as itecs; it uses passwordless sudo for root-owned assets." >&2
  exit 1
fi
if [ ! -d "${source_root}" ]; then
  echo "Bridge deployment assets are missing." >&2
  exit 1
fi

sudo install -d -o root -g root -m 0755 /etc/itecs-ai-codex-slack
sudo install -d -o root -g root -m 0755 /usr/local/libexec
sudo install -d -o root -g root -m 0755 /usr/local/sbin
sudo install -o root -g root -m 0644 \
  "${source_root}/config.env" \
  /etc/itecs-ai-codex-slack/config.env
sudo install -o root -g root -m 0644 \
  "${source_root}/op.env" \
  /etc/itecs-ai-codex-slack/op.env
sudo install -o root -g root -m 0755 \
  "${source_root}/itecs-ai-codex-slack-run" \
  /usr/local/libexec/itecs-ai-codex-slack-run
sudo install -o root -g root -m 0750 \
  "${source_root}/itecs-ai-codex-slack-set-op-credential" \
  /usr/local/sbin/itecs-ai-codex-slack-set-op-credential
sudo install -o root -g root -m 0644 \
  "${source_root}/itecs-ai-codex-slack.service" \
  /etc/systemd/system/itecs-ai-codex-slack.service
sudo systemctl daemon-reload

echo "Host assets installed. The service was not enabled or started."
