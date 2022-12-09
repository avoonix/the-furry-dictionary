<script lang="ts">
  import type { Word } from "$lib/definitions";
  import DefinitionLink from "./DefinitionLink.svelte";

  export let words: (Word | null)[];
  export let inline = false;
</script>

{#each words as word, idx}
  <div class="relative">
    <div
      class="relative flex"
      class:mt-4={!inline}
      class:opacity-0={!word}
      class:pointer-events-none={!word}
    >
      <DefinitionLink slug={word?.slug} />

      {#if inline && idx !== words.length - 1}
        <div class="mx-2">&bull;</div>
      {/if}
    </div>
  </div>
{/each}

{#if !words.length}
  <div class="italic" class:mt-4={!inline}>no entries</div>
{/if}
