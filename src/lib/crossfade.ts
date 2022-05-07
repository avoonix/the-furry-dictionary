import { crossfade } from 'svelte/transition';

const [send, receive] = crossfade({
	duration: 500
});

export { send, receive };
