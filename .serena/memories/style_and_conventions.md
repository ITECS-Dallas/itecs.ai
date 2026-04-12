# Style and Conventions

## Code Style
- TypeScript with strict mode enabled
- React functional components with App Router conventions
- Path alias `@/*` for imports from `src/`
- ESLint with `eslint-config-next` for linting

## Key Conventions
- Use `lucide-react` for all icons (never use other icon libraries)
- Use Tailwind CSS v4 utility classes for styling (no CSS modules, no styled-components)
- Global styles in `src/app/globals.css`
- Fonts loaded via `next/font/google` (Geist Sans, Geist Mono)
- `next.config.ts` uses `output: "standalone"` for Docker builds — do not change this
- nginx handles TLS termination; Next.js only serves HTTP on port 3000

## File Naming
- React components: PascalCase (e.g., `MyComponent.tsx`)
- Pages/layouts follow Next.js App Router conventions (`page.tsx`, `layout.tsx`)
- Utility/lib files: camelCase
