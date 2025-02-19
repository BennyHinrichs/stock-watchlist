<script lang="ts">
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import Check from "lucide-svelte/icons/check";
  import ChevronsUpDown from "lucide-svelte/icons/chevrons-up-down";
  import { buttonVariants } from "$lib/components/ui/button/index.js";
  import * as Command from "$lib/components/ui/command/index.js";
  import * as Popover from "$lib/components/ui/popover/index.js";
  import * as Table from "$lib/components/ui/table/index.js";
  import AddSymbolDialog from "$lib/components/add-symbol-dialog.svelte";
  import DeleteDialog from "$lib/components/delete-dialog.svelte";
  import ManageWatchlistDialog from "$lib/components/manage-watchlist-dialog.svelte";
  import { cn, splitArrayAtDelimiters } from "$lib/utils.js";
  import {
    checkSessionExpiration,
    useAddWatchlist,
    useGetApiQuoteToken,
    useGetWatchlists,
    useLogin,
    useModifyWatchlist,
  } from "$lib/queries.js";
  import { page } from "$app/state";
  import { useWebSocket, type FeedData } from "$lib/websocket.svelte.js";

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

  let allFeedData: FeedData = $state({});
  let open = $state(false);

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

  let currentFeedData = $derived.by(() => {
    return (
      watchlist?.["watchlist-entries"]?.map(({ symbol }) => {
        return allFeedData?.[symbol] || [];
      }) || []
    );
  });

  $effect(() => useWebSocket({ watchlist, allFeedData }));

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

<div class="flex justify-between gap-4 py-6 max-sm:flex-col">
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

    <ManageWatchlistDialog
      handleSubmit={handleNewWatchlist}
      mode="add"
      submitPending={$addWatchlist.isPending}
      watchlistName={watchlist?.name}
    ></ManageWatchlistDialog>
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
            <AddSymbolDialog watchlistName={watchlist?.name}></AddSymbolDialog>
          </Table.Head>
          <Table.Head class="text-right">Bid Price</Table.Head>
          <Table.Head class="text-right">Ask Price</Table.Head>
          <Table.Head class="text-right">Last Price</Table.Head>
          <Table.Head class=""
            ><div class="flex items-center justify-end gap-2">
              <ManageWatchlistDialog
                handleSubmit={() => void "TODO"}
                mode="edit"
                submitPending={false}
                watchlistName={watchlist?.name}
              ></ManageWatchlistDialog>
              <DeleteDialog
                handleConfirm={() => void "TODO"}
                message="Are you sure you want to remove this watchlist?"
                confirmPending={false}
              ></DeleteDialog>
            </div>
          </Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {#each currentFeedData as fd, i (i)}
          <Table.Row>
            <Table.Cell class="font-medium">{fd.name}</Table.Cell>
            <Table.Cell class="text-right"
              >{typeof fd.ask === "number"
                ? `$${fd.ask.toFixed(2)}`
                : "?"}</Table.Cell
            >
            <Table.Cell class="text-right"
              >{typeof fd.bid === "number"
                ? `$${fd.bid.toFixed(2)}`
                : "?"}</Table.Cell
            >
            <Table.Cell class="text-right"
              >{typeof fd.last === "number"
                ? `$${fd.last.toFixed(2)}`
                : "?"}</Table.Cell
            >
            <Table.Cell class="flex items-center justify-end gap-2">
              <DeleteDialog
                handleConfirm={async () => {
                  await $modifyWatchlist.mutateAsync({
                    watchlistName: watchlist?.name,
                    symbolsToRemove: [fd.name],
                  });

                  (
                    document.querySelector(
                      "[data-dialog-close]",
                    ) as HTMLButtonElement
                  )?.click();
                }}
                message="Are you sure you want to remove this symbol?"
                confirmPending={$modifyWatchlist.isPending}
              ></DeleteDialog></Table.Cell
            >
          </Table.Row>
        {/each}
      </Table.Body>
    </Table.Root>
  {/if}
{:else}
  <h3>No List Selected</h3>
{/if}
