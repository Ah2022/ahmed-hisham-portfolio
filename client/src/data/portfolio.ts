export type ProjectCategory =
  | "Healthcare"
  | "High-rise"
  | "Industrial"
  | "Hospitality";
export interface Project {
  slug: string;
  name: string;
  shortName: string;
  category: ProjectCategory;
  location: string;
  role: string;
  color: string;
  lod: string;
  overview: string;
  scope: string;
  metrics: { value: string; label: string }[];
  systems: string[];
  software: string[];
  challenge: string;
  solution: string;
  workflow: string[];
  deliverables: string[];
  coordination: string;
  result: string;
  relatedTools: string[];
  levels: string[];
  annotations: string[];
  mediaNeeded: string[];
}

// Content source: Ahmed's supplied CV, October 2026. Project scale is explicitly
// distinguished from personal delivery. No unverified performance figures.
export const projects: Project[] = [
  {
    slug: "smc-hospital",
    name: "Specialized Medical Center 3",
    shortName: "SMC 3 Hospital",
    category: "Healthcare",
    location: "Riyadh, Saudi Arabia",
    role: "BIM modelling & shop drawing delivery",
    color: "#67e8f9",
    lod: "LOD 400",
    overview:
      "A 300-bed hospital with five basements, ground floor, eight upper floors and a roof. DAR is the design consultant identified in the CV.",
    scope:
      "Medical gas, drainage, water supply and fuel oil modelling and documentation, including pump rooms, tank areas and hot water plant.",
    metrics: [
      { value: "70,900 m²", label: "Hospital project area" },
      { value: "300 beds", label: "Project capacity" },
      { value: "LOD 400", label: "Ahmed's model delivery" },
    ],
    systems: ["Water supply", "Drainage", "Medical gas", "Fuel oil"],
    software: ["Revit", "Navisworks"],
    challenge:
      "Coordinating multiple hospital service networks and equipment spaces within a multidisciplinary building model.",
    solution:
      "Modelled the service networks and plant spaces to the project design basis, produced shop drawings and resolved clashes through Navisworks coordination rounds.",
    workflow: [
      "Review the project design basis and service requirements",
      "Develop service networks, pump rooms and tank areas in Revit",
      "Coordinate oxygen distribution against HTM 02-01 demand loads",
      "Review multidisciplinary clashes in Navisworks",
      "Prepare coordinated shop drawing documentation",
    ],
    deliverables: [
      "LOD 400 service models",
      "Plumbing and medical gas shop drawings",
      "Fuel storage and distribution model",
      "Pump-room and plant-space modelling",
    ],
    coordination:
      "Multidisciplinary Navisworks coordination rounds, with model updates in Revit. Medical gas modelling followed the HTM 02-01 design basis stated in the CV.",
    result:
      "Produced LOD 400 models and shop drawings across four service systems, including hospital plant spaces.",
    relatedTools: ["clashresolveai", "bim-engine", "plumbing-engine"],
    levels: [
      "B5",
      "B4",
      "B3",
      "B2",
      "B1",
      "Ground",
      "Level 01",
      "Level 02",
      "Level 03",
      "Level 04",
      "Level 05",
      "Level 06",
      "Level 07",
      "Level 08",
      "Roof",
    ],
    annotations: [
      "Service distribution",
      "Plant-space interfaces",
      "Medical gas coordination",
    ],
    mediaNeeded: [
      "Coordinated Revit service view",
      "Pump-room or plant-room section",
      "Medical gas drawing crop",
      "Matched before/after clash views",
    ],
  },
  {
    slug: "nile-business-city",
    name: "Nile Business City",
    shortName: "Nile Business City",
    category: "High-rise",
    location: "New Administrative Capital, Egypt",
    role: "Plumbing & fire protection BIM modelling and coordination",
    color: "#c4b5fd",
    lod: "LOD 350–400",
    overview:
      "A four-tower complex with two hotel and two office towers. The CV describes 56 floors and 233 metres per tower, with 224 floors across the project.",
    scope:
      "Water supply, drainage and fire protection models and shop drawings on typical and mechanical floors. Contributions included mechanical-floor modelling and storage tank volume design.",
    metrics: [
      { value: "4 towers", label: "Overall project context" },
      { value: "56 floors", label: "Per tower · project scale" },
      { value: "LOD 350–400", label: "Ahmed's delivery scope" },
    ],
    systems: ["Water supply", "Drainage", "Fire protection"],
    software: ["Revit"],
    challenge:
      "Maintaining coordinated service distribution across typical floors, vertical risers and mechanical-floor interfaces in a high-rise environment.",
    solution:
      "Produced execution-stage Revit models and shop drawings, modelled mechanical floors and contributed to storage tank volume design while coordinating with other disciplines.",
    workflow: [
      "Review typical-floor and mechanical-floor requirements",
      "Model water, drainage and fire protection systems",
      "Coordinate riser and mechanical-floor interfaces",
      "Contribute to storage tank volume design",
      "Produce models and shop drawings for execution",
    ],
    deliverables: [
      "Typical-floor service models",
      "Mechanical-floor models",
      "Plumbing and fire protection shop drawings",
      "Tank-volume design contribution",
    ],
    coordination:
      "Interdisciplinary coordination with architectural, structural and MEP packages. The CV describes ISO 19650 / BIM Level 2 workflows at LOD 350–400.",
    result:
      "Delivered modelling and documentation contributions for typical and mechanical floors. The full tower/floor count describes project scale, not an assertion that Ahmed modelled every floor.",
    relatedTools: ["clashresolveai", "plumbing-engine"],
    levels: [
      "Typical floor",
      "Mechanical floor",
      "Riser interface",
      "Tank area",
    ],
    annotations: [
      "Vertical distribution",
      "Mechanical floor",
      "Tank-area interface",
    ],
    mediaNeeded: [
      "Mechanical-floor Revit view",
      "Typical-floor shop drawing",
      "Riser section",
      "Tank-area model or calculation excerpt",
    ],
  },
  {
    slug: "ceer-automotive-park",
    name: "Ceer Automotive Supplier Park",
    shortName: "CEER Supplier Park",
    category: "Industrial",
    location: "KAEC, Saudi Arabia",
    role: "Plumbing BIM modelling & shop drawing delivery",
    color: "#fbbf24",
    lod: "LOD 400",
    overview:
      "Industrial facilities within Ceer's electric vehicle manufacturing hub in King Abdullah Economic City. The CV identifies work with EMCO.",
    scope:
      "Water supply and drainage modelling and shop drawings, coordinated with HVAC, fire fighting and electrical packages.",
    metrics: [
      { value: "LOD 400", label: "Plumbing model delivery" },
      { value: "2 systems", label: "Water supply & drainage" },
      { value: "KAEC", label: "Project location" },
    ],
    systems: ["Water supply", "Drainage"],
    software: ["Revit"],
    challenge:
      "Coordinating industrial plumbing routes with other building-services packages across an industrial programme.",
    solution:
      "Developed LOD 400 plumbing models and shop drawings and coordinated routing interfaces with HVAC, fire fighting and electrical packages.",
    workflow: [
      "Review industrial plumbing requirements",
      "Develop water supply and drainage models",
      "Coordinate interfaces with other MEP packages",
      "Produce plumbing shop drawings",
    ],
    deliverables: [
      "LOD 400 plumbing models",
      "Water supply shop drawings",
      "Drainage shop drawings",
      "Coordinated plumbing routes",
    ],
    coordination:
      "Route coordination with HVAC, fire fighting and electrical packages, with Ahmed's delivery scope focused on plumbing.",
    result:
      "Delivered plumbing modelling and documentation contributions for industrial facilities.",
    relatedTools: ["bim-engine", "plumbing-engine"],
    levels: ["Service zone", "Distribution route", "Package interface"],
    annotations: [
      "Water distribution",
      "Drainage routing",
      "Cross-trade interface",
    ],
    mediaNeeded: [
      "Industrial plumbing model view",
      "Water/drainage shop drawing",
      "Service-corridor coordination view",
    ],
  },
  {
    slug: "envi-al-shafa",
    name: "ENVI Al Shafa",
    shortName: "ENVI Al Shafa",
    category: "Hospitality",
    location: "Taif Highlands, Saudi Arabia",
    role: "Water supply & drainage design, BIM and shop drawings",
    color: "#86efac",
    lod: "Not specified in CV",
    overview:
      "A mountain retreat at approximately 2,000 metres, with 35 villas, a main house, wellness centre and café.",
    scope:
      "Water supply and drainage design for the compound, followed by Revit modelling and shop drawing production.",
    metrics: [
      { value: "35 villas", label: "Overall compound scale" },
      { value: "2,000 m", label: "Project elevation" },
      { value: "Design → BIM", label: "Ahmed's workflow" },
    ],
    systems: ["Water supply", "Drainage"],
    software: ["Revit"],
    challenge:
      "Taking compound water and drainage design into coordinated model and drawing deliverables for a remote hospitality setting.",
    solution:
      "Designed the water supply and drainage systems, then developed Revit models and shop drawings through a design-to-BIM workflow.",
    workflow: [
      "Develop compound water supply and drainage design",
      "Translate design into Revit models",
      "Document service layouts and interfaces",
      "Prepare shop drawings",
    ],
    deliverables: [
      "Water supply design",
      "Drainage design",
      "Revit service models",
      "Shop drawings",
    ],
    coordination: "Design-to-BIM progression for hospitality service networks.",
    result:
      "Completed design, modelling and documentation contributions for water supply and drainage.",
    relatedTools: ["plumbing-engine"],
    levels: ["Villa services", "Main house", "Wellness centre", "Café"],
    annotations: [
      "Compound distribution",
      "Villa services",
      "Drainage network",
    ],
    mediaNeeded: [
      "Compound services plan",
      "Villa plumbing Revit view",
      "Water supply/drainage calculation excerpt",
      "Confirmed LOD and project dates",
    ],
  },
];

