/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
	// interface Locals {}
	// interface Platform {}
	// interface Session {}
	// interface Stuff {}
}

interface ImportMetaEnv {
	VITE_PUBLIC_BASE_PATH: string;
	VITE_SITE_NAME: string;
}
