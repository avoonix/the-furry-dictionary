<script lang="ts">
  import type { Definition } from "$lib/definitions";
  import WordList from "./WordList.svelte";

  export let all: Definition[];

  let query = "";
  export let placeholder = "Search...";

  $: lower = query.toLowerCase();
  $: filtered = query
    ? all
        .filter((w) => w.slug.toLowerCase().includes(lower))
        .sort(({ slug: a }, { slug: b }) => a.indexOf(lower) - b.indexOf(lower))
    : [];
  $: padded = [...new Array(7)]
    .fill(null)
    .map<Definition | null>((_, idx) => filtered[idx] || null); // limit to 7 results and pad the test with null
</script>

<div class="relative mt-4">
  <div class="text-slate-100 absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
    <svg style="width:24px;height:24px" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
      />
    </svg>
  </div>
  <input
    bind:value={query}
    type="text"
    class="bg-blue-500 dark:bg-transparent focus:bg-blue-500 border-blue-500 text-slate-100 placeholder:text-slate-100 text-lg rounded-full block w-full pl-10 p-2.5"
    {placeholder}
  />
</div>

<div class="mb-2">
  Try
  <span class="cursor-pointer text-blue-500" on:click={() => (query = "fur")}>fur</span>,
  <span class="cursor-pointer text-blue-500" on:click={() => (query = "uwu")}>uwu</span> or
  <span class="cursor-pointer text-blue-500" on:click={() => (query = "paw")}>paw</span>
</div>

<WordList words={padded} />
