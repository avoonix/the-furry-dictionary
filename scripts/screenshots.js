//@ts-check
import { chromium } from "playwright";
import { readdir } from "fs/promises";
import { createServer } from "http-server";
import glob from "tiny-glob";

const second = 1000;
const minute = 60 * second;

async function getTerms() {
  const entries = await glob("definitions/**/*.md");
  return entries.map((e) => e.replace(/\.md/, "").replace(/^definitions\//, ""));
}

(async () => {
  const server = createServer({ root: "build" });
  server.listen(3000);

  const browser = await chromium.launch({ headless: true });
  let done = 0;

  const takeScreenshotOfTerm = async (/** @type {string} */ term) => {
    const page = await browser.newPage({
      viewport: { height: 1920 / 2, width: 1080 },
      deviceScaleFactor: 1,
      colorScheme: "dark",
    });
    await page.goto(`http://localhost:3000/${term}`, { timeout: 3 * minute });
    await page.addStyleTag({
      content: `.prose { padding: 32px; } .term-buttons { display: none; }`,
    });
    await page
      .locator(".prose")
      .screenshot({ path: `./build/terms/${term}.png`, scale: "device", timeout: 3 * minute });
    await page.close();
    done++;
    console.log(`${term} screenshot taken - ${done} so far`);
  };

  const promises = [];
  for (const entry of await getTerms()) {
    promises.push(takeScreenshotOfTerm(entry));
  }
  const results = await Promise.allSettled(promises);

  for (const result of results) {
    if (result.status === "rejected") {
      console.log(result);
    }
  }

  await browser.close();
  server.close();
  process.exit(0);
})();
