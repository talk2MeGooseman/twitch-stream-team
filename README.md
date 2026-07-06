# Stream Team Twitch Extension

React front-end hosted on the Twitch CDN that broadcasters and viewers interact
with.

## Tech stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) for the dev server and production builds
- [MUI](https://mui.com/) (Material UI) + [emotion](https://emotion.sh/) for UI
- [Apollo Client](https://www.apollographql.com/docs/react/) for GraphQL
- [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/)
  for tests
- [ESLint](https://eslint.org/) (flat config) + [Prettier](https://prettier.io/)

## Getting started

```
yarn install
yarn mock      # work on the UI with mock data (recommended for local dev)
```

`yarn mock` is the easiest entry point: it renders the components against fake
data with no Twitch auth or backend required (see
[Previewing with mock data](#previewing-with-mock-data)). Use `yarn start` when
you need the real extension wired to Twitch and the GraphQL API.

## Scripts

| Command | What it does |
| --- | --- |
| `yarn start` | Run the **real extension** in dev mode (Vite, port 8080). Needs the Twitch auth helper and the GraphQL backend, so it stays on a loader in isolation. |
| `yarn mock` | Open `/preview.html` — renders the UI against **mock data**, no auth or backend needed. |
| `yarn build` | Production build to `dist/` (single bundled JS/CSS, ready for the Twitch CDN). |
| `yarn preview` | Serve the built `dist/` locally to smoke-test a production build. |
| `yarn test` | Run the test suite once (Vitest). |
| `yarn test:watch` | Run the tests in watch mode while developing. |
| `yarn test:coverage` | Run the tests and produce a V8 coverage report. |
| `yarn typecheck` | Type-check the project with `tsc --noEmit`. |
| `yarn lint` | Lint with ESLint. |
| `yarn lint:fix` | Lint and auto-fix what can be fixed (also sorts imports). |
| `yarn format` | Format the codebase with Prettier. |

The extension is loaded with a `mode` query parameter (`config`, `viewer` or
`dashboard`) that selects which view renders. `yarn start` serves the app at
`http://localhost:8080/?mode=config`, for example.

CI runs `typecheck`, `lint`, `test` and `build` on every pull request
(`.github/workflows/ci.yml`) and again on push to `master` before the release
build (`.github/workflows/pre-release.yml`), so it's worth running those four
locally before pushing.

## Previewing with mock data

The real app needs the Twitch CDN auth helper and the GraphQL backend, so it
can't render meaningfully in isolation. To iterate on the UI against mock data
instead:

```
yarn mock
```

This serves `preview.html`, which mounts the viewer panel and broadcaster
config components inside the app theme with fake data — no Twitch auth or
backend required.

- Edit the sample data in **`src/preview/mockData.ts`** to try different shapes
  (live/offline channels, teams, members). The page hot-reloads.
- To showcase another component, add it to the cards in
  **`src/preview/main.tsx`**.

The preview is dev-only: `yarn build` only bundles `index.html`, so
`preview.html` and `src/preview/*` never ship in the production build.

## Project layout

```
src/
  components/   UI components (+ __tests__)
  views/        Top-level views per mode (config / viewer / dashboard)
  hooks/        Data-fetching and form hooks
  services/     Twitch Helix API, Apollo client, GraphQL documents
  utils/        Pure data transforms (team/member specs)
  preview/      Mock-data preview harness (dev only)
  theme.ts      MUI theme (colours live here)
```

Path aliases `services/*`, `hooks/*` and `utils/*` are configured in both
`vite.config.ts` and `tsconfig.json`.

## Production build

1. `yarn install`
1. `yarn build`
1. Assets are emitted to the `dist` folder, ready to upload to the Twitch CDN.
