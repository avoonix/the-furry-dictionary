import type { Page } from "$lib/definitions";
import type { PageLoad } from "./$types";

const MIN_CATEGORY_SIZE = 4;

export const load: PageLoad<{ category: string; matching: Page[] }> = async ({
  params,
  parent,
}) => {
  const parentData = await parent();
  const matching = parentData.all.filter((p) => p.categories.includes(params.category));

  if (matching.length < MIN_CATEGORY_SIZE) {
    throw new Error(`Category ${params.category} has less than ${MIN_CATEGORY_SIZE} terms. The category name might be a typo.`);
  }

  return {
    category: params.category,
    matching,
  };
};
