import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
const assets = [
  [
    ["smc-detail-level-1-medical-gas.webp.part1"],
    "client/public/images/projects/smc-detail-level-1-medical-gas.webp",
  ],
  [
    ["smc-detail-mri-room.webp.part1"],
    "client/public/images/projects/smc-detail-mri-room.webp",
  ],
  [
    ["smc-detail-water-treatment.webp.part1"],
    "client/public/images/projects/smc-detail-water-treatment.webp",
  ],
  [
    ["smc-detail-medical-gas-reserve.webp.part1"],
    "client/public/images/projects/smc-detail-medical-gas-reserve.webp",
  ],
  [
    ["smc-detail-patient-rooms.webp.part1"],
    "client/public/images/projects/smc-detail-patient-rooms.webp",
  ],
  [
    ["smc-detail-basement-1.webp.part1", "smc-detail-basement-1.webp.part2"],
    "client/public/images/projects/smc-detail-basement-1.webp",
  ],
  [
    ["smc-bathroom-ws.webp.part1"],
    "client/public/images/projects/smc-bathroom-ws.webp",
  ],
  [
    ["smc-bathroom-dr.webp.part1"],
    "client/public/images/projects/smc-bathroom-dr.webp",
  ],
  [
    ["smc-bathroom-shared.webp.part1"],
    "client/public/images/projects/smc-bathroom-shared.webp",
  ],
  [
    ["smc-model.webp.part1", "smc-model.webp.part2", "smc-model.webp.part3"],
    "client/public/images/projects/smc-model.webp",
  ],
  [
    ["smc-drainage.webp.part1", "smc-drainage.webp.part2"],
    "client/public/images/projects/smc-drainage.webp",
  ],
  [
    ["smc-medical-gas-01.webp.part1", "smc-medical-gas-01.webp.part2"],
    "client/public/images/projects/smc-medical-gas-01.webp",
  ],
  [
    ["smc-medical-gas-02.webp.part1", "smc-medical-gas-02.webp.part2"],
    "client/public/images/projects/smc-medical-gas-02.webp",
  ],
  [
    ["smc-fuel-oil.webp.part1"],
    "client/public/images/projects/smc-fuel-oil.webp",
  ],
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
