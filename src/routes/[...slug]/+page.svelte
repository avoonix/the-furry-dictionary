<script lang="ts">
  import { browser } from "$app/environment";
  import BrowseByLetter from "$lib/components/BrowseByLetter.svelte";
  import Comments from "$lib/components/Comments.svelte";
  import DefinitionHead from "$lib/components/DefinitionHead.svelte";
  import DefinitionHero from "$lib/components/DefinitionHero.svelte";
  import DefinitionInfos from "$lib/components/DefinitionInfos.svelte";
  import Header from "$lib/components/Header.svelte";
  import SectionHeader from "$lib/components/SectionHeader.svelte";
  import { canonicalUrl } from "$lib/seo";

  export let data: import("./$types").PageData;

  let disableComments = browser
    ? localStorage.getItem("disableComments") === "true" || false
    : false;

  $: image = canonicalUrl(`/terms/${encodeURIComponent(data.definition.slug)}.png`);
</script>

<DefinitionHead definition={data.definition} />

<Header />

<div class="page-container">
  <article class="relative prose lg:prose-xl max-w-none dark:prose-invert prose-slate">
    <div class="not-prose">
      <DefinitionHero slug={data.definition.slug} />
    </div>

    <svelte:component this={data.body} />

    <div class="not-prose">
      <div class="mt-24" />
      <DefinitionInfos
        prev={data.definition.prev}
        next={data.definition.next}
        categories={data.definition.categories}
      />
    </div>
  </article>

  <div class="mt-24" />
  <SectionHeader>Browse the dictionary</SectionHeader>
  <BrowseByLetter />
  <div class="mt-24" />
  <SectionHeader>Comments on {data.definition.slug}</SectionHeader>
  <button
    class="h-4 w-4 sm:h-8 sm:w-8 sm:p-1"
    on:click={() => {
      disableComments = !disableComments;
      if (disableComments) {
        localStorage.setItem("disableComments", "true");
      } else {
        localStorage.removeItem("disableComments");
      }
    }}
  >
    <svg class="text-slate-500" style="width:24px;height:24px" viewBox="0 0 24 24">
      {#if disableComments}
        <path
          fill="currentColor"
          d="M9,22A1,1 0 0,1 8,21V18H4A2,2 0 0,1 2,16V4C2,2.89 2.9,2 4,2H20A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H13.9L10.2,21.71C10,21.9 9.75,22 9.5,22V22H9M10,16V19.08L13.08,16H20V4H4V16H10Z"
        />
      {:else}
        <path
          fill="currentColor"
          d="M7.2 4L5.2 2H20C21.11 2 22 2.9 22 4V16C22 16.76 21.57 17.41 20.95 17.75L19.2 16H20V4H7.2M22.11 21.46L20.84 22.73L16.11 18H13.9L10.2 21.71C10 21.9 9.75 22 9.5 22H9C8.45 22 8 21.55 8 21V18H4C2.9 18 2 17.11 2 16V4C2 3.97 2 3.93 2 3.9L1.11 3L2.39 1.73L22.11 21.46M14.11 16L4 5.89V16H10V19.08L13.08 16H14.11Z"
        />
      {/if}
    </svg>
  </button>

  {#if browser && !disableComments}
    {#key data.definition.slug}
      <Comments />
    {/key}
  {/if}

  <noscript style="visibility: hidden; display: none;">
    <!-- 
      the image should be crawled by search engines, but not shown/loaded for users
      just using loading="lazy" and display: none did not work
    -->
    <a href={image} style="visibility: hidden; display: none;"
      >Definition of {data.definition.slug}</a
    >
    <img
      src={image}
      style="visibility: hidden; display: none;"
      alt={data.definition.preview.all}
      loading="lazy"
    />
  </noscript>
</div>
