<script lang="ts">
  import WordList from "$lib/components/WordList.svelte";
  import Header from "$lib/components/Header.svelte";
  import AllHead from "$lib/components/AllHead.svelte";

  export let data: import('./$types').PageData;
</script>

<AllHead />

<Header />

<div class="page-container">
  <h1 class="text-5xl md:text-6xl xl:text-7xl tracking-tight mb-12 ">All Definitions</h1>

  <WordList words={data.all} />
</div>
