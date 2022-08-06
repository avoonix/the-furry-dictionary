// @ts-check
import fs from 'fs';
import readline from 'readline';
import { spawn } from 'child_process';

// https://www.reddit.com/r/furry/wiki/related/, https://www.furaffinity.net/journal/5147231
const allowedSubreddits = {
	anthro: true,
	dragons: true,
	chakat: true,
	feathery: true,
	feralfur: true,
	flobby: true,
	furry: true,
	furryautos: true,
	furrydiscuss: true,
	furryjerk: true,
	furrymakers: true,
	furrymemes: true,
	FurryMusicians: true,
	furryAMA: true,
	furrykikpals: true,
	furry_catwalk: true,
	furry_comics: true,
	furry_wordsmith: true,
	furryartschool: true,
	FurrySupport: true,
	FurryWallpapers: true,
	furryrp: true,
	ChristianFurries: true,
	furryworld: true,
	FurryTelegramPals: true,
	fursona: true,
	fursuit: true,
	graymuzzles: true,
	huskysilver: true,
	lapfoxtrax: true,
	pokefurs: true,
	r4rFurry: true,
	SergalLanguage: true,
	straightfurries: true,
	SecondLifeFurry: true,
	scaley: true,
	sergalsergalsergal: true,
	SlightlyDamned: true,
	teenfur: true,
	twokinds: true,
	TheDailyCat: true,
	WagInHeaven: true,
	gamefurs: true,
	furry_irl: true,
	Furries: true,
	Minecraftfurs: true,
	fursuitsex: true,
	babyfur: true,
	FurryGaming: true,
	furrydrama: true,
	yiff: true,
	furryporn: true,
	FurryGoneWild: true,
	transformation: true,
	FurryPaws: true,
	Yiffbondage: true
};

async function processLineByLine() {
	const proc = spawn('zstdcat', ['stats/RC_2022-06.zst', '--long=31']);
	let linesRead = 0;
	const writeStream = fs.createWriteStream('filtered.json');

	const rl = readline.createInterface({
		input: proc.stdout,
		crlfDelay: Infinity
	});

	for await (const line of rl) {
		linesRead++;
		if (linesRead % 1000000 === 0) {
			console.log(`read ${linesRead} lines`);
		}
		const json = JSON.parse(line);
		const subreddit = json.subreddit;
		if (!allowedSubreddits[subreddit]) continue;
		const body = json.body.toLowerCase();
		writeStream.write(JSON.stringify({ body, subreddit }) + '\n');
	}
	writeStream.end();
}

processLineByLine();
