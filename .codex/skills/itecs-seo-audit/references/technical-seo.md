# ITECS Technical SEO Audit

Use this reference for crawl, index, metadata, link, mobile, and performance findings on `itecs.ai`.

## Evidence order

1. Inspect the current route, template, metadata helper, sitemap source, and robots source.
2. Fetch the raw canonical URL with redirects and headers preserved.
3. Render the URL with the project Googlebot Smartphone profile.
4. Compare local output with the current public response when a release is in scope.
5. Use provider evidence only for what that provider actually measures.

## Crawl and index controls

- Distinguish crawlability, indexability, indexing, and search appearance.
- Confirm HTTP status and every redirect hop. Flag loops, chains, host drift, soft errors, and conflicting canonical signals.
- Compare `robots.txt`, meta robots, response headers, canonical tags, sitemap entries, and internal links.
- Keep `/api/` and `/p/` excluded from public search workflows unless an owner explicitly changes that policy.
- Treat sitemap inclusion as discovery guidance, not proof of indexing.
- Treat a provider inspection result as point-in-time evidence, not a permanent page state.

## Canonical and duplicate ownership

- Assign one canonical owner to each materially distinct intent.
- Check protocol, host, path, trailing-slash, query, and redirect consistency.
- Strengthen the existing owner before proposing a near-duplicate route.
- Reject city-name substitution pages, keyword variants, or fan-out pages that add no new audience need, workflow, evidence, or decision value.
- Verify pagination, filtered URLs, and generated routes only when the application exposes them.

## Metadata

- Require an accurate title and description where the template calls for them.
- Check uniqueness, page intent, visible-content alignment, canonical URL, OpenGraph, Twitter, and template suffix behavior.
- Treat title and description length as a search-snippet truncation diagnostic. Do not fail a page solely because it crosses a character threshold.
- Low CTR does not prove metadata is defective. Confirm the query-page mismatch, duplication, inaccuracy, or missing value before recommending a rewrite.

## Internal links

- Resolve destinations from current route source and sitemap output.
- Use descriptive anchors that help a reader continue a decision.
- Flag broken, redirected, self-referential, hidden, or superseded links.
- Do not require a fixed internal-link count. Judge coverage by page role, hierarchy, and buyer journey.
- Confirm navigation and content links in rendered mobile output when the change is public-facing.

## Rendered mobile checks

Use the repository's canonical Googlebot Smartphone profile. Check:

- final URL and status;
- canonical, title, description, robots directives, and structured data;
- meaningful text and links in the rendered DOM;
- one coherent H1 and non-skipped heading levels when the page design uses headings;
- content hidden behind interaction or removed from the DOM;
- horizontal overflow, clipped text, layout shifts, and unusable tap targets;
- images, alt text, figures, and crawler-accessible assets; and
- differences between raw HTML and client-rendered output that change discoverability.

## Performance

- Separate lab measurements from field data.
- Record device profile, network/CPU settings, run count, date, route, and build mode.
- Diagnose the largest contributor before proposing changes: server response, script work, image delivery, font loading, layout shift, or third-party code.
- Do not claim a ranking gain from a lab-score change. Define the user or conversion outcome the performance work is expected to support.

## Local and entity consistency

- Compare visible business facts, repository source, structured data, and current first-party profiles when provider access exists.
- Treat name, address, phone, hours, service area, legal identity, and parent-brand relationships as facts requiring provenance.
- Use `sameAs` only for URLs that identify the same entity. Do not use topical pages, Wikipedia concepts, products, services, or citations as `sameAs` shortcuts.

## Public validation

For an authorized release, record pre/post status, redirect, headers, canonical, robots, sitemap, rendered content, and JSON-LD. Stop and roll back the scoped change when a public contract regresses.
