<script lang="ts">
  import WatchlistSelect from "$lib/components/watchlist-select.svelte";
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import { base } from "$app/paths";
  import * as Table from "$lib/components/ui/table/index.js";
  import AddSymbolDialog from "$lib/components/add-symbol-dialog.svelte";
  import DeleteDialog from "$lib/components/delete-dialog.svelte";
  import ManageWatchlistDialog from "$lib/components/manage-watchlist-dialog.svelte";
  import { cn } from "$lib/utils.js";
  import {
    checkSessionExpiration,
    useMutateWatchlist,
    useGetWatchlists,
    useLogin,
    useModifyWatchlistContent,
  } from "$lib/queries.js";
  import { page } from "$app/state";
  import { useWebSocket } from "$lib/websocket.svelte.js";
  import { allFeedData } from "./state.svelte.js";

  const login = useLogin();
  const sessionExpiration = checkSessionExpiration();

  if (sessionExpiration?.isSessionExpired) {
    $login.mutate({
      username: sessionExpiration.username,
      rememberToken: sessionExpiration.rememberToken,
    });
  }

  if ((browser && !sessionExpiration) || sessionExpiration?.isSessionExpired) {
    goto(`${base}/login`);
  }

  const watchlists = useGetWatchlists();
  const mutateWatchlist = useMutateWatchlist();
  const modifyWatchlistContent = useModifyWatchlistContent();

  let selectedWatchlistName = $derived.by<string>(() => {
    const searchWatchlist = page.url.searchParams.get("watchlist");

    if (searchWatchlist) {
      return searchWatchlist;
    }

    if ($watchlists.isSuccess && $watchlists.data.data?.items.length) {
      return $watchlists.data.data.items[0].name;
    }

    return "";
  });

  let watchlist = $derived.by(() => {
    if ($watchlists.isSuccess && selectedWatchlistName) {
      return $watchlists.data.data.items.find(
        (wl) => wl.name === selectedWatchlistName,
      );
    }
  });

  $effect(() => useWebSocket({ watchlist }));
</script>

<div class="flex justify-between gap-4 py-6 max-sm:flex-col">
  <div>
    <h1 class="text-4xl text-amber-400 uppercase">👁️ Watchlists 📈</h1>
  </div>

  <div class="flex gap-2">
    <WatchlistSelect {selectedWatchlistName}></WatchlistSelect>
    <ManageWatchlistDialog
      mode="add"
      submitPending={$mutateWatchlist.isPending}
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
            <AddSymbolDialog {watchlist}></AddSymbolDialog>
          </Table.Head>
          <Table.Head class="text-right">Bid Price</Table.Head>
          <Table.Head class="text-right">Ask Price</Table.Head>
          <Table.Head class="text-right">Last Price</Table.Head>
          <Table.Head class=""
            ><div class="flex items-center justify-end gap-2">
              <ManageWatchlistDialog
                mode="edit"
                submitPending={false}
                watchlistName={watchlist?.name}
              ></ManageWatchlistDialog>
              <DeleteDialog
                handleConfirm={async () => {
                  await $mutateWatchlist.mutateAsync({
                    name: watchlist?.name,
                    mode: "delete",
                  });

                  (
                    document.querySelector(
                      "[data-dialog-close]",
                    ) as HTMLButtonElement
                  )?.click();

                  goto(`${base}?watchlist=`);
                }}
                message="Are you sure you want to remove this watchlist?"
                confirmPending={false}
              ></DeleteDialog>
            </div>
          </Table.Head>
        </Table.Row>
      </Table.Header>
      <svelte:boundary onerror={(error) => console.error(error)}>
        <Table.Body>
          {#each watchlist?.["watchlist-entries"] as we, i (i)}
            {@const fd = allFeedData.current[we.symbol] || { name: we.symbol }}
            <Table.Row>
              <Table.Cell class="font-medium"
                ><a
                  href={`${base}/symbol/${fd.name}`}
                  class="hover:text-amber-400">{fd.name}</a
                ></Table.Cell
              >
              <Table.Cell class="text-right"
                >{"ask" in fd ? `$${fd.ask.toFixed(2)}` : "?"}</Table.Cell
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
                    await $modifyWatchlistContent.mutateAsync({
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
                  confirmPending={$modifyWatchlistContent.isPending}
                ></DeleteDialog></Table.Cell
              >
            </Table.Row>
          {/each}
        </Table.Body>
      </svelte:boundary>
    </Table.Root>
  {/if}
{:else}
  <h3>No List Selected</h3>
{/if}
