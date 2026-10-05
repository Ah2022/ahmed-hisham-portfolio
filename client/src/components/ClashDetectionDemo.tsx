import {
  useEffect,
  useRef,
  useState,
  type PointerEvent,
  type KeyboardEvent,
} from "react";
import { AlertTriangle, CheckCircle2, Download, RotateCcw } from "lucide-react";
import {
  detectClashes,
  initialElements,
  resolvedLayout,
  downloadFile,
  issueMarkup,
  zipTextFiles,
  type SimElement,
  type SimIssue,
} from "@/lib/clashSimulation";
import "./automation.css";

export default function ClashDetectionDemo() {
  const [elements, setElements] = useState(() =>
    initialElements.map(e => ({ ...e }))
  );
  const [selected, setSelected] = useState(initialElements[0].id);
  const [view, setView] = useState<"current" | "before">("current");
  const [issues, setIssues] = useState<SimIssue[]>([]);
  const [clashKey, setClashKey] = useState("");
  const [seen, setSeen] = useState(() =>
    detectClashes(initialElements).map(c => c.key)
  );
  const [notice, setNotice] = useState(
    "Four active clashes in the initial L03 service zone."
  );
  const svgRef = useRef<SVGSVGElement>(null);
  const drag = useRef<{
    id: string;
    pointer: number;
    dx: number;
    dy: number;
  } | null>(null);
  const clashes = detectClashes(elements),
    activeKeys = new Set(clashes.map(c => c.key));
  const keySignature = clashes.map(c => c.key).join(",");
  useEffect(() => {
    setSeen(previous => {
      const next = Array.from(
        new Set([...previous, ...keySignature.split(",").filter(Boolean)])
      );
      return next.length === previous.length ? previous : next;
    });
  }, [keySignature]);
  const resolved = seen.filter(k => !activeKeys.has(k)).length;
  const displayElements = view === "before" ? initialElements : elements;
  const displayClashes = detectClashes(displayElements);
  const element = displayElements.find(e => e.id === selected)!;
  const selectedClash = clashes.find(c => c.key === clashKey) || clashes[0];
  const status = displayClashes.some(
    c => c.a.id === selected || c.b.id === selected
  )
    ? "Active Clash"
    : "Clear";
  const update = (id: string, patch: Partial<SimElement>) =>
    setElements(previous =>
      previous.map(e => (e.id === id ? { ...e, ...patch } : e))
    );
  const move = (id: string, x: number, y: number) => {
    const e = elements.find(e => e.id === id)!;
    update(id, {
      x: Math.max(15, Math.min(785 - e.width, x)),
      y: Math.max(20, Math.min(345 - e.height, y)),
    });
  };
  const point = (event: PointerEvent<SVGGElement>) => {
    const matrix = svgRef.current?.getScreenCTM();
    if (!matrix) return null;
    return new DOMPoint(event.clientX, event.clientY).matrixTransform(
      matrix.inverse()
    );
  };
  const pointerDown = (event: PointerEvent<SVGGElement>, e: SimElement) => {
    setSelected(e.id);
    if (view === "before" || e.kind === "beam" || event.button !== 0) return;
    const p = point(event);
    if (!p) return;
    drag.current = {
      id: e.id,
      pointer: event.pointerId,
      dx: p.x - e.x,
      dy: p.y - e.y,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const pointerMove = (event: PointerEvent<SVGGElement>) => {
    const d = drag.current;
    if (!d || d.pointer !== event.pointerId) return;
    const p = point(event);
    if (p) move(d.id, p.x - d.dx, p.y - d.dy);
  };
  const finishDrag = () => {
    if (drag.current) {
      drag.current = null;
      setNotice(
        "Element moved. Clash zones and coordination status recalculated."
      );
    }
  };
  const keyboard = (event: KeyboardEvent<SVGGElement>, e: SimElement) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setSelected(e.id);
      return;
    }
    if (
      view === "before" ||
      e.kind === "beam" ||
      !event.key.startsWith("Arrow")
    )
      return;
    event.preventDefault();
    setSelected(e.id);
    const step = event.shiftKey ? 10 : 1;
    move(
      e.id,
      e.x +
        (event.key === "ArrowRight"
          ? step
          : event.key === "ArrowLeft"
            ? -step
            : 0),
      e.y +
        (event.key === "ArrowDown" ? step : event.key === "ArrowUp" ? -step : 0)
    );
  };
  const createIssue = () => {
    if (!selectedClash) return;
    const existing = issues.find(i => i.key === selectedClash.key);
    if (existing) {
      setNotice(
        "This clash already has an issue. Its status follows the current geometry."
      );
      return;
    }
    const issue: SimIssue = {
      guid: crypto.randomUUID(),
      key: selectedClash.key,
      title: `L03: ${selectedClash.a.id} / ${selectedClash.b.id}`,
      severity: selectedClash.severity,
      createdAt: new Date().toISOString(),
      elements: [{ ...selectedClash.a }, { ...selectedClash.b }],
    };
    setIssues(previous => [...previous, issue]);
    setNotice(
      `Issue ${issues.length + 1} created for ${selectedClash.a.id} and ${selectedClash.b.id}.`
    );
  };
  const exportBCF = () => {
    const files = [
      {
        name: "bcf.version",
        content:
          '<?xml version="1.0" encoding="UTF-8"?><Version VersionId="2.1" />',
      },
      ...issues.map(i => ({
        name: `${i.guid}/markup.bcf`,
        content: issueMarkup(i, activeKeys.has(i.key)),
      })),
    ];
    const bytes = zipTextFiles(files);
    downloadFile(
      "portfolio-demo.bcfzip",
      bytes.buffer as ArrayBuffer,
      "application/zip"
    );
    setNotice(
      "BCF 2.1 topic archive exported. Demonstration topics only; no model or viewpoints included."
    );
  };
  const report = {
    scenario: "Synthetic L03 BIM coordination demonstration",
    method:
      "Axis-aligned envelope overlaps in plan plus vertical interval intersection; not solid geometry or clearance analysis.",
    detected: seen.length,
    resolved,
    remaining: clashes.length,
    estimatedMinutesSaved: resolved * 8,
    estimateAssumption:
      "Illustrative assumption: 10 minutes manual review minus 2 minutes assisted review per resolved pair; not measured project performance.",
    before: initialElements,
    after: elements,
    activeClashes: clashes.map(c => ({
      elements: [c.a.id, c.b.id],
      severity: c.severity,
    })),
    issues: issues.map(i => ({
      ...i,
      status: activeKeys.has(i.key) ? "Open" : "Resolved",
    })),
    generatedAt: new Date().toISOString(),
  };
  const resolve = () => {
    setElements(resolvedLayout(elements));
    setView("current");
    setNotice(
      "Demonstration elevation separation applied. Beam stays fixed. All envelope intersections cleared; an engineer must validate routing and clearances."
    );
  };
  const reset = () => {
    setElements(initialElements.map(e => ({ ...e })));
    setSeen(detectClashes(initialElements).map(c => c.key));
    setIssues([]);
    setView("current");
    setSelected(initialElements[0].id);
    setClashKey("");
    setNotice("Scenario reset: four active clashes. Session issues cleared.");
  };
  return (
    <section id="clash-demo" className="portfolio-section clash-section">
      <div className="container">
        <header className="section-heading">
          <div className="section-index">
            <span>03.1</span> / COORDINATION SANDBOX
          </div>
          <h2>Move a system. See the consequence.</h2>
          <p>
            Explore a synthetic L03 service zone: chilled-water pipe, supply-air
            duct, electrical conduit and a fixed structural beam.
          </p>
        </header>
        <div className="demo-metrics" aria-label="Current coordination summary">
          {[
            ["Clashes detected", seen.length],
            ["Clashes resolved", resolved],
            ["Remaining clashes", clashes.length],
            ["Est. time saved", `${resolved * 8} min`],
          ].map(([label, value]) => (
            <div key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
        <p className="estimate-note">
          Time saved is illustrative: 10 min manual − 2 min assisted review per
          resolved pair. No measured project savings are claimed. Counts track
          unique pairs observed in this session.
        </p>
        <div className="clash-workspace">
          <div className="clash-visual-panel">
            <header className="scene-toolbar">
              <span>L03 / PLAN + ELEVATION</span>
              <div role="group" aria-label="Before and after view">
                <button
                  type="button"
                  aria-pressed={view === "before"}
                  onClick={() => setView("before")}
                >
                  Before
                </button>
                <button
                  type="button"
                  aria-pressed={view === "current"}
                  onClick={() => setView("current")}
                >
                  Current / After
                </button>
              </div>
            </header>
            <div className="bim-scene">
              <svg
                ref={svgRef}
                viewBox="0 0 800 370"
                role="group"
                aria-label="Interactive BIM service plan"
                aria-describedby="scene-instructions"
              >
                <defs>
                  <pattern
                    id="coord-grid"
                    width="40"
                    height="40"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M40 0H0V40"
                      fill="none"
                      stroke="#94a3b8"
                      strokeOpacity=".13"
                    />
                  </pattern>
                  <pattern
                    id="beam-hatch"
                    width="9"
                    height="9"
                    patternUnits="userSpaceOnUse"
                  >
                    <path d="M0 9L9 0" stroke="#94a3b8" strokeOpacity=".4" />
                  </pattern>
                </defs>
                <rect width="800" height="370" fill="#0b1422" />
                <rect
                  x="15"
                  y="20"
                  width="770"
                  height="325"
                  fill="url(#coord-grid)"
                  stroke="#94a3b8"
                  strokeOpacity=".2"
                />
                <text x="25" y="360" fill="#94a3b8" fontSize="11">
                  PLAN ENVELOPES / 1 SVG UNIT = 10 mm · CENTRE ELEVATIONS IN mm
                </text>
                {[...displayElements]
                  .sort((a, b) =>
                    a.kind === "beam" ? -1 : b.kind === "beam" ? 1 : 0
                  )
                  .map(e => (
                    <g
                      key={e.id}
                      role="button"
                      tabIndex={0}
                      aria-label={`${e.id}, ${e.system}, elevation ${e.z} millimetres${e.kind === "beam" ? ", fixed structure" : ", arrow keys move in plan"}`}
                      aria-pressed={selected === e.id}
                      onClick={() => setSelected(e.id)}
                      onPointerDown={event => pointerDown(event, e)}
                      onPointerMove={pointerMove}
                      onPointerUp={finishDrag}
                      onPointerCancel={finishDrag}
                      onLostPointerCapture={finishDrag}
                      onKeyDown={event => keyboard(event, e)}
                      className={`sim-element ${e.kind} ${selected === e.id ? "selected" : ""}`}
                    >
                      <rect
                        x={e.x - 5}
                        y={e.y - 8}
                        width={e.width + 10}
                        height={Math.max(e.height + 16, 32)}
                        fill="transparent"
                      />
                      <rect
                        x={e.x}
                        y={e.y}
                        width={e.width}
                        height={e.height}
                        rx={
                          e.kind === "pipe" || e.kind === "conduit"
                            ? e.height / 2
                            : 2
                        }
                        fill={e.kind === "beam" ? "url(#beam-hatch)" : e.color}
                        fillOpacity={e.kind === "beam" ? 1 : 0.2}
                        stroke={e.color}
                        strokeWidth={selected === e.id ? 3 : 1.5}
                        strokeDasharray={
                          e.z !== initialElements.find(i => i.id === e.id)!.z
                            ? "7 3"
                            : undefined
                        }
                      />
                      {e.kind === "duct" &&
                        [0, 1, 2, 3, 4].map(i => (
                          <path
                            key={i}
                            d={`M${e.x + 8} ${e.y + 25 + i * 45}h${e.width - 16}`}
                            stroke={e.color}
                            strokeOpacity=".45"
                          />
                        ))}
                      {(e.kind === "pipe" || e.kind === "conduit") &&
                        [0, 1, 2, 3, 4].map(i => (
                          <path
                            key={i}
                            d={`M${e.x + 40 + i * 110} ${e.y - 3}v${e.height + 6}`}
                            stroke={e.color}
                            strokeWidth="3"
                          />
                        ))}
                      <text
                        x={e.x + 3}
                        y={e.y - 12}
                        fill={e.color}
                        fontSize="13"
                        fontWeight="600"
                      >
                        {e.id}
                      </text>
                      <text
                        x={e.x + 3}
                        y={e.y + e.height + 18}
                        fill={e.color}
                        fontSize="11"
                      >
                        {e.z} mm
                      </text>
                    </g>
                  ))}
                <g pointerEvents="none">
                  {displayClashes.map((c, i) => (
                    <g key={c.key}>
                      <rect
                        {...c.zone}
                        fill="#fb7185"
                        fillOpacity=".5"
                        stroke="#fb7185"
                        strokeWidth="2"
                      />
                      <circle
                        cx={c.zone.x + c.zone.width / 2}
                        cy={c.zone.y + c.zone.height / 2}
                        r="12"
                        fill="#9f1239"
                        stroke="#fda4af"
                      />
                      <text
                        x={c.zone.x + c.zone.width / 2}
                        y={c.zone.y + c.zone.height / 2 + 4}
                        fill="white"
                        textAnchor="middle"
                        fontSize="12"
                      >
                        {i + 1}
                      </text>
                    </g>
                  ))}
                </g>
              </svg>
            </div>
            <p id="scene-instructions" className="scene-instructions">
              Drag services with mouse or touch. Focus a service and use arrow
              keys (10 mm), or Shift + arrow (100 mm). Use the labelled position
              and elevation controls for a textual alternative. The beam stays
              fixed.
            </p>
            {view === "before" && (
              <p className="before-notice">
                Read-only initial state: {displayClashes.length} clashes. Switch
                to Current / After to edit. Summary and issue status always
                describe the current state.
              </p>
            )}
            <div
              className="elevation-strip"
              aria-label={`${view === "before" ? "Initial" : "Current"} element elevations`}
            >
              {displayElements.map(e => (
                <span key={e.id} style={{ borderColor: e.color }}>
                  <strong>{e.id}</strong>
                  {e.z} mm <small>± {e.depth / 2} mm</small>
                </span>
              ))}
            </div>
          </div>
          <aside
            className="element-inspector"
            aria-label="Element metadata and controls"
          >
            <span className="engine-eyebrow">ELEMENT INSPECTOR / L03</span>
            <label htmlFor="selected-element">Select element</label>
            <select
              id="selected-element"
              value={selected}
              onChange={event => setSelected(event.target.value)}
            >
              {elements.map(e => (
                <option key={e.id} value={e.id}>
                  {e.id} · {e.kind}
                </option>
              ))}
            </select>
            <dl>
              {[
                ["Element", element.id],
                ["System", element.system],
                ["Level", "L03"],
                [
                  element.kind === "pipe" || element.kind === "conduit"
                    ? "Diameter"
                    : "Dimensions",
                  element.size,
                ],
                ["Discipline", element.discipline],
                ["Status", status],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
            <fieldset disabled={view === "before" || element.kind === "beam"}>
              <legend>Move selected element</legend>
              <label>
                Plan X (mm)
                <input
                  type="number"
                  min="150"
                  max={(785 - element.width) * 10}
                  step="10"
                  value={Math.round(element.x * 10)}
                  onChange={event => {
                    if (event.target.value !== "")
                      move(
                        selected,
                        Number(event.target.value) / 10,
                        element.y
                      );
                  }}
                />
              </label>
              <label>
                Plan Y (mm)
                <input
                  type="number"
                  min="200"
                  max={(345 - element.height) * 10}
                  step="10"
                  value={Math.round(element.y * 10)}
                  onChange={event => {
                    if (event.target.value !== "")
                      move(
                        selected,
                        element.x,
                        Number(event.target.value) / 10
                      );
                  }}
                />
              </label>
              <label>
                Centre elevation (mm)
                <input
                  type="range"
                  min="1800"
                  max="4500"
                  step="25"
                  value={element.z}
                  onChange={event =>
                    update(selected, { z: Number(event.target.value) })
                  }
                />
                <output>{element.z} mm</output>
              </label>
              <div className="nudge-controls">
                {[
                  ["Left", -10, 0],
                  ["Right", 10, 0],
                  ["Up", 0, -10],
                  ["Down", 0, 10],
                ].map(([label, dx, dy]) => (
                  <button
                    type="button"
                    key={label}
                    onClick={() =>
                      move(
                        selected,
                        element.x + Number(dx),
                        element.y + Number(dy)
                      )
                    }
                  >
                    {label}
                  </button>
                ))}
              </div>
            </fieldset>
            <div className="demo-actions">
              <button
                type="button"
                onClick={() => {
                  setSelected("CHW-P-102");
                  setView("current");
                  setNotice(
                    "Pipe selected. Drag it, use arrow keys, or edit its coordinates."
                  );
                }}
              >
                Move Pipe
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelected("HVAC-D-204");
                  setView("current");
                  setNotice(
                    "Duct selected. Drag it, use arrow keys, or edit its coordinates."
                  );
                }}
              >
                Move Duct
              </button>
              <button
                type="button"
                disabled={view === "before" || element.kind === "beam"}
                onClick={() => {
                  update(selected, { z: Math.min(4500, element.z + 250) });
                  setNotice(
                    `${selected} elevation raised by up to 250 mm. Check remaining clashes.`
                  );
                }}
              >
                Adjust Elevation +250 mm
              </button>
            </div>
          </aside>
        </div>
        <div className="coordination-command-bar">
          <button
            className="resolve-button"
            type="button"
            disabled={!clashes.length}
            onClick={resolve}
          >
            <CheckCircle2 size={18} aria-hidden="true" />
            Resolve Automatically
          </button>
          <button type="button" onClick={reset}>
            <RotateCcw size={16} aria-hidden="true" />
            Reset scenario
          </button>
          <span role="status" aria-live="polite">
            {notice}
          </span>
        </div>
        <div className="coordination-results">
          <section className="clash-list-panel" aria-label="Textual clash list">
            <h3>
              <AlertTriangle size={18} aria-hidden="true" />
              Clash explorer
            </h3>
            <p>
              Hard envelope intersections. Structure conflicts: high priority;
              service conflicts: medium priority. Severity is a demonstration
              rule, not a project standard.
            </p>
            {clashes.length ? (
              <ol>
                {clashes.map((c, i) => (
                  <li key={c.key}>
                    <button
                      type="button"
                      aria-pressed={selectedClash?.key === c.key}
                      onClick={() => {
                        setClashKey(c.key);
                        setSelected(c.a.id);
                      }}
                    >
                      <span>0{i + 1}</span>
                      <strong>
                        {c.a.id} ↔ {c.b.id}
                      </strong>
                      <span className={`severity ${c.severity.toLowerCase()}`}>
                        {c.severity}
                      </span>
                      <small>L03 · Active Clash</small>
                    </button>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="all-clear">
                No active envelope intersections. Engineering clearance,
                support, slope and constructability checks remain outside this
                demo.
              </p>
            )}
            <button
              type="button"
              disabled={!selectedClash}
              onClick={createIssue}
            >
              Create Issue
              {selectedClash
                ? ` · ${selectedClash.a.id} / ${selectedClash.b.id}`
                : ""}
            </button>
          </section>
          <section className="issue-store-panel" aria-label="Issue store">
            <h3>
              Issue store{" "}
              <span>{issues.length.toString().padStart(2, "0")}</span>
            </h3>
            <p>
              Issues stay in this browser session until reset or reload.
              Geometry changes resolve or reopen their status automatically.
            </p>
            {issues.length ? (
              <ul>
                {issues.map((i, index) => (
                  <li key={i.guid}>
                    <strong>
                      ISS-{(index + 1).toString().padStart(3, "0")} · {i.title}
                    </strong>
                    <span>
                      {i.severity} ·{" "}
                      {activeKeys.has(i.key) ? "Open" : "Resolved"}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                No issues created. Select an active clash and create an issue
                before exporting.
              </p>
            )}
            <button type="button" disabled={!issues.length} onClick={exportBCF}>
              <Download size={16} aria-hidden="true" />
              Export BCF
            </button>
            <small>
              BCF 2.1 topics only. No IFC component bindings, model or
              viewpoints are included.
            </small>
          </section>
        </div>
        <details className="coordination-report">
          <summary>
            Coordination report · {clashes.length} remaining / {resolved}{" "}
            resolved
          </summary>
          <p>
            The initial scenario has four clashes. The current state has{" "}
            {clashes.length} active clashes, {resolved} resolved observed pairs
            and {issues.length} tracked issues. Estimated time saved:{" "}
            {resolved * 8} minutes using the stated illustrative assumption.
          </p>
          <div className="report-table-wrap">
            <table>
              <caption>
                Current element positions and coordination status
              </caption>
              <thead>
                <tr>
                  {[
                    "Element",
                    "System",
                    "Plan X / Y (mm)",
                    "Centre elevation",
                    "Status",
                  ].map(h => (
                    <th scope="col" key={h}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {elements.map(e => (
                  <tr key={e.id}>
                    <th scope="row">{e.id}</th>
                    <td>{e.system}</td>
                    <td>
                      {Math.round(e.x * 10)} / {Math.round(e.y * 10)}
                    </td>
                    <td>{e.z} mm</td>
                    <td>
                      {clashes.some(c => c.a.id === e.id || c.b.id === e.id)
                        ? "Active Clash"
                        : "Clear"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            type="button"
            onClick={() =>
              downloadFile(
                "coordination-demo-report.json",
                JSON.stringify(report, null, 2),
                "application/json"
              )
            }
          >
            <Download size={16} aria-hidden="true" />
            Download coordination report
          </button>
        </details>
        <p className="evidence-note">
          Simulation method: plan bounding envelopes + vertical interval
          intersection. Cylindrical services use bounding envelopes. Automatic
          resolution demonstrates elevation separation with fixed structure; it
          does not calculate viable rerouting, clearance, gravity slope or
          construction feasibility.
        </p>
      </div>
    </section>
  );
}
