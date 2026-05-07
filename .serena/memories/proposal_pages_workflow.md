# Hidden Proposal Pages Workflow

ITECS uses hidden web proposal pages under `/p/<slug>` to email clients branded, browser-based proposals. They are not linked from public navigation. Client-facing proposal emails should use the lightweight magic-link access URL when enabled: `/p/<slug>/access`.

Current known proposal/template:
- URL path: `/p/fcc-proposal-b2630d`
- Route: `src/app/p/fcc-proposal-b2630d/page.tsx`
- Component: `src/components/proposals/fcc-proposal-b2630d.tsx`
- Treat this page as the current structural and styling template for future proposal pages: page rhythm, dark technical visual language, section density, pricing/timeline layout, About ITECS placement, and animated approve/decline CTA behavior.

Pattern:
- Page routes live in `src/app/p/<slug>/page.tsx`.
- Proposal UI lives in `src/components/proposals/<slug>.tsx`.
- Use unguessable slugs with a random suffix.
- `/p/` is disallowed in `src/app/robots.ts` and excluded from `src/app/sitemap.ts`.
- Proposal metadata should be noindex, nofollow, noarchive, nosnippet, and noimageindex.
- Hidden/unlisted and magic-link access do not make these secure client portals. Treat the access flow as a client comfort and presentation layer.
- Keep proposal pages out of nav, footer, sitemap, and public marketing links.
- Magic-link proposals are registered in `src/lib/proposals/access.ts`, use `src/app/p/[slug]/access/page.tsx`, send access links through `src/app/api/proposals/access/request/route.ts`, verify links through `src/app/api/proposals/access/verify/route.ts`, and should use `/api/proposals/<slug>/pdf` for PDF downloads.
- `PROPOSAL_MAGIC_LINK_SECRET` must exist in `.env`, `.env.example`, and `docker-compose.yml`.

Workflow: gather brief/scope/pricing/assets, adapt TSX to the itecs.ai design system, use Tailwind tokens/lucide/next-image, localize fragile screenshots to `public/images/proposals/`, remove duplicate internal chrome, add restrained effects, create route/component, register magic-link access when enabled, run `npm run build`, deploy with `docker compose up -d --build --remove-orphans web`, then verify the access URL and gated proposal URL with Playwright.

Docs: `docs/proposals.md` and `.claude/commands/add-proposal.md`.
