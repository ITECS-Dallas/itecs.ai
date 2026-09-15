# SEO Action Ledger

`docs/seo/action-ledger.jsonl` is the append-only, machine-readable record of
every implemented SEO action for itecs.ai. It preserves the history of
which recommendation was implemented, in which deployed commit,
with what expected signal, when it is fair to review it, and what actually
happened.

## Scheduled analyzer retired

Brian retired the daily and weekly SearchOps workers on 2026-09-15. Their
timers, phase services, runtime and installation hooks have been removed from
webdev01. No automated collection, Codex SEO analysis or scheduled SEO Slack
reporting remains. See [worker retirement](worker-retirement.md) for the exact
deployment boundary, preserved data and recovery record. This does not remove
manual SEO validation, website metadata, crawler policy or IndexNow notifications.

## Google-first SEO guidance

Google SEO, accessibility, and people-first usefulness take precedence over Bing
or other scanner warning counts. Follow [Google’s image guidance](https://developers.google.com/style/images):
keep `alt=""` for decorative or redundant artwork, never omit the attribute, and
describe informative images and image-link purposes accurately in context.
Follow [Google’s title guidance](https://developers.google.com/search/docs/appearance/title-link):
write descriptive, concise titles while preserving query intent, essential
brand/location terms, and source-reported qualifiers. Google has no fixed title
character limit; address length warnings through meaningful editing, not generic
truncation or loss of meaning.

## Rules

1. **Append-only.** Never edit or delete an existing line. Corrections are new
   lines (a `review` entry, or a superseding `action` entry that names the old
   `actionId` in its description).
2. **One JSON object per line**, compact, keys sorted (`json.dumps` with
   `sort_keys=True, separators=(",", ":")`).
3. **Record the action in the same commit** that implements a site change
   whenever possible, so `deployedCommit` can point at the parent that shipped
   it; for changes recorded after the fact, use the owning commit hash.
4. Keep the ledger in Git. There is no collector mirror to update: the retired
   workflow's `scripts/sync-seo-action-ledger.sh` has been removed.

## Entry types

`action` — an implemented change:

| Field | Meaning |
|---|---|
| `actionId` | `SEO-YYYYMMDD-NN`, keyed by `implementedAt` date |
| `implementedAt` / `recordedAt` | when the change went live / when the entry was written |
| `deployedCommit` | short hash of the owning commit; `null` for legacy or non-repo actions |
| `actionType` | `content`, `technical-seo`, `measurement`, `program`, `infrastructure` |
| `affectedUrls` | route paths, `"sitewide"`, or `"searchops-runtime"` |
| `expectedSignal` | `{metric, direction}`; `direction` is `increase`, `decrease`, or `diagnostic-only` |
| `earliestReviewDate` | first date a fair before/after comparison is possible (provider windows are 28 days with a 3-day lag) |
| `sourceRecommendation` | analyzer candidate id, work-order id, `editorial-calendar`, or `legacy-actions-log` |
| `rollback` | how to undo (usually `git revert of the owning commit`) |

`review` — the observed outcome of a prior action:

| Field | Meaning |
|---|---|
| `actionId` | the action being reviewed |
| `reviewedAt` | date of the review |
| `outcome` | `improved`, `flat`, `declined`, `inconclusive` |
| `notes` | the evidence, including confounders and shared attribution |

## Historical runtime integration

Until retirement, a sync script mirrored this ledger to
`/etc/itecs-ai-seo/action-ledger.json` for the weekly collector. The old mirror
and reports remain historical evidence only; they are not maintained or treated
as current measurements. The Git ledger contains no secrets and no client names
beyond published site content.

## History

The pre-ledger action log lived at `/home/itecs/.google-seo/actions.log` and
stopped on 2026-07-27; its entries are backfilled here with
`sourceRecommendation: "legacy-actions-log"` and `deployedCommit: null`.
