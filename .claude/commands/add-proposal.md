# Add Proposal

Add a private proposal page to itecs.ai from a TSX file.

## Arguments

The argument is the path to the TSX file. Accepts an absolute path (`/home/itecs/fcc-proposal.tsx`) or a filename to search for in the project root and user home directory.

Example: `/add-proposal /home/itecs/acme-corp-proposal.tsx`

## Instructions

You are adding a private, unlisted proposal page to itecs.ai. Follow these steps exactly:

Reference `/p/hasen-claude-work-order-phase-1-9ee3f0` as the current structural
and styling template for future proposals. It demonstrates the preferred page
rhythm, visual density, dark technical styling, section sequencing,
pricing/timeline treatment, source notes, protected PDF download route,
magic-link access, proposal response forms, and single sticky bottom Download
Proposal control.

### 1. Locate and validate the input file

- If the argument is an absolute path, read it directly.
- If it's a filename, look in `/home/itecs/itecs.ai/` first, then `/home/itecs/`.
- If the file doesn't exist in either location, report the error and stop.
- Verify the file exports a default React component (look for `export default function`).
- The source file is never deleted or moved — it stays where the user placed it.

### 2. Generate the slug

- Derive a slug from the filename: strip `.tsx`, convert to lowercase kebab-case.
- Append a 6-character random hex suffix (e.g., `acme-corp-a8f3k2`).
- Generate with: `node -e "console.log(require('crypto').randomBytes(3).toString('hex'))"`

### 3. Validate and adapt the proposal component

Read the file thoroughly and refactor it to conform to the project's styling and component conventions. The goal is that the proposal looks and feels like a native page on itecs.ai, not a foreign paste-in.

**Styling rules:**
- **No inline styles.** Remove all `style={{}}` props. Convert them to Tailwind CSS utility classes.
- **Use the project's Tailwind design tokens** for colors, not hardcoded hex/rgb or generic Tailwind color classes. The tokens available via `@theme inline` in `globals.css` are:
  - Backgrounds: `bg-bg-void`, `bg-bg-surface`, `bg-bg-elevated`
  - Brand: `text-brand-accent`, `bg-brand-accent`, `border-brand-accent` (and `-bright`, `-purple` variants)
  - Text: `text-text-primary`, `text-text-secondary`, `text-text-dim`
  - For opacity: append directly, e.g. `bg-brand-accent/10`, `border-brand-accent/30`
  - For CSS-only vars without Tailwind tokens (`--border-subtle`, `--glow-cyan`, etc.), use arbitrary value syntax: `border-[var(--border-subtle)]`
- **Typography must match the site** — `font-light` headlines (weight 300), never bold walls of text. Use Geist Sans (the default).
- **Spacing and layout** should use Tailwind utilities consistent with the rest of the site (e.g., `max-w-6xl mx-auto px-6`, `space-y-`, `gap-`).

**Component reuse:**
- If the proposal already has well-structured internal layout helpers (Section wrappers, FadeIn/SlideIn animation wrappers), keep them — they're tailored to the proposal's layout.
- Only swap in project UI components (`Button`, `Card`, `SectionHeading` from `src/components/ui/`) where the proposal is clearly missing structure that these provide. Don't force a swap for the sake of it.
- **Icons** must come from `lucide-react`, not inline SVGs or other icon libraries.
- If the proposal imports external dependencies not in the project, flag this to the user before adding anything.

