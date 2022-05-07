<script lang="ts">
	import { canonicalUrl, jsonLd } from '$lib/seo';
	import type { DefinedTerm, DefinedTermSet, WebPage, WebSite } from 'schema-dts';
	import Meta from './Meta.svelte';
	import type { Page } from '$lib/definitions';
	import { variables } from '$lib/variables';

	export let definition: Page;

	const websiteId = canonicalUrl('#website');
	$: url = canonicalUrl(definition.slug);
	$: description = `Definition of '${definition.slug}' by ${variables.siteName}: ${definition.preview.text}...`;
	$: name = `${definition.slug} Definition`;

	$: schema = jsonLd<DefinedTerm | DefinedTermSet | WebPage | WebSite>([
		{
			'@context': 'https://schema.org',
			'@type': 'WebPage',
			name,
			url,
			description,
			isPartOf: {
				'@id': websiteId
			}
		},
		{
			'@context': 'https://schema.org',
			'@type': 'WebSite',
			'@id': websiteId,
			url: canonicalUrl(),
			name: variables.siteName,
			image: canonicalUrl("/favicon.png"),
		},
		{
			'@context': 'https://schema.org',
			'@type': 'DefinedTerm',
			'@id': url,
			name: definition.slug,
			inDefinedTermSet: canonicalUrl()
		},
		{
			'@context': 'https://schema.org',
			'@type': 'DefinedTermSet',
			'@id': canonicalUrl(),
			name: variables.siteName
		}
	]);
</script>

<svelte:head>
	<Meta title={name} {url} {description} />
	{@html schema}
</svelte:head>
