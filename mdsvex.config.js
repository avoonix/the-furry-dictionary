import { defineMDSveXConfig as defineConfig } from "mdsvex";
import slugPlugin from "rehype-slug";
// import autolinkHeadings from 'rehype-autolink-headings';

const config = defineConfig({
  extensions: [".svelte.md", ".md", ".svx"],

  smartypants: {
    dashes: "oldschool",
  },

  remarkPlugins: [],
  rehypePlugins: [
    slugPlugin,
    // [
    // 	autolinkHeadings,
    // 	{
    // 		behavior: 'wrap'
    // 	}
    // ]
  ],
});

export default config;
