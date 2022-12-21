<script lang="ts">
  import { canonicalUrl, jsonLd } from "$lib/seo";
  import type { DefinedTerm, DefinedTermSet, WebPage, WebSite } from "schema-dts";
  import Meta from "./Meta.svelte";
  import { variables } from "$lib/variables";

  export let category: string;

  const websiteId = canonicalUrl("#website");
  $: url = canonicalUrl(`category/${category}`);

  const description = `List of terms in the category ${category}`;
  const name = `Category ${category}`;

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
<Meta title={name} {url} {description} />
