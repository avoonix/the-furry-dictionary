import { getPages } from "$lib/definitions";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async () => {
  return new Response(JSON.stringify(getPages()));
};
