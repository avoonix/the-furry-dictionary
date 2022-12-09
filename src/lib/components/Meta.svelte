<script lang="ts">
  import { variables } from "$lib/variables";

  export let author = variables.siteName;
  export let title: string;
  export let description: string;
  export let url: string;
  export let image: string | null = null;
  const formattedTitle =
    title && title !== variables.siteName ? `${title} | ${variables.siteName}` : variables.siteName;
  export let largeImage = false;
</script>

<svelte:head>
  <title>{formattedTitle}</title>
  <meta name="description" content={description} />
  <meta name="author" content={author} />

  <meta itemprop="name" content={title} />
  <meta itemprop="description" content={description} />

  <meta property="og:url" content={url} />
  <meta property="og:type" content="website" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />

  <meta name="twitter:url" content={url} />
  <meta name="twitter:card" content={largeImage ? "summary_large_image" : "summary"} />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <!-- <meta name="twitter:site" content="@author" /> -->

  <link rel="canonical" href={url} />

  {#if image}
    <meta itemprop="image" content={image} />
    <meta property="og:image" content={image} />
    <meta name="twitter:image" content={image} />
  {/if}
</svelte:head>
