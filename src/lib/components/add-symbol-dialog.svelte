<script lang="ts">
  import Plus from "lucide-svelte/icons/plus";
  import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
  import { cn } from "$lib/utils.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import Autocomplete from "$lib/components/ui/autocomplete/autocomplete.svelte";
  import {
    useGetSymbols,
    useModifyWatchlistContent,
    type BaseWatchList,
  } from "$lib/queries.js";

  let { watchlist }: { watchlist: BaseWatchList } = $props();
  let searchTerm = $state("");
  let errorSymbol = $state("");

  const modifyWatchlistContent = useModifyWatchlistContent();
  const symbolSearchResults = $derived.by(() => useGetSymbols(searchTerm));

  async function handleNewSymbol({ value }: { label: string; value: string }) {
    const hasSymbol = watchlist["watchlist-entries"]?.some(
      ({ symbol }) => symbol === value,
    );
    if (hasSymbol) {
      errorSymbol = value;
      return;
    }

    await $modifyWatchlistContent.mutateAsync({
      watchlistName: watchlist.name,
      symbolsToAdd: [value],
    });

    (
      document.querySelector("[data-dialog-close]") as HTMLButtonElement
    )?.click();
  }
</script>

<Dialog.Root>
  <Dialog.Trigger
    class={cn(
      buttonVariants({ variant: "outline" }),
      "hover:bg-amber-400 hover:text-white",
    )}
    aria-label="Add Symbol"
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
    <div class="grid grid-cols-4 items-center gap-4">
      {#if errorSymbol && errorSymbol === searchTerm}
        <div></div>
        <div class="col-span-3 text-sm text-red-500">
          {errorSymbol} is already in the watchlist
        </div>
      {/if}
      <label for="name" class="text-right">Name</label>
      <Autocomplete
        name="name"
        placeholder="GOOG"
        class="col-span-3 overflow-visible"
        bind:inputValue={searchTerm}
        options={$symbolSearchResults.data}
        onValueChange={handleNewSymbol}
        maxLength={15}
        disabled={$modifyWatchlistContent.isPending}
      />
    </div>
  </Dialog.Content>
</Dialog.Root>
