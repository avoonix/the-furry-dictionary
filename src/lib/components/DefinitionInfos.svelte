<script lang="ts">
	import UsageFrequency from './UsageFrequency.svelte';
	import type { Word } from '$lib/definitions';
	import WordList from './WordList.svelte';

	export let prev: Word[];
	export let next: Word[];
	export let frequency: number;
</script>

<!-- <SectionHeader>Info</SectionHeader> -->

<div class="grid md:grid-cols-[12em_1fr] text-xl">
	<div>Word Frequency</div>
	<div class="mb-10 md:mb-3"><UsageFrequency value={frequency} /></div>
	<div>Before (alphabetically)</div>
	<div class="mb-10 md:mb-3">
		<div class="flex flex-wrap">
			<WordList words={prev} inline />
		</div>
	</div>
	<div>After (alphabetically)</div>
	<div class="mb-10 md:mb-3">
		<div class="flex flex-wrap">
			<WordList words={next} inline />
		</div>
	</div>
</div>
