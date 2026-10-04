import { useId, useState } from "react";
const issues = [
  {
    name: "Pipe / beam interface",
    description:
      "A service route intersects the structural zone. The alternative illustrates a route around that zone.",
  },
  {
    name: "Shared service zone",
    description:
      "A pipe crosses another service envelope. The alternative illustrates separating the routes.",
  },
];
export default function CoordinationDemo() {
  const [issue, setIssue] = useState(0);
  const [split, setSplit] = useState(50);
  const uid = useId().replace(/:/g, "");
  return (
    <div className="coordination-demo">
      <span className="demo-badge">Concept demonstration</span>
      <h3>Inspect a coordination decision.</h3>
      <p>
        This schematic is a demonstration, not a recorded project issue or a
        validated routing solution.
      </p>
      <div className="filter-bar" role="group" aria-label="Demonstration issue">
        {issues.map((item, index) => (
          <button
            key={item.name}
            type="button"
            aria-pressed={issue === index}
            onClick={() => {
              setIssue(index);
              setSplit(50);
            }}
          >
            {item.name}
          </button>
        ))}
      </div>
      <p className="demo-description" aria-live="polite">
        {issues[issue].description}
      </p>
      <div className="comparison-labels">
        <span>Conflict concept</span>
        <span>Alternative concept</span>
      </div>
      <svg
        viewBox="0 0 600 200"
        role="img"
        aria-label={`${issues[issue].name}: ${split}% conflict view, ${100 - split}% alternative view`}
      >
        <defs>
          <clipPath id={`${uid}-before`}>
            <rect width={split * 6} height="200" />
          </clipPath>
          <clipPath id={`${uid}-after`}>
            <rect x={split * 6} width={600 - split * 6} height="200" />
          </clipPath>
        </defs>
        <rect width="600" height="200" fill="#0c1724" />
        <rect
          x={issue === 0 ? 255 : 205}
          y={issue === 0 ? 35 : 70}
          width={issue === 0 ? 65 : 220}
          height={issue === 0 ? 95 : 50}
          fill="#94a3b81a"
          stroke="#94a3b8"
        />
        <g clipPath={`url(#${uid}-before)`}>
          <path d="M40 95H560" stroke="#fb7185" strokeWidth="7" fill="none" />
          <circle cx="285" cy="95" r="16" fill="#fb718515" stroke="#fb7185" />
          <path d="M280 90l10 10m0-10-10 10" stroke="#fb7185" strokeWidth="2" />
        </g>
        <g clipPath={`url(#${uid}-after)`}>
          <path
            d={
              issue === 0
                ? "M40 95H220V157H350V95H560"
                : "M40 95H170V157H455V95H560"
            }
            stroke="#5eead4"
            strokeWidth="7"
            fill="none"
            strokeLinejoin="round"
          />
        </g>
        <path d={`M${split * 6} 0V200`} stroke="#e2e8f0" strokeWidth="2" />
      </svg>
      <label className="range-label" htmlFor={`${uid}-comparison`}>
        Compare the concepts{" "}
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
        onChange={event => setSplit(Number(event.target.value))}
        aria-label="Before and after concept comparison"
      />
    </div>
  );
}
