<script lang="ts">
  import "../app.css";
  import Footer from "$lib/components/Footer.svelte";
  import { fade } from "svelte/transition";
  export let data: import("./$types").PageData;
</script>

{#key data.currentRoute}
  <div class="relative" in:fade={{ duration: 250, delay: 250 }} out:fade={{ duration: 250 }}>
    <div class="absolute top-0 w-full fade-container">
      <main class="dark:bg-gray-900">
        <slot />
      </main>
      <Footer />
    </div>
  </div>
{/key}
