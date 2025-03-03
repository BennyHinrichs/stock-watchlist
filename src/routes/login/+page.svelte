<script lang="ts">
  import { goto } from "$app/navigation";
  import { base } from "$app/paths";
  import { page } from "$app/state";
  import Button from "$lib/components/ui/button/button.svelte";
  import * as Card from "$lib/components/ui/card/index.js";
  import Input from "$lib/components/ui/input/input.svelte";
  import { useLogin } from "$lib/queries.js";
  import { checkUserCredentials } from "$lib/credentials.svelte";
  import { lastRoute } from "../state.svelte.js";

  checkUserCredentials(page.url);

  const login = useLogin();

  async function handleSubmit(event: Event) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const body = new FormData(form);

    await $login.mutateAsync({
      username: body.get("username") as string,
      password: body.get("password") as string,
      onSuccess: () => {
        goto(`${base}${lastRoute.current || "/"}`);
        lastRoute.current = "/login";
      },
    });
  }
</script>

<svelte:head>
  <title>Watchlists - Login</title>
</svelte:head>

<div class="flex h-full items-center justify-center pt-10">
  <Card.Root class="w-90">
    <Card.Header>
      <Card.Title>Log In</Card.Title>
      <Card.Description>Your watchlists are a click away</Card.Description>
    </Card.Header>
    <Card.Content>
      <form on:submit|preventDefault={handleSubmit} class="flex flex-col gap-4">
        <Input
          type="username"
          name="username"
          placeholder="Username"
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <Button type="submit" disabled={$login.isPending}>Login</Button>
      </form>
    </Card.Content>
  </Card.Root>
</div>
