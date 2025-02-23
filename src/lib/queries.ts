import { url } from "@layerstack/utils/routing";
import {
  createMutation,
  createQuery,
  useQueryClient,
} from "@tanstack/svelte-query";

const baseUrl = "https://api.cert.tastyworks.com";

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

function getUserFromSessionStorage() {
  try {
    return JSON.parse(
      sessionStorage.getItem("user") || "invalid",
    ) as UserResponse["data"];
  } catch {
    return null;
  }
}

export function checkSessionExpiration() {
  if (typeof window === "undefined") return null;

  const queryClient = useQueryClient();
  let sessionExpiration = queryClient.getQueryData<Date>([
    "session-expiration",
  ]);
  let user;

  if (sessionExpiration && sessionExpiration > new Date())
    return { isSessionExpired: false as const };

  try {
    user = JSON.parse(
      sessionStorage.getItem("user") || "invalid",
    ) as UserResponse["data"];
    sessionExpiration = new Date(user["session-expiration"]);
  } catch {
    sessionExpiration = new Date(0);
  }

  if (sessionExpiration > new Date()) {
    return { isSessionExpired: false as const };
  }

  if (user) {
    return {
      isSessionExpired: true as const,
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
    mutationFn: async (
      variables:
        | {
            username: string;
            password: string;
            onSuccess: () => void;
          }
        | {
            username: string;
            rememberToken: string;
          },
    ) =>
      await fetch(baseUrl + "/sessions", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          login: variables.username,
          password: "password" in variables ? variables.password : undefined,
          "remember-token":
            "rememberToken" in variables ? variables.rememberToken : undefined,
          "remember-me": true,
        }),
      }).then((r) => r.json()),
    onSuccess: (data: UserResponse, variables) => {
      sessionStorage?.setItem("user", JSON.stringify(data.data));
      queryClient.setQueryData(
        ["session-expiration"],
        new Date(data.data["session-expiration"]),
      );
      if ("onSuccess" in variables) {
        setTimeout(() => variables.onSuccess(), 0);
      }
    },
  });
}

export type BaseWatchList = {
  name: string;
  "watchlist-entries": { symbol: string }[];
  "cms-id": string;
  "group-name": string;
  "order-index": number;
};

export function useGetWatchlists() {
  return createQuery({
    queryKey: ["watchlists"],
    queryFn: async (): Promise<{ data: { items: BaseWatchList[] } }> => {
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

export type WatchlistMutateModes = "add" | "edit" | "delete";

export function useMutateWatchlist() {
  const queryClient = useQueryClient();

  return createMutation({
    mutationKey: ["watchlist"],
    mutationFn: async (variables: {
      name: string;
      prevName?: string;
      mode: WatchlistMutateModes;
    }) => {
      const watchlistBaseUrl = baseUrl + `/watchlists`;
      const user = getUserFromSessionStorage();
      const watchlists = queryClient.getQueryData<{
        data: { items: BaseWatchList[] };
      }>(["watchlists"]);
      const prevWatchlist = watchlists?.data.items.find(
        ({ name }) => name === variables.prevName,
      );

      const modeMapping: Record<
        WatchlistMutateModes,
        {
          url: string;
          method: "POST" | "PUT" | "DELETE";
          body?: Record<string, any>;
        }
      > = {
        add: {
          url: watchlistBaseUrl,
          method: "POST",
          body: {
            name: variables.name,
            "watchlist-entries": [],
          },
        },
        edit: {
          url: `${watchlistBaseUrl}/${variables.prevName}`,
          method: "PUT",
          body: {
            "watchlist-entries": [],
            ...prevWatchlist,
            name: variables.name,
          },
        },
        delete: {
          url: `${watchlistBaseUrl}/${variables.name}`,
          method: "DELETE",
        },
      };

      const modeValues = modeMapping[variables.mode];

      return await fetch(modeValues.url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: user?.["session-token"] || "",
        },
        method: modeValues.method,
        body: JSON.stringify(modeValues.body),
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

export function useModifyWatchlistContent() {
  const queryClient = useQueryClient();

  return createMutation({
    mutationKey: ["watchlist", "symbol"],
    mutationFn: async (variables: {
      watchlistName: string;
      symbolsToAdd?: string[];
      symbolsToRemove?: string[];
    }) => {
      const lists = queryClient.getQueryData<{
        data: { items: BaseWatchList[] };
      }>(["watchlists"]);
      const list = lists?.data.items.find(
        ({ name }) => name === variables.watchlistName,
      );
      if (list && !list["watchlist-entries"]) list["watchlist-entries"] = [];
      // TODO actually make this block the request
      let changed = false;

      variables.symbolsToAdd?.forEach((symbol) => {
        const index = list?.["watchlist-entries"].findIndex(
          ({ symbol: s }) => s === symbol,
        );
        if (!index || index < 0) {
          list?.["watchlist-entries"].push({ symbol });
          changed = true;
        }
      });
      variables.symbolsToRemove?.forEach((symbol) => {
        const index = list?.["watchlist-entries"].findIndex(
          ({ symbol: s }) => s === symbol,
        );
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

export type QuoteTokenResponse = {
  data: {
    token: string;
    "dxlink-url": string;
    level: "api";
  };
  context: string;
};
export function useGetApiQuoteToken() {
  return createQuery({
    queryKey: ["api-quote-token"],
    queryFn: async (): Promise<QuoteTokenResponse> => {
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
    staleTime: 1000 * 60 * 60 * 23,
  });
}
