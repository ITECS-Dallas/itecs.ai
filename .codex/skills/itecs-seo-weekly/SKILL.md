---
name: itecs-seo-weekly
description: Use when collecting, reviewing, or reporting recurring ITECS.ai provider SEO evidence from Google Search Console, GA4, Bing Webmaster Tools or AI Performance, and sampled AI visibility; use it to compare complete windows, prioritize business impact, evaluate prior actions, and write the weekly executive SEO report. Do not use it for a generic static-site audit or to write an article.
---

# ITECS Weekly SEO

## Purpose

Collect current provider evidence, compare defensible windows, review prior actions, and produce a concise executive report. Keep Search Console, GA4, Bing AI Performance, and sampled model answers as separate evidence streams.

Read [references/analysis-and-reporting.md](references/analysis-and-reporting.md) before interpreting a collection.

## Route the Request

- Use `$itecs-seo-audit` for source/static audits, public response checks, crawl controls, structured data, metadata, links, mobile rendering, and release validation.
- Use `$itecs-write-content` only after a user explicitly asks to implement a content change.
- Use `$itecs-insight-articles` only when the user explicitly requests an Insights article. A content opportunity in a report is not article authority.
- Load a companion once and do not recursively reload this skill.

## Authority Modes

- **Audit, collect, review, or report:** read provider and local evidence and write only the requested private report artifact. Do not edit website source, provider settings, public files, scheduler/runtime, or action logs.
- **Implement or optimize:** make only the exact authorized local source change after diagnosis. Do not commit, push, publish, deploy, or change providers unless explicitly requested.
- **Publish or deploy:** require separate explicit authority for the exact source, branch, and target after validation.

Low CTR, a ranking change, a model answer, or a report recommendation never authorizes a website mutation by itself.

## Know the Two Audits

- Discover and inspect the current provider collector under `scripts/seo/` before running it.
- `npm run seo:audit` runs `scripts/seo-audit.mjs`, a separate static repository validator. Do not substitute it for provider collection.
- Discover current report paths, properties, credentials, scopes, options, windows, scheduler state, and quota behavior from the collector and runtime. Do not treat values remembered here or in an old report as current.
- Confirm credential existence and permissions without printing or opening secret material.

## Workflow

1. **Preflight**
   - Confirm `/home/itecs/itecs.ai`, instructions, branch, worktree, requested period, and read/write boundary.
   - Read the current collector completely and identify configured properties, exact windows, lag allowance, fields, optional inspection behavior, output path, and failure behavior.
   - Discover scheduler/runtime state only when relevant to the request. Report it as dated evidence, not an evergreen skill fact.

2. **Collect current evidence**
   - Run the current collector with the minimum provider access required for the requested report.
   - Treat a missing credential, denied scope, quota error, partial response, missing current-window field, empty unexpected dataset, or collector failure as a visible failure.
   - Never replace a failed collection with an old report or the static audit and label it current.

3. **Establish comparison context**
   - Use current collector output to identify exact non-overlapping comparison windows.
   - Record collection time, source property, filters, dimensions, sampling, lag, partial days, time zone, and completeness.
   - Read the latest relevant reports and prior-action log. Normalize URLs before matching actions.
   - Define the earliest defensible review date for each prior change before judging it.

4. **Analyze distinct streams**
   - Search Console: queries, pages, clicks, impressions, CTR, position, indexing or inspection when present.
   - GA4: organic landing activity, engagement, configured key events, and supported business outcomes.
   - Bing/AI Performance: cited pages, citations, grounding-query samples, dates, and supported surfaces; never rankings or authority.
   - Sampled AI visibility: exact model/version, prompt, session, date, location when relevant, citations, repetitions, and limitations.

5. **Prioritize business impact**
   - Prefer verified crawl/index defects, factual errors, conversion-path breaks, and high-intent page opportunities over low-volume fluctuations.
   - Strengthen an existing canonical owner before recommending another page.
   - Do not diagnose metadata from low CTR alone or average positions without impression weighting.
   - Connect visibility to qualified outcomes only when configured data supports the relationship.

6. **Write the report**
   - Keep observations, limitations, inference, recommendations, and authorized actions distinct.
   - For each recommendation, include evidence, confidence, smallest action, authority gate, validation, expected signal, earliest review date, and no-change interpretation.
   - State collection failures and missing evidence prominently.

7. **Record only completed authorized changes**
   - Update an action log only when the user authorized implementation and the change actually occurred.
   - Do not log recommendations, retries, or validation as completed changes.

## Guardrails

- Never expose credentials, private keys, raw user-level analytics, proposal data, or unrelated application data.
- Do not compare incomplete or unequal windows without qualification.
- Do not claim causation from directional provider metrics.
- Do not describe Bing citations or sampled model answers as rankings, placement, or durable authority.
- Do not invent attribution, conversions, traffic, rankings, review dates, or provider completeness.
- Do not mutate provider settings, Search Console, GA4, Bing, crawler rules, IndexNow, schedules, services, or public source from a report request.
- Preserve unrelated dirty work and isolate exact authorized paths.
