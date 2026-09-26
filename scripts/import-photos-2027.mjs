// One-off: resize, compress and strip metadata from the AgInsight 2027 photo set.
// Run: node scripts/import-photos-2027.mjs "E:/aginsight/AgInsight Photos"
// Output: public/photos/<slug>-800.webp and -1600.webp (hero: 1280/1920/2560 + OG image).
// sharp drops EXIF/GPS/ICC metadata unless .withMetadata() is called; .rotate() bakes in EXIF orientation first.
import sharp from "sharp";
import { mkdirSync, readdirSync } from "node:fs";
import { join } from "node:path";

const SRC = process.argv[2];
const OUT = new URL("../public/photos/", import.meta.url).pathname.replace(/^\/(\w:)/, "$1");
mkdirSync(OUT, { recursive: true });

// source-file fragment -> clean, descriptive slug
const names = {
  "cow-961790": "hand-milking-cow",
  "pig-376713": "sow-and-piglet",
  "fighting-fish-2009972": "betta-fish",
  "cow-2788835": "cow-in-pasture",
  "hen-5642953": "hen-feeding",
  "birds-8611993": "laying-hens",
  "milk-3455395": "milking-machine",
  "tomatoes-8181194": "tomatoes-market",
  "meal-3175540": "fish-market",
  "boat-8270209": "aerial-fishing-boat",
  "tomatoes-1561565": "tomatoes-on-vine",
  "piglets-3741880": "piglets-in-straw",
  "siamese-fighting-fish-6542427": "betta-fish-pair",
  "garden-1282924": "cherry-tomato-harvest",
  "piglet-3386356": "sleeping-piglets",
  "chick-6652163": "chick-in-hand",
  "cows-4708901": "farmer-walking-cattle",
  "tractor-plowing-field": "aerial-tractor-ploughing",
  "drone-flying-over-crop-field": "drone-over-crop-field",
  "drone-hovering-over-a-field": "drone-sunset",
  "robotic-farming-technology": "robotic-greenhouse",
  "vertical-farm": "vertical-farm-lettuce",
  "person-holding-fresh-head-of-lettuce": "hydroponic-lettuce-harvest",
  "dried-fish-7765491": "dried-fish",
};

const webp = (img, width, file) =>
  img.clone().resize({ width, withoutEnlargement: true }).webp({ quality: 72, effort: 6 }).toFile(join(OUT, file));

for (const f of readdirSync(SRC)) {
  const key = Object.keys(names).find((k) => f.includes(k));
  if (!key) { console.warn("skipped", f); continue; }
  const slug = names[key];
  const img = sharp(join(SRC, f)).rotate();

  if (slug === "drone-sunset") {
    // Hero: keep the left 75% so the drone sits right of centre, clear of the headline
    const { width, height } = await img.metadata();
    const hero = img.clone().extract({ left: 0, top: 0, width: Math.round(width * 0.75), height });
    for (const w of [1280, 1920, 2560]) await webp(hero, w, `hero-drone-${w}.webp`);
    await hero.clone().resize(1200, 630, { fit: "cover", position: "right" }).jpeg({ quality: 82, mozjpeg: true })
      .toFile(join(OUT, "og-aginsight-2027-base.jpg"));
  }
  await webp(img, 800, `${slug}-800.webp`);
  await webp(img, 1600, `${slug}-1600.webp`);
  console.log(slug);
}
