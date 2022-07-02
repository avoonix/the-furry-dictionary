<script lang="ts">
	import { canonicalUrl } from '$lib/seo';
	import Meta from './Meta.svelte';

	$: url = canonicalUrl('all');
</script>

<Meta title="All Definitions" {url} description="All Definitions" />

<svelte:head>
	<meta name="robots" content="noindex" />
</svelte:head>
