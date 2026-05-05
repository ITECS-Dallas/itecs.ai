---
name: itecs-insight-articles
description: Use when creating, updating, or publishing ITECS AI Insights blog articles in this Next.js project, including article copy, constants.ts entries, insight page files, overview previews, SEO metadata, JSON-LD schema, internal links from sitemap.xml, AI-generated non-people imagery, share bars, and author blocks.
---

# ITECS Insight Articles

## Purpose

Use this skill whenever the user asks for a new blog article, insight post, guide, thought-leadership piece, or SEO article for itecs.ai. The Insights section is code-managed, not CMS-managed.

The goal is to produce executive-ready AI business content for Dallas business owners and professionals: clear, practical, confident, security-aware, and grounded in ITECS' consulting, training, AI security, custom AI agent, and DevOps expertise.

## Current Project Shape

- Insight content lives in `src/lib/constants.ts` in the `INSIGHTS` array.
- The overview page is `src/app/insights/page.tsx`.
- Overview cards render from `src/components/sections/InsightCards.tsx`.
- Each article has its own route at `src/app/insights/<slug>/page.tsx`.
- Shared SEO utilities live in `src/lib/metadata.ts` and `src/lib/seo.ts`.
- JSON-LD is rendered through `src/components/seo/JsonLd.tsx`.
- Keep proposal pages under `/p/` unrelated and unlisted.

## Article Workflow

1. Confirm the article topic, audience, and primary business outcome. If the user gives only a topic, infer a Dallas SMB executive audience and pick one primary keyword plus 3-6 supporting keywords.
2. Read `src/lib/constants.ts`, `src/components/sections/InsightCards.tsx`, one existing article page, and `https://itecs.ai/sitemap.xml` before drafting.
3. Choose the hub page the article should support, such as `/consulting`, `/custom-ai-agents`, `/automation`, `/training`, `/ai-receptionist`, `/crm-sales-ai`, `/ai-knowledge-base`, `/data-audit`, `/managed-intelligence-provider`, or `/ai-devops`.
4. Generate a short, readable slug and create `src/app/insights/<slug>/page.tsx`.
5. Add one `INSIGHTS` item with a concise overview-card preview in `description`; the Insights overview page uses this as the card preview.
6. Place the article in `INSIGHTS` intentionally. `INSIGHTS[0]` becomes the large featured card; append new articles unless the user asks to feature it.
7. Add or reuse article support UI: share bar, author box, hero/OG image, and article schema. Prefer shared components if multiple article pages need the same treatment.
8. Run `npm run lint` and `npm run build`. Verify `/insights` and the article page with the Googlebot Smartphone Playwright viewport from `CLAUDE.md`.

## Writing Standard

- Write for owners, executives, operations leaders, and IT decision makers.
- Use answer-first structure: tell the reader what to do, why it matters, and what a practical next step looks like.
- Keep the tone business-professional, direct, and advisory. Avoid hype, filler, jokes, generic AI futurism, and academic framing.
- Address common buyer fears: complexity, data security, team adoption, tool selection, hidden costs, and uncertain ROI.
- Explain that AI adoption often starts by properly configuring tools such as Microsoft Copilot, ChatGPT, Claude, Gemini, and other business AI applications before building custom agents.
- Position custom AI agents as one option among many: project folders, prompt systems, Codex/CLI workflows, RAG, human-in-the-loop approval, API-connected automations, and secure platform integrations.
- When discussing pricing, reflect ITECS' model: hourly consulting or prepaid retainer blocks with transparent hour tracking, no minimum monthly usage, and no expiration; flat fees are for scoped project builds.
- Use real business language: risk reduction, hours saved, adoption plan, governance, workflow design, employee training, testing, and measurable ROI.
- Do not invent client names, statistics, certifications, or pricing. Use approximate ranges only when they are framed as examples and not promises.

## SEO Requirements

