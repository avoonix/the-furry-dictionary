<script lang="ts">
	import { send } from '$lib/crossfade';

	export let slug = '';
</script>

<div class="not-prose text-left">
	<a href={`/${slug}`} class=" text-xl">
		<div class="inline-flex items-start space-x-1">
			<div
				out:send={{ key: slug + 'title-from-list' }}
				class="relative underline decoration-slate-900 dark:decoration-slate-100 hover:decoration-blue-500"
			>
				{slug}
			</div>
		</div></a
	>
</div>
