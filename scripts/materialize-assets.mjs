import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
const assets = [
  ["ahmed-hisham.png", "client/public/images/ahmed-hisham.png"],
  ["ahmed-hisham-cv.pdf", "client/public/documents/ahmed-hisham-cv.pdf"],
];
for (const [name, destination] of assets) {
  mkdirSync(dirname(destination), { recursive: true });
  writeFileSync(destination, Buffer.from(readFileSync(`source-assets/${name}.base64`, "utf8").trim(), "base64"));
}
