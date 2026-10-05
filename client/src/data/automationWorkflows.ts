import { automationTools } from "./portfolio";
export interface WorkflowNode {
  title: string;
  description: string;
  input: string;
  output: string;
  technology: string;
  benefit: string;
  useCase: string;
}
export interface AutomationWorkflow {
  id: string;
  name: string;
  color: string;
  summary: string;
  status: string;
  nodes: WorkflowNode[];
}
type Step = [string, string, string, string, string, string];
function workflow(
  id: string,
  useCase: string,
  steps: Step[]
): AutomationWorkflow {
  const tool = automationTools.find(t => t.id === id)!;
  return {
    id,
    name: tool.name,
    color: tool.color,
    summary: tool.summary,
    status: "Personal tool · documented in CV",
    nodes: steps.map(
      ([title, description, input, output, technology, benefit]) => ({
        title,
        description,
        input,
        output,
        technology,
        benefit,
        useCase,
      })
    ),
  };
}
export const automationWorkflows: AutomationWorkflow[] = [
  workflow(
    "clashresolveai",
    "Potential application: SMC Hospital service coordination. This is a relevant workflow, not a confirmed project deployment.",
    [
      [
        "Revit Elements",
        "Read model identifiers, categories, systems and bounding geometry from the active model.",
        "Revit elements and linked model context",
        "Element records with bounds and system tags",
        "C# · .NET 4.8 · Revit API",
        "Keeps a coordination finding tied to the original element.",
      ],
      [
        "Spatial Hash Grid",
        "Partition the service zone into spatial cells to find nearby candidate pairs before detailed checks.",
        "Element bounds and configured tolerances",
        "Nearby candidate element pairs",
        "C# · spatial hash index · JSON tolerance rules",
        "Avoids testing every element against every other element.",
      ],
      [
        "Clash Grouping",
        "Group related conflicts into actionable issues instead of treating every overlap as a separate task.",
        "Detected pairs, system tags and locations",
        "Grouped coordination issues",
        "C# · rule-based grouping",
        "Helps an engineer review one service-routing problem as a whole.",
      ],
      [
        "SQLite Issue Store",
        "Keep issue identities and lifecycle records available between coordination reviews.",
        "Grouped findings and status updates",
        "Queryable issue records and review history",
        "SQLite · C#",
        "Supports traceable follow-up rather than scattered screenshots.",
      ],
      [
        "BCF 2.1 Exchange",
        "Package coordination topics for exchange with other BCF-compatible review tools.",
        "Issue metadata and available viewpoints",
        "BCF issue exchange records",
        "BCF 2.1 · XML · ZIP",
        "Makes review topics portable between coordination environments.",
      ],
      [
        "Live Monitor Dashboard",
        "Surface findings while modelling and make current issues easier to review.",
        "Model changes and stored issue records",
        "Updated coordination status and issue list",
        "Revit add-in · C# · SQLite",
        "Shortens the feedback loop when services are moved.",
      ],
    ]
  ),
  workflow(
    "bim-engine",
    "Potential application: Nile Business City mechanical-floor coordination. Project-specific use of this engine has not been verified.",
    [
      [
        "Model Extraction",
        "Read element data once into a reusable analysis dataset.",
        "Model elements and parameters",
        "Cached element dataset",
        "pyRevit · Revit API",
        "Limits repeated model reads across checks.",
      ],
      [
        "Octree Candidates",
        "Index geometry hierarchically to narrow the set of potentially conflicting pairs.",
        "Element bounding geometry",
        "Spatial candidate pairs",
        "C# · octree index",
        "Focuses geometry checks on nearby elements.",
      ],
      [
        "Solid Intersections",
        "Check candidate solids for physical intersection, beyond bounding-box overlap.",
        "Candidate element solids",
        "Hard-clash geometry findings",
        "C# · Revit geometry API",
        "Separates broad-phase candidates from hard clashes.",
      ],
      [
        "Issue Records",
        "Store findings with element references for subsequent review.",
        "Geometry findings and element identities",
        "Searchable coordination records",
        "SQLite",
        "Preserves context across repeated scans.",
      ],
      [
        "2D / 3D Navigation",
        "Present a navigable issues dashboard and guide review back to model context.",
        "Issue records and model references",
        "Selected issue and contextual model view",
        "WPF · C# · Revit API",
        "Reduces the effort needed to locate a finding.",
      ],
      [
        "RFI & Clash Reports",
        "Turn reviewed findings into coordination outputs for engineering follow-up.",
        "Reviewed issue records",
        "RFI and clash reports",
        "C# · report generation",
        "Connects model review to a shareable coordination deliverable.",
      ],
    ]
  ),
  workflow(
    "plumbing-engine",
    "Potential application: ENVI villa water/drainage reviews. Applicable rule editions and validated calculation examples still need confirmation.",
    [
      [
        "Model & Design Inputs",
        "Collect system data and design assumptions for plumbing calculations.",
        "Fixtures, system data and engineering assumptions",
        "Calculation input dataset",
        "Python · pyRevit exchange",
        "Makes model quantities available for a structured review.",
      ],
      [
        "Rule Selection",
        "Select the applicable rule dataset before running a calculation.",
        "Project basis and available rule datasets",
        "Selected rule context",
        "Python · SQLite rule data",
        "Keeps the calculation basis explicit; this explorer does not certify compliance.",
      ],
      [
        "System Sizing",
        "Evaluate water, drainage, vent and storm sizing from the supplied inputs.",
        "Input dataset and chosen rules",
        "Sizing results and exceptions",
        "Python calculation routines",
        "Highlights where an engineer must review system sizing.",
      ],
      [
        "Plant Calculations",
        "Evaluate hot-water, tank and pump calculation workflows.",
        "Demand and design assumptions",
        "Plant calculation results",
        "Python",
        "Groups interdependent plant assumptions into a reviewable workflow.",
      ],
      [
        "QA/QC Dashboard",
        "Expose calculation results and rule-check findings for engineering review.",
        "Sizing results and exceptions",
        "Reviewable QA/QC findings",
        "Python · SQLite",
        "Makes exceptions visible before producing a report.",
      ],
      [
        "Reports & Model Exchange",
        "Produce calculation reports and exchange reviewed data with the model workflow.",
        "Reviewed calculation results",
        "Calculation reports and model exchange data",
        "Python · pyRevit",
        "Connects engineering review with model documentation.",
      ],
    ]
  ),
  {
    id: "revit-model-auditor",
    name: "Revit Model Auditor",
    color: "#fbbf24",
    status: "Prototype concept · proposed workflow",
    summary:
      "A proposed quality gate for model health, parameter completeness and delivery readiness.",
    nodes: [
      {
        title: "Model Snapshot",
        description:
          "Capture a read-only audit scope without altering the model.",
        input: "Selected model and delivery scope",
        output: "Audit snapshot",
        technology: "Proposed: Revit API · C#",
        benefit: "Defines exactly what the audit would cover.",
        useCase:
          "Proposed pre-delivery check for a healthcare model; no deployed auditor is claimed.",
      },
      {
        title: "Parameter Checks",
        description:
          "Compare required fields against a project-specific checklist.",
        input: "Element parameters and required-field rules",
        output: "Missing or inconsistent parameter findings",
        technology: "Proposed: JSON rules · C#",
        benefit: "Makes incomplete delivery data easier to find.",
        useCase: "Proposed review of plumbing system tags before SMC delivery.",
      },
      {
        title: "Model Health",
        description:
          "Review warnings and naming consistency against agreed criteria.",
        input: "Model warnings, views and naming rules",
        output: "Prioritised model-health findings",
        technology: "Proposed: Revit API",
        benefit: "Helps focus cleanup on agreed delivery requirements.",
        useCase: "Proposed repeatable review for multi-level high-rise models.",
      },
      {
        title: "Audit Report",
        description:
          "Summarise findings with element references for an engineer to approve.",
        input: "Audit findings and review decisions",
        output: "Delivery-readiness report",
        technology: "Proposed: structured report export",
        benefit:
          "Provides a documented review gate rather than implying automatic compliance.",
        useCase:
          "Proposed QA handover across healthcare, industrial and hospitality projects.",
      },
    ],
  },
];
