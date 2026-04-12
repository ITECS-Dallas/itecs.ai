#!/bin/sh
set -eu

ACTION="${1:-help}"

if [ -z "${APP_FQDN:-}" ]; then
  echo "APP_FQDN is required." >&2
  exit 1
fi

if [ -z "${LETSENCRYPT_EMAIL:-}" ]; then
  echo "LETSENCRYPT_EMAIL is required." >&2
  exit 1
fi

if [ -z "${CLOUDFLARE_DNS_API_TOKEN:-}" ]; then
  echo "CLOUDFLARE_DNS_API_TOKEN is required." >&2
  exit 1
fi

mkdir -p /etc/letsencrypt /var/lib/letsencrypt
umask 077
cat <<EOF >/etc/letsencrypt/cloudflare.ini
dns_cloudflare_api_token = ${CLOUDFLARE_DNS_API_TOKEN}
EOF

BASE_ARGS="
  --dns-cloudflare
  --dns-cloudflare-credentials /etc/letsencrypt/cloudflare.ini
  --dns-cloudflare-propagation-seconds ${LE_DNS_PROPAGATION_SECONDS:-60}
  --agree-tos
  --non-interactive
  --email ${LETSENCRYPT_EMAIL}
"

case "$ACTION" in
  init)
    certbot certonly $BASE_ARGS --keep-until-expiring -d "${APP_FQDN}" -d "www.${APP_FQDN}"
    ;;
  renew)
    certbot renew $BASE_ARGS --keep-until-expiring
    ;;
  help|*)
    echo "Usage: certbot-dns.sh {init|renew}" >&2
    exit 1
    ;;
esac
