---
name: itecs-proposals
description: Use when creating, updating, testing, emailing, or documenting hidden ITECS web proposal pages under /p, including magic-link access, protected PDF downloads, proposal response forms, production URL safety, and proposal template standards.
---

# ITECS Proposals

Use this skill for client-specific web proposals on itecs.ai. Proposal pages are code-managed, hidden from navigation, excluded from search, and shared manually by email.

## Current Template

Use the Hasen proposal as the current structural and styling template:

- Page: `/p/hasen-claude-work-order-phase-1-9ee3f0`
- Access page: `/p/hasen-claude-work-order-phase-1-9ee3f0/access`
- Route: `src/app/p/hasen-claude-work-order-phase-1-9ee3f0/page.tsx`
- Component: `src/components/proposals/hasen-claude-work-order-phase-1-9ee3f0.tsx`

The template standard includes dark itecs.ai styling, an executive hero, clear scope/timeline/pricing sections, source notes when vendor claims are used, magic-link access, a protected PDF route, response forms, and a single sticky bottom Download Proposal control.

## Workflow

1. Gather scope, pricing, source docs, assumptions, acceptance criteria, client contacts, and PDF/download needs.
2. Create `src/components/proposals/<slug>.tsx` and `src/app/p/<slug>/page.tsx` with noindex/nofollow/noarchive/nosnippet/noimageindex metadata.
3. Use an unguessable slug with a short random suffix.
4. Register magic-link access in `src/lib/proposals/access.ts` unless the user explicitly wants a plain unlisted URL.
5. Store gated PDFs under `private/proposals/` and set `pdfFileName`; proposal components must use `/api/proposals/<slug>/pdf`, not `/public` PDF paths.
6. Add a single sticky bottom Download Proposal control using `lucide-react` `Download`. Do not put Accept or Decline in the sticky bar unless explicitly requested; keep those actions in the proposal response section.
7. Client-facing proposal emails should link to `https://itecs.ai/p/<slug>/access`, avoid pricing in the email body unless requested, and use the proposal hero image when suitable.
8. Update `docs/proposals.md`, `.claude/commands/add-proposal.md`, `CLAUDE.md`, and `.serena/memories/proposal_pages_workflow.md` when the workflow or template standard changes.

## Production URL Safety

All proposal access emails and magic-link redirects must use canonical public URLs.

- Use `SITE_CONFIG.url` or `NEXT_PUBLIC_SITE_URL` for production proposal links.
- Keep `src/lib/proposals/url.ts` canonical-first for non-local requests.
- Do not build client-facing email links or redirect destinations from `request.url`, `request.nextUrl.origin`, `Host`, `X-Forwarded-Host`, Docker hostnames, `0.0.0.0`, or container ports.
- Localhost and `127.0.0.1` may remain supported for local development only.
- After touching proposal access, verify an internal-host request cannot leak into a client link:

```bash
docker compose exec -T web node - <<'NODE'
const http = require('http');
const { createHmac } = require('crypto');
const secret = process.env.PROPOSAL_MAGIC_LINK_SECRET;
const slug = 'hasen-claude-work-order-phase-1-9ee3f0';
const payload = { slug, email: 'bdesmot@itecsonline.com', purpose: 'magic-link', exp: Math.floor(Date.now() / 1000) + 120 };
const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
const signature = createHmac('sha256', secret).update(encodedPayload).digest('base64url');
const path = `/api/proposals/access/verify?token=${encodeURIComponent(`${encodedPayload}.${signature}`)}`;
http.request({ host: '127.0.0.1', port: 3000, path, headers: { Host: '0.0.0.0:3000' } }, (res) => {
  console.log(res.statusCode, res.headers.location);
  if (!String(res.headers.location || '').startsWith('https://itecs.ai/')) process.exit(1);
  res.resume();
}).end();
NODE
```

## Validation

- Run `npm run lint`, `npx tsc --noEmit`, `npm run build`, and `git diff --check`.
- Deploy with `docker compose up -d --build --remove-orphans web` when the user asks to publish or the proposal is ready for client testing.
- Verify with Playwright using the Googlebot Smartphone viewport from `CLAUDE.md`.
- Check direct proposal URL redirects to `/access`, magic-link cookie grants access, protected PDF route returns `application/pdf`, raw public PDF URLs are not reachable, and magic-link redirects use `https://itecs.ai` even when the request host is internal.

## Guardrails

- Hidden and magic-link proposal pages are presentation and client-comfort layers, not hardened portals.
- Do not include sensitive data that belongs in a signed contract system, encrypted email, or secured file portal.
- Leave unrelated dirty files unstaged.
