<script lang="ts">
  import { canonicalUrl, jsonLd } from "$lib/seo";
  import type { DefinedTerm, DefinedTermSet, WebPage, WebSite } from "schema-dts";
  import Meta from "./Meta.svelte";
  import { variables } from "$lib/variables";

  export let letter: string;

  const websiteId = canonicalUrl("#website");
  $: url = canonicalUrl(`browse/${letter}`);

  const description = `Definitions for common furry terms starting with '${letter}'`;
  const name = `Browse: Letter ${letter}`;

  $: schema = jsonLd<DefinedTerm | DefinedTermSet | WebPage | WebSite>([
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name,
      url,
      description,
      isPartOf: {
        "@id": websiteId,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": websiteId,
      url: canonicalUrl(),
      name: variables.siteName,
      image: canonicalUrl("/favicon.png"),
    },
  ]);
</script>

<svelte:head>
  {@html schema}
</svelte:head>
<Meta title={variables.siteName} {url} {description} />
