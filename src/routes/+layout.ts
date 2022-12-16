import type { Page } from "$lib/definitions";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad<{ currentRoute: string; all: Page[] }> = async ({ url, fetch }) => {
  const currentRoute = url.pathname;
  const all: Page[] = await fetch("/definitions.json").then((res) => res.json());

  return {
    currentRoute,
    all,
  };
};

export const prerender = true;
