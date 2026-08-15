# ITECS Page Generation Protocol

## Contents

- [Editorial position](#editorial-position)
- [Page decision brief](#page-decision-brief)
- [Intent and ownership](#intent-and-ownership)
- [Answer-first guidance](#answer-first-guidance)
- [Intent-complete page model](#intent-complete-page-model)
- [Information gain](#information-gain)
- [Structure and accessibility](#structure-and-accessibility)
- [FAQ and structured data](#faq-and-structured-data)
- [Metadata](#metadata)
- [Pricing and commercial claims](#pricing-and-commercial-claims)
- [Visual direction](#visual-direction)
- [Implementation checks](#implementation-checks)
- [Googlebot Smartphone profile](#googlebot-smartphone-profile)

## Editorial position

Write for the actual route audience. When a page does not define one, default to owners, executives, managers, operations leaders, department heads, and IT decision-makers at growing Dallas-area organizations.

Use plain business language. Explain technical concepts through decisions, workflows, risks, costs, controls, training, and measurable operating change. Avoid hype, generic futurism, unexplained jargon, and unsupported superlatives.

## Page decision brief

Before writing, record:

| Field | Decision |
| --- | --- |
| Route owner | Canonical route, template, and content-data owner |
| Page role | Service, hub, landing, comparison, solution, or supporting page |
| Audience decision | The one decision the page must help the reader make |
| Conversion | Next action and what the buyer receives |
| Information gain | New workflow, evidence, comparison, control, cost model, or first-party interpretation |
| Claims | Claim class, source, date, limitation, and reviewer |
| Update trigger | Product, price, law, advisory, evidence, or visible-scope change |
| Measurement | Expected signal, source, review date, and no-change interpretation |

## Intent and ownership

- Assign one primary page to each materially distinct buyer/search intent.
- Strengthen the current owner before creating a near-duplicate route.
- Do not build city-name substitution pages or query variants without a distinct audience need and material new value.
- Let Insights articles support commercial owners; do not turn each article into another service page.
- Resolve links from current route source and sitemap output. Link only when it advances the reader's decision.

## Answer-first guidance

Give a direct, self-contained answer near the top when it helps the route's reader. State who the offering is for, what changes, and the next step in the amount of space the decision needs.

Do not force a 40–60-word hero, an answer after every heading, or a fixed section count. Some pages need a concise answer; regulated or technical decisions may need context, evidence, and limitations before a recommendation.

## Intent-complete page model

Use only the sections that help the page do its job:

1. **Metadata and canonical:** accurate title, description, canonical, social metadata, and robots behavior through current helpers.
2. **Hero or opening:** audience, offering, outcome, and useful next step.
3. **Problem and fit:** operating problem, who benefits, and who may not.
4. **Solution or decision framework:** what ITECS does and what the buyer must decide.
5. **Process:** ordered steps, inputs, ownership, approvals, and deliverables when process matters.
6. **Security and governance:** data boundaries, access, review, logging, and accountability when risk exists.
7. **Cost and value:** approved prices when available; otherwise cost drivers, scope boundaries, and a clearly labeled illustrative calculation.
8. **Evidence:** verified first-party facts and current external authority where material claims need it.
9. **FAQ:** only unresolved natural buyer questions; place before the final CTA when used.
10. **CTA:** state the next step and expected handoff.

Merge, omit, or reorder sections when the route and component architecture call for it. There is no universal minimum or maximum page length.

## Information gain

Require at least one defensible contribution beyond a surface summary, such as:

- a real workflow or sanitized first-party pattern;
- a decision or control matrix;
- a cost-driver model;
- an implementation sequence;
- a comparison grounded in actual ITECS delivery;
- a verified example; or
- an illustrative scenario clearly labeled as hypothetical.

Reject padding, commodity listicles, and text that merely paraphrases retrieved sources.

## Structure and accessibility

- Use one H1 and preserve H1 → H2 → H3 order.
- Use semantic paragraphs, lists, tables, figures, and buttons.
- Use `<ol>` and `<li value={N}>` for an ordered process.
- Keep important content in the DOM without requiring animation or interaction.
- Mark decorative icons `aria-hidden="true"`.
- Give meaningful images concise alt text. Use `<figure role="img" aria-label="...">` and `<figcaption>` for explanatory visuals.
- Do not add a visual unless it improves understanding. Ensure relevance, rights, performance, and mobile behavior.

## FAQ and structured data

- Add FAQs only when they improve the buyer journey.
- Keep answers available in the DOM.
- When `FAQPage` is deliberately used for Schema.org consumers, make question and answer text match the visible content exactly.
- Google removed the FAQ rich-result feature in June 2026. Do not present FAQ content or FAQ schema as a Google requirement.
- Do not prescribe `HowTo` as a universal rich-result strategy.
- Let current templates and `src/lib/seo.ts` own JSON-LD. More schema is not inherently better.
- Separate Schema.org vocabulary validity, Google feature eligibility, and rendered visible-content parity.

## Metadata

- Prioritize unique, accurate, intent-matched titles and descriptions.
- Check the template suffix and rendered result.
- Treat character length as a truncation and readability diagnostic, not a ranking validity rule.
- Keep canonical, OpenGraph, Twitter, and visible-page identity aligned.
- Low CTR alone does not authorize a metadata rewrite.

## Pricing and commercial claims

- Discover the current authoritative pricing export or owner-approved source before writing an amount.
- Record the exact source and access date.
- Distinguish hourly consulting, prepaid retainers, scoped flat-fee builds, pilots, setup fees, and recurring service accurately.
- Explain cost drivers when a current amount is unavailable.
- Never manufacture a price, discount, savings rate, payback period, delivery time, or guarantee.

## Visual direction

When a visual is useful, follow the current source-backed design system rather than a remembered theme. Define its purpose, placement, alt text, figure label, caption, rights, and mobile behavior before creating it.

## Implementation checks

- Discover the current route/template/helper patterns from source.
- Verify links, claims, prices, headings, semantic markup, image treatment, and visible/schema parity.
- Confirm no horizontal overflow at the canonical mobile profile.
- Check legibility, tap targets, focus, reduced motion, and layout stability.
- Confirm that the opening answers the route's buyer decision and next step; do not use a universal word-window assertion.

## Googlebot Smartphone profile

```text
viewport: 412 × 915
deviceScaleFactor: 2.625
isMobile: true
hasTouch: true
userAgent: Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.6723.69 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)
```
