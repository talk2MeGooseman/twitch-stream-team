# Stream Team Twitch Extension

React front-end hosted on the Twitch CDN that broadcasters and viewers interact
with.

## Tech stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) for dev server and production builds
- [MUI](https://mui.com/) (Material UI) + [emotion](https://emotion.sh/) for UI
- [Apollo Client](https://www.apollographql.com/docs/react/) for GraphQL
- [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/)
  for tests

## Development

1. Install dependencies: `yarn install`
1. Run the app in development mode: `yarn start` (serves on port 8080)
1. Run the tests: `yarn test` (watch mode: `yarn test:watch`)
1. Type-check: `yarn typecheck`
1. Lint: `yarn lint` (auto-fix: `yarn lint:fix`)
1. Format: `yarn format`

The extension is loaded with a `mode` query parameter (`config`, `viewer` or
`dashboard`) that selects which view renders.

### Previewing with mock data

The real app needs the Twitch CDN auth helper and the GraphQL backend, so it
can't render meaningfully in isolation. To work on the UI against mock data
instead, run:

```
yarn mock
```

This serves `preview.html`, which renders the viewer panel and broadcaster
config components with fake data — no Twitch auth or backend required. Edit the
sample data in `src/preview/mockData.ts` to try different shapes (live/offline
channels, teams, members). The preview is dev-only and is not part of the
production build.

## Production build

1. `yarn install`
1. `yarn build`
1. Assets are emitted to the `dist` folder, ready to upload to the Twitch CDN.
