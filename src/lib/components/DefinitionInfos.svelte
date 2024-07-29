<script lang="ts">
  import type { Definition } from "$lib/definitions";
  import WordList from "./WordList.svelte";

  export let prev: Definition[];
  export let next: Definition[];
  export let categories: string[];
</script>

<div class="grid md:grid-cols-[12em_1fr] text-xl">
  {#if categories.length}
    <div>Categories</div>
    <div class="mb-10 md:mb-3">
      <div class="flex flex-wrap">
        <WordList words={categories.map((c) => ({ slug: c, href: `/category/${c}` }))} inline />
      </div>
    </div>
  {/if}
  <div>Before (alphabetically)</div>
  <div class="mb-10 md:mb-3">
    <div class="flex flex-wrap">
      <WordList words={prev} inline />
    </div>
  </div>
  <div>After (alphabetically)</div>
  <div class="mb-10 md:mb-3">
    <div class="flex flex-wrap">
      <WordList words={next} inline />
    </div>
  </div>
</div>
