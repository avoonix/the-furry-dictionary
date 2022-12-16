import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async () => {
  return new Response(`
/* /index.html 404
/all /browse.html 301
`.trim()); // TODO: redirect uppercase letters to lowercase pages, lowercase terms to correctly capitalized terms
};

export const prerender = true;
