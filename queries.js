import { createMutation, createQuery, useQueryClient, } from "@tanstack/svelte-query";
const baseUrl = "https://api.cert.tastyworks.com";
function getUserFromSessionStorage() {
    try {
        return JSON.parse(sessionStorage.getItem("user") || "invalid");
    }
    catch {
        return null;
    }
}
export function checkSessionExpiration() {
    if (typeof window === "undefined")
        return null;
    const queryClient = useQueryClient();
    let sessionExpiration = queryClient.getQueryData([
        "session-expiration",
    ]);
    let user;
    if (sessionExpiration && sessionExpiration > new Date())
        return { isSessionExpired: false };
    try {
        user = JSON.parse(sessionStorage.getItem("user") || "invalid");
        sessionExpiration = new Date(user["session-expiration"]);
    }
    catch {
        sessionExpiration = new Date(0);
    }
    if (sessionExpiration > new Date()) {
        return { isSessionExpired: false };
    }
    if (user) {
        return {
            isSessionExpired: true,
            username: user?.user.username,
            rememberToken: user?.["remember-token"],
        };
    }
    // no credentials
    return null;
}
export function useLogin() {
    const queryClient = useQueryClient();
    return createMutation({
        mutationKey: ["user"],
        mutationFn: async (variables) => await fetch(baseUrl + "/sessions", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                login: variables.username,
                password: "password" in variables ? variables.password : undefined,
                "remember-token": "rememberToken" in variables ? variables.rememberToken : undefined,
                "remember-me": true,
            }),
        }).then((r) => r.json()),
        onSuccess: (data, variables) => {
            sessionStorage?.setItem("user", JSON.stringify(data.data));
            queryClient.setQueryData(["session-expiration"], new Date(data.data["session-expiration"]));
            if ("onSuccess" in variables) {
                setTimeout(() => variables.onSuccess(), 0);
            }
        },
    });
}
export function useGetWatchlists() {
    return createQuery({
        queryKey: ["watchlists"],
        queryFn: async () => {
            const user = getUserFromSessionStorage();
            return await fetch(baseUrl + "/watchlists", {
                headers: {
                    "Content-Type": "application/json",
                    "User-Agent": "tastytrade-api-client/1.0",
                    Authorization: user?.["session-token"] || "",
                },
                method: "GET",
            }).then((r) => r.json());
        },
    });
}
export function useMutateWatchlist() {
    const queryClient = useQueryClient();
    return createMutation({
        mutationKey: ["watchlist"],
        mutationFn: async (variables) => {
            const user = getUserFromSessionStorage();
            const watchlists = queryClient.getQueryData(["watchlists"]);
            const watchlist = watchlists?.data.items.find(({ name }) => name === variables.prevName);
            return await fetch(baseUrl +
                "/watchlists" +
                (variables.mode === "add" ? "" : `/${variables.prevName}`), {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: user?.["session-token"] || "",
                },
                method: variables.mode === "add" ? "POST" : "PUT",
                body: JSON.stringify(variables.mode === "add"
                    ? {
                        name: variables.name,
                        "watchlist-entries": [],
                    }
                    : { ...watchlist, name: variables.name }),
            }).then((r) => r.json());
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["watchlists"],
                exact: true,
                refetchType: "active",
            });
        },
    });
}
export function useModifyWatchlist() {
    const queryClient = useQueryClient();
    return createMutation({
        mutationKey: ["watchlist", "symbol"],
        mutationFn: async (variables) => {
            const lists = queryClient.getQueryData(["watchlists"]);
            const list = lists?.data.items.find(({ name }) => name === variables.watchlistName);
            if (list && !list["watchlist-entries"])
                list["watchlist-entries"] = [];
            // TODO actually make this block the request
            let changed = false;
            variables.symbolsToAdd?.forEach((symbol) => {
                const index = list?.["watchlist-entries"].findIndex(({ symbol: s }) => s === symbol);
                if (!index || index < 0) {
                    list?.["watchlist-entries"].push({ symbol });
                    changed = true;
                }
            });
            variables.symbolsToRemove?.forEach((symbol) => {
                const index = list?.["watchlist-entries"].findIndex(({ symbol: s }) => s === symbol);
                if (index !== undefined && index >= 0) {
                    list?.["watchlist-entries"].splice(index, 1);
                    changed = true;
                }
            });
            const user = getUserFromSessionStorage();
            return await fetch(baseUrl + "/watchlists/" + variables.watchlistName, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: user?.["session-token"] || "",
                },
                method: "PUT",
                body: JSON.stringify(list),
            }).then((r) => r.json());
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["watchlists"],
                exact: true,
                refetchType: "active",
            });
        },
    });
}
export function useGetApiQuoteToken() {
    return createQuery({
        queryKey: ["api-quote-token"],
        queryFn: async () => {
            const user = getUserFromSessionStorage();
            return await fetch(baseUrl + "/api-quote-tokens", {
                headers: {
                    "Content-Type": "application/json",
                    "User-Agent": "tastytrade-api-client/1.0",
                    Authorization: user?.["session-token"] || "",
                },
                method: "GET",
            }).then((r) => r.json());
        },
    });
}
