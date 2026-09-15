# Insights featured images

Each `INSIGHTS` entry in `src/lib/constants.ts` owns a required `image` object:
`src` is an existing local public asset path and `alt` describes that illustration.
The archive cards and shared article layout both read this object; route metadata
uses `ogImage: insight.image.src`. Do not create a second route-only image mapping.

The 46 existing PNG illustrations are retained. Seven previously image-less
articles now have lightweight, topic-specific workflow illustrations under
`public/images/insights/`. These are original conceptual diagrams, not vendor UI,
client evidence or performance claims. Their accessible descriptions explain the
flow. SVG sources are retained alongside their PNG exports for social-preview
compatibility. Article copy, publication dates and correction dates are unchanged.

Cards keep all articles server-rendered and use responsive, lazy-loaded images.
Article heroes reserve a 16:9 area on the shared reading column and load eagerly.
No image fallback, additional package, optimizer bypass or infrastructure change
is required. The public SVG assets are code-owned and have no external resources.

Run `node --test tests/insight-images.test.mjs` for source/data coverage. Browser
validation must scroll the full archive, decode each image, follow every article,
and check the matching hero, social/schema image, mobile overflow and reading
column alignment using the repository Googlebot Smartphone profile. HTTP 200 for
the page alone is not proof that an image decoded successfully.
