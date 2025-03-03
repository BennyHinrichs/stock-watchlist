import type { FeedData, SymbolData } from "$lib/websocket.svelte.js";
export declare const allFeedData: {
    current: FeedData;
};
export declare const symbolData: {
    [symbol: string]: SymbolData[] | null;
};
export declare const lastRoute: {
    current: string;
};
