<script lang="ts">
  import BrowseByLetter from "$lib/components/BrowseByLetter.svelte";
  import WordList from "$lib/components/WordList.svelte";
  import Header from "$lib/components/Header.svelte";
  import BrowseHead from "$lib/components/BrowseHead.svelte";
    import CategoryHead from "$lib/components/CategoryHead.svelte";

  export let data: import("./$types").PageData;

  $: matching = data.all.filter((p) => p.categories.includes(data.category));
</script>

<CategoryHead category={data.category} />

<Header />

<div class="page-container">
  <h1 class="text-5xl md:text-6xl xl:text-7xl tracking-tight mb-12 ">
    Category
    <span class="text-blue-600">
      {data.category}
    </span>
  </h1>

  <WordList words={matching} />
</div>
