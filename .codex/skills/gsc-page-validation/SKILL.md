---
name: gsc-page-validation
description: Submit and validate public ITECS website pages with Google Search Console. Use when Codex creates, deploys, audits, renames, or materially updates public indexable routes/pages on itecs.ai, including manufacturing vertical pages, insight articles, service pages, sitemap changes, robots/canonical changes, or any request to submit/test URLs in GSC.
---

# GSC Page Validation

## Required Timing

Use this skill after public pages are deployed and reachable on `https://itecs.ai`.
Do not claim a new page is fully submitted or GSC-tested until this skill has run, or until you state why it could not run.

## Inputs

Use these env vars from the project root `.env`; never print secret values:

```bash
GSC_SITE_URL=sc-domain:itecs.ai
GOOGLE_APPLICATION_CREDENTIALS=/home/itecs/.secrets/gsc-service-account.json
```

If `GSC_SITE_URL` is `https://itecs.ai/` but the Sites API returns only `sc-domain:itecs.ai`, update the local ignored `.env` to the domain property.

## Workflow

1. Confirm every target URL is live after deployment.
2. Run the bundled script from the repo root with all changed public URLs:

```bash
node .codex/skills/gsc-page-validation/scripts/gsc-submit-inspect.mjs \
  https://itecs.ai/new-page \
  https://itecs.ai/another-page
```

3. Read the JSON summary:
   - `siteGet` must be `ok: true` with a usable permission level.
   - `sitemapSubmit` should return HTTP `204` or `ok: true`.
   - `sitemapGet` should show `errors: "0"` and `warnings: "0"`.
   - Live checks should show `200`, matching canonical, `index, follow`, and sitemap inclusion.
   - URL Inspection should be reported honestly. Newly published URLs often show `Discovered - currently not indexed` or `URL is unknown to Google`.
4. Include the GSC outcome in the final report for the page work.

## Script Notes

The script uses only Node built-ins and the global `fetch`; do not add dependencies for this workflow.
It writes a full report to `/tmp/gsc-page-validation-<timestamp>.json` and prints a compact safe summary.

GSC API limitation: URL Inspection API returns Google indexed-data state. It does not run the UI-only live URL test or guarantee indexing. The script performs direct live checks as a substitute for current-page technical accessibility.

## Failure Handling

- Missing env vars: create or update ignored `.env`, then retry.
- Auth failure: check the service-account JSON path and key validity.
- Permission failure: add the service-account `client_email` to Search Console as a full user for `sc-domain:itecs.ai`.
- Sitemap pending: acceptable immediately after submission if `errors` and `warnings` are zero.
- URL unknown/not indexed: acceptable for fresh URLs; report it as a recheck item, not a deployment blocker.
