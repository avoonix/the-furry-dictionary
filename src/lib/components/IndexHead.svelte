<script lang="ts">
	import { canonicalUrl, jsonLd } from '$lib/seo';
	import type { DefinedTerm, DefinedTermSet, WebPage, WebSite } from 'schema-dts';
	import Meta from './Meta.svelte';
	import { variables } from '$lib/variables';

	const websiteId = canonicalUrl('#website');
	$: url = canonicalUrl();

	const description = `Definitions for common furry terms`;

	const image = canonicalUrl('/landing.png');

	$: schema = jsonLd<DefinedTerm | DefinedTermSet | WebPage | WebSite>([
		{
			'@context': 'https://schema.org',
			'@type': 'WebPage',
			name: variables.siteName,
			url,
			description,
			isPartOf: {
				'@id': websiteId
			},
			image
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
			'@type': 'DefinedTermSet',
			'@id': canonicalUrl(),
			name: variables.siteName
		}
	]);
</script>

<svelte:head>
	<Meta title={variables.siteName} {url} {description} {image} />
	{@html schema}
</svelte:head>
