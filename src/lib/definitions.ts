import { parse } from "node-html-parser";

export interface Definition {
  slug: string;
}

export interface Page extends Definition {
  prev: Definition[];
  next: Definition[];
  preview: {
    text: string;
    all: string;
  };
  categories: string[];
}

export function getPages({ page = 1, limit = Infinity } = {}) {
  if (limit) {
    return definitions.slice((page - 1) * limit, page * limit);
  }

  return definitions;
}

const definitionToWord = (def: Definition): Definition => ({ slug: def.slug });

const definitions: Page[] = Object.entries(import.meta.globEager("/definitions/**/*.md"))
  .map(([filepath, definition]) => {
    if (!definition.metadata?.categories)
      throw new Error(`categories frontmatter missing for ${filepath}`);
    return {
      ...definition.metadata,
      slug: filepath.replace(/(\/index)?\.md/, "").replace(/^\/definitions\//, ""),
      component: definition.default,
    };
  })
  .map<Page>((definition) => {
    const parsedHtml = parse(definition.component.render().html);
    const preview = definition.customPreview
      ? definition.customPreview
      : parsedHtml.querySelector("p") || parsedHtml.querySelector("li");
    return {
      ...definition,
      prev: [],
      next: [],
      preview: {
        text: preview?.structuredText,
        all: parsedHtml?.structuredText,
      },
    };
  })
  .sort((a, b) => a.slug.localeCompare(b.slug))
  .map<Page>((definition, index, all) => ({
    ...definition,
    prev: all.slice(Math.max(0, index - 5), index).map(definitionToWord),
    next: all.slice(index + 1, index + 6).map(definitionToWord),
  }));
