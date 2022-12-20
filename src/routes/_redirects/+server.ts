import { getPages } from "$lib/definitions";
import { letters } from "$lib/letters";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async () => {
  const pagesRedirects = getPages().flatMap((definition) => {
    const lower = definition.slug.toLowerCase();
    return lower === definition.slug ? [] : [`/${lower} /${definition.slug} 301`];
  });

  const lettersRedirects = letters.flatMap((letter) => {
    const lower = letter.toLowerCase();
    return lower === letter ? [] : [`/browse/${letter} /browse/${lower} 301`];
  });

  return new Response(
    `
/* /404.html 404
/all /browse.html 301
${pagesRedirects.join("\n")}
${lettersRedirects.join("\n")}
`.trim(),
  );
};

export const prerender = true;
