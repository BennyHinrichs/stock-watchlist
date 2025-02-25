<script lang="ts">
  import EditPencil from "lucide-svelte/icons/pencil";
  import Plus from "lucide-svelte/icons/plus";
  import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
  import { cn } from "$lib/utils.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { base } from "$app/paths";
  import { goto } from "$app/navigation";
  import { useGetWatchlists, useMutateWatchlist } from "$lib/queries.js";

  let {
    mode,
    watchlistName = "",
    submitPending = false,
  }: {
    mode: "add" | "edit";
    watchlistName?: string;
    submitPending?: boolean;
  } = $props();
  let open = $state(false);
  let inputValue = $state(mode === "add" ? "" : watchlistName);
  let errorName = $state("");

  // reset on close
  $effect(() => {
    if (open === false) {
      inputValue = mode === "add" ? "" : watchlistName;
      errorName = "";
    }
  });

  const watchlists = useGetWatchlists();
  const mutateWatchlist = useMutateWatchlist();

  const handleMutateWatchlist = async function (event: SubmitEvent) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const body = new FormData(form);
    const name = body?.get("name") as string;

    if (!name) {
      return;
    }

    const nameExists = $watchlists.data?.data.items.some((wl) => {
      if (wl.name === name) {
        return true;
      }
    });

    if (nameExists) {
      errorName = name;
      return;
    }

    await $mutateWatchlist.mutateAsync({
      name,
      prevName: watchlistName,
      mode,
    });

    (
      document.querySelector("[data-dialog-close]") as HTMLButtonElement
    )?.click();

    goto(`${base}?watchlist=${encodeURIComponent(name)}`);
  };
</script>

<Dialog.Root bind:open>
  {#if mode === "add"}
    <Dialog.Trigger
      class={cn(
        buttonVariants({ variant: "default" }),
        "bg-amber-400 hover:bg-amber-500",
      )}
      aria-label="Add Watchlist"><Plus /> Add</Dialog.Trigger
    >
  {:else}
    <Dialog.Trigger
      class={cn(buttonVariants({ variant: "ghost" }), "hover:text-amber-500")}
      aria-label="Edit Watchlist"><EditPencil /></Dialog.Trigger
    >
  {/if}
  <Dialog.Content class="sm:max-w-[425px]">
    <Dialog.Header>
      <h2 class="text-lg leading-none font-semibold tracking-tight">
        {#if mode === "add"}
          Add Watchlist
        {:else}
          Edit Watchlist: {watchlistName}
        {/if}
      </h2>
      {#if mode === "add"}
        <p class="text-muted-foreground text-sm">
          Get started with a new watchlist
        </p>
      {/if}
    </Dialog.Header>
    <form
      id="add-watchlist-form"
      class="grid gap-4 py-4"
      onsubmit={handleMutateWatchlist}
    >
      <div class="grid grid-cols-4 items-center gap-4">
        {#if errorName && errorName === inputValue}
          <div></div>
          <div class="col-span-3 text-sm text-red-500">
            Watchlist called {errorName} already exists
          </div>
        {/if}
        <label for="name" class="text-right">Name</label>
        <Input
          name="name"
          placeholder="To the Moon #19"
          class="col-span-3"
          bind:value={inputValue}
          maxlength={100}
        />
      </div>
    </form>
    <Dialog.Footer>
      <Button type="submit" form="add-watchlist-form" disabled={submitPending}
        >Save changes</Button
      >
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
