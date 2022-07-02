const config = {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts,md}'],

	theme: {
		extend: {}
	},

	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/forms'),
		require('tailwind-scrollbar')
	],

	variants: {
		scrollbar: ['dark']
	}
};

module.exports = config;
