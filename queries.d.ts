type UserResponse = {
    data: {
        user: {
            email: string;
            username: string;
            "external-id": string;
        };
        "session-token": string;
        "remember-token": string;
        "session-expiration": string;
    };
    context: string;
};
export declare function checkSessionExpiration(): {
    isSessionExpired: false;
    username?: undefined;
    rememberToken?: undefined;
} | {
    isSessionExpired: true;
    username: string;
    rememberToken: string;
} | null;
export declare function useLogin(): import("@tanstack/svelte-query").CreateMutationResult<UserResponse, Error, {
    username: string;
    password: string;
    onSuccess: () => void;
} | {
    username: string;
    rememberToken: string;
}, unknown>;
export type BaseWatchList = {
    name: string;
    "watchlist-entries": {
        symbol: string;
    }[];
    "cms-id": string;
    "group-name": string;
    "order-index": number;
};
export declare function useGetWatchlists(): import("@tanstack/svelte-query").CreateQueryResult<{
    data: {
        items: BaseWatchList[];
    };
}, Error>;
export declare function useMutateWatchlist(): import("@tanstack/svelte-query").CreateMutationResult<any, Error, {
    name: string;
    prevName?: string;
    mode: "add" | "edit";
}, unknown>;
export declare function useModifyWatchlist(): import("@tanstack/svelte-query").CreateMutationResult<any, Error, {
    watchlistName: string;
    symbolsToAdd?: string[];
    symbolsToRemove?: string[];
}, unknown>;
export type QuoteTokenResponse = {
    data: {
        token: string;
        "dxlink-url": string;
        level: "api";
    };
    context: string;
};
export declare function useGetApiQuoteToken(): import("@tanstack/svelte-query").CreateQueryResult<QuoteTokenResponse, Error>;
export {};
