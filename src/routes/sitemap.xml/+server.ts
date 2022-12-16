import { getPages } from "$lib/definitions";
import { letters } from "$lib/letters";
import { canonicalUrl } from "$lib/seo";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async () => {
  return new Response(
    `<?xml version="1.0" encoding="UTF-8" ?>
      <urlset
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
        xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:pagemap="http://www.google.com/schemas/sitemap-pagemap/1.0"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
      >
        <url>
          <loc>${canonicalUrl()}</loc>
          <priority>1.0</priority>
        </url>
        ${getPages()
          .map(
            // https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps
            (page) => `<url>
              <loc>${canonicalUrl(page.slug)}</loc>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
              <image:image>
                <image:loc>${canonicalUrl(
                  `/terms/${encodeURIComponent(page.slug)}.png`,
                )}</image:loc>
              </image:image>
            </url>`,
          )
          .join("")}
        ${letters
          .map(
            (letter) => `<url>
              <loc>${canonicalUrl(`browse/${letter}`)}</loc>
              <changefreq>monthly</changefreq>
              <priority>0.5</priority>
            </url>`,
          )
          .join("")}
      </urlset>`,
    {
      headers: {
        "Cache-Control": `max-age=0, s-max-age=600`,
        "Content-Type": "application/xml",
      },
    },
  );
};

export const prerender = true;
