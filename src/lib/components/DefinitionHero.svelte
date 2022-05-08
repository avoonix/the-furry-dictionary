<script lang="ts">
	import { receive } from '$lib/crossfade';

	import { canonicalUrl } from '$lib/seo';

	export let slug: string;
	import copy from 'copy-to-clipboard';

	const success = {
		term: false,
		link: false,
		timeout: 0 as any
	};

	const clearStatus = () => {
		clearTimeout(success.timeout);
		success.timeout = setTimeout(() => {
			success.term = false;
			success.link = false;
		}, 1000);
	};

	const copyTerm = () => {
		copy(slug);
		success.term = true;
		clearStatus();
	};

	const copyLink = () => {
		copy(canonicalUrl(slug));
		success.link = true;
		clearStatus();
	};
</script>

<div class="text-center text-gray-800 px-6 mt-4 mb-16">
	<h1 class="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-12 text-blue-600">
		<div class="relative">
			<div class="relative inline-block">
				<div in:receive={{ key: slug + 'title-from-list' }}>
					{slug}
				</div>
			</div>
		</div>
	</h1>
	<button
		class="inline-block {success.term
			? 'bg-green-500 hover:bg-green-700 focus:bg-green-700 active:bg-green-800'
			: 'bg-blue-500 hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-800'} px-7 py-3 mr-2 text-slate-100 font-medium text-sm leading-snug uppercase rounded shadow-md  hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out"
		on:click={copyTerm}>Copy Term</button
	>
	<button
		class="inline-block {success.link
			? 'text-green-500 hover:text-green-700'
			: 'text-blue-500 hover:text-blue-700'} px-7 py-3 bg-transparent font-medium text-sm leading-snug uppercase rounded hover:bg-slate-100 dark:hover:bg-slate-800 focus:bg-gray-100 dark:focus:bg-slate-900 focus:outline-none focus:ring-0 active:bg-gray-200 dark:active:bg-slate-700 transition duration-150 ease-in-out"
		on:click={copyLink}>Copy Link</button
	>
	<a
		class="inline-block text-blue-500 hover:text-blue-700 px-7 py-3 bg-transparent font-medium text-sm leading-snug uppercase rounded hover:bg-slate-100 dark:hover:bg-slate-800 focus:bg-gray-100 dark:focus:bg-slate-900 focus:outline-none focus:ring-0 active:bg-gray-200 dark:active:bg-slate-700 transition duration-150 ease-in-out"
		href="https://github.com/avoonix/the-furry-dictionary/blob/master/definitions/{slug}.md"
	>
		Edit
	</a>
</div>
