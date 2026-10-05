# Automation explorer and coordination sandbox

The main page now renders a data-driven AutomationPipeline followed by ClashDetectionDemo. Existing `#automation-tools` and `#tool-*` evidence links are preserved; tool anchors select the corresponding workflow. Revit Model Auditor is explicitly a proposed prototype, while the three personal tools retain their CV-backed descriptions. Project use cases describe possible applications rather than unverified deployments.

## Coordination model

Four synthetic L03 elements use bounding envelopes in plan and vertical interval intersections. Plan coordinates are in SVG units (10 mm per unit); centre elevations and vertical envelopes are in millimetres. The beam is fixed. Services support pointer capture, touch dragging, arrow-key movement, numeric plan coordinates and an elevation slider. Automatic resolution separates the service elevations around the unchanged beam. It does not solve constructability, clearances, slopes or solid geometry.

Detected counts represent unique pairs observed since reset. Resolved counts represent observed pairs absent from current geometry; conflicts can reopen. The estimate uses an explicit illustrative assumption of 10 min manual minus 2 min assisted review per resolved pair, not measured performance. Before is a read-only initial snapshot; reports and issue status describe the current model state.

Issues are local to the mounted browser session and clear on reset or reload. BCF export creates a ZIP with `bcf.version` and per-topic `markup.bcf`, matching the buildingSMART BCF 2.1 version/topic schemas. These are topic-only exchanges with no IFC components or model viewpoints; import behaviour in individual BCF applications has not been tested. JSON reports include before/current positions, active clashes, issue statuses and the estimate assumptions.

## Validation

- `node --import tsx --test tests/clashSimulation.test.ts`: five tests for initial pairs/severity, elevation separation, boundary contact, fixed structure and XML/ZIP output.
- TypeScript and production static build.
- Chromium interaction checks: four tool selectors, every workflow node and its five fields, tool hash selection, mouse/touch dragging, keyboard controls, elevation updates, issue deduplication and resolution, read-only before/current geometry, BCF and JSON downloads, reduced motion, and overflow checks at 320/390/768/1440 px.
- Exported ZIP CRC validation and BCF XML validation against buildingSMART's release_2_1 markup.xsd and version.xsd.

Real tool recordings, model captures and confirmed project deployment examples remain the next evidence step.