export interface AutomationTool {
  id: string;
  name: string;
  type: "Personal tool";
  stack: string[];
  summary: string;
  capabilities: string[];
  output: string;
  color: string;
}
export const automationTools: AutomationTool[] = [
  {
    id: "clashresolveai",
    name: "ClashResolveAI",
    type: "Personal tool",
    stack: ["C#", ".NET 4.8", "Revit API", "SQLite"],
    color: "#fb7185",
    summary:
      "A Revit add-in for clash detection, issue grouping and lifecycle tracking.",
    capabilities: [
      "Spatial hash grid for candidate detection",
      "Related clashes grouped into issues",
      "JSON rules for tolerances",
      "Live Monitor while modelling",
      "BCF 2.1 issue exchange",
    ],
    output: "Tracked coordination issues and exchangeable BCF records.",
  },
  {
    id: "bim-engine",
    name: "BIM Engine",
    type: "Personal tool",
    stack: ["pyRevit", "C#", "SQLite", "WPF"],
    color: "#c4b5fd",
    summary:
      "A model scanner and coordination engine with a navigable issues dashboard.",
    capabilities: [
      "Single extraction of model element data",
      "Octree index for candidate pairs",
      "Exact solid intersections for hard clashes",
      "2D / 3D issue navigation",
      "RFI and clash reports",
    ],
    output: "Issue records, RFI/clash reports and a WPF dashboard.",
  },
  {
    id: "plumbing-engine",
    name: "Plumbing Engine",
    type: "Personal tool",
    stack: ["Python", "SQLite", "pyRevit"],
    color: "#5eead4",
    summary:
      "A plumbing calculation and QA/QC engine with a model exchange layer.",
    capabilities: [
      "IPC, UPC, SBC 701 and Egyptian rule data",
      "Water, drainage, vent and storm sizing",
      "Hot water, tank and pump calculations",
      "Calculation report generation",
      "QA/QC dashboard and pyRevit exchange",
    ],
    output:
      "Calculation reports and rule-based design review outputs. Rule editions and validation examples will accompany published demos.",
  },
];

