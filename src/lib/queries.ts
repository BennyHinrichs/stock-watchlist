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
    onSuccess: (data: UserResponse) => {
      sessionStorage?.setItem("user", JSON.stringify(data.data));
      queryClient.setQueryData(
        ["session-expiration"],
        new Date(data.data["session-expiration"]),
      );
    },
  });
}

export type BaseWatchList = {
  name: string;
  "watchlist-entries": {};
  "cms-id": string;
  "group-name": string;
  "order-index": number;
};

export function useGetWatchlists() {
  return createQuery({
    queryKey: ["watchlists"],
    queryFn: async (): Promise<{ data: { items: BaseWatchList[] } }> => {
      let user;
      try {
        user = JSON.parse(
          sessionStorage.getItem("user") || "invalid",
        ) as UserResponse["data"];
      } catch {}

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

export function useAddWatchlist() {
  const queryClient = useQueryClient();

  return createMutation({
    mutationKey: ["watchlist"],
    mutationFn: async (variables: { name: string }) => {
      let user;
      try {
        user = JSON.parse(
          sessionStorage.getItem("user") || "invalid",
        ) as UserResponse["data"];
      } catch {}

      return await fetch(baseUrl + "/watchlists", {
        headers: {
          "Content-Type": "application/json",
          Authorization: user?.["session-token"] || "",
        },
        method: "POST",
        body: JSON.stringify({
          name: variables.name,
          "watchlist-entries": [],
        }),
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
