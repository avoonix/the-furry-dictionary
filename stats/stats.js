import fs from 'fs';
import readline from 'readline';
import { marked } from 'marked';
import { parse } from 'node-html-parser';
import _ from 'lodash';
import pluralize from 'pluralize';

async function getTerms() {
	const entries = await fs.promises.readdir('definitions');
	return entries.map((e) => e.replace(/\.md/, '').toLowerCase());
}

async function processLineByLine() {
	const termCounts = {};
	const fileStream = fs.createReadStream('stats/filtered.json');
	const terms = await getTerms();

	const termVariants = Object.fromEntries(
		terms.flatMap((term) => [
			[pluralize.singular(term), term],
			[pluralize.plural(term), term]
		])
	);

	for (const term of terms) {
		termCounts[term] = 0;
	}

	const rl = readline.createInterface({
		input: fileStream,
		crlfDelay: Infinity
	});

	for await (const line of rl) {
		const json = JSON.parse(line);
		const { body } = json;
		const html = marked.parse(body);
		const root = parse(html);
		const text = root.textContent;
		// match both singular and plural variants of terms
		for (const [variant, term] of Object.entries(termVariants)) {
			if (text.includes(variant)) {
				const escaped = _.escapeRegExp(variant);
				if (new RegExp(`(\\b|\s|^)${escaped}(\\b|\s|\.|$)`).test(text)) {
					termCounts[term]++;
				}
			}
		}
	}

	const sortedWords = Object.keys(termCounts).sort((a, b) => termCounts[b] - termCounts[a]);

	// counts that will divide all observed terms more or less equally in 5 groups
	const dividers = new Array(5)
		.fill(null)
		.map((_, idx) => termCounts[sortedWords[Math.floor(((idx + 1) / 5) * sortedWords.length) - 1]]);

	const getPosition = (count) => 5 - dividers.findIndex((d) => d <= count);

	// term => score (1-5)
	const result = Object.fromEntries(
		sortedWords.map((word, idx) => [word, getPosition(termCounts[word])])
	);

	const debug = Object.fromEntries(sortedWords.map((word, idx) => [word, termCounts[word]]));

	await fs.promises.writeFile('stats/result.json', JSON.stringify(result, null, 2));
	await fs.promises.writeFile('stats/debug.json', JSON.stringify(debug, null, 2));
}

processLineByLine();
