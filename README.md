# protowiki

A simple wikipedia mobile SPA that loads articles.

Very barebones and meant for prototyping.

Created for Wikimedia's Reading Web team to help on the New readers effort (see
[mediawiki.org/wiki/Reading/Web/Projects/New_Readers_2016-17_Q2][mwnewreaders]).

## Development instructions

Install Node active LTS (>= 6) and npm (>= 3)

### `npm start`

Starts the development server listening on port `:3000` and opens a browser.

The page will live reload when the sources change.

You can prefix `npm start` with the environment variable `REACT_APP_PROTOTYPE`
to force a specific prototype. By default in development all flags are enabled.

See [flags.js][flags]

Example: `REACT_APP_PROTOTYPE=wikilater-1 npm start`

### `npm run build`

To build the assets for production on `build/`.

As with `start`, you can prefix `npm run build` too to force a specific
prototype, see above.

Example: `REACT_APP_PROTOTYPE=wikilater-1 npm run build`

This is the mechanism used by the deploy script to generate and deploy all the
different variants. Read ahead for more information.

### `npm run lint`

Lint sources for problems and automatically fix errors when possible.

## Deployment instructions

Prototypes are compiled and deployed with the script
[`./scripts/deploy.sh`][deploy].

It just runs `npm run build` with the `REACT_APP_PROTOTYPE` set to each
prototype defined on [flags.js][flags].

Then it deploys the bundle of static files to `surge.sh` with the name of the
prototype. If you need to deploy to the existing urls ask for the credentials
of the surge account that previously deployed them, or adapt the build script
to deploy to a differently prefixed name or to a different service.



[flags]: https://github.com/joakin/protowiki/blob/master/src/flags.js
[deploy]: https://github.com/joakin/protowiki/blob/master/scripts/deploy.sh
[mwnewreaders]: https://www.mediawiki.org/wiki/Reading/Web/Projects/New_Readers_2016-17_Q2
