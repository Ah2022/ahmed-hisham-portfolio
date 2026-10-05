import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
const assets = [
  ["smc-cover.webp", "client/public/images/projects/smc-cover.webp"],
  ["ceer-cover.webp", "client/public/images/projects/ceer-cover.webp"],
  ["envi-cover.webp", "client/public/images/projects/envi-cover.webp"],
  ["nbc-cover.webp", "client/public/images/projects/nbc-cover.webp"],
  ["nbc-cover.mp4", "client/public/videos/nbc-cover.mp4"],

  ["ahmed-hisham-logo.png", "client/public/images/ahmed-hisham-logo.png"],
  ["ahmed-hisham.png", "client/public/images/ahmed-hisham.png"],
  ["ahmed-hisham-cv.pdf", "client/public/documents/ahmed-hisham-cv.pdf"],
];
for (const [name, destination] of assets) {
  mkdirSync(dirname(destination), { recursive: true });
  writeFileSync(
    destination,
    Buffer.from(
      readFileSync(`source-assets/${name}.base64`, "utf8").trim(),
      "base64"
    )
  );
}
