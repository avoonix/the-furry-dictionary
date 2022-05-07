<script lang="ts">
	import type { Word } from '$lib/definitions';
	import SectionHeader from './SectionHeader.svelte';
	import WordList from './WordList.svelte';

	export let prev: Word[] = [];
	export let next: Word[] = [];
</script>

<SectionHeader>Surrounding words</SectionHeader>

<div>
	<div class="flex flex-wrap overflow-hidden">
		<div class="my-1 w-full overflow-hidden md:w-1/2">
			<div class="text-2xl md:text-4xl mb-4">Before</div>
			<WordList words={prev} />
		</div>

		<div class="my-1 w-full overflow-hidden md:w-1/2">
			<div class="text-2xl md:text-4xl mb-4">After</div>
			<WordList words={next} />
		</div>
	</div>
</div>