**Images:**
- All images must use `next/image` with proper `alt` attributes.
- For external image URLs: add the `unoptimized` prop.
- **If an external image URL looks fragile or is from a site being rebuilt** (which is common — proposals often reference the client's current site), use Playwright to screenshot the target page, save it to `public/images/proposals/`, and reference the local file instead. This prevents broken images after the client's site changes.

**Code quality:**
- Ensure `"use client";` at the top if the component uses hooks, event handlers, or browser APIs.
- Consolidate duplicate React imports into a single statement.
- Remove unused imports, dead code, and commented-out blocks.

**Animations — do not modify, only validate:**
- **Framer Motion** — Do not alter any `motion.*` components, variants, transitions, or animation props. Only fix outright errors (missing import, typo in variant name).
- **SVG animations** — Do not modify path data, keyframes, dasharray values, or timing. Only fix broken CSS class references.

**Structure — remove internal chrome:**
- **Remove any internal header/toolbar** (ITECS logo bar, "Your IT Solution" branding, "Private Proposal" badge). The site's global Header already provides navigation and branding.
- **Remove any internal footer** (logo, copyright, confidential notices). The site's global Footer already handles this. The last visible section in the proposal should be the CTA.

**Content integrity:**
- Do NOT change the proposal's actual content (text, pricing, scope, deliverables, timelines, etc.).
- Only change *how* it's presented to align with the site's design system.

### 4. Enhance with ambient visual animations

Analyze the proposal's structure and insert subtle, professional visual effects from the project's effects library (`src/components/effects/`).

**Available effects:**

| Component | Usage | Best placement |
|---|---|---|
| `CircuitTrace` | `<CircuitTrace variant="section-divider" />` | Between 2–4 major sections as an animated horizontal line with flowing particles. Signature itecs.ai visual. |
| `CircuitTrace` | `<CircuitTrace variant="background" />` | Inside a `relative` container for a faint circuit-board background. |
| `GradientOrb` | `<GradientOrb color="cyan" size="lg" position={{ top: "-200px", left: "-100px" }} />` | Behind hero or CTA sections. Place inside `relative overflow-hidden`. |
| `GridBackground` | `<GridBackground opacity={0.03} />` | Behind tech stack or pricing. Place inside `relative`. |
| `ScrollReveal` | `<ScrollReveal direction="up" delay={0.1}>...</ScrollReveal>` | Wrapping content blocks for scroll-triggered entrance. Skip if the proposal already has its own FadeIn/SlideIn wrappers. |

All imports from `@/components/effects/`.

**Guidelines:**
- Insert `CircuitTrace` section dividers at 2–4 visually impactful transition points (not every border).
- Add 1–2 background effects (`GradientOrb` or `GridBackground`) to sparse sections: hero, pricing, CTA, tech stack.
- Restraint: ~1 effect per 2–3 sections. Dense sections (scope, pricing line items) stay clean.
- Do not modify existing animations — only add new ambient effects.

### 5. Write the proposal component

- Write the adapted file to `src/components/proposals/<slug>.tsx` (create the `proposals/` directory if needed).

### 6. Create the page route

- Create `src/app/p/<slug>/page.tsx`:

```tsx
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import ProposalContent from "@/components/proposals/<slug>";
import { hasProposalAccess } from "@/lib/proposals/access";

const proposalSlug = "<slug>";

export const metadata: Metadata = {
  title: "<Company/Project Name> Proposal | ITECS",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
  },
};

export default async function ProposalPage() {
  if (!(await hasProposalAccess(proposalSlug))) {
    redirect(`/p/${proposalSlug}/access`);
  }

  return (
    <div className="min-h-screen">
      <ProposalContent />
    </div>
  );
}
```

- Extract a human-readable company/project name from the filename or component content for the `<title>`.

### 6a. Register magic-link proposal access

Proposal pages should use the lightweight magic-link access flow unless the user
explicitly asks for a plain unlisted URL. This is a client-comfort layer, not a
hardened portal.

1. Add the proposal to `PROPOSAL_ACCESS` in `src/lib/proposals/access.ts`.
2. Include internal test emails and the client's approved emails or email domain
   in `allowedEmails` / `allowedDomains`.
3. Set `fromEmail` to the ITECS sender requested for the proposal email.
4. Set `heroImageUrl` to the public proposal image asset.
5. Store gated proposal PDFs under `private/proposals/` and set `pdfFileName`
   to that filename so downloads go through the access-cookie API route.
6. Change the proposal component's PDF button to:

```ts
const pdfHref = "/api/proposals/<slug>/pdf";
```

7. Add a single sticky bottom Download Proposal control that links to
   `pdfHref` and uses a `lucide-react` `Download` icon. Keep the sticky control
   focused on the PDF only; Accept and Decline remain in the proposal response
   section unless the user explicitly asks for them in the sticky bar.
8. Send client-facing emails to `https://itecs.ai/p/<slug>/access`, not directly
   to `/p/<slug>`.
9. Confirm magic-link emails and verification redirects use canonical public
   URLs from `SITE_CONFIG.url` or `NEXT_PUBLIC_SITE_URL`, not request host
   headers, `request.url`, `request.nextUrl.origin`, Docker hostnames,
   `0.0.0.0`, or container ports. `src/lib/proposals/url.ts` owns this rule.
10. Confirm `PROPOSAL_MAGIC_LINK_SECRET` exists in `.env`, `.env.example`, and
   `docker-compose.yml`.

### 7. Build and verify

- Run `npm run build` to verify no TypeScript or build errors.
- If the build fails, fix the issue and rebuild.
- After deploy, run an internal-host redirect check. A request with
  `Host: 0.0.0.0:3000` to `/api/proposals/access/verify` must redirect to
  `https://itecs.ai/p/<slug>`, never to `0.0.0.0`, `localhost`, or a container
  address.

### 8. Deploy

- Run `cd /home/itecs/itecs.ai && docker compose up -d --build web` to deploy.

### 9. Visual QA

- Use Playwright to navigate to `http://localhost:3000/p/<slug>` and take a viewport screenshot.
- Show the screenshot to the user for visual confirmation before reporting success.
- If anything looks off (broken layout, missing images, misaligned sections), fix it, rebuild, and redeploy before proceeding.

### 10. Report to user

Report the private URL: **`https://itecs.ai/p/<slug>`**

Then provide:
1. **Privacy reminder** — The URL is unlisted, noindex, blocked in robots.txt, excluded from sitemap, and not linked from any page. Share it manually via email.
2. **Adaptation summary** — List the key changes made: color tokens swapped, imports cleaned, effects added, images handled, chrome removed, etc. Keep it concise.

### Privacy guarantees

1. **robots.txt** — `Disallow: /p/`
2. **Meta robots** — `noindex, nofollow, noarchive, nosnippet, noimageindex` on layout and page
3. **Sitemap exclusion** — `/p/` pages never in sitemap.xml
4. **No internal links** — nothing links to `/p/` routes
5. **Unguessable slug** — random hex suffix

### Removing a proposal

Delete `src/app/p/<slug>/` and `src/components/proposals/<slug>.tsx`, then rebuild and redeploy.
