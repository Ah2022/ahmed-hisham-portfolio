import { useState } from "react";
import { ArrowLeft, ArrowRight, Download, ExternalLink } from "lucide-react";
import "./alShafaaGallery.css";
const views = [
  {
    label: "All disciplines",
    file: "all",
    x: 20,
    y: 30,
    width: 825,
    height: 467,
    description:
      "Combined supplied coordination view with water-supply and drainage services in the villa's architectural context.",
  },
  {
    label: "Water supply",
    file: "water",
    x: 45,
    y: 54,
    width: 815,
    height: 452,
    description:
      "Supplied water-supply isometric, including the blue pipe network and fixtures.",
  },
  {
    label: "Drainage",
    file: "drain",
    x: 42,
    y: 70,
    width: 823,
    height: 447,
    description:
      "Supplied drainage isometric, showing the drainage and vent network with architectural outlines.",
  },
];
const sequence = [0, 1, 2, 0];
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
        Explore the supplied villa model views in a shared isometric frame.
        Follow the sequence or select a system directly.
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
            {index === 0 ? "All" : v.label}
          </button>
        ))}
      </div>
      <figure id="shafaa-model-view" className="shafaa-model-view">
        <svg
          viewBox="0 0 900 550"
          role="img"
          aria-labelledby="shafaa-view-title shafaa-view-desc"
        >
          <title id="shafaa-view-title">Al Shafaa villa — {view.label}</title>
          <desc id="shafaa-view-desc">
            {view.description} Images are aligned by screen-space architectural
            outlines; this is a supplied model capture, not a live model.
          </desc>
          <rect width="900" height="550" fill="#002423" />
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
          Discipline sequence{" "}
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
          the All / Water supply / Drainage buttons. Alignment preserves the
          original captures and brings their shared building outlines into the
          same frame.
        </p>
      </div>
      <details className="shafaa-architecture">
        <summary>Architectural context · supplied villa isometric</summary>
        <svg
          viewBox="0 0 900 550"
          role="img"
          aria-label="Supplied shaded architectural isometric of the Al Shafaa villa"
        >
          <rect width="900" height="550" fill="#002423" />
          <image
            href="/images/projects/al-shafaa-architecture.png"
            x="-39"
            y="-63"
            width="918.29"
            height="575.935"
          />
        </svg>
        <p>
          Shaded architecture reference. Its framing is normalised separately;
          facade visibility differs from the service captures.
        </p>
      </details>
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
