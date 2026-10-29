import { useId, useState } from "react";
import "./nbcFloorComparison.css";

export default function NBCFloorComparison() {
  const [view, setView] = useState<"mechanical" | "typical">("mechanical");
  const [split, setSplit] = useState(50);
  const uid = useId().replace(/:/g, "");
  const updateSplit = (event: React.PointerEvent<SVGSVGElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    setSplit(Math.round(Math.max(0, Math.min(100,
      ((event.clientX - bounds.left) / bounds.width) * 100
    ))));
  };

  return (
    <section className="coordination-demo nbc-floor" aria-label="Nile Business City floor views">
      <span className="demo-badge">NILE BUSINESS CITY / MODEL CLOSE-UP</span>
      <h3>{view === "mechanical" ? "Drone View of the Mechanical Floor" : "Typical Floor"}</h3>
      <div className="filter-bar" role="group" aria-label="Nile Business City floor selector">
        <button type="button" aria-pressed={view === "mechanical"} onClick={() => setView("mechanical")}>
          Mechanical Floor
        </button>
        <button type="button" aria-pressed={view === "typical"} onClick={() => setView("typical")}>
          Typical Floor
        </button>
      </div>
      <p className="demo-description" aria-live="polite">
        {view === "mechanical"
          ? "Compare the mechanical floor with architectural context and exposed service networks. Drag the divider or use the slider below."
          : "A supplied Revit 3D view of the typical floor at Nile Business City."}
      </p>
      {view === "mechanical" ? (
        <>
          <div className="comparison-labels"><span>Architectural context</span><span>Service networks</span></div>
          <svg viewBox="0 0 1600 900" role="img"
            aria-label={`Mechanical Floor: ${split}% architectural context, ${100 - split}% service networks`}
            style={{ touchAction: "pan-y" }}
            onPointerDown={e => { e.currentTarget.setPointerCapture(e.pointerId); updateSplit(e); }}
            onPointerMove={e => { if (e.currentTarget.hasPointerCapture(e.pointerId)) updateSplit(e); }}
            onPointerUp={e => { if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId); }}>
            <defs>
              <clipPath id={`${uid}-context`}><rect width={split * 16} height="900" /></clipPath>
              <clipPath id={`${uid}-services`}><rect x={split * 16} width={1600 - split * 16} height="900" /></clipPath>
            </defs>
            <rect width="1600" height="900" fill="#222932" />
            <g clipPath={`url(#${uid}-context)`}>
              <image href="/images/projects/nbc-mechanical-context.webp" y="63" width="1600" height="774" />
            </g>
            <g clipPath={`url(#${uid}-services)`}>
              {/* Register shared model features to the context view in native image
                  coordinates, then add its 63px vertical canvas padding.
                  Keep the reveal clip outside this transform so it follows the slider. */}
              <image href="/images/projects/nbc-mechanical-services.webp"
                width="1600" height="754"
                transform="matrix(1.064272 0.000105 -0.000105 1.064272 -22.44979 87.318444)" />
            </g>
            <path d={`M${split * 16} 0V900`} stroke="#e2e8f0" strokeWidth="3" />
            <circle cx={split * 16} cy="450" r="26" fill="#101c2b" stroke="#5eead4" strokeWidth="3" />
            <path d={`M${split * 16 - 8} 437v26m16-26v26`} stroke="#e2e8f0" strokeWidth="3" />
          </svg>
          <label className="range-label" htmlFor={`${uid}-comparison`}>Compare mechanical floor views <span>{split}% / {100 - split}%</span></label>
          <input id={`${uid}-comparison`} type="range" min="0" max="100" value={split}
            onChange={e => setSplit(Number(e.target.value))}
            aria-label="Mechanical floor image comparison"
            aria-valuetext={`${split}% architectural context, ${100 - split}% service networks`} />
        </>
      ) : (
        <figure>
          <img src="/images/projects/nbc-typical-floor.webp" alt="Nile Business City typical floor Revit 3D view showing the floor layout and architectural context." />
          <figcaption>Typical Floor · Revit 3D View</figcaption>
        </figure>
      )}
    </section>
  );
}
