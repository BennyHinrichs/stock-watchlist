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

Tests are still a work in progress

```
pnpm test
```

# TODO

We'll see if I ever get to these

- Watchlist Page
  - [x] Last Price
    - [x] I think I have to sub to the candle for this
    - [x] Figure out how to collate quote and candle responses
  - [x] Edit waitlist name
    - [x] Handle flash
    - [x] Check duplicate names on FE
    - [x] Reset values when switching between add/edit
  - [x] Delete waitlist
  - [x] Send KEEPALIVE messages
  - [ ] Limit to every 5 seconds
  - [x] Autocomplete actually gets and suggests symbols
    - [x] Click triggers blur, so it never sets the value
    - [x] Submit works, but after the requery, it doesn't subscribe to the new symbol via the websocket until refresh
    - [x] Same thing happens with delete symbol
    - [x] Checks for duplicates
  - [x] Would be nice to move all the WS stuff to its own file
    - Not as familiar with distributing state in Svelte 5
  - [x] Test for extra long names on inputs and displays
    - [x] Special characters
    - [x] Add character limits?
  - [ ] Need better loading indicator on first entry
- Symbol Page
  - [x] Find chart library
    - [?] Get the stupid tooltip to work
      - I did but it's having an off by 1 error somewhere. Can't tell if it's me or the svelte 4 library interfacing with 5.
  - [x] Sub to the WS data for the candles
    - [ ] Deal with the influx of data throwing it off occasionally
      - Seems like it's when it gets a new date delimited candle update
  - [x] Show last closing price
    - [x] Involves refactoring the ws handler
- [ ] Check accessibility
- [ ] Add tests
- Login
  - [x] Fix logging in so that it actually sends you to the `/` route
  - [x] Make checkUserCredentials() to handle logged in logic
    - [x] Send refresh token if expired
    - [x] Send to `/login` if that fails
    - [x] Include on symbol page
  - [ ] Logout button
- [ ] General error handling
- [ ] Optimistic updates
  - [x] Add/delete symbol
  - [ ] Add/edit/delete watchlist
