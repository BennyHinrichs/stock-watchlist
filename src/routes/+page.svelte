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
  import * as Table from "$lib/components/ui/table/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { cn, splitArrayAtDelimiters } from "$lib/utils.js";
  import {
    checkSessionExpiration,
    useModifyWatchlist,
    useAddWatchlist,
    useGetApiQuoteToken,
    useGetWatchlist,
    useGetWatchlists,
    useLogin,
  } from "$lib/queries.js";
  import { page } from "$app/state";
  import Autocomplete from "$lib/components/ui/autocomplete/autocomplete.svelte";

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
  const modifyWatchlist = useModifyWatchlist();
  const apiQuoteToken = useGetApiQuoteToken();

  let feedData: (string | number)[][] = $state([]);
  let open = $state(false);
  let ws: WebSocket | null = $state(null);

  let selectedWatchlistName = $derived.by<string>(() => {
    const searchWatchlist = page.url.searchParams.get("watchlist");

    if (searchWatchlist) {
      return searchWatchlist;
    }

    if ($watchlists.isSuccess && $watchlists.data.data.items.length) {
      return $watchlists.data.data.items[0].name;
    }

    return "";
  });

  let watchlist = $derived.by(() => {
    if ($watchlists.isSuccess && selectedWatchlistName) {
      const list = $watchlists.data.data.items.find(
        (watchlist) => watchlist.name === selectedWatchlistName,
      );

      return list;
    }
  });

  $effect(() => {
    if ($apiQuoteToken.isSuccess) {
      if (!ws) {
        ws = new WebSocket($apiQuoteToken.data.data["dxlink-url"]);
      }

      const feedSubscriptionMessage = () => {
        console.log(watchlist);
        const newFeedData =
          watchlist?.["watchlist-entries"]?.map(({ symbol }) => ({
            symbol,
            type: "Quote",
          })) || [];
        console.log(newFeedData);

        if (!newFeedData.length) {
          feedData = [];
        }

        ws!.send(
          JSON.stringify({
            type: "FEED_SUBSCRIPTION",
            channel: 1,
            add: newFeedData,
          }),
        );
      };

      if (watchlist && WebSocket.OPEN === ws.readyState) {
        feedSubscriptionMessage();
      }

      ws.onopen = () => {
        ws!.send(
          JSON.stringify({
            type: "SETUP",
            channel: 0,
            keepaliveTimeout: 60,
            acceptKeepaliveTimeout: 60,
            version: "1.0.0",
          }),
        );
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log(data);

        switch (data.type) {
          case "SETUP":
            ws!.send(
              JSON.stringify({
                type: "AUTH",
                channel: 0,
                token: $apiQuoteToken.data.data.token,
              }),
            );
            break;

          case "AUTH_STATE":
            if (data.state === "AUTHORIZED") {
              ws!.send(
                JSON.stringify({
                  type: "CHANNEL_REQUEST",
                  channel: 1,
                  service: "FEED",
                  parameters: { contract: "AUTO" },
                }),
              );
            }
            break;

          case "CHANNEL_OPENED":
            feedSubscriptionMessage();
            break;

          case "FEED_DATA":
            feedData = splitArrayAtDelimiters(data.data[1], "Quote").filter(
              Array.isArray,
            );
            break;
        }
      };
    }
  });

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

  async function handleNewSymbol(event: SubmitEvent) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const body = new FormData(form);

    await $modifyWatchlist.mutateAsync({
      watchlistName: selectedWatchlistName!,
      symbolsToAdd: [body.get("name") as string],
    });

    (
      document.querySelector("[data-dialog-close]") as HTMLButtonElement
    )?.click();
  }
</script>

<div class="flex justify-between gap-4 py-4 max-sm:flex-col">
  <div>
    <h1 class="text-4xl text-amber-400 uppercase">👁️ Watchlists 📈</h1>
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
        {selectedWatchlistName || "Select a watchlist..."}
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
                        selectedWatchlistName !== watchlist.name &&
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

{#if selectedWatchlistName}
  {#if watchlist}
    <Table.Root>
      <Table.Caption>{selectedWatchlistName}</Table.Caption>
      <Table.Header>
        <Table.Row>
          <Table.Head class="flex items-center justify-between gap-2"
            >Symbol
            <Dialog.Root>
              <Dialog.Trigger
                class={cn(
                  buttonVariants({ variant: "default" }),
                  " bg-amber-400 hover:bg-amber-500",
                )}
                ><Plus /> <span class="max-sm:hidden">Add</span></Dialog.Trigger
              >
              <Dialog.Content class="sm:max-w-[425px]">
                <Dialog.Header>
                  <h2 class="text-lg leading-none font-semibold tracking-tight">
                    Add Symbol
                  </h2>
                  <p class="text-muted-foreground text-sm">
                    Chuck another symbol onto the pile
                  </p>
                </Dialog.Header>
                <form
                  id="add-watchlist-form"
                  class="grid gap-4 py-4"
                  onsubmit={handleNewSymbol}
                >
                  <div class="grid grid-cols-4 items-center gap-4">
                    <label for="name" class="text-right">Name</label>
                    <Autocomplete
                      name="name"
                      placeholder="GOOG"
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
          </Table.Head>
          <Table.Head class="text-right">Bid Price</Table.Head>
          <Table.Head class="text-right">Ask Price</Table.Head>
          <Table.Head class="text-right">Last Price</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {#each feedData as fd, i (i)}
          <Table.Row>
            <Table.Cell class="font-medium">{fd[0]}</Table.Cell>
            <Table.Cell class="text-right"
              >${(fd[6] as number).toFixed(2)}</Table.Cell
            >
            <Table.Cell class="text-right"
              >${(fd[10] as number).toFixed(2)}</Table.Cell
            >
            <Table.Cell class="text-right"
              >${(fd[4] as number).toFixed(2)}</Table.Cell
            >
          </Table.Row>
        {/each}
      </Table.Body>
    </Table.Root>
  {/if}
{:else}
  <h3>No List Selected</h3>
{/if}
