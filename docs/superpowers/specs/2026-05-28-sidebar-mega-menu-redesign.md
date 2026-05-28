# Sidebar Mega Menu Redesign

## Goal

Restructure the hamburger navigation from a Manufacturing-led feature panel into a traditional full-screen mega menu with a sidebar category rail. The menu should make the overall ITECS AI site easier to navigate while still showing Manufacturing AI Hub as the parent page for all manufacturing use-case pages.

## Approved Direction

Use the approved Option B layout from the visual companion:

- Full-screen overlay remains triggered by the hamburger menu.
- Left sidebar category rail appears in this order:
  1. AI Services
  2. Industries
  3. Resources
  4. Company
- AI Services is the first content category and should include all existing service links.
- Industries is the second content category and should include Manufacturing AI Hub as the parent link.
- Manufacturing AI child pages appear visually nested under Manufacturing AI Hub.
- Resources includes Insights and other resource-style links.
- Company includes About, Pricing, Managed Intelligence, Contact Us, and ITECS MSP.

## Visual Hierarchy

The menu should feel like a polished enterprise mega menu, not a manufacturing landing-page hero.

- The left rail controls the information architecture.
- The main panel can show AI Services and Industries as the primary two columns on desktop.
- Manufacturing AI Hub should be prominent inside Industries, but it should not dominate the entire screen.
- Manufacturing child pages should be compact nested links or cards under the hub, using clear indentation, rails, or grouping.
- Static pages should remain easy to find in lower Resources and Company groups.
- Mobile should collapse into stacked category sections in the same order: AI Services, Industries, Resources, Company.

## Color Direction

Add more of the existing site purple to the mega menu without turning the interface into a purple-only theme.

- Cyan remains the primary accent for AI Services and primary action affordances.
- Purple becomes the Industries and Manufacturing accent.
- Use purple rails, borders, icon frames, and subtle panel treatments around the Manufacturing AI Hub and its child links.
- Use a restrained cyan-to-purple treatment only where a true CTA or active category needs emphasis.
- Preserve dark site background, grid/technical texture, and existing ITECS AI color tokens.
- Avoid decorative orbs, bokeh blobs, or heavy gradient backgrounds.

## Animation Direction

Use modern, sleek motion that supports orientation rather than calling attention to itself.

- Overlay fades in quickly.
- Sidebar rail slides in slightly from the left.
- Main panel content fades/slides up in a short stagger.
- Cards can lift 2px on hover with border-color transition.
- Active category can animate a left rail or subtle border glow.
- Opening and hover transitions should stay restrained, roughly 180-320ms.
- Respect reduced-motion preferences through Framer Motion or CSS motion-reduction patterns.

## Content And Tone

The audience is business owners, executives, and operational leaders. Copy should be direct and outcome-led.

- Avoid playful labels, consumer-app language, or over-explaining how to use the menu.
- Use concise category descriptions:
  - AI Services: "Consulting, agents, automation, and AI operations."
  - Industries: "Manufacturing AI hub and use-case pages."
  - Resources: "Insights and reference pages."
  - Company: "About, pricing, contact, and ITECS MSP."
- Manufacturing child labels should remain compact:
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

## Data And Component Boundaries

Keep the lightweight navigation data boundary created in the previous menu work.

- Continue using `src/lib/manufacturingNavigation.ts` for compact manufacturing nav labels, hrefs, icon names, and descriptions.
- Continue using `src/components/layout/navData.ts` as the layout navigation data adapter with lucide icons.
- Do not import full page-content constants into the client global menu.
- Modify `src/components/layout/FullscreenNavMenu.tsx` for the new sidebar mega menu structure.
- Keep `src/components/layout/Header.tsx` focused on logo, Contact on non-mobile, and hamburger trigger.
- Footer hierarchy does not need to change for this redesign unless tests reveal a regression.

## Accessibility And Interaction

Preserve the accessibility improvements already implemented.

- Full-screen menu remains a dialog with `aria-modal="true"` and `aria-label="Site navigation"`.
- Focus moves into the dialog when opened.
- Tab and Shift+Tab stay inside the dialog while open.
- Escape closes the dialog.
- Focus returns to the hamburger trigger when closed.
- `aria-current="page"` is applied only to exact route matches.
- Visual parent highlighting can still use prefix matching.
- Header root links remain absent; navigation lives inside the full-screen menu.

## SEO And Internal Linking

The restructure must preserve internal discoverability.

- All manufacturing pages remain linked from the full-screen navigation data.
- Manufacturing AI Hub remains linked as the parent page.
- AI Services links remain present.
- Static pages including Contact Us, Insights, About, Pricing, Managed Intelligence, and ITECS MSP remain present.
- Update `scripts/seo-audit.mjs` only if the source locations or assertions change.
- No URL, metadata, canonical, robots, sitemap, or GSC behavior changes are planned.

## Testing And Validation

Implementation should include source-level regression updates and browser smoke checks.

- Update `tests/manufacturing-pages.test.mjs` if needed so it validates the sidebar mega menu structure:
  - AI Services appears before Industries.
  - Manufacturing AI Hub is present under Industries.
  - Manufacturing use-case links are nested under the hub.
  - Contact Us, Insights, About, Pricing, Managed Intelligence, and ITECS MSP are present.
  - Header root links remain absent.
- Run:
  - `node --test tests/manufacturing-pages.test.mjs`
  - `npm run seo:audit`
  - `npx tsc --noEmit`
  - `npm run lint`
  - `npm run build`
- Browser QA:
  - Mobile and desktop menu opens without horizontal overflow.
  - Category order is correct.
  - All manufacturing child routes are present.
  - Focus trap, Escape close, and focus restore still work.
  - Purple/cyan treatments render cleanly and do not overwhelm the UI.

## Out Of Scope

- Adding new industries beyond Manufacturing.
- Changing public URLs or sitemap structure.
- Changing page metadata or schema.
- Reworking the footer beyond regression fixes.
- Deploying before validation and final visual audit.

## Open Implementation Notes

- The visual mockup is directionally approved, not a pixel-perfect specification.
- Desktop should prioritize the sidebar rail and two-column main content.
- Mobile should prioritize readable stacked sections rather than preserving the desktop rail.
