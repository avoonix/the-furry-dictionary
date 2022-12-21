import type { Page } from "$lib/definitions";
import type { PageLoad } from "./$types";

export const load: PageLoad<{ category: string }> = async ({ fetch, params }) => {
  return {
    category: params.category,
  };
};
