<script lang="ts">
  import Search from "$lib/components/Search.svelte";
  import BrowseByLetter from "$lib/components/BrowseByLetter.svelte";
  import { receive, send } from "$lib/crossfade";
  import SectionHeader from "$lib/components/SectionHeader.svelte";
  import IndexHead from "$lib/components/IndexHead.svelte";
  export let data: import("./$types").PageData;

  const description = `There are many abbreviations and slang terms in use in the furry fandom that everyone is expected to know, but many aren't that straightforward. This dictionary contains definitions for many of the most used ones and also more general internet vocabulary that is used frequently by furries.`;
</script>

<IndexHead {description} />

<div>
  <div class="text-center flex flex-col justify-center py-6 px-6 min-h-screen">
    <div>
      <h1
        out:send={{ key: "title" }}
        in:receive={{ key: "title" }}
        class="inline-block text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-12"
      >
        The
        <!-- <img class="inline-block h-[2em] w-[2em] -mr-8" src="/favicon.svg" alt="" /> -->
        <span class="relative">
          <span class="block absolute -inset-1 -skew-y-3 bg-blue-500" aria-hidden="true" />
          <span class="relative text-slate-100">Furry</span>
        </span>
        Dictionary
      </h1>
    </div>

    <div class="container mx-auto px-4 md:w-[50%] lg:w-[30%]">
      <Search all={data.all} />
    </div>

    <p class="container mx-auto md:w-[60%] lg:w-[40%] mt-16">
      {description}
    </p>
  </div>
</div>

<div class="page-container">
  <SectionHeader>Browse the dictionary</SectionHeader>
  <BrowseByLetter />
</div>
