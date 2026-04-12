# Task Completion Checklist

When a task is completed, run the following checks:

1. **Type check:** `npx tsc --noEmit`
2. **Lint:** `npm run lint`
3. **Build test:** `npm run build` (ensures standalone output works)
4. **Dev server test:** `npm run dev` and verify in browser (use Playwright MCP for automated checks)

## Before Committing
- Ensure no secrets are committed (`.env` is gitignored)
- Run lint and type check
- Verify the build succeeds
