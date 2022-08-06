# Reproducing

Filtering all comments will take at least 1 hour (comments are over 300GB uncompressed)

1. Download `RC_2022-06.zst` from https://files.pushshift.io/reddit/comments/
2. Run `node stats/filter.js` - generates `filtered.json` (only comments from furry subreddits)
3. Run `node stats/stats.js` - generates `result.json` (score for each term)
