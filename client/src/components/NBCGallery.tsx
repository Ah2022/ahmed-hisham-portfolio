import { useState } from "react";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import "./smcGallery.css";
const views = [
  {
    id: "tower-b",
    label: "Tower B 3D View",
    description: "Tower B 3D model view at Nile Business City.",
  },
  {
    id: "drainage",
    label: "Drainage",
    description: "Tower B drainage network within the Revit model.",
  },
  {
    id: "water-supply",
    label: "Water Supply",
    description: "Tower B water-supply network within the Revit model.",
  },
];
export default function NBCGallery() {
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const view = views[index];
  const select = (next: number) => {
    setIndex(next);
    setZoom(1);
  };
  return (
    <div className="smc-gallery" aria-label="Nile Business City project image gallery">
      <div className="smc-gallery-tabs" role="group" aria-label="Nile Business City views">
        {views.map((v, i) => (
          <button
            type="button"
            key={v.id}
            aria-pressed={i === index}
            aria-controls="nbc-gallery-image"
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
          aria-label="Scrollable Nile Business City model image"
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
            id="nbc-gallery-image"
            src={`/images/projects/nbc-${view.id}.webp`}
            alt={`Nile Business City — ${view.label}. ${view.description}`}
            style={{ width: `${zoom * 100}%` }}
            decoding="async"
          />
        </div>
        <figcaption aria-live="polite">
          <strong>
            {String(index + 1).padStart(2, "0")} / 03 · {view.label}
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
        <label htmlFor="nbc-image-zoom">
          Zoom {Math.round(zoom * 100)}%
          <input
            id="nbc-image-zoom"
            type="range"
            min="1"
            max="2.5"
            step="0.25"
            value={zoom}
            onChange={e => setZoom(Number(e.target.value))}
          />
        </label>
        <a
          href={`/images/projects/nbc-${view.id}.webp`}
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
