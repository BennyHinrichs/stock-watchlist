import type { FeedData } from "$lib/websocket.svelte.js";

export const allFeedData = $state<{ current: FeedData }>({
  current: {},
});
