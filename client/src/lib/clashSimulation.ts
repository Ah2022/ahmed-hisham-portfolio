export interface SimElement {
  id: string;
  kind: "pipe" | "duct" | "conduit" | "beam";
  system: string;
  discipline: string;
  size: string;
  color: string;
  x: number;
  y: number;
  width: number;
  height: number;
  z: number;
  depth: number;
}
export const initialElements: SimElement[] = [
  {
    id: "CHW-P-102",
    kind: "pipe",
    system: "Chilled Water",
    discipline: "Plumbing",
    size: "Ø 150 mm",
    color: "#5eead4",
    x: 95,
    y: 160,
    width: 605,
    height: 15,
    z: 3000,
    depth: 150,
  },
  {
    id: "HVAC-D-204",
    kind: "duct",
    system: "Supply Air",
    discipline: "Mechanical",
    size: "700 × 400 mm",
    color: "#c4b5fd",
    x: 290,
    y: 55,
    width: 70,
    height: 250,
    z: 3000,
    depth: 400,
  },
  {
    id: "ELEC-C-031",
    kind: "conduit",
    system: "Electrical containment",
    discipline: "Electrical",
    size: "Ø 40 mm",
    color: "#fbbf24",
    x: 130,
    y: 230,
    width: 530,
    height: 4,
    z: 3000,
    depth: 40,
  },
  {
    id: "STR-B-017",
    kind: "beam",
    system: "Primary structure",
    discipline: "Structure",
    size: "450 × 600 mm",
    color: "#94a3b8",
    x: 570,
    y: 35,
    width: 45,
    height: 300,
    z: 3000,
    depth: 600,
  },
];
export interface SimClash {
  key: string;
  a: SimElement;
  b: SimElement;
  severity: "High" | "Medium";
  zone: { x: number; y: number; width: number; height: number };
}
export function detectClashes(elements: SimElement[]): SimClash[] {
  const clashes: SimClash[] = [];
  for (let i = 0; i < elements.length; i++)
    for (let j = i + 1; j < elements.length; j++) {
      const a = elements[i],
        b = elements[j];
      const x = Math.max(a.x, b.x),
        y = Math.max(a.y, b.y),
        right = Math.min(a.x + a.width, b.x + b.width),
        bottom = Math.min(a.y + a.height, b.y + b.height);
      const verticalOverlap = Math.abs(a.z - b.z) < (a.depth + b.depth) / 2;
      if (right > x && bottom > y && verticalOverlap)
        clashes.push({
          key: [a.id, b.id].sort().join("|"),
          a,
          b,
          severity: a.kind === "beam" || b.kind === "beam" ? "High" : "Medium",
          zone: { x, y, width: right - x, height: bottom - y },
        });
    }
  return clashes;
}
export function resolvedLayout(elements: SimElement[]): SimElement[] {
  // Deterministic demonstration only: preserve the beam and separate service envelopes vertically.
  const beam = elements.find(e => e.kind === "beam")!;
  const elevations = {
    pipe: beam.z - 700,
    duct: beam.z + 700,
    conduit: beam.z + 1100,
    beam: beam.z,
  };
  return elements.map(e => ({ ...e, z: elevations[e.kind] }));
}
export interface SimIssue {
  guid: string;
  key: string;
  title: string;
  severity: string;
  createdAt: string;
  elements: SimElement[];
}
export const xmlEscape = (s: string) =>
  s.replace(
    /[<>&"']/g,
    c =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        '"': "&quot;",
        "'": "&apos;",
      })[c]!
  );
export function issueMarkup(issue: SimIssue, active: boolean): string {
  const description = `Synthetic portfolio demonstration, L03. ${issue.elements.map(e => `${e.id}: ${e.system}, ${e.size}, centre elevation ${e.z} mm`).join("; ")}. Browser-only envelope intersection; no IFC model or validated rerouting solution.`;
  return `<?xml version="1.0" encoding="UTF-8"?><Markup><Topic Guid="${issue.guid}" TopicType="Clash" TopicStatus="${active ? "Open" : "Resolved"}"><Title>${xmlEscape(issue.title)}</Title><Priority>${issue.severity}</Priority><Labels>Portfolio demonstration</Labels><CreationDate>${issue.createdAt}</CreationDate><CreationAuthor>Portfolio Demo</CreationAuthor><Description>${xmlEscape(description)}</Description></Topic></Markup>`;
}
// Small uncompressed ZIP writer: BCF exchange is a ZIP container, not renamed JSON.
export function zipTextFiles(
  files: { name: string; content: string }[]
): Uint8Array {
  const enc = new TextEncoder(),
    chunks: Uint8Array[] = [],
    central: Uint8Array[] = [];
  let offset = 0;
  const crc32 = (bytes: Uint8Array) => {
    let crc = 0xffffffff;
    for (let n = 0; n < bytes.length; n++) {
      crc ^= bytes[n];
      for (let i = 0; i < 8; i++)
        crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
    }
    return (crc ^ 0xffffffff) >>> 0;
  };
  for (const file of files) {
    const name = enc.encode(file.name),
      data = enc.encode(file.content),
      crc = crc32(data);
    const header = new Uint8Array(30 + name.length),
      h = new DataView(header.buffer);
    h.setUint32(0, 0x04034b50, true);
    h.setUint16(4, 20, true);
    h.setUint16(6, 0x800, true);
    h.setUint16(12, 33, true);
    h.setUint32(14, crc, true);
    h.setUint32(18, data.length, true);
    h.setUint32(22, data.length, true);
    h.setUint16(26, name.length, true);
    header.set(name, 30);
    chunks.push(header, data);
    const entry = new Uint8Array(46 + name.length),
      v = new DataView(entry.buffer);
    v.setUint32(0, 0x02014b50, true);
    v.setUint16(4, 20, true);
    v.setUint16(6, 20, true);
    v.setUint16(8, 0x800, true);
    v.setUint16(14, 33, true);
    v.setUint32(16, crc, true);
    v.setUint32(20, data.length, true);
    v.setUint32(24, data.length, true);
    v.setUint16(28, name.length, true);
    v.setUint32(42, offset, true);
    entry.set(name, 46);
    central.push(entry);
    offset += header.length + data.length;
  }
  const centralSize = central.reduce((s, c) => s + c.length, 0),
    end = new Uint8Array(22),
    v = new DataView(end.buffer);
  v.setUint32(0, 0x06054b50, true);
  v.setUint16(8, files.length, true);
  v.setUint16(10, files.length, true);
  v.setUint32(12, centralSize, true);
  v.setUint32(16, offset, true);
  const output = new Uint8Array(offset + centralSize + 22);
  let cursor = 0;
  for (const c of [...chunks, ...central, end]) {
    output.set(c, cursor);
    cursor += c.length;
  }
  return output;
}
export function downloadFile(name: string, data: BlobPart, type: string) {
  const url = URL.createObjectURL(new Blob([data], { type }));
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