- Use one primary keyword naturally in the title, H1, intro, at least one H2-style paragraph marker, description, and metadata keywords.
- Write a meta description around 140-160 characters when practical; prioritize clarity over exact length.
- Use internal links from the live `sitemap.xml`; do not guess URLs. If live fetch fails, read `src/app/sitemap.ts` and constants.
- Include 4-8 internal links with descriptive anchors. Link to the selected hub page early and again in the CTA.
- Include one authority-minded external link only if it improves credibility and the source is current, reputable, and directly relevant.
- Add canonical, OpenGraph, and Twitter metadata through `generatePageMetadata()`. Use the article image as `ogImage` when available.
- Include JSON-LD for `BlogPosting` or `Article`, BreadcrumbList, and FAQPage when FAQ content exists.
- Add `datePublished`, `dateModified`, `headline`, `description`, `image`, `author`, `publisher`, `mainEntityOfPage`, and canonical URL to article schema.
- Default author is `The ITECS Team` unless the user provides another author.
- Keep all article pages indexable unless the user explicitly asks for a draft, hidden, or private page.

## Article Structure

Recommended structure:

1. Breadcrumbs.
2. Hero with H1, executive summary, read time, author, published/updated date, and generated image when available.
3. Opening section that answers the topic directly in plain English.
4. 4-7 substantial sections with practical business guidance.
5. Security and cost section if the topic touches AI adoption, tools, agents, data, or automation.
6. Bottom CTA linking to the most relevant ITECS service and `/contact`.
7. "Share this article" bar.
8. "About the author" block. Default: `The ITECS Team`.
9. FAQ section if useful for search intent.
10. JSON-LD blocks.

For the overview preview, make `INSIGHTS[].description` a clear 1-2 sentence summary that reads well inside `InsightCards`. Avoid keyword stuffing.

## Share Bar

Every article should include a bottom share bar with destinations for LinkedIn, X, Facebook, email, and copy-link.

- Use accessible buttons or links with clear `aria-label` values.
- Use `lucide-react` icons where the project already has suitable icons, such as `Share2`, `Mail`, `Link2`, or `Copy`.
- For brand destinations without installed brand icons, use compact text labels or local inline SVGs instead of adding a new dependency unless the project already uses one.
- Share URLs should use the canonical article URL from `SITE_CONFIG.url + insight.href`.
- The copy-link control must be a client component.

## Author Block

Default author block:

Name: `The ITECS Team`

Positioning: ITECS' AI consulting, security, training, and DevOps team helps Dallas businesses adopt practical AI safely, with 24+ years of IT operations experience behind the guidance.

Include a short link to `/about` or `/contact`. If the user gives a named author, update visible author text and schema author fields accordingly.

## AI Image Generation

Generate one non-people hero/OG image for each new article unless the user says not to.

- Use Google's Gemini image generation API with the local `GEMINI_API_KEY`.
- Default model for the helper script is `gemini-3.1-flash-image-preview`, the current Nano Banana 2 image model in Google's docs.
- For complex professional assets, consider `gemini-3-pro-image-preview` (Nano Banana Pro). For specialized ultra-realistic imagery, consider Imagen 4 Ultra if the account supports it. Verify current Google docs before changing APIs or model IDs.
- Current model references should come from Google's docs: `https://ai.google.dev/gemini-api/docs/nanobanana` and `https://ai.google.dev/gemini-api/docs/imagen`.
- Never generate people, faces, hands, staff portraits, customers, or crowd scenes.
- Prefer empty executive conference rooms, modern operations centers, abstract AI workflow visuals, secure data environments, dashboards, server rooms, glass offices, close-up devices, or dimensional business graphics.
- Avoid readable text inside generated images unless the article explicitly needs it.
- Save article images under `public/images/insights/` with slug-based names, for example `<slug>-hero.png`.
- Add specific alt text that describes the image and ties it to the article topic.

Run the bundled helper when a generated image is needed:

```bash
node .codex/skills/itecs-insight-articles/scripts/generate-google-image.mjs \
  --prompt "Hyperrealistic empty executive conference room at night with secure AI workflow dashboards glowing on wall displays, no people, no text, Dallas technology consulting tone" \
  --out public/images/insights/example-hero.png \
  --aspect-ratio 16:9 \
  --image-size 2K
```

## Final Checks

- The article page builds and has no TypeScript or lint errors.
- `/insights` shows the article preview in the intended position.
- The article has canonical metadata, OG/Twitter image metadata, Article schema, Breadcrumb schema, and FAQ schema when applicable.
- Internal links resolve to URLs present in `sitemap.xml`.
- The share bar and author block appear below the article body before the global CTA or FAQ, depending on the page rhythm.
- The generated image contains no people and renders in mobile and desktop layouts without cropping important visual information.
- Playwright mobile-first validation uses the Googlebot Smartphone viewport in `CLAUDE.md`.
