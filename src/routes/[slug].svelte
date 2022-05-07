<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ params: { slug }, fetch }) => {
		const pages: Page[] = await fetch('/definitions.json').then((res) => res.json());
		const definition = pages.find((page) => slug === page.slug);
		if (!definition) {
			return { status: 404, error: 'Page not found' };
		}
		return {
			props: {
				definition,
				body: (await import(`../../definitions/${definition.slug}.md`)).default
			}
		};
	};
</script>

<script lang="ts">
	import type { Page } from '$lib/definitions';
	import SurroundingWords from '$lib/components/SurroundingWords.svelte';
	import Header from '$lib/components/Header.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import BrowseByLetter from '$lib/components/BrowseByLetter.svelte';
	import DefinitionHead from '$lib/components/DefinitionHead.svelte';
	import DefinitionHero from '$lib/components/DefinitionHero.svelte';
	import type { SvelteComponent } from 'svelte';
	import { browser } from '$app/env';
	import Comments from '$lib/components/Comments.svelte';

	export let body: SvelteComponent;
	export let definition: Page;
</script>

<DefinitionHead {definition} />

<Header />

<div class="page-container">
	<article class="relative prose lg:prose-xl max-w-none dark:prose-invert prose-slate">
		<div class="not-prose">
			<DefinitionHero slug={definition.slug} />
		</div>

		<svelte:component this={body} />
	</article>

	<div class="mt-24" />
	<SurroundingWords prev={definition.prev} next={definition.next} />
	<div class="mt-24" />
	<SectionHeader>Browse the dictionary</SectionHeader>
	<BrowseByLetter />

	{#if browser}
		{#key definition.slug}
			<Comments />
		{/key}
	{/if}
</div>
