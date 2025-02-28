import type { FeedData, SymbolData } from "$lib/websocket.svelte.js";

export const allFeedData = $state<{ current: FeedData }>({
  current: {},
});

export const symbolData = $state<{ [symbol: string]: SymbolData[] | null }>({
  current: null,
});

export const lastRoute = $state<{ current: string }>({ current: "" });
