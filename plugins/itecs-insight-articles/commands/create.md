---
description: Draft or implement an ITECS AI Insights article with explicit publication gates
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
5. Include metadata, Article or BlogPosting schema, breadcrumbs, visible sources, and accurate authorship when the current article contract calls for them. Add FAQ or imagery only when they serve the article and pass the skill's evidence gates.
6. Use `The ITECS Team` only when it reflects the actual editorial process; never manufacture an author or credential.
7. When the user explicitly authorizes local code implementation, validate with `npm run lint`, `npm run build`, and mobile-first Playwright QA as appropriate to the change.
8. A generic write, create, research, or draft request does not authorize commit, push, publication, deployment, or activation. Perform those outcomes only when the user explicitly requests each applicable outcome for the exact resolved article and target.

Expected usage:

```text
/itecs-insight-articles:create draft an article about AI policy for Dallas businesses
```
