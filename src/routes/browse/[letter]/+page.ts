import type { Page } from "$lib/definitions";
import type { PageLoad } from "./$types";

export const load: PageLoad<{ letter: string }> = async ({ fetch, params }) => {
  return {
    letter: params.letter,
  };
};
