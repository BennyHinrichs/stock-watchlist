<script lang="ts">
  import "../app.css";
  import { browser } from "$app/environment";
  import { QueryClientProvider, QueryClient } from "@tanstack/svelte-query";

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        enabled: browser,
      },
    },
  });
</script>

<QueryClientProvider client={queryClient}>
  <main class="container h-svh pb-10">
    <slot />
  </main>
</QueryClientProvider>
