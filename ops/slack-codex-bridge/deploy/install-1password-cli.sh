#!/bin/sh
set -eu

if [ "$(id -u)" -eq 0 ]; then
  echo "Run this installer as itecs; it uses passwordless sudo." >&2
  exit 1
fi
if [ "$(dpkg --print-architecture)" != "amd64" ]; then
  echo "This pinned host installer expects the target's amd64 architecture." >&2
  exit 1
fi

temporary_directory=$(mktemp -d)
cleanup() {
  rm -r -- "${temporary_directory}"
}
trap cleanup EXIT HUP INT TERM

curl --fail --silent --show-error \
  --output "${temporary_directory}/1password.asc" \
  https://downloads.1password.com/linux/keys/1password.asc
gpg --batch --yes --dearmor \
  --output "${temporary_directory}/1password-archive-keyring.gpg" \
  "${temporary_directory}/1password.asc"
curl --fail --silent --show-error \
  --output "${temporary_directory}/1password.pol" \
  https://downloads.1password.com/linux/debian/debsig/1password.pol

sudo install -o root -g root -m 0644 \
  "${temporary_directory}/1password-archive-keyring.gpg" \
  /usr/share/keyrings/1password-archive-keyring.gpg
sudo install -d -o root -g root -m 0755 \
  /etc/debsig/policies/AC2D62742012EA22
sudo install -o root -g root -m 0644 \
  "${temporary_directory}/1password.pol" \
  /etc/debsig/policies/AC2D62742012EA22/1password.pol
sudo install -d -o root -g root -m 0755 \
  /usr/share/debsig/keyrings/AC2D62742012EA22
sudo install -o root -g root -m 0644 \
  "${temporary_directory}/1password-archive-keyring.gpg" \
  /usr/share/debsig/keyrings/AC2D62742012EA22/debsig.gpg
sudo install -o root -g root -m 0644 \
  /home/itecs/itecs.ai/ops/slack-codex-bridge/deploy/1password.list \
  /etc/apt/sources.list.d/1password.list

sudo apt-get update
sudo apt-get install -y 1password-cli
/usr/bin/op --version
