# Application dependency maintenance

Use Node 26.8.2 (`.nvmrc`) and npm 11.19.1 (`packageManager`). The production
Dockerfile pins the Node image digest and installs that exact npm version before
clean installs. The standalone runtime intentionally removes npm. Alpine package
updates are applied at build time; retain the exact resulting image for rollback.

Regenerate the lockfile with the declared toolchain and normal dependency
resolution. Do not add dependency overrides or force peer/audit resolution.
Validate `npm ci`, lint, TypeScript, the repository tests, production build,
production/full audits, and the accepted public/mobile release contracts.
Deploy the tested immutable image through `scripts/prod-deploy.sh`; retain the
exact previous image and accepted source snapshot. The shared ingress and other
applications are outside dependency maintenance scope.

## September 15, 2026 compatibility constraints

- React/React DOM 19.3.0 and Motion 13.3.0 are compatible with Next 16.3.5.
  Motion 13 removes automatic Emotion prop validation; this application uses
  Tailwind and no Emotion/Styled Components integration, so no source migration
  is required. See the [Motion upgrade guide](https://motion.dev/docs/react-upgrade-guide)
  and [React 19.3 notes](https://react.dev/blog/2026/09/09/react-19-3).
- ESLint 9.39.5 is the newest compatible release, although upstream marks ESLint 9
  unsupported. The current `eslint-config-next` depends on React and accessibility
  plugins whose peer ranges exclude ESLint 10. Revisit when those plugins support
  ESLint 10; do not bypass peer constraints or drop checks to upgrade.
- TypeScript 6.0.3 remains necessary: Next's type checker and existing behavioral
  test loaders use its JavaScript compiler API. TypeScript 7.0.2 does not provide
  that API. Revisit when the toolchain supports the native compiler without aliases
  or parallel compiler installations. See the [TypeScript 7 announcement](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/).
- npm 12.0.2 failed normal lockfile generation with `EALLOWREMOTE` for the registry
  tarball of `@tailwindcss/oxide-wasm32-wasi@4.3.3`, including a fresh-lock attempt
  with the official registry explicitly selected. npm 11.19.1, bundled with current
  Node 26.8.2, installs successfully. Retain it until npm 12 can install this tree
  with its default remote-source restrictions; do not enable unrestricted remote
  dependency fetching as a workaround.

The override-free refresh fixes both high-severity Browserslist advisories
GHSA-c83g-rgw3-j3cx and GHSA-73wf-gq98-2v4g by resolving 4.28.9. These affected the
development/build tree; the pre-maintenance production npm audit was clean.
