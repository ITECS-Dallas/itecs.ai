# ITECS AI-Search Visibility

Use current first-party documentation and keep platform controls separate.

## Google AI features

- Begin with foundational SEO, indexability, snippet eligibility, helpful content, and clear technical structure.
- Google states that AI Overviews and AI Mode have no additional technical requirements beyond ordinary Search eligibility.
- Do not require `llms.txt`, `llms-full.txt`, `ai.txt`, Markdown mirrors, special AI markup, special schema, content chunk sizes, fixed answer lengths, or rewritten synonym variants for Google visibility.
- Optional AI text files may be maintained for another documented consumer or governance purpose. Google says they neither help nor harm Google Search visibility or rankings.
- Structured data can support eligible Search features when accurate, but it is not required for Google generative AI search.
- Avoid scaled pages aimed at query variants or nearby cities without material new value.

## Google crawler controls

- `Googlebot` controls Google Search crawling and obeys robots.txt for automatic crawls.
- `Google-Extended` is a separate control token for specified Gemini training and grounding uses. It has no separate HTTP user agent, does not control Google Search inclusion, and is not a ranking signal.
- Treat any crawler-policy change as an owner decision. An audit may explain options but must not change robots policy without explicit authority.

## OpenAI crawler controls

- `OAI-SearchBot` controls discovery for ChatGPT search results.
- `GPTBot` controls whether crawled content may be used to train OpenAI generative AI foundation models.
- These controls are independent. Do not infer training consent from search visibility or vice versa.
- `ChatGPT-User` performs some user-triggered fetches, is not an automatic search crawler, and is not the control for Search inclusion.
- Reopen OpenAI's crawler documentation before recommending rules because user agents, IP ranges, and behavior can change.

## Bing and IndexNow

- Treat Bing AI Performance total citations, cited pages, grounding-query samples, page citations, and trends as measurement observations.
- Do not describe those observations as rankings, placement, importance, or authority scores.
- Record property, selected dates, supported surfaces, samples, filters, and completeness.
- IndexNow is a change-notification protocol. A successful submission means the engine received the URL; it does not guarantee crawling, indexing, ranking, or AI citation.
- Creating a key, adding a key file, or submitting URLs is a provider/public mutation requiring explicit owner authority.

## Sampled AI answers

Treat a model answer as a volatile observation. Record:

- model and version;
- product surface and session state;
- exact prompt;
- date, location, and account tier when relevant;
- cited URLs and answer text needed for the finding;
- repetition or sample size; and
- limitations and whether browsing was enabled.

Never convert a single answer into a durable ranking claim.

## Primary references

Reopen these sources during the audit:

- `https://developers.google.com/search/docs/fundamentals/ai-optimization-guide`
- `https://developers.google.com/search/docs/appearance/ai-features`
- `https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers`
- `https://developers.openai.com/api/docs/bots`
- `https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview`
- `https://www.indexnow.org/documentation`
