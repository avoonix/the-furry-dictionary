<script lang="ts">
	import type { Word } from '$lib/definitions';
	import DefinitionLink from './DefinitionLink.svelte';

	export let words: (Word | null)[];
</script>

{#each words as word}
	<div class="relative">
		<div class="relative mt-4" class:opacity-0={!word} class:pointer-events-none={!word}>
			<DefinitionLink slug={word?.slug} />
		</div>
	</div>
{/each}

{#if !words.length}
	<div class="italic mt-4">no entries</div>
{/if}
