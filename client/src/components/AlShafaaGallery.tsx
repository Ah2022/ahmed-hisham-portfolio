import { useState } from "react";
import { ArrowLeft, ArrowRight, Download, ExternalLink } from "lucide-react";
import "./alShafaaGallery.css";
// Supplied enhanced captures, registered against shared architectural outlines.
const views = [
  {
    label: "3D layout",
    file: "architecture",
    x: 38,
    y: 30,
    width: 1024,
    height: 642,
    description:
      "Enhanced shaded isometric showing the villa's architectural layout and facade.",
  },
  {
    label: "All systems",
    file: "all",
    x: 38,
    y: 80,
    width: 1024,
    height: 580,
    description:
      "Enhanced combined coordination view with water-supply and drainage services in the villa's architectural context.",
  },
  {
    label: "Water supply",
    file: "water",
    x: 70,
    y: 108,
    width: 1018.88,
    height: 565.16,
    description:
      "Enhanced water-supply isometric, showing the blue and red pipe networks and connected fixtures.",
  },
  {
    label: "Drainage",
    file: "drain",
    x: 67,
    y: 132,
    width: 1003.52,
    height: 544.88,
    description:
      "Enhanced drainage isometric, showing drainage and vent routing with architectural outlines.",
  },
];
const sequence = [0, 1, 2, 3];
const pdf = "/documents/projects/al-shafaa-ground-floor-drain.pdf";
export default function AlShafaaGallery() {
  const [position, setPosition] = useState(0);
  const [zoom, setZoom] = useState(1);
  const view = views[sequence[position]];
  const select = (step: number) => {
    setPosition(step);
    setZoom(1);
  };
  return (
    <div className="shafaa-gallery">
      <p>
        Explore the enhanced villa model views, from the architectural layout to
        each service system. Follow the sequence or select a system directly.
      </p>
      <div
        className="shafaa-system-buttons"
        role="group"
        aria-label="Al Shafaa gallery system views"
      >
        {views.map((v, index) => (
          <button
            type="button"
            key={v.file}
            aria-pressed={view.file === v.file}
            aria-controls="shafaa-model-view"
            onClick={() => select(index)}
          >
            {v.file === "all" ? "All" : v.label}
          </button>
        ))}
      </div>
      <figure id="shafaa-model-view" className="shafaa-model-view">
        <svg
          viewBox="0 0 1100 700"
          role="img"
          aria-labelledby="shafaa-view-title shafaa-view-desc"
        >
          <title id="shafaa-view-title">Al Shafaa villa — {view.label}</title>
          <desc id="shafaa-view-desc">
            {view.description} Architectural context and system captures from
            the supplied villa model.
          </desc>
          <rect width="1100" height="700" fill="#1b3031" />
          {views.map(v => (
            <image
              key={v.file}
              href={`/images/projects/al-shafaa-${v.file}.png`}
              x={v.x}
              y={v.y}
              width={v.width}
              height={v.height}
              opacity={v.file === view.file ? 1 : 0}
              aria-hidden="true"
            />
          ))}
        </svg>
        <figcaption aria-live="polite">
          <strong>{view.label}</strong>
          <span>{view.description}</span>
        </figcaption>
      </figure>
      <div className="shafaa-slider-controls">
        <label htmlFor="shafaa-view-slider">
          View sequence{" "}
          <strong>
            {position + 1} / 4 · {view.label}
          </strong>
        </label>
        <input
          id="shafaa-view-slider"
          type="range"
          min="0"
          max="3"
          step="1"
          value={position}
          aria-valuetext={`${position + 1} of 4: ${view.label}`}
          onChange={e => select(Number(e.target.value))}
        />
        <div className="shafaa-sequence" aria-label="Gallery sequence">
          {sequence.map((v, i) => (
            <button
              type="button"
              key={i}
              aria-current={position === i ? "step" : undefined}
              onClick={() => select(i)}
            >
              <span>0{i + 1}</span>
              {views[v].label}
            </button>
          ))}
        </div>
        <div className="shafaa-prev-next">
          <button
            type="button"
            disabled={position === 0}
            onClick={() => select(position - 1)}
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Previous
          </button>
          <button
            type="button"
            disabled={position === 3}
            onClick={() => select(position + 1)}
          >
            Next
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
        <p>
          Use mouse or touch on the slider, arrow keys when it is focused, or
          the 3D layout / All / Water supply / Drainage buttons. The service
          views share aligned building outlines. The shaded layout shows the
          architectural context.
        </p>
      </div>
      <section
        className="shafaa-shop-drawing"
        aria-label="Professional shop drawing"
      >
        <header>
          <div>
            <span className="section-index">
              DELIVERY EVIDENCE / SHOP DRAWING
            </span>
            <h3>Villa VIP · Ground-floor drainage</h3>
            <p>
              The supplied sheet includes the drainage plan, a 3D view, bathroom
              section, annotations and title block.
            </p>
          </div>
          <div className="shafaa-drawing-links">
            <a href={pdf} target="_blank" rel="noopener noreferrer">
              Open PDF
              <ExternalLink size={15} aria-hidden="true" />
            </a>
            <a href={pdf} download="Al-Shafaa-Villa-VIP-Ground-Floor-Drain.pdf">
              Download PDF
              <Download size={15} aria-hidden="true" />
            </a>
          </div>
        </header>
        <label htmlFor="shafaa-drawing-zoom">
          Drawing zoom <strong>{Math.round(zoom * 100)}%</strong>
          <input
            id="shafaa-drawing-zoom"
            type="range"
            min="1"
            max="3"
            step="0.25"
            value={zoom}
            onChange={e => setZoom(Number(e.target.value))}
          />
        </label>
        <div
          className="shafaa-drawing-viewport"
          tabIndex={0}
          role="region"
          aria-label="Scrollable shop drawing preview"
          style={{ overflow: "auto" }}
        >
          <img
            src="/images/projects/al-shafaa-drawing.png"
            alt="Al Shafaa Resort Villa VIP ground-floor drainage shop drawing: annotated plan, drainage isometric, bathroom section and professional title block. Open the original PDF for full resolution."
            loading="lazy"
            decoding="async"
            style={{ width: `${zoom * 100}%`, maxWidth: "none" }}
          />
        </div>
        <p>
          Zoom, then scroll to inspect the sheet. Open the PDF for
          full-resolution drawing text. This sheet is drainage evidence; the
          water-supply shop drawing can be added next.
        </p>
      </section>
    </div>
  );
}
