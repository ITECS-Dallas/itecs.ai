# ITECS SEO Measurement and Release

## Keep measurements distinct

Report these as separate states or outcomes:

- crawlability;
- indexability;
- indexing;
- search appearance;
- query and page rankings;
- local visibility;
- organic traffic;
- AI-feature or AI-search referral traffic;
- engagement;
- qualified conversions and assisted outcomes;
- earned mentions or backlinks; and
- sampled AI citations or recommendations.

## Evidence contract

Bind every metric to its exact property, window, collection date, filters, dimensions, completeness, and comparison method.

- Weight average position by impressions when aggregating it.
- Qualify incomplete, delayed, sampled, low-volume, or unequal windows.
- Keep Search Console, GA4, Bing AI Performance, and sampled model answers as separate evidence streams.
- Do not infer causation from a coincident change.
- Define the expected signal, earliest review date, and no-change interpretation before implementation.
- Connect visibility to qualified outcomes only when configured events and attribution support it.

## Prioritization

Prioritize in this order unless business risk justifies another order:

1. private-route exposure, unsafe indexing, or factual/schema misrepresentation;
2. crawl, canonical, redirect, status, or rendering defects;
3. broken buyer journeys and incorrect business facts;
4. material mobile or performance barriers;
5. content ownership, information gain, and internal discovery gaps; and
6. experiments and low-confidence opportunities.

## Authority gates

- Audit, review, research, and report: read-only.
- Source implementation: exact resolved paths only.
- Commit and push: explicit authorization plus passing validation.
- Publish, deploy, activate, merge, provider changes, crawler-policy changes, URL submissions, and service actions: separate explicit authority for the exact target.
- Stop when credentials prompt, the remote or target differs, evidence is unavailable for a volatile central claim, or safe staging cannot exclude unrelated work.

## Validation by change type

- Skill or guidance only: structural validation, direct-reference checks, negative checks, behavioral evaluation, and `git diff --check`.
- Validator script: language syntax check, focused positive/negative fixtures, and repository audit command.
- Public source: lint, typecheck, build, rendered mobile inspection, metadata/schema checks, and link checks.
- Published release: all local gates plus pre/post public response comparison.

## Rollback record

Before mutation, preserve hashes or a private backup of overlapping authorized work. Define:

- exact files to restore;
- trigger that requires rollback;
- validation after restoration;
- whether a focused revert is required for a committed change; and
- the next authority gate.

Never reset the repository or discard unrelated work.
