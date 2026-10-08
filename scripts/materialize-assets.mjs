import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
const assets = [
  [
    "al-shafaa-architecture.png",
    "client/public/images/projects/al-shafaa-architecture.png",
  ],
  [
    ["al-shafaa-all.webp.part1", "al-shafaa-all.webp.part2"],
    "client/public/images/projects/al-shafaa-all.webp",
  ],
  [
    ["al-shafaa-drain.webp.part1", "al-shafaa-drain.webp.part2"],
    "client/public/images/projects/al-shafaa-drain.webp",
  ],
  [
    ["al-shafaa-water.webp.part1", "al-shafaa-water.webp.part2"],
    "client/public/images/projects/al-shafaa-water.webp",
  ],
  [
    "al-shafaa-drawing.png",
    "client/public/images/projects/al-shafaa-drawing.png",
  ],
  [
    ["al-shafaa-drain.pdf.part1", "al-shafaa-drain.pdf.part2"],
    "client/public/documents/projects/al-shafaa-ground-floor-drain.pdf",
  ],
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
      Array.isArray(name)
        ? name
            .map(part =>
              readFileSync(`source-assets/${part}.base64`, "utf8").trim()
            )
            .join("")
        : readFileSync(`source-assets/${name}.base64`, "utf8").trim(),
      "base64"
    )
  );
}
