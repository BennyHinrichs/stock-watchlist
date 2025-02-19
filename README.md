# create-svelte

Everything you need to build a Svelte library, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/main/packages/create-svelte).

Read more about creating a library [in the docs](https://svelte.dev/docs/kit/packaging).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

Everything inside `src/lib` is part of your library, everything inside `src/routes` can be used as a showcase or preview app.

## Building

To build your library:

```bash
npm run package
```

To create a production version of your showcase app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

## Publishing

Go into the `package.json` and give your package the desired name through the `"name"` option. Also consider adding a `"license"` field and point it to a `LICENSE` file which you can create from a template (one popular option is the [MIT license](https://opensource.org/license/mit/)).

To publish your library to [npm](https://www.npmjs.com):

```bash
npm publish
```

# TODO

- Watchlist Page
  - [x] Last Price
    - [x] I think I have to sub to the candle for this
    - [x] Figure out how to collate quote and candle responses
  - [ ] Edit waitlist name
    - [ ] Autofocus loads suggestions
    - [ ] Check duplicate names on FE
  - [ ] Delete waitlist
  - [ ] Send KEEPALIVE messages?
  - [ ] Limit to every 5 seconds
  - [ ] Autocomplete actually gets and suggests symbols
    - [ ] Checks for duplicates
  - [x] Would be nice to move all the WS stuff to its own file
    - Not as familiar with distributing state in Svelte 5
  - [ ] Test for extra long names on inputs and displays
    - [ ] Add character limits?
- Symbol Page
  - [ ] Design
  - [ ] Find chart library
  - [ ] Sub to the WS data for the candles
- [ ] Check accessibility
- [ ] Add tests
- Login
  - [ ] Fix logging in so that it actually sends you to the `/` route
  - [ ] Send refresh token if expired
  - [ ] Send to `/login` if that fails
  - [ ] Logout button
- [ ] General error handling
