<script lang="ts">
  import { tick } from "svelte";
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import Check from "lucide-svelte/icons/check";
  import ChevronsUpDown from "lucide-svelte/icons/chevrons-up-down";
  import Plus from "lucide-svelte/icons/plus";
  import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
  import * as Command from "$lib/components/ui/command/index.js";
  import * as Popover from "$lib/components/ui/popover/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { cn } from "$lib/utils.js";
  import {
    type BaseWatchList,
    checkSessionExpiration,
    useAddWatchlist,
    useGetWatchlists,
    useLogin,
  } from "$lib/queries.js";
  import { page } from "$app/state";

  const login = useLogin();
  const sessionExpiration = checkSessionExpiration();

  if (sessionExpiration?.isSessionExpired) {
    $login.mutate({
      username: sessionExpiration.username,
      rememberToken: sessionExpiration.rememberToken,
    });
  }

  if ((browser && !sessionExpiration) || sessionExpiration?.isSessionExpired) {
    goto("/login");
  }

  const watchlists = useGetWatchlists();
  const addWatchlist = useAddWatchlist();

  let open = $state(false);
  let selectedWatchlist = $derived.by<string>(() => {
    const searchWatchlist = page.url.searchParams.get("watchlist");

    if (searchWatchlist) {
      return searchWatchlist;
    }

    if ($watchlists.isSuccess && $watchlists.data.data.items.length) {
      return $watchlists.data.data.items[0].name;
    }

    return "";
  });

  // if ($watchlists.isSuccess && $watchlists.data.data.items.length) {
  //   const searchWatchlist = page.url.searchParams.get("watchlist");
  //   selectedWatchlist = searchWatchlist
  //     ? $watchlists.data.data.items.find(({ name }) => name === searchWatchlist)
  //     : $watchlists.data.data.items[0];
  // }

  async function handleNewWatchlist(event: SubmitEvent) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const body = new FormData(form);

    await $addWatchlist.mutateAsync({
      name: body.get("name") as string,
    });

    (
      document.querySelector("[data-dialog-close]") as HTMLButtonElement
    )?.click();
  }
</script>

<div class="flex justify-between py-4 max-sm:flex-col">
  <div>
    <h1 class="text-4xl text-amber-400">Watchlists 👁️📈</h1>
  </div>

  <div class="flex gap-2">
    <Popover.Root bind:open>
      <Popover.Trigger
        class={cn(
          buttonVariants({
            variant: "outline",
            className: "w-[200px] justify-between",
          }),
        )}
        role="combobox"
        aria-expanded={open}
      >
        {selectedWatchlist || "Select a watchlist..."}
        <ChevronsUpDown class="opacity-50" />
      </Popover.Trigger>
      <Popover.Content class="w-[200px] p-0">
        <Command.Root>
          <Command.Input placeholder="Search..." />
          <Command.List>
            <Command.Empty>No watchlists found.</Command.Empty>
            <Command.Group>
              {#if $watchlists.isLoading}
                <Command.Loading />
              {/if}
              {#if $watchlists.error}
                An error has occurred:
                {$watchlists.error.message}
              {/if}
              {#if $watchlists.isSuccess}
                {#each $watchlists.data.data.items as watchlist}
                  <Command.Item
                    value={watchlist.name}
                    onSelect={() => {
                      goto(`?watchlist=${watchlist.name}`);
                      open = false;
                    }}
                  >
                    <Check
                      class={cn(
                        selectedWatchlist !== watchlist.name &&
                          "text-transparent",
                      )}
                    />
                    {watchlist.name}
                  </Command.Item>
                {/each}
              {/if}
            </Command.Group>
          </Command.List>
        </Command.Root>
      </Popover.Content>
    </Popover.Root>

    <Dialog.Root>
      <Dialog.Trigger
        class={cn(
          buttonVariants({ variant: "default" }),
          "bg-amber-400 hover:bg-amber-500",
        )}><Plus /> Add</Dialog.Trigger
      >
      <Dialog.Content class="sm:max-w-[425px]">
        <Dialog.Header>
          <h2 class="text-lg leading-none font-semibold tracking-tight">
            Add Watchlist
          </h2>
          <p class="text-muted-foreground text-sm">
            Get started with a new watchlist
          </p>
        </Dialog.Header>
        <form
          id="add-watchlist-form"
          class="grid gap-4 py-4"
          onsubmit={handleNewWatchlist}
        >
          <div class="grid grid-cols-4 items-center gap-4">
            <label for="name" class="text-right">Name</label>
            <Input
              name="name"
              placeholder="To the Moon #19"
              class="col-span-3"
            />
          </div>
        </form>
        <Dialog.Footer>
          <Button
            type="submit"
            form="add-watchlist-form"
            disabled={$addWatchlist.isPending}>Save changes</Button
          >
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  </div>
</div>

{#if selectedWatchlist}
  {selectedWatchlist}
{:else}
  <h3>No List Selected</h3>
{/if}
