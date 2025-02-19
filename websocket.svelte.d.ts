import { type BaseWatchList } from "./queries.js";
export type FeedData = {
    [symbol: string]: {
        name: string;
        bid: number;
        ask: number;
        last: number;
    };
};
export type SymbolData = {
    name: string;
    time: string;
    open: number;
    high: number;
    low: number;
    close: number;
};
export declare function useWebSocket({ watchlist, symbol, }: {
    watchlist?: BaseWatchList;
    symbol?: string;
}): void;
