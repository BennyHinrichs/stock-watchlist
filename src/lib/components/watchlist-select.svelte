<script lang="ts">
  import { goto } from "$app/navigation";
  import { base } from "$app/paths";
  import Check from "lucide-svelte/icons/check";
  import ChevronsUpDown from "lucide-svelte/icons/chevrons-up-down";
  import { buttonVariants } from "$lib/components/ui/button/index.js";
  import * as Command from "$lib/components/ui/command/index.js";
  import * as Popover from "$lib/components/ui/popover/index.js";
  import { cn } from "$lib/utils.js";
  import { useGetWatchlists } from "$lib/queries.js";
  import { page } from "$app/state";

  let { selectedWatchlistName }: { selectedWatchlistName: string } = $props();
  let open = $state(false);
  const watchlists = useGetWatchlists();
</script>

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
    aria-label="Select a watchlist"
  >
    <span class="max-w-[calc(85%)] overflow-hidden overflow-ellipsis"
      >{selectedWatchlistName || "Select a watchlist..."}</span
    >
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
                  goto(
                    `${base}?watchlist=${encodeURIComponent(watchlist.name)}`,
                  );
                  open = false;
                }}
              >
                <Check
                  class={cn(
                    selectedWatchlistName !== watchlist.name &&
                      "text-transparent",
                  )}
                />
                <span
                  class="max-w-[calc(85%)] overflow-hidden overflow-ellipsis"
                  >{watchlist.name}</span
                >
              </Command.Item>
            {/each}
          {/if}
        </Command.Group>
      </Command.List>
    </Command.Root>
  </Popover.Content>
</Popover.Root>
