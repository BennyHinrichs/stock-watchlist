<script lang="ts">
  import { cn } from "$lib/utils.js";
  import type { HTMLAttributes } from "svelte/elements";

  let { class: className, ...rest }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div
  class={cn("animate-pulse rounded-md bg-slate-100", className)}
  {...rest}
></div>
