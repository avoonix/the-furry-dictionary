<script context="module" lang="ts">
  import type { Page } from "$lib/definitions";
  import type { Load } from "@sveltejs/kit";

  export const load: Load = async ({ fetch, params }) => {
    const all: Page[] = await fetch("/definitions.json").then((res) => res.json());
    return {
      props: {
        all,
        letter: params.letter,
      },
    };
  };
</script>

<script lang="ts">
  import BrowseByLetter from "$lib/components/BrowseByLetter.svelte";
  import WordList from "$lib/components/WordList.svelte";
  import Header from "$lib/components/Header.svelte";
  import BrowseHead from "$lib/components/BrowseHead.svelte";

  export let all: Page[];
  export let letter: string;

  $: matching = all.filter((p) => p.slug.toLowerCase().startsWith(letter.toLowerCase()));
</script>

<BrowseHead letter={letter.toUpperCase()} />

<Header />

<div class="page-container">
  <h1 class="text-5xl md:text-6xl xl:text-7xl tracking-tight mb-12 ">
    Browsing
    <span class="text-blue-600">
      {letter.toUpperCase()}
    </span>
  </h1>

  <BrowseByLetter currentLetter={letter} />

  <WordList words={matching} />
</div>
