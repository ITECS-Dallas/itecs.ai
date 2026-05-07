# Web Proposal Pages

ITECS uses hidden web proposal pages to send clients polished, browser-based
proposals from itecs.ai. These live under `/p/<slug>` and are meant to be shared
manually by email, not discovered through site navigation or search.

The first proposal page is:

- `/p/fcc-proposal-b2630d`
- Route: `src/app/p/fcc-proposal-b2630d/page.tsx`
- Component: `src/components/proposals/fcc-proposal-b2630d.tsx`

Use the FCC proposal as the current structural and styling template for future
proposal pages. It demonstrates the desired page rhythm, dark technical visual
language, section density, pricing/timeline presentation, About ITECS placement,
and animated approve/decline CTA pattern.

## Purpose

Proposal pages let ITECS send client-specific scopes, pricing, timelines,
screenshots, and approval CTAs as a branded web experience. They should look
native to itecs.ai while remaining isolated from public marketing pages.

These pages are hidden and can optionally use the lightweight magic-link access
flow documented below. Do not treat `/p` pages as a secure client portal. Avoid
posting highly sensitive data that should only live in a signed contract system,
encrypted email, or secured file portal.

## Privacy Pattern

Every proposal page should follow this privacy pattern:

- Put the route under `src/app/p/<slug>/page.tsx`.
- Put the proposal UI under `src/components/proposals/<slug>.tsx`.
- For proposals that should use the access flow, add an entry to
  `src/lib/proposals/access.ts`.
- Use an unguessable slug with a short random suffix, for example
  `acme-ai-roadmap-a1b2c3`.
- Keep `/p/` blocked in `src/app/robots.ts`.
- Keep `/p/` pages out of `src/app/sitemap.ts`.
- Add page metadata with:
  - `index: false`
  - `follow: false`
  - `noarchive: true`
  - `nosnippet: true`
  - `noimageindex: true`
- Do not link proposal pages from public navigation, footer, sitemap, or
  marketing pages.

The shared `/p` layout already applies conservative robots metadata:
`src/app/p/layout.tsx`.

## Magic-Link Access Pattern

Use the magic-link flow when a proposal email should feel more controlled than a
plain URL. The client email should link to:

`https://itecs.ai/p/<slug>/access`

The access page asks for the recipient's business email, sends an expiring link
through Microsoft Graph, sets an HTTP-only proposal access cookie after the link
is clicked, and redirects to `/p/<slug>`.

Implementation files:

- Proposal registry and token helpers: `src/lib/proposals/access.ts`
- Access request API: `src/app/api/proposals/access/request/route.ts`
- Link verification API: `src/app/api/proposals/access/verify/route.ts`
- Protected PDF route: `src/app/api/proposals/<slug>/pdf`
- Access form: `src/components/proposals/ProposalAccessForm.tsx`
- Access page: `src/app/p/[slug]/access/page.tsx`

When enabling a proposal for magic-link access:

1. Add the proposal to `PROPOSAL_ACCESS` in `src/lib/proposals/access.ts`.
2. Include internal test emails and the client's approved emails or domain in
   the allowlist.
3. Change the proposal component's PDF download button to use
   `/api/proposals/<slug>/pdf`.
4. Store downloadable PDFs for gated proposals under `private/proposals/`, set
   `pdfFileName` to the filename, and let the API route serve the file only
   after the access cookie is present.
5. Update the proposal page route to call `hasProposalAccess(<slug>)` and
   redirect visitors without a valid proposal cookie to `/p/<slug>/access`.
6. Confirm `PROPOSAL_MAGIC_LINK_SECRET` is set in `.env` and Docker Compose.

The public email should avoid pricing and use the access-page URL as the primary
CTA. This keeps the email short and makes the proposal feel private without
overbuilding a full portal.

## Creation Workflow

1. Gather the client brief, scope, assumptions, pricing, timeline, and any
   visual assets or screenshots.
2. Draft or adapt a TSX proposal component.
3. Convert the proposal to project conventions:
   - Use Tailwind classes and project design tokens.
   - Use `lucide-react` icons.
   - Use `next/image` for images and localize fragile external screenshots under
     `public/images/proposals/`.
   - Remove internal headers, footers, logos, or chrome that duplicates the
     global site layout.
   - Keep proposal content intact unless the user asks for wording changes.
   - Use `/p/fcc-proposal-b2630d` as the reference for structure, visual
     density, section styling, and proposal response CTA behavior.
   - If the proposal will use magic-link access, use the access URL in client
     emails and keep page/PDF links behind the access cookie.
4. Add tasteful visual effects from `src/components/effects/`, especially
   `CircuitTrace`, `GradientOrb`, `GridBackground`, and `ScrollReveal`.
5. Create:
   - `src/components/proposals/<slug>.tsx`
   - `src/app/p/<slug>/page.tsx`
6. Run `npm run build`.
7. Deploy with `docker compose up -d --build --remove-orphans web` when the page
   should go live.
8. Use Playwright to inspect the live URL and screenshot the page before sharing
   the final link.

## Existing Helper Command

The detailed implementation checklist lives in:

- `.claude/commands/add-proposal.md`

Use that command/workflow when the user provides a TSX proposal file and asks to
add it to the site.

## Sharing Workflow

After build and deploy, send the client the magic-link access URL when enabled:

`https://itecs.ai/p/<slug>/access`

For proposals without magic-link access, send the full URL manually, for
example:

`https://itecs.ai/p/<slug>`

Keep the email short and professional. Do not include project pricing in the
email body unless the user explicitly asks for it.

## Removing a Proposal

To remove a proposal:

1. Delete `src/app/p/<slug>/`.
2. Delete `src/components/proposals/<slug>.tsx`.
3. Remove any proposal-only assets from `public/images/proposals/` if no longer
   needed.
4. Run `npm run build`.
5. Redeploy the web container.
