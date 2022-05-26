//@ts-check
import { chromium } from 'playwright';
import { readdir } from "fs/promises"

(async () => {
	const browser = await chromium.launch({headless: true});

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
	};

    const promises = [];
    const entries = await readdir("./definitions")
    for( const entry of entries) {
        if(!entry.endsWith(".md")) continue;
	    promises.push(takeScreenshotOfTerm(entry.replace(/\.md/,"")));
    }
    await Promise.allSettled(promises);

	await browser.close();
})();
