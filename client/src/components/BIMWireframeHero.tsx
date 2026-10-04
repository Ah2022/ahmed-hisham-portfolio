import { useId } from "react";
import type { HeroMode } from "./heroModes";

interface Props {
  mode: HeroMode;
}

/** Lightweight isometric illustration; SVG remains sharp at every viewport size. */
export default function BIMWireframeHero({ mode }: Props) {
  const uid = useId().replace(/:/g, "");
  const services = mode.id !== "structure";
  const electrical = mode.id === "electrical" || mode.id === "clashes";
  const automation = mode.id === "automation";
  const floors = Array.from({ length: 11 }, (_, i) => 107 + i * 25);

  return (
    <div className="bim-hero-model" data-mode={mode.id}>
      <svg
        viewBox="0 0 640 480"
        role="img"
        aria-labelledby={`${uid}-title ${uid}-desc`}
      >
        <title id={`${uid}-title`}>
          {mode.title} — layered building illustration
        </title>
        <desc id={`${uid}-desc`}>
          {mode.labels.join(", ")}. Illustrative coordination scene, not a live
          project model.
        </desc>
        <defs>
          <pattern
            id={`${uid}-grid`}
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 32 0 L 0 0 0 32"
              fill="none"
              stroke="#94a3b8"
              strokeOpacity=".075"
            />
          </pattern>
          <radialGradient id={`${uid}-glow`}>
            <stop stopColor={mode.color} stopOpacity=".14" />
            <stop offset="1" stopColor={mode.color} stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`${uid}-face`} x2="1" y2="1">
            <stop stopColor={mode.color} stopOpacity=".1" />
            <stop offset="1" stopColor={mode.color} stopOpacity=".015" />
          </linearGradient>
        </defs>
        <rect width="640" height="480" fill={`url(#${uid}-grid)`} />
        <ellipse
          cx="290"
          cy="235"
          rx="250"
          ry="230"
          fill={`url(#${uid}-glow)`}
        />
        <g fill="none" stroke="#64748b" strokeOpacity=".25">
          <path d="M55 403 279 465 528 349M91 371 317 434 570 316M55 431 489 233M134 453 570 254" />
        </g>
        <g stroke={mode.color} strokeWidth="1.2" strokeLinejoin="round">
          <path
            d="M157 107 337 142 435 86 255 51Z"
            fill={`url(#${uid}-face)`}
          />
          <path
            d="M157 107 337 142 337 417 157 382Z"
            fill={`url(#${uid}-face)`}
          />
          <path
            d="M337 142 435 86 435 361 337 417Z"
            fill={`url(#${uid}-face)`}
          />
          <g opacity={mode.id === "structure" ? 0.8 : 0.25}>
            {floors.map((y, i) => (
              <path
                key={y}
                d={`M157 ${y} 337 ${y + 35} 435 ${y - 21} M${193 + (i % 2) * 36} ${y + 7} 373 ${y + 42}`}
                fill="none"
              />
            ))}
            {[193, 229, 265, 301].map(x => (
              <path key={x} d={`M${x} ${107 + ((x - 157) * 35) / 180} v275`} />
            ))}
          </g>
          <path
            d="M242 98 284 107 313 91 271 82Z M242 98 v275 l42 9 29-16 V91 M284 107 v275"
            fill={mode.id === "structure" ? mode.color : "none"}
            fillOpacity=".07"
            opacity=".8"
          />
          <path
            d="M140 383 337 431 453 365 435 361M140 383v12l197 48 116-66v-12M337 431v12"
            fill="none"
            opacity=".5"
          />
        </g>
        {services && (
          <g
            className="bim-service-layer"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path
              d="M183 383V134l49 10V366l48 10V119"
              stroke={mode.color}
              strokeWidth="3"
            />
            <path
              d="M312 397V154l81-47V369"
              stroke={mode.color}
              strokeWidth="3"
              opacity=".75"
            />
            {[179, 229, 279, 329].map(y => (
              <path
                key={y}
                d={`M183 ${y} 232 ${y + 10} 312 ${y + 26} 393 ${y - 21}`}
                stroke={mode.color}
                strokeWidth="2"
                opacity=".65"
              />
            ))}
            <path
              d="M183 333 205 339V359l69 14 38-23"
              stroke="#7dd3fc"
              strokeWidth="4"
              opacity=".7"
            />
            {automation && (
              <path
                className="bim-data-flow"
                d="M183 383V134l49 10V366l48 10V119M312 397V154l81-47V369"
                stroke="white"
                strokeWidth="3"
                strokeDasharray="3 24"
              />
            )}
          </g>
        )}
        {electrical && (
          <g
            fill="none"
            stroke="#fbbf24"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M363 383V143l-61 35V320l-130-25" />
            <path
              d="M363 235 410 208M363 285 410 258M302 220 213 201"
              strokeWidth="2"
            />
          </g>
        )}
        {mode.id === "clashes" && (
          <g stroke={mode.color}>
            {[
              [302, 253],
              [232, 309],
              [363, 274],
            ].map(([x, y], i) => (
              <g key={x}>
                <circle
                  className="bim-clash-pulse"
                  cx={x}
                  cy={y}
                  r="15"
                  fill={mode.color}
                  fillOpacity=".08"
                />
                <circle cx={x} cy={y} r="8" fill="#111827" strokeWidth="2" />
                <path d={`M${x - 3} ${y - 3}l6 6m0-6-6 6`} strokeWidth="1.5" />
                <text
                  x={x + 20}
                  y={y + 4}
                  fontSize="10"
                  fill={mode.color}
                  stroke="none"
                >
                  0{i + 1}
                </text>
              </g>
            ))}
          </g>
        )}
        {automation && (
          <g fill="#111827" stroke={mode.color}>
            {[
              [183, 180],
              [312, 254],
              [393, 329],
            ].map(([x, y]) => (
              <g key={x}>
                <rect x={x - 9} y={y - 9} width="18" height="18" rx="4" />
                <path
                  d={`M${x - 4} ${y}l3 3 5-6`}
                  fill="none"
                  strokeWidth="1.5"
                />
              </g>
            ))}
          </g>
        )}
        <g fontFamily="monospace" fontSize="10" fill="#cbd5e1">
          {mode.labels.map((label, i) => (
            <g key={label}>
              <path
                d={`M${i === 0 ? 284 : 393} ${140 + i * 99} L465 ${122 + i * 99} H483`}
                fill="none"
                stroke={mode.color}
                strokeOpacity=".65"
              />
              <circle
                cx={i === 0 ? 284 : 393}
                cy={140 + i * 99}
                r="3"
                fill={mode.color}
              />
              <text x="487" y={117 + i * 99} fill={mode.color}>
                0{i + 1}
              </text>
              <text x="487" y={133 + i * 99}>
                {label.split(" ").slice(0, 2).join(" ")}
              </text>
              {label.split(" ").length > 2 && (
                <text x="487" y={147 + i * 99}>
                  {label.split(" ").slice(2).join(" ")}
                </text>
              )}
            </g>
          ))}
          <text x="38" y="42" fill={mode.color}>
            AH / BIM EXPLORER
          </text>
          <text x="38" y="59" fontSize="9" fill="#94a3b8">
            ISOMETRIC · ILLUSTRATIVE MODEL
          </text>
          <text x="38" y="449" fill="#94a3b8">
            X
          </text>
          <path d="M53 444h30m-30 0v-25" stroke="#64748b" />
          <text x="48" y="410" fill="#94a3b8">
            Z
          </text>
        </g>
      </svg>
    </div>
  );
}
