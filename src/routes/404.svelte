<script context="module" lang="ts">
	import type { Page } from '$lib/definitions';
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch }) => {
		const all: Page[] = await fetch('/definitions.json').then((res) => res.json());
		return {
			props: {
				all
			}
		};
	};
</script>

<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import AllHead from '$lib/components/AllHead.svelte';
	import Search from '$lib/components/Search.svelte';

	export let all: Page[];
</script>

<AllHead />

<Header />

<div class="page-container">
	<section class="flex items-center">
		<div class="container flex flex-col items-center justify-center px-5 mx-auto">
			<div class="max-w-md text-center">
				<h2 class="mb-8 font-extrabold text-9xl text-blue-500">
					<span class="sr-only">Error</span>404
				</h2>
				<p class="text-2xl font-semibold md:text-3xl">Sorry, we couldn't find this page.</p>
				<div class="my-10">
					<a
						href="/"
						class=" px-8 py-3 font-semibold bg-blue-500 hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-800 text-slate-100 uppercase rounded shadow-md  hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out"
						>Back to homepage</a
					>
				</div>
				<div class="mx-auto pt-4 pb-8">
					<Search placeholder="What are you looking for?" {all} />
				</div>
			</div>
		</div>
	</section>
</div>
