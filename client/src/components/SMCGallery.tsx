import { useState } from "react";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import "./smcGallery.css";
const views = [
  {
    id: "model",
    label: "3D model",
    description: "SMC 3 hospital exterior 3D model, including the roof canopy and utility building.",
  },
  {
    id: "drainage",
    label: "Drainage",
    description: "Drainage routing within the hospital model.",
  },
  {
    id: "medical-gas-01",
    label: "Medical Gas",
    description: "Medical gas network within the hospital model.",
  },
  {
    id: "medical-gas-02",
    label: "Water Supply",
    description: "Water-supply network within the hospital model.",
  },
  {
    id: "fuel-oil",
    label: "Fuel oil",
    description: "Fuel-oil routing and equipment within the hospital model.",
  },
];
export default function SMCGallery() {
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const view = views[index];
  const select = (next: number) => {
    setIndex(next);
    setZoom(1);
  };
  return (
    <div className="smc-gallery" aria-label="SMC 3 project image gallery">
      <div className="smc-gallery-tabs" role="group" aria-label="SMC 3 views">
        {views.map((v, i) => (
          <button
            type="button"
            key={v.id}
            aria-pressed={i === index}
            aria-controls="smc-gallery-image"
            onClick={() => select(i)}
          >
            {v.label}
          </button>
        ))}
      </div>
      <figure>
        <div
          className="smc-gallery-viewport"
          tabIndex={0}
          role="region"
          aria-label="Scrollable SMC 3 model image"
          onKeyDown={e => {
            if (e.target !== e.currentTarget) return;
            if (e.key === "ArrowRight" && zoom === 1) {
              e.preventDefault();
              select(Math.min(index + 1, views.length - 1));
            }
            if (e.key === "ArrowLeft" && zoom === 1) {
              e.preventDefault();
              select(Math.max(index - 1, 0));
            }
          }}
        >
          <img
            id="smc-gallery-image"
            src={`/images/projects/smc-${view.id}.webp`}
            alt={`SMC 3 — ${view.label}. ${view.description}`}
            style={{ width: `${zoom * 100}%` }}
            decoding="async"
          />
        </div>
        <figcaption aria-live="polite">
          <strong>
            {String(index + 1).padStart(2, "0")} / 05 · {view.label}
          </strong>
          <span>{view.description}</span>
        </figcaption>
      </figure>
      <div className="smc-gallery-toolbar">
        <button
          type="button"
          disabled={index === 0}
          onClick={() => select(index - 1)}
        >
          <ArrowLeft size={16} aria-hidden="true" /> Previous
        </button>
        <label htmlFor="smc-image-zoom">
          Zoom {Math.round(zoom * 100)}%
          <input
            id="smc-image-zoom"
            type="range"
            min="1"
            max="2.5"
            step="0.25"
            value={zoom}
            onChange={e => setZoom(Number(e.target.value))}
          />
        </label>
        <a
          href={`/images/projects/smc-${view.id}.webp`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Full resolution <ExternalLink size={15} aria-hidden="true" />
        </a>
        <button
          type="button"
          disabled={index === views.length - 1}
          onClick={() => select(index + 1)}
        >
          Next <ArrowRight size={16} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
