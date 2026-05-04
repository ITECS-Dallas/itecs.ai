# Hidden Proposal Pages Workflow

ITECS uses hidden web proposal pages under `/p/<slug>` to email clients branded, browser-based proposals. These pages are shared manually by full URL and are not linked from public navigation.

Current known proposal:
- URL path: `/p/fcc-proposal-b2630d`
- Route file: `src/app/p/fcc-proposal-b2630d/page.tsx`
- Component file: `src/components/proposals/fcc-proposal-b2630d.tsx`

Implementation pattern:
- Page routes live in `src/app/p/<slug>/page.tsx`.
- Proposal UI components live in `src/components/proposals/<slug>.tsx`.
- Use unguessable slugs with a random suffix, e.g. `client-project-a1b2c3`.
- `/p/` is disallowed in `src/app/robots.ts` and excluded from `src/app/sitemap.ts`.
- Proposal metadata should use `index: false`, `follow: false`, `noarchive: true`, `nosnippet: true`, and `noimageindex: true`.
- Proposal pages are hidden/unlisted, not authenticated. Do not treat them as a secure client portal.
- Keep proposal pages out of nav, footer, sitemap, and public marketing links.

Creation workflow:
1. Gather client brief, scope, pricing, timeline, screenshots/assets, and CTA intent.
2. Draft/adapt a TSX proposal component to the itecs.ai design system.
3. Use Tailwind/project tokens, `lucide-react`, and `next/image`; localize fragile screenshots into `public/images/proposals/`.
4. Remove internal proposal chrome that duplicates global Header/Footer.
5. Add tasteful ambient effects from `src/components/effects/` where useful.
6. Create `src/components/proposals/<slug>.tsx` and `src/app/p/<slug>/page.tsx`.
7. Run `npm run build`.
8. Deploy with `docker compose up -d --build --remove-orphans web` when approved.
9. Verify the live URL with Playwright before sharing.

Detailed repo documentation:
- `docs/proposals.md`
- `.claude/commands/add-proposal.md`