# Bing website ownership verification

Work order: BING-AI-20260913. The root layout's Next.js `metadata.verification.other`
publishes the owner-supplied `msvalidate.01` meta tag in the server-rendered head,
including the canonical homepage at `https://itecs.ai/`. This public ownership
token is intentionally shipped to browsers; it is not an API credential.

Run `node --test tests/bing-verification.test.mjs` and verify the exact tag appears
once in the public homepage head after deployment. Keep existing metadata,
canonical URLs, content, and crawler policy unchanged.

Hosting the verification tag completes the website portion of setup. Bing's
Webmaster Tools verification action and resulting property status are separate.
The tag does not configure IndexNow, submit URLs, or prove that pages are indexed.


## Homepage description follow-through

BING-AI-20260913-R3 replaces only the homepage description in `src/app/page.tsx`.
The approved wording is 154 characters. `generatePageMetadata` reuses it for the
standard description, Open Graph description and Twitter description. Preserve
the title, canonical, H1, visible copy, images, schema and all other pages.
Run `node --test tests/homepage-description.test.mjs tests/bing-verification.test.mjs`
and compare raw and Googlebot Smartphone metadata before and after deployment.
Character count is a snippet-fit diagnostic, not a guarantee of search appearance.

The owner reports Bing ownership verification, sitemap submission, and homepage
indexing complete. IndexNow remains a separate R2 workflow; record an actual
submission receipt before claiming the changed homepage was submitted.
