const fs = require("fs");
const path = "src/data/themes.ts";
let s = fs.readFileSync(path, "utf8");
const map = {
  "gilded-cinema": ["gilded-curtain", "gilded"],
  "palace-envelope": ["ribbon-envelope", "royal"],
  "vivah-glow": ["vivah-festival", "festival"],
  "lotus-garden": ["lotus-garden", "garden"],
  "starlit-desert": ["cosmic-swipe", "cosmic"],
  "nova-pulse": ["nova-glitch", "cosmic"],
  "lantern-gold": ["lantern-fire", "festival"],
  "film-reel": ["film-poster", "classic"],
  "neon-terminal": ["cyber-terminal", "neon"],
  "temple-dawn": ["temple-dawn", "royal"],
  "classic-ornate": ["classic-ornate", "classic"],
  "soft-bloom": ["soft-bloom", "garden"],
  "velvet-royal": ["velvet-royal", "royal"],
  "velvet-soiree": ["gilded-curtain", "gilded"],
  "aurora-sky": ["aurora-orbit", "cosmic"],
  "island-sunset": ["island-sunset", "coastal"],
  "cinema-split": ["cinema-split", "classic"],
  "glass-float": ["glass-bento", "neon"],
  "poster-night": ["poster-night", "festival"],
  "heritage-arch": ["heritage-arch", "royal"],
  "mandala-orbit": ["mandala-orbit", "festival"],
  "celestial-ring": ["celestial-ring", "cosmic"],
  "petal-story": ["petal-story", "garden"],
  "neon-dual": ["neon-dual", "neon"],
  "noir-strip": ["noir-strip", "neon"],
  "ivory-edit": ["ivory-edit", "classic"],
};
for (const [id, [exp, mood]] of Object.entries(map)) {
  const re = new RegExp(
    `(id: "${id}",[\\s\\S]*?designStyle: "[^"]+",)\\n(\\s*)previewAccent:`,
  );
  if (!re.test(s)) {
    console.log("MISS", id);
    continue;
  }
  s = s.replace(
    re,
    `$1\n$2experience: "${exp}",\n$2musicMood: "${mood}",\n$2previewAccent:`,
  );
  console.log("OK", id);
}
fs.writeFileSync(path, s);
