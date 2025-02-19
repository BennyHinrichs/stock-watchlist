<script lang="ts">
  import XIcon from "lucide-svelte/icons/x";
  import { Button, buttonVariants } from "./ui/button/index.js";
  import { cn } from "../utils.js";
  import * as Dialog from "./ui/dialog/index.js";
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
    ><XIcon /></Dialog.Trigger
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
