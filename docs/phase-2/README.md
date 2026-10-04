# Phase 2: portfolio layout and evidence

## Layout

Overview/hero → linked metric rail → Projects → Automation → Experience → Services → Contact. The floating command navigation uses matching numbering, active-section states and page reading progress. The mobile version uses a compact expandable menu with Escape handling and focus return.

## Implemented

- Six animated metric links, with project scale explicitly separated from personal delivery. Hospital area is 70,900 m² from the supplied CV. NBC's 56 floors is labelled project scale, not Ahmed's personal coordinated floor count.
- Project category filters: All, Healthcare, High-rise, Industrial, Hospitality and Automation Tools.
- Four professional project cards with expandable scope, approach, deliverables and results. Personal tools are labelled separately.
- Expandable experience entries, filterable by BIM, MEP, Automation, Maintenance, Site Engineering and Education.
- Three named automation tool records with expandable capabilities.
- Scoped services linked to project/tool evidence.
- Four real case-study routes:
  - `/projects/smc-hospital`
  - `/projects/nile-business-city`
  - `/projects/ceer-automotive-park`
  - `/projects/envi-al-shafa`
- Case studies include overview, role, scope, systems, software, challenge/solution, workflow, deliverables, coordination method, results and a metadata panel.
- SVG service toggles, view/level selectors and technical annotations. SMC and NBC also include a before/after concept comparison and selectable demonstration issues.
- Route/hash scrolling, direct route refresh, back navigation, reduced-motion support and a skip link.

The diagrams and comparison issues are explicitly illustrative. They are not real project captures, live Revit data or validated rerouting solutions. Actual project media slots are ready for the next content pass. Tool relationships describe relevant capabilities, not unverified project-specific deployment.

## Validation

TypeScript and production Vite/server builds passed. A bundle-size warning remains; undefined analytics configuration was removed for publication. Chromium checks passed for metric destinations, all filters, expandable experience/tool entries, active command navigation, reading progress, all four routes with direct refresh, system/level/annotation/comparison controls, return navigation, mobile touch/Escape focus behaviour and reduced motion. All four case studies and the homepage passed overflow checks at 320, 390, 768 and 1440 px. No browser runtime exceptions were observed.

## Media/materials needed

Prioritise SMC and NBC for the first real-media pass. PNG/JPG screenshots, PDF drawing crops and MP4 screen recordings are sufficient; full RVT models are not required.

| Project | Requested material |
| --- | --- |
| SMC 3 | Coordinated service view, pump-room/plant section, medical gas drawing crop, matched before/after clash views |
| NBC | Mechanical-floor view, typical-floor drawing, riser section, tank-area model/calculation excerpt |
| CEER | Industrial plumbing view, water/drainage shop drawing, service-corridor coordination view |
| ENVI | Compound services plan, villa plumbing view, calculation excerpt, confirmed LOD |
| Three tools | One screenshot or 30–60 second recording per tool, plus a sample output/report |

For stronger interactive evidence, provide a small publishable IFC/GLB excerpt and a BCF/issue report, if available. Include captions explaining Ahmed's contribution. Confirm project participation dates, software per project, personal floor/delivery scope, hospital area discrepancy (69,145 vs 70,900 m²), and development dates for the automation timeline.

## Content editing

`client/src/data/portfolio.ts` owns project, tool and experience records. No unverified clash counts, delivery guarantees or time-saving percentages are displayed. ENVI's LOD is marked unspecified until confirmed.

Source publication and public hosting are configured for the upgraded portfolio.
