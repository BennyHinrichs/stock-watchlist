## Demo

https://bennyhinrichs.github.io/stock-watchlist/

I think I got it working in GitHub Pages, so you shouldn't have to download the code and run locally. It was pretty brutal to figure out what their deployer didn't like about the SvleteKit output (as you can see in my build script), so there may be a bug or two with the routing there still.

## Run Locally

This assumes you have pnpm installed

```bash
pnpm i
pnpm dev
http://localhost:5173

OR

pnpm build
pnpm preview
http://localhost:4173
```

# TODO

We'll see if I ever get to these

- Watchlist Page
  - [x] Last Price
    - [x] I think I have to sub to the candle for this
    - [x] Figure out how to collate quote and candle responses
  - [x] Edit waitlist name
    - [x] Handle flash
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
  - [x] Find chart library
    - [ ] Get the stupid tooltip to work
  - [x] Sub to the WS data for the candles
    - [ ] Deal with the influx of data throwing it off occasionally
      - Seems like it's when it gets a new date delimited candle update
- [ ] Check accessibility
- [ ] Add tests
- Login
  - [ ] Fix logging in so that it actually sends you to the `/` route
  - [ ] Send refresh token if expired
  - [ ] Send to `/login` if that fails
  - [ ] Logout button
- [ ] General error handling
- [ ] Optimistic updates
