# Weekly SEO Loop

Run the recurring SEO cycle for itecs.ai using Google Search Console + GA4 data. This command is invoked interactively or by the weekly cron (`claude -p "/seo-weekly"`).

## 1. Pull data

```bash
node scripts/seo/audit.mjs --no-inspect
```

On the **first run of each month**, drop `--no-inspect` so index coverage for every sitemap URL is refreshed (URL Inspection API is slow; quota 2000/day).

Reports land in `/home/itecs/.google-seo/reports/audit-<date>.json`. Read the newest report AND the previous one for comparison. Credentials: `/home/itecs/.google-seo/itecs-seo-bot.json` (never commit, never print the private key).

## 2. Analyze

From the JSON report, derive:

- **Trend**: total clicks/impressions vs previous window (`gscQueries` vs `gscQueriesPrev`, `gscTotalsByDate`).
- **Striking-distance keywords**: queries at position 4–20 with impressions ≥ 10. These map to existing pages via `gscQueryPage`.
- **Low-CTR pages**: position ≤ 10, impressions ≥ 25, CTR clearly below position norms (~pos1 ≥ 25%, pos 2–3 ≥ 10%, pos 4–10 ≥ 3%). Candidate for title/meta rewrite.
- **Content gaps**: queries with impressions ≥ 10 ranking > 20, or query themes with no dedicated page → new spoke article candidates.
- **Index problems**: any `indexCoverage` entry (when present) whose `coverageState` is not "Submitted and indexed" — diagnose (crawled-not-indexed usually means thin/duplicative content).
- **Conversion mapping**: `ga4OrganicLanding` keyEvents by landing page — prioritize work on pages that convert. Note `ga4AiLanding` (AI Assistant channel) separately for GEO tracking.

## 3. Report

Write `/home/itecs/.google-seo/reports/report-<date>.md`: a short executive summary (trend, wins, concerns), then prioritized action tables. Brian reads this in 2 minutes. Compare against the previous report-*.md so repeated recommendations are flagged rather than re-discovered.

## 4. Act (guardrails)

**Allowed automatically** (standing CPBA approval covers these):
- Title/meta description rewrites for low-CTR pages (edit `src/lib/metadata.ts` usage / page metadata / `constants.ts`).
- Strengthening existing pages for striking-distance queries: FAQ additions, heroSummary tweaks, internal links from related pages.
- Sitemap/robots/schema fixes for index problems.

After edits: `npm run build` must pass, then run `/cpba`, then verify the changed pages on the live site with Playwright (Googlebot Smartphone viewport per CLAUDE.md).

**Recommend only — do not do unattended:**
- New insight articles (list as recommendations with target query + suggested hub; write interactively via `/write-content`).
- Page restructuring, new hub pages, pricing changes, removing content.

## 5. Log

Append one line per action taken to `/home/itecs/.google-seo/actions.log`:
`<date> | <page> | <change> | <trigger metric>` — the next cycle checks whether past actions moved their metrics before making further changes to the same page (give changes ≥ 2 weeks before judging).
