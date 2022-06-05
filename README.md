# Stream Team Twitch Extension

React front-end hosted on the Twitch CDN that broadcasters and viewers will interact with.

## Development Instructions

1. Install dependencies: `yarn install`
1. Run application in development mode: `yarn start`
1. Find and fix any lint issues: `yarn eslint:fix`
1. Format code: `yarn format`

## Production Build Instructions

1. `yarn install`
1. `yarn build`
1. Assets will be contained in the `build` folder
1. Client JS and CSS will be bundled to their one files and all node modules will be bundled in to the `vendor.js` file.
