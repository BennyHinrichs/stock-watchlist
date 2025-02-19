import type { FeedData, SymbolData } from "$lib/websocket.svelte.js";

export const allFeedData = $state<{ current: FeedData }>({
  current: {},
});

export const symbolData = $state<{ current: SymbolData[] }>({
  current: [],
});
