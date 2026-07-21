# ITECS Intelligence OS

ITECS Intelligence OS is the sitewide, on-demand product demonstration mounted
from the root Next.js layout. It is intentionally absent from hidden proposal
routes under `/p`.

## What is real and what is simulated

- The AI Terminal uses a real server-side OpenAI Responses API connection for
  free-form questions about ITECS AI.
- The security incident is deterministic theater. Its topology, event feed,
  response narration, counters, and timing are demo data and must never be
  described as a live client incident.
- The Solution Configurator is a deterministic React calculator driven by the
  current public pricing catalog. It provides starting points and ranges, not a
  contract or firm quote.
- Resource Vault proof cards use the source-linked managed-services case studies
  in `TRUST_CASE_STUDIES`. They prove the operating foundation behind ITECS AI;
  they are not represented as AI deployment case studies.
- No live operations, CRM, client, proposal, analytics, or ticket data is
  exposed to the experience.

## Grounding source

`src/lib/constants.ts` and `src/lib/site-config.ts` are the runtime content
owners. `src/lib/intelligence/knowledge.ts` builds a curated public-only search
corpus from those exports at build time. It does not read `/p`, proposal
components, private files, environment files, or old Markdown price sheets.

Current `constants.ts` pricing wins over older page copy and
`itecs-ai-public-price-sheet.md`. In particular, the current Production AI Pilot
is $21,500. The no-cost `/assessment` form is an intake request; the separate
formal 1–2 week AI Readiness Assessment is currently $6,500.

Retrieval is facet-aware rather than relying on a single relevance score. For
recognized pricing and service terms, it deterministically pins the applicable
category overview and exact offering documents before filling the remaining
context with ranked public sources. This keeps both sides of comparisons such
as pilots versus custom agents, adoption retainers versus production-agent
operations, or SEO tiers in the same trusted context. Recent bounded
conversation turns are included so short follow-up questions can retain the
relevant public facets.

## Request boundary

The browser posts a bounded message, recent in-memory history, a random session
ID, and an allowlisted public page path to `/api/intelligence/stream`.

The route:

1. validates size, shape, roles, session ID, and page path;
2. applies per-session, debounce, and pseudonymous per-IP daily limits;
3. builds a facet-aware selection of current public ITECS documents locally;
4. classifies topic scope and prompt injection with a strict structured output;
5. returns a fixed ITECS-only refusal for off-topic or injection requests;
6. after scope approval, first checks the deterministic precision-answer
   handler for recognized, high-confidence published comparisons,
   clarifications, and tightly matched solution blueprints;
7. when no precision intent matches, generates an answer privately with inline
   moderation enabled and runs a second strict structured-output gate that
   checks ITECS-only scope, evidence, pricing, proof labels, guarantees, prompt
   leakage, sensitive-data solicitation, and request alignment;
8. releases only authoritative precision output or a verifier-approved model
   answer as paced SSE deltas alongside canonical React resource cards; and
9. sends a fixed transparent unavailable state when a generated answer cannot
   be safely verified. Unapproved draft model text is never sent to the
   browser.

The deterministic precision handler is the primary authoritative handler for
the narrow intents it recognizes, not a fallback after provider failure. It
builds responses directly from the same current constants that own public
service and pricing content. Covered comparisons include pilot tiers, pilots
versus custom agents, Managed AI adoption versus Agent Operations, Data Audit
versus AI Readiness, service-page estimates, the published hourly-rate
components, SEO tiers, and the no-cost intake versus paid assessment
distinction. The exact published PPV and Field Examination scenarios also have
deterministic build/data/action blueprints, and a bounded budget/team-size
decision path evaluates visitor constraints against the current pilot and
custom-build constants. Exact public-catalog questions for Proof of Concept
versus Small Pilot and the multi-source AI Knowledge Base fit also use this
path. Unrecognized, qualified, or open-ended ITECS questions continue through
the grounded answer-and-verifier path.

Conversation state is held only in the open client experience. OpenAI requests
set `store: false`. ITECS and the demo do not save chat text; OpenAI may retain
API data for abuse monitoring under its API policy, which is disclosed in the
terminal. Application diagnostics may contain a keyed pseudonymous visitor ID,
request ID, scope or rate-limit category, safe provider stage and error code,
verifier failure category and failed-check names, provider HTTP status, and IDs
for selected public knowledge documents. They do not contain visitor prompts,
conversation history, generated drafts or answers, trusted-context text, raw IP
addresses, credentials, or unnecessary PII.

The Next.js layer enforces request, session, daily-IP, and debounce limits. The
nginx route adds a 16 KiB body ceiling and per-IP burst control before a request
reaches the application. The application limiter is process-local for the
current single-web-container deployment; use a shared limiter before adding
web replicas.

## Environment

```bash
OPENAI_API_KEY=
OPENAI_CHAT_MODEL=gpt-5.6-terra
OPENAI_SCOPE_MODEL=gpt-5.6-luna
OPENAI_VERIFIER_MODEL=
```

The key and model selection remain server-side and are passed to the `web`
container by `docker-compose.yml`. The answer and verifier models prioritize
strong business reasoning and precise evidence review. The smaller model runs
the fail-closed input classifier. The verifier can be configured separately but
defaults to the answer model so valid multi-document comparisons are not judged
by a less capable model.

## Reliability evaluation

The deterministic request, retrieval, precision-answer, provider, publication,
and browser-stream contracts run without billable model calls:

```bash
npm run test:intelligence
```

The separate 24-case real-model corpus is an explicit local evaluation, not a
normal test or production-monitoring command. Validate its fixture or review the
available case IDs without making HTTP requests:

```bash
npm run eval:intelligence -- --help
npm run eval:intelligence -- --list
```

Start the locally configured application in one terminal:

```bash
npm run dev
```

Then explicitly opt in to sequential live-provider requests from another
terminal:

```bash
npm run eval:intelligence -- --run
```

The runner accepts only a loopback HTTP origin and rejects HTTPS, embedded
credentials, non-loopback hosts, and redirects. Its console output omits prompts
and answers, showing case IDs, pass/fail state, duration, compact failure details,
and an aggregate result. To retain prompts, answers, event types, and resource
IDs for local diagnosis, request the gitignored report explicitly:

```bash
npm run eval:intelligence -- --run --report
```

The default report path is `.eval-results/intelligence-eval.json`. Use repeated
`--case <id>` options for a focused rerun. Because `--run` invokes the configured
live provider, it can incur API usage and is intentionally excluded from the
deterministic test command.

## Deployment on the shared production host

The active TLS ingress is the separate `website-nginx-1` container. Do not start
this repository's nginx for a routine website release. Build from a clean
checkout of the intended commit, then replace only the ITECS AI web service:

```bash
docker compose build web
docker compose up -d --no-deps web
docker compose ps web
```

Then verify the public homepage, pricing page, a representative refusal, a
representative grounded answer, the deterministic incident, the configurator,
and the `/p` suppression rule. The SSE route returns `no-transform` and
`X-Accel-Buffering: no`; the active shared ingress also disables buffering and
caching specifically for this route.
