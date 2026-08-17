# ITECS Structured Data Audit

Use three separate results for every structured-data finding.

## 1. Vocabulary validity

- Validate types and properties against current Schema.org vocabulary.
- Check value types, URLs, dates, identifiers, nesting, and references.
- Reuse stable canonical `@id` values when the application already defines the entity.
- Multiple JSON-LD scripts and a consolidated `@graph` are both valid patterns.

## 2. Google feature eligibility

- Reopen the current Google feature guide before calling a property required or recommended.
- A Schema.org-valid type may have no Google rich-result feature.
- Valid markup does not guarantee crawling, indexing, rankings, rich results, AI citations, or traffic.
- Google removed its FAQ rich-result feature in June 2026. Visible FAQs may still help readers, and accurate `FAQPage` vocabulary may serve other consumers, but neither is a universal SEO requirement.
- Do not prescribe `HowTo` as a universal Google rich-result strategy.
- There is no special structured data required for Google AI Overviews or AI Mode.

## 3. Visible-content parity

- Mark up only content that is visible and relevant on the page.
- Compare names, descriptions, prices, offers, availability, service areas, authors, dates, reviews, ratings, credentials, images, and FAQs with rendered content and their source of truth.
- Reject empty, misleading, stale, hidden, or self-contradictory nodes.
- Check JSX-backed FAQ answers against their plain-text schema mirrors when FAQ markup is deliberately used.

## Application ownership

- Let templates and `src/lib/seo.ts` own JSON-LD generation.
- Let verified content structures supply values.
- Do not inject arbitrary schema scripts into article or page prose.
- Prefer fewer accurate nodes to broader incomplete markup.

## Entity guidance

- Organization and LocalBusiness describe the actual entities and relationship.
- Service and Offer values must match visible, current commercial facts.
- Article or BlogPosting should use the real headline, canonical page, representative image, original publication date, material modification date, and actual author or editorial organization.
- BreadcrumbList should match the visible navigation path.
- `sameAs` identifies the same entity. It does not transfer authority and is not a generic citation field.

## Validation record

For each tested page, record:

- URL and collection date;
- source helper and visible data owner;
- every JSON-LD block or graph node;
- Schema.org validity result;
- Google feature eligibility result;
- rendered visible-content parity result;
- errors versus optional recommendations; and
- smallest authorized correction with rollback.

Use Google's Rich Results Test only for supported Google features. Use a vocabulary validator for broader Schema.org checks, then inspect rendered parity manually or with a focused assertion.

## Current primary references

Reopen these sources when the finding is made:

- `https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data`
- `https://developers.google.com/search/docs/appearance/structured-data/sd-policies`
- `https://developers.google.com/search/docs/appearance/structured-data/article`
- `https://developers.google.com/search/updates`
- `https://schema.org/`
