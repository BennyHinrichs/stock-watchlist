<script lang="ts">
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import { getUser } from "$lib/queries.js";

  if (browser && !getUser()) {
    goto("/login");
  }
</script>

<h1 class="text-amber-400">Welcome to your library project</h1>
<p>
  Create your package using @sveltejs/package and preview/showcase your work
  with SvelteKit
</p>
<p>
  Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the
  documentation
</p>
