<script lang="ts">
  import Plus from "lucide-svelte/icons/plus";
  import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
  import { cn } from "$lib/utils.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import Autocomplete from "$lib/components/ui/autocomplete/autocomplete.svelte";
  import { useModifyWatchlistContent } from "$lib/queries.js";

  let { watchlistName = "" } = $props();

  const modifyWatchlistContent = useModifyWatchlistContent();

  async function handleNewSymbol(event: SubmitEvent) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const body = new FormData(form);

    await $modifyWatchlistContent.mutateAsync({
      watchlistName,
      symbolsToAdd: [body.get("name") as string],
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
    <form
      id="add-watchlist-form"
      class="grid gap-4 py-4"
      onsubmit={handleNewSymbol}
    >
      <div class="grid grid-cols-4 items-center gap-4">
        <label for="name" class="text-right">Name</label>
        <Autocomplete name="name" placeholder="GOOG" class="col-span-3" />
      </div>
    </form>
    <Dialog.Footer>
      <Button
        type="submit"
        form="add-watchlist-form"
        disabled={$modifyWatchlistContent.isPending}>Save changes</Button
      >
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
