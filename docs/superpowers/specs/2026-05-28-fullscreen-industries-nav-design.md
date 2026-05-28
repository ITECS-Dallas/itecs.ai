# Fullscreen Industries Navigation Design

Date: 2026-05-28

## Objective

Replace the current flat Industries dropdown with a full-screen navigation experience that makes Manufacturing AI the parent hub and presents the manufacturing use-case pages as connected child pages. The visible header should become simpler and more premium: logo, Contact, and hamburger/menu trigger.

## Problem

The current Industries menu places the Manufacturing AI hub, PPV Agent, and every manufacturing spoke at the same root level. That weakens the mental model: users do not immediately understand that the use-case pages belong under the Manufacturing AI hub. It also makes the desktop nav feel crowded as more industry pages are added.

## Approved Direction

Use a full-screen hamburger-driven navigation model inspired by modern enterprise sites such as Palantir, adapted to the ITECS AI design system.

The header should remove the current root-level desktop links:

- Solutions
- Industries
- Pricing
- Insights
- About

The header should retain:

- ITECS logo
- Contact CTA
- hamburger/menu trigger

The hamburger opens a full-screen overlay that carries the primary site navigation.

## Header Behavior

Desktop and mobile should use the same conceptual model.

- Logo links to `/`.
- Contact CTA links to `/contact`.
- Menu trigger opens and closes the full-screen overlay.
- When the menu is open, body scroll should be locked.
- Route changes should close the menu.
- Escape key and close button should close the overlay.
- Focus should remain usable through keyboard navigation.

The header may keep the existing utility bar above it unless a later visual pass decides otherwise.

## Full-Screen Menu Structure

The overlay should feel like a command panel, not a conventional dropdown.

Recommended sections:

1. Primary manufacturing panel
   - Large featured card for `/manufacturing`.
   - Label it as the parent hub: `Manufacturing AI Hub`.
   - Use copy that reinforces the business scope: margin, working capital, throughput, quality, supply chain, and governed AI operations.
   - Include a clear CTA such as `Open hub`.

2. Manufacturing use-case cards
   - Display PPV Agent and all manufacturing spokes as child cards under the hub.
   - Use large lucide icons, existing brand cyan/violet styling, and short descriptions.
   - Preserve the existing URLs.
   - Avoid making these look like peer industries.

3. Secondary navigation
   - AI Services
   - Insights
   - Pricing
   - About
   - Managed Intelligence Provider
   - Contact / assessment CTA

4. Trust/provenance line
   - Keep Dallas as provenance, not a geographic restriction.
   - Example direction: `Dallas team. National manufacturing reach.`

## Visual Style

Use the existing dark ITECS AI system:

- Void background with elevated dark panels.
- Cyan and violet accents.
- Subtle grid/circuit/radial energy, using existing effects where practical.
- Large icon containers and card hover states.
- Motion with Framer Motion and reduced-motion compatibility.
- Avoid decorative blobs that feel disconnected from the product surface.

The overlay should feel premium and technical, with dense but readable information. It should not become a marketing hero page.

## Footer Structure

The footer should stop presenting every manufacturing page as a flat Industries list.

Recommended footer hierarchy:

- Industries
  - Manufacturing AI
  - Manufacturing use cases:
    - PPV Agent
    - Demand & S&OP
    - Predictive Maintenance
    - Inventory & Working Capital
    - Quality & Traceability
    - Customer/SKU Profitability
    - Production Planning
    - Contract Recovery
    - Energy & Freight
    - Vendor Anomaly Detection

Use indentation, grouping labels, or smaller text to make the parent/child relationship clear.

## Data and Content Boundaries

Prefer reusing the manufacturing content already defined in `src/lib/constants.ts`:

- `MANUFACTURING_VERTICAL`
- `PPV_AGENT_USE_CASE`
- `MANUFACTURING_SPOKE_PAGES`

The implementation may create a navigation-specific mapping for icons and compact labels if needed, but should not duplicate long page content across components.

## Components

Likely implementation targets:

- `src/components/layout/Header.tsx`
  - Replace `SolutionsDropdown` and `IndustriesDropdown` desktop behavior with a single full-screen menu.
  - Keep service items available inside the overlay.
  - Keep manufacturing hierarchy explicit.

- `src/components/layout/Footer.tsx`
  - Restructure Industries links into hub plus grouped child use cases.

Optional if Header becomes too large:

- Extract `FullscreenNavMenu.tsx` under `src/components/layout/`.
- Keep data definitions close to the header or move reusable nav group data into a small local helper if it materially improves readability.

## Testing and Validation

Run after implementation:

- `node --test tests/manufacturing-pages.test.mjs`
- `npm run seo:audit`
- `npx tsc --noEmit`
- `npm run lint`
- `npm run build`
- Playwright mobile smoke using Googlebot Smartphone viewport.
- Desktop browser smoke for the full-screen menu.
- Verify keyboard close behavior, route close behavior, and no horizontal overflow.

After deployment of runtime changes, use `.codex/skills/gsc-page-validation/SKILL.md` only if public indexable URLs, sitemap, robots, canonical, or materially updated pages are part of the implementation. A pure navigation restructure does not require GSC resubmission unless the page URLs or indexable page content change materially.

## Out of Scope

- Changing URL architecture.
- Creating new manufacturing pages.
- Rewriting manufacturing page content.
- Removing the utility bar.
- Adding new visual image assets unless implementation finds an existing suitable site asset.
- Changing DNS, NGINX, secrets, or production infrastructure outside the normal approved deploy flow.
