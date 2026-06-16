const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const SRC = path.join(__dirname, "..", "src", "assets", "brp");
const DEST = path.join(__dirname, "..", "src", "assets", "optimized");
const widths = [480, 768, 1200];

if (!fs.existsSync(DEST)) fs.mkdirSync(DEST, { recursive: true });

async function processFile(file) {
  const ext = path.extname(file).toLowerCase();
  const name = path.basename(file, ext);
  const infile = path.join(SRC, file);
  try {
    const metadata = await sharp(infile).metadata();
    for (const w of widths) {
      if (metadata.width && metadata.width < w) continue; // skip if source smaller
      const outWebp = path.join(DEST, `${name}-${w}.webp`);
      const outAvif = path.join(DEST, `${name}-${w}.avif`);
      await sharp(infile).resize({ width: w }).webp({ quality: 78 }).toFile(outWebp);
      await sharp(infile).resize({ width: w }).avif({ quality: 60 }).toFile(outAvif);
    }
    // also produce a default optimized WebP without resize
    const outWebpDefault = path.join(DEST, `${name}.webp`);
    await sharp(infile).webp({ quality: 78 }).toFile(outWebpDefault);
    console.log("Optimized", file);
  } catch (err) {
    console.error("Failed", file, err && err.message ? err.message : err);
  }
}

(async () => {
  const files = fs.readdirSync(SRC).filter((f) => /\.(png|jpe?g|webp)$/i.test(f));
  for (const f of files) await processFile(f);
  console.log("Done");
})();
