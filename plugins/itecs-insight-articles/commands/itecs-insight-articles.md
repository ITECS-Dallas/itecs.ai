---
description: Use the ITECS Insights article skill
argument-hint: [article topic or request]
allowed-tools: [Read, Glob, Grep, Bash, Write, Edit, WebFetch]
---

# ITECS Insight Articles

The user invoked this command with: $ARGUMENTS

Read `.codex/skills/itecs-insight-articles/SKILL.md` and follow it as the source of truth. Use this command for ITECS AI blog articles, Insights posts, SEO guides, article page updates, overview card previews, generated article imagery, Article schema, OpenGraph metadata, share bars, source citations, trust signal sections, and author blocks.

Unless the user asks for draft-only work, follow the skill's CPBA completion path: commit, push, build, and activate after verification.

If the user gives only a topic, infer a Dallas SMB executive audience and create the article workflow described by the skill.

Expected usage:

```text
/itecs-insight-articles:itecs-insight-articles AI governance checklist for small businesses
```
