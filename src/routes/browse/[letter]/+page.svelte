<script lang="ts">
  import BrowseByLetter from "$lib/components/BrowseByLetter.svelte";
  import WordList from "$lib/components/WordList.svelte";
  import Header from "$lib/components/Header.svelte";
  import BrowseHead from "$lib/components/BrowseHead.svelte";

  export let data: import('./$types').PageData;

  $: matching = data.all.filter((p) => p.slug.toLowerCase().startsWith(data.letter.toLowerCase()));
</script>

<BrowseHead letter={data.letter.toUpperCase()} />

<Header />

<div class="page-container">
  <h1 class="text-5xl md:text-6xl xl:text-7xl tracking-tight mb-12 ">
    Browsing
    <span class="text-blue-600">
      {data.letter.toUpperCase()}
    </span>
  </h1>

  <BrowseByLetter currentLetter={data.letter} />

  <WordList words={matching} />
</div>
