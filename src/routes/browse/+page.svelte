<script lang="ts">
  import WordList from "$lib/components/WordList.svelte";
  import Header from "$lib/components/Header.svelte";
  import AllHead from "$lib/components/AllHead.svelte";
  import groupBy from "lodash/groupBy";
  import UsageFrequency from "$lib/components/UsageFrequency.svelte";

  export let data: import("./$types").PageData;

  $: grouped = Object.entries(groupBy([...data.all], (page) => page.frequency)).sort(
    (a, b) => Number(b[0]) - Number(a[0]),
  );

  const frequencyToHeading: Record<string, string> = {
    5: "Very Common",
    4: "Common",
    3: "Somewhat Common",
    2: "Uncommon",
    1: "Very Uncommon/No Longer Used",
  };
</script>

<AllHead />

<Header />

<div class="page-container">
  <h1 class="text-5xl md:text-6xl xl:text-7xl tracking-tight mb-12 ">All Definitions</h1>

  {#each grouped as [frequency, list]}
    <div class="mb-12">
      <div class="flex gap-2 text-2xl">
        <h2 class="text-blue-600">{frequencyToHeading[frequency]}</h2>
        <UsageFrequency value={+frequency} />
      </div>
      <WordList words={list} />
    </div>
  {/each}
</div>