export type ExperienceCategory =
  | "BIM"
  | "MEP"
  | "Automation"
  | "Maintenance"
  | "Site Engineering"
  | "Education";
export interface Experience {
  id: string;
  organization: string;
  role: string;
  date: string;
  location: string;
  categories: ExperienceCategory[];
  responsibilities: string[];
  tools: string[];
  evidence: { label: string; href: string }[];
}
export const experiences: Experience[] = [
  {
    id: "maap",
    organization: "MAAP Electro-Mechanical Engineers",
    role: "BIM Design Engineer",
    date: "Jan 2026 — Present",
    location: "Egypt & Saudi Arabia",
    categories: ["BIM", "MEP"],
    responsibilities: [
      "Model and coordinate plumbing and fire protection systems in Revit.",
      "Deliver construction-ready models and shop drawings at LOD 350–400.",
      "Review clashes and coordinate with MEP, architectural and structural teams.",
    ],
    tools: ["Revit", "Navisworks"],
    evidence: projects.map(p => ({
      label: p.shortName,
      href: `/projects/${p.slug}`,
    })),
  },
  {
    id: "tools",
    organization: "Independent / in-house development",
    role: "BIM automation tools",
    date: "Dates not specified in CV",
    location: "Revit development",
    categories: ["Automation", "BIM"],
    responsibilities: [
      "Develop ClashResolveAI for clash detection and issue tracking.",
      "Build BIM Engine for scanning, geometry checks and coordination reporting.",
      "Develop Plumbing Engine for calculations, rule checks and QA/QC.",
    ],
    tools: ["C#", "Python", "Revit API", "pyRevit", "SQLite"],
    evidence: automationTools.map(t => ({
      label: t.name,
      href: `/#tool-${t.id}`,
    })),
  },
  {
    id: "oppo",
    organization: "Oppo Mobile Assembly",
    role: "Maintenance Engineer",
    date: "Apr 2025 — Dec 2025",
    location: "10th of Ramadan, Egypt",
    categories: ["Maintenance"],
    responsibilities: [
      "Diagnose mechanical and electrical failures and carry out preventive/corrective maintenance.",
      "Support conveyors, actuators, sensors and drive systems.",
      "Maintain logs, improve checklists and collaborate on safe production practices.",
    ],
    tools: [
      "Fault diagnosis",
      "Root-cause analysis",
      "Maintenance logs & SOPs",
    ],
    evidence: [
      {
        label: "Experience documented in CV",
        href: "/documents/ahmed-hisham-cv.pdf",
      },
    ],
  },
  {
    id: "eai",
    organization: "Etisal for Advanced Industries",
    role: "Trainee On-Site MEP Engineer",
    date: "Jul 2023 — Sep 2023",
    location: "Cairo, Egypt",
    categories: ["MEP", "Site Engineering"],
    responsibilities: [
      "Assist supervision of plumbing, HVAC, fire fighting and electrical installation against approved drawings.",
      "Inspect work for drawing conformity and report deviations.",
      "Prepare as-built markups, daily site reports and technical documentation.",
      "Coordinate day-to-day with contractors and other trades.",
    ],
    tools: ["Shop drawings", "Site inspections", "As-built markups"],
    evidence: [
      {
        label: "Training documented in CV",
        href: "/documents/ahmed-hisham-cv.pdf",
      },
    ],
  },
  {
    id: "istu",
    organization: "Izhevsk State Technical University",
    role: "Mechatronics Engineering study",
    date: "Oct 2021 — May 2023",
    location: "Izhevsk, Russia",
    categories: ["Education"],
    responsibilities: [
      "Bachelor of Mechatronics Engineering study as described in the CV.",
      "Grade: Very Good.",
    ],
    tools: ["Mechatronics", "Engineering systems"],
    evidence: [
      {
        label: "Education documented in CV",
        href: "/documents/ahmed-hisham-cv.pdf",
      },
    ],
  },
  {
    id: "eru",
    organization: "Egyptian Russian University",
    role: "Bachelor's in Mechatronics & Robotics Engineering",
    date: "Sep 2018 — Jul 2023",
    location: "Cairo, Egypt",
    categories: ["Education"],
    responsibilities: [
      "Bachelor's degree with CGPA: Very Good.",
      "Coursework: control systems, robotics, embedded systems, computer vision and automation.",
    ],
    tools: ["Control systems", "Robotics", "Embedded systems", "Automation"],
    evidence: [
      {
        label: "Education documented in CV",
        href: "/documents/ahmed-hisham-cv.pdf",
      },
    ],
  },
];
