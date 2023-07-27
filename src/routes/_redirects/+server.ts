import { getPages } from "$lib/definitions";
import { letters } from "$lib/letters";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async () => {
  const pagesRedirects = getPages().flatMap((definition) => {
    const lower = definition.slug.toLowerCase();
    return lower === definition.slug
      ? []
      : [
          `/${encodeURIComponent(lower)} /${encodeURIComponent(definition.slug)} 301`,
          `/${lower} /${definition.slug} 301`,
        ];
  });

  const lettersRedirects = letters.flatMap((letter) => {
    const lower = letter.toLowerCase();
    return lower === letter ? [] : [`/browse/${letter} /browse/${lower} 301`];
  });

  return new Response(
    `
/* /index.html 404
/all /browse.html 301
/category /browse.html 301
/category/abbreviation /category/abbreviations 301
/category/emoticon /category/emoticons 301
/category/sound /category/sounds 301
/category/hybrid /category/hybrids 301
/category/fursuit /category/fursuits 301
${pagesRedirects.join("\n")}
${lettersRedirects.join("\n")}
`.trim(),
  );
};

export const prerender = true;
