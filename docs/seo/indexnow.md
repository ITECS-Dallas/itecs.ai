# Native IndexNow notifications

Scope: webdev01 / itecs / /home/itecs/itecs.ai, canonical host https://itecs.ai.
Automation Vault remains the source of truth: item `zliue65ryep5rbhn4wvth64kay`,
ITECS.ai IndexNow site ownership key. Governance confirmed the vault-to-host
transfer and digest match. Never put the value in arguments, logs, Markdown or Git.

## Build and publish

The private runtime input is `/home/itecs/.config/itecs-indexnow/ownership-key`,
itecs-owned 0600 inside a real 0700 directory. The intentionally public proof is
`https://itecs.ai/indexnow-key.txt`: exactly the key bytes, using IndexNow's
root-level custom keyLocation option. No key appears in the URL. The generated
`public/indexnow-key.txt` is gitignored; the private config directory is not copied.

Follow the established isolated-candidate build, testing, source delivery and
web-only release workflow, preserving accepted resident work and the prior image.
Before building each candidate, run as itecs:

```sh
node scripts/indexnow.mjs prepare-key /absolute/isolated/candidate
```

After ordinary release validation, retain the old image for rollback and tag the
accepted immutable image as `itecsai-web:latest`. Activate through the existing
publish entry point, passing a receipt path in a private 0700 evidence directory:

```sh
./scripts/prod-deploy.sh --receipt /absolute/private/release-evidence/indexnow-receipt.json
```

This runs the established Compose web-only activation (`--no-deps --no-build
--force-recreate web`), then calls the sender. It does not build images, manage
certificates/ingress, impose release-admission gates, create deployment locks or
change general deployment policy. Perform ordinary release checks as usual.
The sender reuses installed Playwright and `/usr/bin/google-chrome`; no new
dependency, daemon, timer, application API or unrelated service is introduced.

## Content deltas

After activation, the sender reads the public canonical sitemap and fingerprints
public HTML: body text, titles, metadata, links, images and JSON-LD. Scripts,
build/chunk IDs and ownership tokens are excluded. It compares this inventory
with the last successfully submitted inventory, sending only added, changed or
deleted URLs. Unchanged releases perform no POST. The first run sends the current
inventory once; repeating after an accepted response skips unchanged URLs.

Collection requires public HTTP 200, matching canonical and indexability so an
outage/private page cannot become notification content. Private `/p`, `/api`,
query-string, foreign and noncanonical URLs are excluded. Deleted URLs come only
from the previous public inventory and must return 404/410 or a permanent
same-site redirect; sitemap omission alone is not treated as deletion. No private
proposal content is collected. This is content-change detection, not a full-site
release parity or mobile validation gate. CSS/chunk-only rebuilds do not notify;
shared public content changes can legitimately update several URLs.

## Receipts and ordinary retries

One JSON POST to https://api.indexnow.org/indexnow carries at most 10,000 canonical
public URLs, host, key and keyLocation. The public proof is checked for HTTP 200
and exact bytes first. Request bodies and provider response bodies are never
logged. Sanitized receipts record status, timestamp, public URL delta and count.

- HTTP 200: URLs received successfully; not an indexing/ranking guarantee.
- HTTP 202: received, with engine key validation pending. Preserve that distinction
  and record the accepted inventory; do not duplicate this batch.
- Other HTTP status: rejection recorded; old inventory retained for later retry.
- Transport error/timeout: uncertain outcome recorded; old inventory retained.
  A later retry can duplicate an uncertain request; no exactly-once claim is made.

State lives in `/home/itecs/.config/itecs-indexnow/state.json`, mode 0600, containing
only public URL fingerprints and receipt status, never the key. Receipts are 0600.
Provider errors exit nonzero without rolling back a healthy website or retrying
automatically. There is no persistent pending-attempt blockade. After resolving
the reported failure, retry notifications without rebuilding or redeploying:

```sh
node scripts/indexnow.mjs notify --receipt /absolute/private/release-evidence/indexnow-retry.json
```

The receipt option is optional: without it, a timestamped receipt is saved beside
state.json. Use separate receipt names to retain attempt history. This retry compares
current public content to the last accepted state; it also skips unchanged URLs.
If public startup/collection fails before submission, no POST is made; the same
notification command can be run once the site is ready.

## Rollback and tests

Retag the exact retained previous image to `itecsai-web:latest` and use the same
web-only activation. Notify the restored content once public validation completes;
do not rewrite notification state to conceal changes. The pre-IndexNow R3 image
does not contain the ownership proof, so a rollback to that image leaves IndexNow
pending until a release includes the proof again. Keep the private key and Vault
item; neither needs modification for source/runtime rollback.

`node --test tests/indexnow.test.mjs` covers canonical/private URL handling,
fingerprints/deltas, key permissions/proof, deletions, 200/202/error receipts,
initial discovery, no-op suppression, ordinary retry and the production hook.
Synthetic tests never submit fake URLs to a search engine.

Official protocol references: [documentation](https://www.indexnow.org/documentation)
and [FAQ](https://www.indexnow.org/faq).
