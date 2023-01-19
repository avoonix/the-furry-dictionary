<script lang="ts">
  import CategoryHead from "$lib/components/CategoryHead.svelte";
  import Header from "$lib/components/Header.svelte";
  import WordList from "$lib/components/WordList.svelte";

  export let data: import("./$types").PageData;
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

  <WordList words={data.matching} />
</div>
