import { useId, useState } from "react";
import "./smcBathroomComparison.css";
export default function SMCBathroomComparison() {
  const [view, setView] = useState<"compare" | "shared">("compare");
  const [split, setSplit] = useState(50);
  const uid = useId().replace(/:/g, "");
  const updateSplit = (event: React.PointerEvent<SVGSVGElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    setSplit(
      Math.round(
        Math.max(
          0,
          Math.min(100, ((event.clientX - bounds.left) / bounds.width) * 100)
        )
      )
    );
  };
  return (
    <section
      className="coordination-demo smc-bathroom"
      aria-label="SMC 3 public bathroom close-up"
    >
      <span className="demo-badge">SMC 3 / MODEL CLOSE-UP</span>
      <h3>Public bathroom · Shared service zone</h3>
      <div
        className="filter-bar"
        role="group"
        aria-label="Bathroom coordination views"
      >
        <button
          type="button"
          aria-pressed={view === "compare"}
          onClick={() => setView("compare")}
        >
          WS/DR
        </button>
        <button
          type="button"
          aria-pressed={view === "shared"}
          onClick={() => setView("shared")}
        >
          Shared service zone
        </button>
      </div>
      <p className="demo-description" aria-live="polite">
        {view === "compare"
          ? "Compare the water-supply and drainage networks serving the same public bathroom. Drag the divider or use the slider below."
          : "Combined water-supply and drainage view of the public bathroom in the shared service zone."}
      </p>
      {view === "compare" ? (
        <>
          <div className="comparison-labels">
            <span>WS · Water supply</span>
            <span>DR · Drainage</span>
          </div>
          <svg
            viewBox="0 0 1600 980"
            role="img"
            aria-label={`Public bathroom: ${split}% water supply, ${100 - split}% drainage`}
            style={{ touchAction: "pan-y" }}
            onPointerDown={e => {
              e.currentTarget.setPointerCapture(e.pointerId);
              updateSplit(e);
            }}
            onPointerMove={e => {
              if (e.currentTarget.hasPointerCapture(e.pointerId))
                updateSplit(e);
            }}
            onPointerUp={e => {
              if (e.currentTarget.hasPointerCapture(e.pointerId))
                e.currentTarget.releasePointerCapture(e.pointerId);
            }}
          >
            <defs>
              <clipPath id={`${uid}-ws`}>
                <rect width={split * 16} height="980" />
              </clipPath>
              <clipPath id={`${uid}-dr`}>
                <rect x={split * 16} width={1600 - split * 16} height="980" />
              </clipPath>
            </defs>
            <rect width="1600" height="980" fill="#222932" />
            <g clipPath={`url(#${uid}-ws)`}>
              <image
                href="/images/projects/smc-bathroom-ws.webp"
                x="0"
                y="30"
                width="1600"
                height="897"
              />
            </g>
            <g clipPath={`url(#${uid}-dr)`}>
              <image
                href="/images/projects/smc-bathroom-dr.webp"
                x="4"
                y="10"
                width="1586"
                height="947"
              />
            </g>
            <path d={`M${split * 16} 0V980`} stroke="#e2e8f0" strokeWidth="3" />
            <circle
              cx={split * 16}
              cy="490"
              r="26"
              fill="#101c2b"
              stroke="#5eead4"
              strokeWidth="3"
            />
            <path
              d={`M${split * 16 - 8} 477v26m16-26v26`}
              stroke="#e2e8f0"
              strokeWidth="3"
            />
          </svg>
          <label className="range-label" htmlFor={`${uid}-comparison`}>
            Compare WS / DR{" "}
            <span>
              {split}% / {100 - split}%
            </span>
          </label>
          <input
            id={`${uid}-comparison`}
            type="range"
            min="0"
            max="100"
            value={split}
            onChange={e => setSplit(Number(e.target.value))}
            aria-label="Water supply and drainage comparison"
            aria-valuetext={`${split}% water supply, ${100 - split}% drainage`}
          />
        </>
      ) : (
        <figure>
          <img
            src="/images/projects/smc-bathroom-shared.webp"
            alt="SMC 3 public bathroom close-up showing the combined water-supply and drainage networks, risers and sanitary fixtures."
          />
          <figcaption>Public bathroom · Water supply and drainage</figcaption>
        </figure>
      )}
    </section>
  );
}
