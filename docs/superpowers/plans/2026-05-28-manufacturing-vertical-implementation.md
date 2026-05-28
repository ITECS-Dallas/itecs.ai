# Manufacturing Vertical Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `/manufacturing` and `/manufacturing/ppv-agent` as public manufacturing vertical pages with a CFO-led hub and a detailed PPV agent spoke.

**Architecture:** Add focused manufacturing data constants, route-level pages, and manufacturing-specific section components only where existing service sections are too generic. Reuse existing metadata, breadcrumbs, FAQ, CTA, visual effects, and sitemap patterns. Validate with a source-level route/content test, TypeScript, lint, production build, SEO audit, and mobile browser smoke checks.

**Tech Stack:** Next.js App Router, TypeScript, React 19, Tailwind CSS v4, Framer Motion, lucide-react, existing `generatePageMetadata`, existing JSON-LD helpers plus a small manufacturing service schema helper if needed.

---

## File Structure

- Create `tests/manufacturing-pages.test.mjs`: Node built-in test that fails until routes, key content, and sitemap references exist.
- Modify `src/lib/constants.ts`: add typed manufacturing vertical data below existing service constants or near other structured page content.
- Modify `src/lib/seo.ts`: add a manufacturing service schema helper if the existing `generateServiceSchema` remains Dallas-area scoped.
- Create `src/components/sections/ManufacturingHero.tsx`: hub/spoke compatible hero with CTA buttons and optional data panel.
- Create `src/components/sections/ManufacturingUseCases.tsx`: grid for PPV and future manufacturing use cases.
- Create `src/components/sections/ManufacturingProof.tsx`: sections for operational pressures, assessment, and governance/value copy.
- Create `src/components/sections/PPVAgentWorkflowDiagram.tsx`: visual workflow for source systems, agent analysis, governance, and outputs.
- Create `src/app/manufacturing/page.tsx`: manufacturing hub route.
- Create `src/app/manufacturing/ppv-agent/page.tsx`: PPV agent spoke route.
- Modify `src/app/sitemap.ts`: include both manufacturing pages.
- Modify `README.md`: add a short note that the site has a manufacturing vertical hub and spoke.

## Acceptance Criteria Mapping

- `/manufacturing` and `/manufacturing/ppv-agent` render as public routes.
- The hub is broad to all manufacturers and balances discrete/process examples.
- Dallas appears as provenance, not a local-only market label.
- PPV page uses the approved "PPV Agent: Purchase Price Variance and Commodity Cost Intelligence" label.
- PPV page states the agent is read-heavy, write-controlled, and cannot autonomously execute POs, hedges, journal entries, or master-data changes.
- Future use-case cards do not link to placeholder routes.
- Pages have metadata, breadcrumbs, FAQ schema, sitemap entries, internal links, and mobile-safe layouts.

### Task 1: Source-Level Route and Content Test

**Files:**
- Create: `tests/manufacturing-pages.test.mjs`

- [x] **Step 1: Write failing test**

```js
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), "utf8");

describe("manufacturing vertical pages", () => {
  it("defines the manufacturing hub and PPV spoke routes", () => {
    assert.equal(existsSync(join(root, "src/app/manufacturing/page.tsx")), true);
    assert.equal(existsSync(join(root, "src/app/manufacturing/ppv-agent/page.tsx")), true);
  });

  it("keeps the approved public positioning in source", () => {
    const hub = read("src/app/manufacturing/page.tsx");
    const ppv = read("src/app/manufacturing/ppv-agent/page.tsx");

    assert.match(hub, /Manufacturing AI Readiness Assessment/);
    assert.match(hub, /Dallas/);
    assert.match(hub, /\/manufacturing\/ppv-agent/);
    assert.match(ppv, /PPV Agent: Purchase Price Variance and Commodity Cost Intelligence/);
    assert.match(ppv, /read-heavy/);
    assert.match(ppv, /does not autonomously/);
  });

  it("publishes both manufacturing pages in the sitemap source", () => {
    const sitemap = read("src/app/sitemap.ts");

    assert.match(sitemap, /\/manufacturing/);
    assert.match(sitemap, /\/manufacturing\/ppv-agent/);
  });
});
```

- [x] **Step 2: Run red test**

Run: `node --test tests/manufacturing-pages.test.mjs`

Expected: FAIL because route files do not exist yet.

### Task 2: Manufacturing Structured Data

**Files:**
- Modify: `src/lib/constants.ts`
- Modify: `src/lib/seo.ts`

- [x] **Step 1: Add manufacturing constants**

