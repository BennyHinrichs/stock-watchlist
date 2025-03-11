import { useQueryClient } from "@tanstack/svelte-query";
import { useLogin, type UserResponse } from "./queries.js";
import { browser } from "$app/environment";
import { goto } from "$app/navigation";
import { base } from "$app/paths";
import { lastRoute } from "../routes/state.svelte.js";
import { get } from "svelte/store";

function checkSessionExpiration() {
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

export function checkUserCredentials(url: URL) {
  const login = useLogin();
  const sessionExpiration = checkSessionExpiration();
  const pathname = url.pathname.slice(base.length);

  if (sessionExpiration?.isSessionExpired) {
    get(login).mutate({
      username: sessionExpiration.username,
      rememberToken: sessionExpiration.rememberToken,
    });
  }

  switch (pathname) {
    case "/login": {
      if (browser && sessionExpiration?.isSessionExpired === false) {
        goto(`${lastRoute.current}`);
        lastRoute.current = "/login";
      }
      break;
    }

    default: {
      if (
        (browser && !sessionExpiration) ||
        sessionExpiration?.isSessionExpired
      ) {
        lastRoute.current = `${url.pathname}${url.search}`;
        goto(`${base}/login`);
      }
      break;
    }
  }
}
