import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = join(root, "src", "assets", "optimized");
const destDir = join(root, "public", "site-assets");

const files = [
  "reddot.webp",
  "shs.webp",
  "satin-leaf.webp",
  "logo-BRP.webp",
  "uv-ventures.webp",
  "Brp-tours-and-travel.webp",
  "Brp-sir-image.webp",
  "Ubin-Pokherel-1200.webp",
  "Bidushi-Pandey-Pokherel-1200.webp",
  "Brp-Group-1200.webp",
  "BRPGrouplogo.png",
  "image-1.webp",
  "image-2.webp",
  "image-3.webp",
  "image-4.webp",
  "image-5.webp",
  "image-6.webp",
  "legacy-image-1200.webp",
  "childrents-1200.webp",
  "hall-of-frame.webp",
];

mkdirSync(destDir, { recursive: true });
let copied = 0;
for (const file of files) {
  const from = join(srcDir, file);
  const to = join(destDir, file);
  if (!existsSync(from)) {
    console.warn(`Skip (missing): ${file}`);
    continue;
  }
  copyFileSync(from, to);
  copied++;
}
console.log(`Copied ${copied} files to public/site-assets/`);
