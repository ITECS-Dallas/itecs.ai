# AI Crawler Consent Policy

**Decision (2026-08-17):** itecs.ai allows both **AI search crawling** and
**AI model-training use** of its public marketing content. Hidden proposal
pages (`/p/`) and API routes (`/api/`) remain disallowed for every agent.

Approved via delegated owner decision on 2026-08-17 (SearchOps program,
recommendation path authorized by B. Desmot). Recorded in the action ledger as
`SEO-20260817-05`.

## Rationale

ITECS is an AI-services MSP whose acquisition strategy is AI-surface
visibility: Google AI Overviews, ChatGPT Search, Perplexity, and — long term —
brand presence inside model knowledge itself. The site's content is published
marketing material with no proprietary value to withhold from training
corpora. Declining training use would trade away future assistant-answer
visibility for no commercial protection, which is the opposite of the
program's goal. AI referral traffic is now measured by the SearchOps collector
(v1.1.63 `aiReferrals` evidence), so the value of this policy is observable.

## Implementation

`src/app/robots.ts` grants the wildcard agent and each major named AI crawler
(OpenAI GPTBot/OAI-SearchBot/ChatGPT-User, Anthropic
ClaudeBot/Claude-SearchBot/Claude-User, Google-Extended, PerplexityBot,
Perplexity-User, Applebot-Extended, Meta-ExternalAgent, CCBot) identical
rules: allow `/`, disallow `/api/` and `/p/`. The named groups exist so the
consent is affirmative and survives any future change to the wildcard group.
Per robots.txt semantics a named agent obeys only its own group, so every
named group must keep the same disallow list as the wildcard.

## Review triggers

Revisit this policy if any of the following occurs:

- ITECS begins publishing paid, gated, or client-confidential content outside
  `/p/`.
- A crawler's operator changes what a listed user agent controls (for
  example, a search agent that starts feeding training).
- AI referral evidence shows a listed crawler generating load without any
  referral or citation value.
- The business decides brand content should not appear in trained models.

Any change must update `robots.ts`, this document, and append a new action
ledger entry — never edit the prior decision record.
