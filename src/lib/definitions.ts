import { parse } from 'node-html-parser';

export interface Word {
	slug: string;
}

export interface Definition extends Word {}

export interface Page extends Definition {
	prev: Word[];
	next: Word[];
	preview: {
		text: string;
	};
}

export function getPages({ page = 1, limit = Infinity } = {}) {
	if (limit) {
		return definitions.slice((page - 1) * limit, page * limit);
	}

	return definitions;
}

const definitionToWord = (def: Definition): Word => ({ slug: def.slug });

const definitions: Definition[] = Object.entries(import.meta.globEager('/definitions/**/*.md'))
	.map(([filepath, definition]) => {
		return {
			...definition.metadata,
			slug: filepath
				.replace(/(\/index)?\.md/, '')
				.split('/')
				.pop(),
			component: definition.default
		};
	})
	.map<Page>((definition) => {
		const parsedHtml = parse(definition.component.render().html);
		const preview = definition.customPreview
			? definition.customPreview
			: parsedHtml.querySelector('p') || parsedHtml.querySelector('li');
		return {
			...definition,
			prev: [],
			next: [],
			preview: {
				text: preview.structuredText
			}
		};
	})
	.sort((a, b) => a.slug.localeCompare(b.slug))
	.map<Page>((definition, index, all) => ({
		...definition,
		prev: all.slice(Math.max(0, index - 5), index).map(definitionToWord),
		next: all.slice(index + 1, index + 6).map(definitionToWord)
	}));