Add typed constants for the hub and PPV spoke: route paths, titles, metadata, CTA labels, pain points, use cases, data inputs, governance items, roadmap steps, FAQs, and comparison rows.

- [x] **Step 2: Add national service schema helper if needed**

If the existing service schema remains Dallas city-scoped, add a helper that accepts `{ title, description, href, shortTitle }` and uses `areaServed: { "@type": "Country", name: "United States" }`.

- [x] **Step 3: Run focused test**

Run: `node --test tests/manufacturing-pages.test.mjs`

Expected: still FAIL because pages are not built yet.

### Task 3: Manufacturing Section Components

**Files:**
- Create: `src/components/sections/ManufacturingHero.tsx`
- Create: `src/components/sections/ManufacturingUseCases.tsx`
- Create: `src/components/sections/ManufacturingProof.tsx`
- Create: `src/components/sections/PPVAgentWorkflowDiagram.tsx`

- [x] **Step 1: Implement components with existing design patterns**

Use `ScrollReveal`, `GradientOrb`, `GridBackground`, `Button`, `SectionHeading`, and lucide icons. Keep client components narrow and avoid adding dependencies.

- [x] **Step 2: Keep links explicit**

Only the PPV use-case card links to `/manufacturing/ppv-agent`; future cards use the readiness assessment CTA or no link.

- [x] **Step 3: Run TypeScript**

Run: `npx tsc --noEmit`

Expected: no TypeScript errors for new component types.

### Task 4: Build Hub and PPV Routes

**Files:**
- Create: `src/app/manufacturing/page.tsx`
- Create: `src/app/manufacturing/ppv-agent/page.tsx`

- [x] **Step 1: Build `/manufacturing`**

Add metadata, breadcrumbs, hero, operational pressure/value sections, use-case grid, assessment section, security/governance section, FAQ, CTA, FAQ JSON-LD, breadcrumb JSON-LD, and manufacturing service JSON-LD.

- [x] **Step 2: Build `/manufacturing/ppv-agent`**

Add metadata, breadcrumbs, PPV hero, CFO pain section, capability sections, anonymized BatchMaster/SAP and Power BI scenario, data inputs, workflow diagram, governance section, business-case section, FAQ, CTA, FAQ JSON-LD, breadcrumb JSON-LD, and manufacturing service JSON-LD.

- [x] **Step 3: Run focused test**

Run: `node --test tests/manufacturing-pages.test.mjs`

Expected: PASS except sitemap assertions until sitemap is updated.

### Task 5: Sitemap and Docs Parity

**Files:**
- Modify: `src/app/sitemap.ts`
- Modify: `README.md`
- Modify: `docs/superpowers/plans/2026-05-28-manufacturing-vertical-implementation.md`

- [x] **Step 1: Add sitemap entries**

Add `/manufacturing` and `/manufacturing/ppv-agent` with appropriate priorities.

- [x] **Step 2: Update README**

Add a concise note that the public site includes a manufacturing vertical hub and first PPV agent spoke.

- [x] **Step 3: Mark plan steps complete**

Update this plan's checkboxes as tasks are completed.

- [x] **Step 4: Run focused test**

Run: `node --test tests/manufacturing-pages.test.mjs`

Expected: PASS.

### Task 6: Full Validation and Handoff

**Files:**
- No expected source edits unless validation exposes issues.

- [x] **Step 1: Run lint**

Run: `npm run lint`

Expected: exit 0.

- [x] **Step 2: Run typecheck**

Run: `npx tsc --noEmit`

Expected: exit 0.

- [x] **Step 3: Run production build**

Run: `npm run build`

Expected: exit 0.

- [x] **Step 4: Run SEO audit**

Run: `npm run seo:audit`

Expected: exit 0 or document any pre-existing audit issue.

- [x] **Step 5: Run mobile browser smoke check**

Start the dev server on an available port, browse `/manufacturing` and `/manufacturing/ppv-agent` with the required Googlebot Smartphone viewport, and verify both routes render without obvious mobile overflow or blank content.

- [x] **Step 6: Commit and push**

Stage only intended files. Commit with `Add manufacturing vertical pages`. Push the current branch if validation passes.

## Plan Self-Review

- Spec coverage: the tasks cover route creation, hub/spoke positioning, PPV governance boundaries, future use-case cards, sitemap, docs parity, and validation.
- Placeholder scan: no `TBD`, `TODO`, or intentionally unresolved sections remain.
- Type consistency: the planned data constants should drive both routes and section components so labels, links, FAQs, and schema stay consistent.
