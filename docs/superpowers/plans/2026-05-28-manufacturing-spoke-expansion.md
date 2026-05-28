# Manufacturing Spoke Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add nine detailed manufacturing AI spoke pages under `/manufacturing` with unique content, visuals, SEO metadata, sitemap entries, navigation links, footer links, and validation.

**Architecture:** Keep route files static and thin. Store structured manufacturing spoke content in `src/lib/constants.ts`, render pages through shared section components, and reuse existing metadata, JSON-LD, breadcrumbs, CTA, FAQ, and security patterns.

**Tech Stack:** Next.js App Router, TypeScript, React, Tailwind CSS v4, Framer Motion, lucide-react, Node built-in test runner.

---

## File Structure

- Modify `src/lib/constants.ts`: add shared spoke content types, nine `ManufacturingSpokePageContent` objects, and a combined spoke list.
- Create `src/components/sections/ManufacturingSpokeMetricsChart.tsx`: reusable chart with timeline, matrix, and waterfall modes.
- Create `src/components/sections/ManufacturingSpokePage.tsx`: shared server component that renders every new spoke.
- Create nine static route files under `src/app/manufacturing/<slug>/page.tsx`.
- Modify `src/components/sections/ManufacturingUseCases.tsx`: support additional icons and linked use-case cards.
- Modify `src/components/layout/Header.tsx`: add all manufacturing spokes to the Industries dropdown and mobile menu.
- Modify `src/components/layout/Footer.tsx`: add all manufacturing spokes to the Industries link list.
- Modify `src/app/sitemap.ts`: add every spoke to the sitemap through the content list.
- Modify `README.md`: document the expanded manufacturing vertical.
- Modify `tests/manufacturing-pages.test.mjs`: assert routes, links, sitemap, and unique page concepts.

## Tasks

### Task 1: Content Model and Tests

- [x] Extend the manufacturing test to list every planned route, assert each source file exists, and assert each URL appears in sitemap/nav/footer source.
- [x] Add a content type for manufacturing spoke pages in `src/lib/constants.ts`.
- [x] Add nine complete spoke content objects with unique chart modes, metadata, FAQs, workflow steps, and governance controls.
- [x] Update the hub `useCases` array so every new use case has a live `href`.

### Task 2: Shared Components

- [x] Build `ManufacturingSpokeMetricsChart` with `timeline`, `matrix`, and `waterfall` rendering modes.
- [x] Build `ManufacturingSpokePage` using existing site sections and the new chart component.
- [x] Keep the shared component server-rendered unless client-side animation is required in a child component.

### Task 3: Route Files and Internal Links

- [x] Add the nine static route files.
- [x] Update the sitemap to include `MANUFACTURING_SPOKE_PAGES`.
- [x] Update Industries navigation and footer link lists.
- [x] Update README public vertical route documentation.

### Task 4: Validation

- [x] Run `node --test tests/manufacturing-pages.test.mjs`.
- [x] Run `npx tsc --noEmit`.
- [x] Run `npm run lint`.
- [x] Run `npm run build`.
- [x] Run `npm run seo:audit`.
- [x] Run mobile Googlebot Smartphone smoke checks on the hub, PPV page, and representative new spokes.
- [x] Audit copy and visuals for duplicated charts, weak executive tone, unsupported claims, and local-only Dallas positioning.

### Task 5: Commit, Push, Deploy

- [x] Confirm git status is scoped to the spoke expansion.
- [ ] Commit with a focused message.
- [ ] Push the feature branch.
- [ ] Deploy from the validated worktree using the repo deployment pattern.
- [ ] Verify the live site responds on the new routes.

## Self-Review

- Spec coverage: the plan covers content, components, routes, nav/footer, sitemap, tests, validation, commit, push, and deploy.
- Placeholder scan: no open placeholders are required before implementation.
- Scope check: the work is large but cohesive because all pages share one content model and page renderer.
