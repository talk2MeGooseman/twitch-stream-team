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

## Production build

1. `yarn install`
1. `yarn build`
1. Assets are emitted to the `dist` folder, ready to upload to the Twitch CDN.
