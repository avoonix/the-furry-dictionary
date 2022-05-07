<script context="module" lang="ts">
	import type { Page } from '$lib/definitions';
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch }) => {
		const all: Page[] = await fetch('/definitions.json').then((res) => res.json()); // TODO: remove
		return {
			props: {
				all
			}
		};
	};
</script>

<script lang="ts">
	import Search from '$lib/components/Search.svelte';
	import BrowseByLetter from '$lib/components/BrowseByLetter.svelte';
	import { receive, send } from '$lib/crossfade';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import IndexHead from '$lib/components/IndexHead.svelte';
	export let all: Page[];
</script>

<IndexHead />

<div>
	<div class="text-center flex flex-col justify-center py-6 px-6 min-h-screen">
		<div>
			<h1
				out:send={{ key: 'title' }}
				in:receive={{ key: 'title' }}
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
			<Search {all} />
		</div>
	</div>
</div>

<div class="page-container">
	<SectionHeader>Browse the dictionary</SectionHeader>
	<BrowseByLetter />
</div>
