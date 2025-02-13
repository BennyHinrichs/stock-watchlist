<script lang="ts">
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import { getUser, useLogin } from "$lib/queries.js";

  if (browser && getUser()) {
    goto("/");
  }

  const login = useLogin();

  async function handleSubmit(event: Event) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const body = new FormData(form);

    $login.mutate({
      username: body.get("username") as string,
      password: body.get("password") as string,
    });
  }
</script>

<div>
  <h1>Login</h1>
  <form on:submit|preventDefault={handleSubmit}>
    <input type="username" name="username" placeholder="Username" required />
    <input type="password" name="password" placeholder="Password" required />
    <button type="submit">Login</button>
  </form>
</div>
