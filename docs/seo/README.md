# SEO Action Ledger

`docs/seo/action-ledger.jsonl` is the append-only, machine-readable record of
every implemented SEO action for itecs.ai. It exists so the SearchOps program
can answer: which recommendation was implemented, in which deployed commit,
with what expected signal, when it is fair to review it, and what actually
happened.

## Rules

1. **Append-only.** Never edit or delete an existing line. Corrections are new
   lines (a `review` entry, or a superseding `action` entry that names the old
   `actionId` in its description).
2. **One JSON object per line**, compact, keys sorted (`json.dumps` with
   `sort_keys=True, separators=(",", ":")`).
3. **Record the action in the same commit** that implements a site change
   whenever possible, so `deployedCommit` can point at the parent that shipped
   it; for changes recorded after the fact, use the owning commit hash.
4. After changing the ledger, run `scripts/sync-seo-action-ledger.sh` (needs
   sudo) so the SearchOps collector can embed it in the weekly evidence.

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

## Runtime integration

`scripts/sync-seo-action-ledger.sh` validates the JSONL and installs it as a
compact JSON array at `/etc/itecs-ai-seo/action-ledger.json` (root-owned,
0644). From SearchOps v1.1.64 the collector embeds that file in the collection
payload, so the weekly Codex analysis sees the full implemented-action history
next to the provider evidence. The ledger contains no secrets and no client
names beyond published site content.

## History

The pre-ledger action log lived at `/home/itecs/.google-seo/actions.log` and
stopped on 2026-07-27; its entries are backfilled here with
`sourceRecommendation: "legacy-actions-log"` and `deployedCommit: null`.
