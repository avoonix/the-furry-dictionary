import fs from "fs";
import readline from "readline";
import { marked } from "marked";
import { parse } from "node-html-parser";
import _ from "lodash";
import pluralize from "pluralize";
import glob from "tiny-glob";

async function getTerms() {
  const entries = await glob("definitions/**/*.md");
  return entries.map((e) =>
    e
      .replace(/\.md/, "")
      .replace(/^definitions\//, "")
      .toLowerCase(),
  );
}

async function processLineByLine() {
  const termCounts = {};
  const fileStream = fs.createReadStream("stats/filtered.json");
  const terms = await getTerms();

  const termVariants = Object.fromEntries([
    ...terms
      .filter((term) => !["bean", "beans"].includes(term))
      .flatMap((term) => [
        [pluralize.singular(term), term],
        [pluralize.plural(term), term],
      ]),
    // pluralizing changes their meaning
    ["bean", "bean"],
    ["beans", "beans"],
  ]);

  for (const term of terms) {
    termCounts[term] = 0;
  }

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
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

  const max = termCounts[sortedWords[0]];

  const convertToScale = (num) => (isFinite(num) ? Math.min(5, num + 2) : 1);

  // term => score (1-5)
  const result = Object.fromEntries(
    sortedWords.map((word, idx) => [
      word,
      convertToScale(Math.floor((Math.log(termCounts[word]) / Math.log(max)) * 4)),
    ]),
  );

  // term => count
  const debug = Object.fromEntries(sortedWords.map((word, idx) => [word, termCounts[word]]));

  await fs.promises.writeFile("stats/result.json", JSON.stringify(result, null, 2));
  await fs.promises.writeFile("stats/debug.json", JSON.stringify(debug, null, 2));
}

processLineByLine();
