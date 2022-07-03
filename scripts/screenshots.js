//@ts-check
import { chromium } from 'playwright';
import { readdir } from 'fs/promises';
import { createServer } from 'http-server';

(async () => {
	const server = createServer({ root: 'build' });
	server.listen(3000);

	const browser = await chromium.launch({ headless: true });
	let done = 0;

	const takeScreenshotOfTerm = async (/** @type {string} */ term) => {
		const page = await browser.newPage({
			viewport: { height: 1920 / 2, width: 1080 },
			deviceScaleFactor: 1,
			colorScheme: 'dark'
		});
		await page.goto(`http://localhost:3000/${term}`);
		await page.addStyleTag({
			content: `.prose { padding: 32px; } .term-buttons { display: none; }`
		});
		page.screenshot({});
		await page.locator('.prose').screenshot({ path: `./build/terms/${term}.png`, scale: 'device' });
		await page.close();
		done++;
		console.log(`screenshots taken: ${done}`);
	};

	const promises = [];
	const entries = await readdir('./definitions');
	for (const entry of entries) {
		if (!entry.endsWith('.md')) continue;
		promises.push(takeScreenshotOfTerm(entry.replace(/\.md/, '')));
	}
	const results = await Promise.allSettled(promises);

	for (const result of results) {
		if (result.status === 'rejected') {
			console.log(result);
		}
	}

	await browser.close();
	server.close();
	process.exit(0);
})();
