---
description: Create or update an SEO-ready ITECS AI Insights article
argument-hint: [article topic or request]
allowed-tools: [Read, Glob, Grep, Bash, Write, Edit, WebFetch]
---

# Create ITECS Insight Article

The user invoked this command with: $ARGUMENTS

When this command is invoked:

1. Read the project-specific skill at `.codex/skills/itecs-insight-articles/SKILL.md`.
2. Follow that skill as the source of truth for ITECS AI Insights article creation.
3. Use the live `https://itecs.ai/sitemap.xml` or `src/app/sitemap.ts` for internal link choices.
4. Write in the executive-ready business professional style defined by the skill.
5. Include article metadata, OpenGraph, Article schema, FAQ schema when useful, a share bar, a source/trust signal section after the share bar, and the default `The ITECS Team` author block unless directed otherwise.
6. Generate non-people article imagery through the skill helper when a new image is required.
7. Validate with `npm run lint`, `npm run build`, and mobile-first Playwright QA when code changes are made.
8. Unless the user asks for draft-only work, follow the skill's CPBA completion path: commit, push, build, and activate after verification.

Expected usage:

```text
/itecs-insight-articles:create write an article about AI policy for Dallas businesses
```
