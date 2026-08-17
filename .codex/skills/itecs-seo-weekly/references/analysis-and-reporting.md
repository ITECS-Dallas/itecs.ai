# ITECS Weekly SEO Analysis and Reporting

## Contents

- [Discovery](#discovery)
- [Evidence streams](#evidence-streams)
- [Comparison rules](#comparison-rules)
- [Opportunity analysis](#opportunity-analysis)
- [Prior actions](#prior-actions)
- [Recommendation contract](#recommendation-contract)
- [Report structure](#report-structure)

## Discovery

Read the current provider collector before every run. Record:

- exact Search Console, GA4, Bing, or other property;
- credential/scopes availability without exposing secret content;
- current and comparison date windows, lag rule, time zone, and collection date;
- filters, dimensions, row limits, sampling, aggregation, and partial-day behavior;
- fields returned, optional inspections, and missing fields;
- report and action-log paths; and
- collector exit status and error output.

Do not hardcode a remembered property, window, report path, inspection cadence, or scheduler state as evergreen truth.

## Evidence streams

### Search Console

- Report clicks, impressions, CTR, and position with exact windows.
- Compute aggregate CTR from total clicks divided by total impressions.
- Weight average position by impressions when aggregating rows.
- Use query-page evidence for page recommendations; aggregate query or page rows alone can hide intent mismatches.
- Treat inspection/index coverage as point-in-time evidence. Diagnose status, robots, canonical, redirect, sitemap, duplication, and recency before suggesting content changes.

### GA4

- State the property, channel definition, landing-page dimension, event names, attribution limits, and date/time-zone behavior.
- Use sessions, engagement, and configured key events together for commercial context.
- Do not call a page commercial based on traffic alone; use page purpose and buyer intent.
- Keep organic and AI-assistant referral groupings separate.

### Bing AI Performance

- Record selected dates and supported AI surfaces.
- Treat total citations, cited-page counts, grounding-query samples, page citations, and trends as observations.
- Do not interpret citations as ranking, placement, authority, or page importance.

### Sampled AI answers

Record model/version, product, account tier when relevant, session state, exact prompt, browsing state, date, location when relevant, citations, sample size, and limitations. A single answer is not a ranking.

## Comparison rules

- Compare complete, equal, non-overlapping windows when possible.
- Qualify lag, missing days, low volume, sampling, changed tracking, seasonality, launches, outages, and brand demand.
- Report absolute and percentage change only when denominators support it.
- Report CTR movement in percentage points.
- Do not infer business growth from impressions alone.
- Do not infer a metadata defect from low CTR alone.

## Opportunity analysis

Use thresholds only as optional diagnostics derived from the current dataset. Label them as analyst choices, not search-engine requirements.

For each candidate:

1. identify the query, page, intent, volume, position/CTR context, and business role;
2. confirm the canonical page owner and nearest competing route;
3. inspect the live result, metadata, content, and conversion path;
4. decide whether the issue is technical, intent, content, snippet, competition, or insufficient evidence; and
5. propose the smallest action with a measurable signal.

Prefer improving an existing owner when it already fits the intent. Recommend a new page only when a distinct audience need, commercial fit, and material information gain are clear.

## Prior actions

- Read the current action log before repeating a recommendation.
- Normalize GSC URLs to the log's site-relative format.
- Set an earliest review date appropriate to the change and available data; do not use a universal waiting period.
- Reopen a change early only for an objectively verifiable regression, factual error, broken link, or indexing defect.
- Label each prior action too early, improving, flat, declining, confounded, or unmeasurable with evidence.

## Recommendation contract

Include:

| Field | Requirement |
| --- | --- |
| Evidence | Property, URL/query, window, filters, sample, and observed state |
| Confidence | Confirmed, likely, or hypothesis |
| Action | Smallest proposed change |
| Authority | Source, publication, deployment, or provider approval needed |
| Validation | Local, rendered, public, or provider check |
| Expected signal | Technical or business outcome |
| Review date | Earliest defensible date and comparison |
| No-change meaning | What flat evidence would and would not prove |
| Stop/rollback | Failure condition and recovery |

## Report structure

```markdown
# ITECS Weekly SEO Report — YYYY-MM-DD

Collection date/time:
Properties and sources:
Measurement window:
Comparison window:
Completeness and limitations:

## Executive summary

## Search Console

## GA4 and qualified outcomes

## Bing AI Performance

## Sampled AI visibility

## Wins and concerns

## Prior-action review

## Prioritized recommendations

## Collection failures or missing evidence
```

Keep the executive summary readable in about two minutes. Do not hide a failed or incomplete collection behind an empty section.
