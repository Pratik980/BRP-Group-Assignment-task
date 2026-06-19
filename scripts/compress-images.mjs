import { existsSync, readdirSync, renameSync, statSync, unlinkSync } from "node:fs";
import { dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const targets = [
  join(root, "src", "assets", "optimized"),
  join(root, "public", "site-assets"),
];

const MAX_WIDTH = 1920;
const WEBP_QUALITY = 82;

async function compressFile(filePath) {
  const ext = extname(filePath).toLowerCase();
  if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) return;

  const meta = await sharp(filePath).metadata();
  let pipeline = sharp(filePath).rotate();
  if ((meta.width ?? 0) > MAX_WIDTH) {
    pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  }

  const webpPath =
    ext === ".webp" ? `${filePath}.tmp` : filePath.replace(/\.(jpe?g|png)$/i, ".webp");

  await pipeline.webp({ quality: WEBP_QUALITY }).toFile(webpPath);

  if (ext === ".webp") {
    unlinkSync(filePath);
    renameSync(webpPath, filePath);
  } else {
    unlinkSync(filePath);
  }

  console.log(`  ✓ ${webpPath.replace(root, "")}`);
}

async function walk(dir) {
  if (!existsSync(dir)) return;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      await walk(full);
      continue;
    }
    await compressFile(full);
  }
}

console.log("Compressing images…");
for (const dir of targets) {
  if (!existsSync(dir)) continue;
  console.log(`\n${dir.replace(root, "")}`);
  await walk(dir);
}
console.log("\nDone.");
