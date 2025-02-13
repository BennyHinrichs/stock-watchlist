import { createMutation } from "@tanstack/svelte-query";

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

export const getUser = () => {
  if (typeof window === "undefined") return null;

  try {
    return JSON.parse(
      sessionStorage.getItem("user") || "invalid",
    ) as UserResponse["data"];
  } catch {
    return null;
  }
};

export const useLogin = () => {
  return createMutation({
    mutationKey: ["user"],
    mutationFn: async ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) =>
      await fetch(baseUrl + "/sessions", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          login: username,
          password,
          "remember-me": true,
        }),
      }).then((r) => r.json()),
    onSuccess: (data: UserResponse) => {
      sessionStorage?.setItem("user", JSON.stringify(data.data));
    },
  });
};
