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

## Request boundary

The browser posts a bounded message, recent in-memory history, a random session
ID, and an allowlisted public page path to `/api/intelligence/stream`.

The route:

1. validates size, shape, roles, session ID, and page path;
2. applies per-session, debounce, and pseudonymous per-IP daily limits;
3. classifies topic scope and prompt injection with a strict structured output;
4. returns a fixed ITECS-only refusal for off-topic or injection requests;
5. retrieves a small set of current public ITECS documents locally;
6. generates an answer privately with inline moderation enabled;
7. runs a second strict structured-output gate that checks ITECS-only scope,
   evidence, pricing, proof labels, guarantees, prompt leakage, and sensitive
   data solicitation;
8. releases only an approved answer as paced SSE deltas alongside canonical
   React resource cards; and
9. sends a fixed transparent unavailable state when an answer cannot be safely
   verified. Draft model text is never sent to the browser.

Conversation state is held only in the open client experience. OpenAI requests
set `store: false`. ITECS and the demo do not save chat text; OpenAI may retain
API data for abuse monitoring under its API policy, which is disclosed in the
terminal. Application logs contain a keyed pseudonymous visitor ID, event
category, and request ID only—not chat text or unnecessary PII.

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
```

The key and model selection remain server-side and are passed to the `web`
container by `docker-compose.yml`. The answer model prioritizes strong business
reasoning; the smaller model runs both the fail-closed input classifier and the
private publication gate.

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
