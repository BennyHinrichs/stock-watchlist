<script lang="ts">
  import EditPencil from "lucide-svelte/icons/pencil";
  import Plus from "lucide-svelte/icons/plus";
  import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
  import { cn } from "$lib/utils.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import type { EventHandler } from "svelte/elements";

  let {
    mode,
    handleSubmit,
    watchlistName = "",
    submitPending = false,
  }: {
    mode: "add" | "edit";
    handleSubmit: EventHandler<SubmitEvent, HTMLFormElement>;
    watchlistName?: string;
    submitPending?: boolean;
  } = $props();
</script>

<Dialog.Root>
  {#if mode === "add"}
    <Dialog.Trigger
      class={cn(
        buttonVariants({ variant: "default" }),
        "bg-amber-400 hover:bg-amber-500",
      )}><Plus /> Add</Dialog.Trigger
    >
  {:else}
    <Dialog.Trigger
      class={cn(buttonVariants({ variant: "ghost" }), "hover:text-amber-500")}
      ><EditPencil /></Dialog.Trigger
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
      onsubmit={handleSubmit}
    >
      <div class="grid grid-cols-4 items-center gap-4">
        <label for="name" class="text-right">Name</label>
        <Input name="name" placeholder="To the Moon #19" class="col-span-3" />
      </div>
    </form>
    <Dialog.Footer>
      <Button type="submit" form="add-watchlist-form" disabled={submitPending}
        >Save changes</Button
      >
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
