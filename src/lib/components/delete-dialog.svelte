<script lang="ts">
  import XIcon from "lucide-svelte/icons/x";
  import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
  import { cn } from "$lib/utils.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import type { MouseEventHandler } from "svelte/elements";

  let {
    handleConfirm,
    message = "",
    confirmPending = false,
  }: {
    handleConfirm: MouseEventHandler<HTMLButtonElement>;
    message?: string;
    confirmPending?: boolean;
  } = $props();
</script>

<Dialog.Root>
  <Dialog.Trigger
    class={cn(buttonVariants({ variant: "ghost" }), "hover:text-red-600")}
    aria-label="Delete"><XIcon /></Dialog.Trigger
  >
  <Dialog.Content class="sm:max-w-[425px]">
    <Dialog.Header>
      <h2 class="text-lg leading-none font-semibold tracking-tight">
        Confirm Delete
      </h2>
      <p class="text-muted-foreground text-sm">
        {message}
      </p>
    </Dialog.Header>
    <Dialog.Footer>
      <Button type="submit" onclick={handleConfirm} disabled={confirmPending}
        >Delete</Button
      >
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
