# Reproducing

Preprocessing (filtering) all comments will take a while (comments are over 300GB uncompressed)

1. Download `RC_2023-03.zst` from https://files.pushshift.io/reddit/comments/ (alternatives: https://the-eye.eu/redarcs/, https://academictorrents.com/details/9971c68d2909843a100ae955c6ab6de3e09c04a1, https://archive.org/download/pushshift-reddit-2023-03)
2. Run `pnpm stats:preprocess` - generates `preprocessed.json` (only comments from furry subreddits) will take a while (>240M comments)
3. Run `pnpm stats:generate` - generates `result.json` (score for each term)

