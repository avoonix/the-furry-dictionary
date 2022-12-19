import type { Page } from "$lib/definitions";
import { error } from "@sveltejs/kit";
import type { SvelteComponent } from "svelte";
import type { PageLoad } from "./$types";

export const load: PageLoad<{ definition: Page; body: SvelteComponent }> = async ({
  params: { slug },
  fetch,
}) => {
  const pages: Page[] = await fetch("/definitions.json").then((res) => res.json());
  const definition = pages.find((page) => slug === page.slug);
  if (!definition) {
    throw error(404, "Page not found");
  }
  const components = import.meta.glob<{ default: SvelteComponent }>(`../../../definitions/**/*.md`);
  return {
    definition,
    body: (await components[`../../../definitions/${definition.slug}.md`]()).default,
  };
};
