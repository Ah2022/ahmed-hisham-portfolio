export type HeroModeId =
  | "structure"
  | "mep"
  | "electrical"
  | "clashes"
  | "automation";

export interface HeroMode {
  id: HeroModeId;
  label: string;
  color: string;
  title: string;
  description: string;
  metrics: { value: string; label: string }[];
  labels: [string, string, string];
}

// Portfolio facts come from Ahmed's CV. The building is an illustrative diagram,
// not a live project model; structure/electrical represent coordination context.
export const heroModes: HeroMode[] = [
  {
    id: "structure",
    label: "Structure",
    color: "#7dd3fc",
    title: "Structural context mode",
    description:
      "Coordinating plumbing and fire protection around structural cores, slabs and service openings in high-rise environments.",
    metrics: [
      { value: "4 towers", label: "NBC project context" },
      { value: "56 floors", label: "Per tower · project scale" },
      { value: "LOD 350–400", label: "MEP delivery scope" },
    ],
    labels: ["Structural core", "Slab interfaces", "Service openings"],
  },
  {
    id: "mep",
    label: "MEP",
    color: "#5eead4",
    title: "MEP coordination mode",
    description:
      "Construction-ready plumbing and fire protection models, coordinated with architectural, structural and other MEP disciplines.",
    metrics: [
      { value: "4 projects", label: "Egypt & Saudi Arabia" },
      { value: "LOD 350–400", label: "Models & shop drawings" },
      { value: "Plumbing + FP", label: "Primary specialisms" },
    ],
    labels: [
      "Water supply risers",
      "Fire protection routes",
      "Mechanical floor",
    ],
  },
  {
    id: "electrical",
    label: "Electrical",
    color: "#fbbf24",
    title: "Electrical interface mode",
    description:
      "Checking plumbing routes against electrical packages to coordinate shared service zones. Electrical systems are shown as coordination context.",
    metrics: [
      { value: "CEER", label: "Industrial project context" },
      { value: "LOD 400", label: "Plumbing model delivery" },
      { value: "Cross-trade", label: "Route coordination" },
    ],
    labels: ["Electrical package", "Shared service zone", "Plumbing interface"],
  },
  {
    id: "clashes",
    label: "Clashes",
    color: "#fb7185",
    title: "Clash resolution mode",
    description:
      "Detect conflicts, group related issues and follow them through resolution. The highlighted intersections illustrate the coordination workflow.",
    metrics: [
      { value: "Live Monitor", label: "ClashResolveAI capability" },
      { value: "BCF 2.1", label: "Issue exchange" },
      { value: "SQLite", label: "Issue lifecycle tracking" },
    ],
    labels: [
      "Pipe / slab conflict",
      "Clearance review",
      "Tracked coordination issue",
    ],
  },
  {
    id: "automation",
    label: "Automation",
    color: "#c4b5fd",
    title: "BIM automation mode",
    description:
      "Turning repetitive coordination and calculation tasks into purpose-built Revit tools with C#, Python and pyRevit.",
    metrics: [
      { value: "3 tools", label: "In-house BIM engines" },
      { value: "C# + Python", label: "Development stack" },
      { value: "Revit API", label: "Model integration" },
    ],
    labels: ["Model scanner", "Rule-driven checks", "Reports & issue store"],
  },
];
