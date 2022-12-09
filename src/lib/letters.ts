export const letters = [
  ...[...new Array(26)].map((_, i) => String.fromCharCode("A".charCodeAt(0) + i)),
  ":",
].sort();
