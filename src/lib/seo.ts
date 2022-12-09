import type { Thing, WithContext } from "schema-dts";
import { variables } from "./variables";

export function jsonLd<T extends Thing>(json: WithContext<T>[]): string {
  return `<script type="application/ld+json">${JSON.stringify(json)}</script>`;
}

export const canonicalUrl = (url = "/") => {
  if (!url.startsWith("http")) {
    url = variables.basePath + "/" + url;
  }
  // replace duplicate "/"
  return new URL(url.replace(/([^:]\/)\/+/g, "$1")).toString();
};
