<script context="module" lang="ts">
	import type { Page } from '$lib/definitions';
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch, params }) => {
		const all: Page[] = await fetch('/definitions.json').then((res) => res.json());
		return {
			props: {
				all
			}
		};
	};
</script>

<script lang="ts">
	import WordList from '$lib/components/WordList.svelte';
	import Header from '$lib/components/Header.svelte';
	import AllHead from '$lib/components/AllHead.svelte';

	export let all: Page[];
</script>

<AllHead />

<Header />

<div class="page-container">
	<h1 class="text-5xl md:text-6xl xl:text-7xl tracking-tight mb-12 ">All Definitions</h1>

	<WordList words={all} />
</div>
