<script lang="ts">
  import * as Command from "$lib/components/ui/command/index.js";
  import { cn } from "$lib/utils.js";
  import Check from "lucide-svelte/icons/check";
  import Skeleton from "../skeleton/skeleton.svelte";

  interface Option {
    label: string;
    value: any;
  }

  let {
    class: className = "",
    name = "",
    options = [] as Option[],
    value = null as Option | null,
    placeholder = "Type to search…",
    disabled = false,
    emptyMessage = "No options",
    onValueChange = () => void 0,
  } = $props();

  let inputRef: HTMLInputElement;
  let isOpen = $state(false);
  let selected: Option | null = $state(value);
  let inputValue: string = $state(value?.label ?? "");
  let isLoading = $state(false);

  function handleKeyDown(event: KeyboardEvent) {
    if (!inputRef) return;

    // Open the options if not already open
    if (!isOpen) {
      isOpen = true;
    }

    // On Enter: if the input has a value, try to find a matching option
    if (event.key === "Enter" && inputValue.trim() !== "") {
      const optionToSelect = options.find(
        (option) => option.label === inputValue,
      );
      if (optionToSelect) {
        selected = optionToSelect;
        onValueChange?.(optionToSelect);
      }
    }

    // On Escape: blur the input to close the list
    if (event.key === "Escape") {
      inputRef.blur();
    }
  }

  function handleBlur() {
    isOpen = false;
    // Reset the input value to the selected option’s label
    inputValue = selected?.label ?? "";
  }

  function handleSelectOption(selectedOption: Option) {
    inputValue = selectedOption.label;
    selected = selectedOption;
    onValueChange?.(selectedOption);
    // Using setTimeout as a means to wait until the next tick before blurring the input.
    setTimeout(() => {
      inputRef?.blur();
    }, 0);
  }
</script>

<Command.Root onkeydown={handleKeyDown} class={className}>
  <div>
    <Command.Input
      bind:this={inputRef}
      {name}
      {placeholder}
      {disabled}
      value={inputValue}
      on:input={(e: Event) => {
        // Svelte input events give access via target.value
        inputValue = (e.target as HTMLInputElement).value;
      }}
      on:blur={handleBlur}
      on:focus={() => (isOpen = true)}
      class="text-base"
    />
  </div>
  <div class="relative mt-1">
    <div
      class={cn(
        "animate-in fade-in-0 zoom-in-95 absolute top-0 z-10 w-full rounded-xl bg-white outline-none",
        isOpen ? "block" : "hidden",
      )}
    >
      <Command.List class="rounded-lg ring-1 ring-slate-200">
        {#if isLoading}
          <Command.Loading>
            <div class="p-1">
              <Skeleton class="h-8 w-full" />
            </div>
          </Command.Loading>
        {/if}
        {#if options.length > 0 && !isLoading}
          <Command.Group>
            {#each options as option (option.value)}
              <Command.Item
                value={option.label}
                on:select={() => handleSelectOption(option)}
                class={cn(
                  "flex w-full items-center gap-2",
                  selected?.value !== option.value ? "pl-8" : "",
                )}
              >
                {#if selected?.value === option.value}
                  <Check class="w-4" />
                {/if}
                {option.label}
              </Command.Item>
            {/each}
          </Command.Group>
        {/if}
        {#if !isLoading}
          <Command.Empty
            class="rounded-sm px-2 py-3 text-center text-sm select-none"
          >
            {emptyMessage}
          </Command.Empty>
        {/if}
      </Command.List>
    </div>
  </div>
</Command.Root>
