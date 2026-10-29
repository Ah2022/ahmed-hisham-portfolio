import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
const assets = [
  [["ceer-sheet-ASP-MBL-PL2-00-SD-PH-00026.pdf.part1", "ceer-sheet-ASP-MBL-PL2-00-SD-PH-00026.pdf.part2"], "client/public/documents/projects/ceer-sheets/ASP-MBL-PL2-00-SD-PH-00026.pdf"],
  [["ceer-sheet-ASP-MBL-PL2-00-SD-PH-00026.webp.part1"], "client/public/images/projects/ceer-sheets/ASP-MBL-PL2-00-SD-PH-00026.webp"],
  [["ceer-sheet-ASP-MBL-PL2-XX-SD-PH-00116.pdf.part1", "ceer-sheet-ASP-MBL-PL2-XX-SD-PH-00116.pdf.part2"], "client/public/documents/projects/ceer-sheets/ASP-MBL-PL2-XX-SD-PH-00116.pdf"],
  [["ceer-sheet-ASP-MBL-PL2-XX-SD-PH-00116.webp.part1"], "client/public/images/projects/ceer-sheets/ASP-MBL-PL2-XX-SD-PH-00116.webp"],
  [["ceer-sheet-ASP-MBL-PL2-XX-SD-PH-00119.pdf.part1"], "client/public/documents/projects/ceer-sheets/ASP-MBL-PL2-XX-SD-PH-00119.pdf"],
  [["ceer-sheet-ASP-MBL-PL2-XX-SD-PH-00119.webp.part1"], "client/public/images/projects/ceer-sheets/ASP-MBL-PL2-XX-SD-PH-00119.webp"],
  [["ceer-sheet-ASP-MBL-PL2-XX-SD-PH-00115.pdf.part1", "ceer-sheet-ASP-MBL-PL2-XX-SD-PH-00115.pdf.part2"], "client/public/documents/projects/ceer-sheets/ASP-MBL-PL2-XX-SD-PH-00115.pdf"],
  [["ceer-sheet-ASP-MBL-PL2-XX-SD-PH-00115.webp.part1"], "client/public/images/projects/ceer-sheets/ASP-MBL-PL2-XX-SD-PH-00115.webp"],
  [["ceer-sheet-ASP-MBL-PL2-00-SD-PH-00025.pdf.part1", "ceer-sheet-ASP-MBL-PL2-00-SD-PH-00025.pdf.part2"], "client/public/documents/projects/ceer-sheets/ASP-MBL-PL2-00-SD-PH-00025.pdf"],
  [["ceer-sheet-ASP-MBL-PL2-00-SD-PH-00025.webp.part1"], "client/public/images/projects/ceer-sheets/ASP-MBL-PL2-00-SD-PH-00025.webp"],
  [["ceer-sheet-MAS-ARC-PL2-00-SD-PH-04201.pdf.part1", "ceer-sheet-MAS-ARC-PL2-00-SD-PH-04201.pdf.part2"], "client/public/documents/projects/ceer-sheets/MAS-ARC-PL2-00-SD-PH-04201.pdf"],
  [["ceer-sheet-MAS-ARC-PL2-00-SD-PH-04201.webp.part1"], "client/public/images/projects/ceer-sheets/MAS-ARC-PL2-00-SD-PH-04201.webp"],
  [["ceer-sheet-MAS-ARC-PL2-00-SD-PH-01407.pdf.part1", "ceer-sheet-MAS-ARC-PL2-00-SD-PH-01407.pdf.part2"], "client/public/documents/projects/ceer-sheets/MAS-ARC-PL2-00-SD-PH-01407.pdf"],
  [["ceer-sheet-MAS-ARC-PL2-00-SD-PH-01407.webp.part1"], "client/public/images/projects/ceer-sheets/MAS-ARC-PL2-00-SD-PH-01407.webp"],
  [["ceer-sheet-MAS-ARC-PL2-00-SD-PH-01307.pdf.part1", "ceer-sheet-MAS-ARC-PL2-00-SD-PH-01307.pdf.part2"], "client/public/documents/projects/ceer-sheets/MAS-ARC-PL2-00-SD-PH-01307.pdf"],
  [["ceer-sheet-MAS-ARC-PL2-00-SD-PH-01307.webp.part1"], "client/public/images/projects/ceer-sheets/MAS-ARC-PL2-00-SD-PH-01307.webp"],

  [["nbc-sheet-NBC-07-MAAP-DD-TW-A-F34-FP-DWG-1234.pdf.part1", "nbc-sheet-NBC-07-MAAP-DD-TW-A-F34-FP-DWG-1234.pdf.part2"], "client/public/documents/projects/nbc-sheets/NBC-07-MAAP-DD-TW-A-F34-FP-DWG-1234.pdf"],
  [["nbc-sheet-NBC-07-MAAP-DD-TW-A-F34-FP-DWG-1234.webp.part1"], "client/public/images/projects/nbc-sheets/NBC-07-MAAP-DD-TW-A-F34-FP-DWG-1234.webp"],
  [["nbc-sheet-NBC-07-MAAP-DD-TW-A-F28-FP-DWG-1228.pdf.part1", "nbc-sheet-NBC-07-MAAP-DD-TW-A-F28-FP-DWG-1228.pdf.part2"], "client/public/documents/projects/nbc-sheets/NBC-07-MAAP-DD-TW-A-F28-FP-DWG-1228.pdf"],
  [["nbc-sheet-NBC-07-MAAP-DD-TW-A-F28-FP-DWG-1228.webp.part1"], "client/public/images/projects/nbc-sheets/NBC-07-MAAP-DD-TW-A-F28-FP-DWG-1228.webp"],
  [["nbc-sheet-NBC-07-MAAP-DD-TW-A-F15-FP-DWG-000.pdf.part1", "nbc-sheet-NBC-07-MAAP-DD-TW-A-F15-FP-DWG-000.pdf.part2", "nbc-sheet-NBC-07-MAAP-DD-TW-A-F15-FP-DWG-000.pdf.part3"], "client/public/documents/projects/nbc-sheets/NBC-07-MAAP-DD-TW-A-F15-FP-DWG-000.pdf"],
  [["nbc-sheet-NBC-07-MAAP-DD-TW-A-F15-FP-DWG-000.webp.part1"], "client/public/images/projects/nbc-sheets/NBC-07-MAAP-DD-TW-A-F15-FP-DWG-000.webp"],
  [["nbc-sheet-NBC-07-MAAP-D.D-TW-A-F34-PW-DWG-1334.pdf.part1", "nbc-sheet-NBC-07-MAAP-D.D-TW-A-F34-PW-DWG-1334.pdf.part2"], "client/public/documents/projects/nbc-sheets/NBC-07-MAAP-D.D-TW-A-F34-PW-DWG-1334.pdf"],
  [["nbc-sheet-NBC-07-MAAP-D.D-TW-A-F34-PW-DWG-1334.webp.part1"], "client/public/images/projects/nbc-sheets/NBC-07-MAAP-D.D-TW-A-F34-PW-DWG-1334.webp"],
  [["nbc-sheet-NBC-07-MAAP-D.D-TW-A-F28-PW-DWG-1328.pdf.part1", "nbc-sheet-NBC-07-MAAP-D.D-TW-A-F28-PW-DWG-1328.pdf.part2"], "client/public/documents/projects/nbc-sheets/NBC-07-MAAP-D.D-TW-A-F28-PW-DWG-1328.pdf"],
  [["nbc-sheet-NBC-07-MAAP-D.D-TW-A-F28-PW-DWG-1328.webp.part1"], "client/public/images/projects/nbc-sheets/NBC-07-MAAP-D.D-TW-A-F28-PW-DWG-1328.webp"],
  [["nbc-sheet-NBC-07-MAAP-DD-TW-A-F28-PD-DWG-1428.pdf.part1", "nbc-sheet-NBC-07-MAAP-DD-TW-A-F28-PD-DWG-1428.pdf.part2", "nbc-sheet-NBC-07-MAAP-DD-TW-A-F28-PD-DWG-1428.pdf.part3"], "client/public/documents/projects/nbc-sheets/NBC-07-MAAP-DD-TW-A-F28-PD-DWG-1428.pdf"],
  [["nbc-sheet-NBC-07-MAAP-DD-TW-A-F28-PD-DWG-1428.webp.part1"], "client/public/images/projects/nbc-sheets/NBC-07-MAAP-DD-TW-A-F28-PD-DWG-1428.webp"],
  [["nbc-sheet-NBC-07-MAAP-DD-TW-A-ALL-PD-DWG-0070.pdf.part1", "nbc-sheet-NBC-07-MAAP-DD-TW-A-ALL-PD-DWG-0070.pdf.part2", "nbc-sheet-NBC-07-MAAP-DD-TW-A-ALL-PD-DWG-0070.pdf.part3", "nbc-sheet-NBC-07-MAAP-DD-TW-A-ALL-PD-DWG-0070.pdf.part4", "nbc-sheet-NBC-07-MAAP-DD-TW-A-ALL-PD-DWG-0070.pdf.part5", "nbc-sheet-NBC-07-MAAP-DD-TW-A-ALL-PD-DWG-0070.pdf.part6"], "client/public/documents/projects/nbc-sheets/NBC-07-MAAP-DD-TW-A-ALL-PD-DWG-0070.pdf"],
  [["nbc-sheet-NBC-07-MAAP-DD-TW-A-ALL-PD-DWG-0070.webp.part1"], "client/public/images/projects/nbc-sheets/NBC-07-MAAP-DD-TW-A-ALL-PD-DWG-0070.webp"],

  ["nbc-mechanical-context.webp", "client/public/images/projects/nbc-mechanical-context.webp"],
  ["nbc-mechanical-services.webp", "client/public/images/projects/nbc-mechanical-services.webp"],
  ["nbc-typical-floor.webp", "client/public/images/projects/nbc-typical-floor.webp"],
  ["nbc-tower-b.webp", "client/public/images/projects/nbc-tower-b.webp"],
  ["nbc-drainage.webp", "client/public/images/projects/nbc-drainage.webp"],
  ["nbc-water-supply.webp", "client/public/images/projects/nbc-water-supply.webp"],
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
