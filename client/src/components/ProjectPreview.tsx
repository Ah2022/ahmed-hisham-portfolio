import { useId } from "react";
import type { Project } from "@/data/portfolio";
interface Props {
  project: Project;
  enabledSystems?: string[];
  level?: string;
  annotations?: boolean;
}
export default function ProjectPreview({
  project,
  enabledSystems = project.systems,
  level,
  annotations = false,
}: Props) {
  const uid = useId().replace(/:/g, "");
  const tower = project.category === "High-rise";
  const hospitality = project.category === "Hospitality";
  return (
    <svg
      className="project-preview"
      viewBox="0 0 640 300"
      role="img"
      aria-labelledby={`${uid}-title ${uid}-desc`}
    >
      <title id={`${uid}-title`}>
        {project.shortName} technical illustration{level ? ` — ${level}` : ""}
      </title>
      <desc id={`${uid}-desc`}>
        Illustrative {project.category.toLowerCase()} service diagram.{" "}
        {enabledSystems.length
          ? `Visible systems: ${enabledSystems.join(", ")}.`
          : "All service layers hidden."}{" "}
        This is not an actual project model.
      </desc>
      <defs>
        <pattern
          id={`${uid}-grid`}
          width="28"
          height="28"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M28 0H0V28"
            fill="none"
            stroke="#94a3b8"
            strokeOpacity=".1"
          />
        </pattern>
      </defs>
      <rect width="640" height="300" fill="#0c1724" />
      <rect width="640" height="300" fill={`url(#${uid}-grid)`} />
      <g
        fill={project.color}
        fillOpacity=".035"
        stroke={project.color}
        strokeOpacity=".4"
        strokeWidth="1.2"
      >
        {tower ? (
          [0, 1, 2, 3].map(i => (
            <g key={i} transform={`translate(${140 + i * 85},${(i % 2) * 22})`}>
              <path d="M0 65 38 53 68 64 30 77Z M0 65v171l30 12 38-16V64 M30 77v171" />
              {Array.from({ length: 7 }, (_, f) => (
                <path key={f} d={`M0 ${90 + f * 22}l30 12 38-16`} fill="none" />
              ))}
            </g>
          ))
        ) : hospitality ? (
          [0, 1, 2, 3, 4].map(i => (
            <g
              key={i}
              transform={`translate(${95 + (i % 3) * 150},${80 + Math.floor(i / 3) * 100})`}
            >
              <path d="M0 25 45 0 90 24 45 48Z M0 25v32l45 23 45-25V24 M45 48v32" />
            </g>
          ))
        ) : (
          <g>
            <path d="M110 100 310 55 530 107 320 156Z M110 100v109l210 50 210-54V107 M320 156v103" />
            {[0, 1, 2, 3].map(i => (
              <path
                key={i}
                d={`M110 ${125 + i * 25}l210 50 210-54`}
                fill="none"
              />
            ))}
            <path
              d="M170 88v132M230 73v160M390 73v165M460 89v134"
              fill="none"
            />
          </g>
        )}
      </g>
      {level && (
        <rect
          x="105"
          y={
            70 +
            (Math.max(0, project.levels.indexOf(level)) /
              Math.max(1, project.levels.length - 1)) *
              155
          }
          width="430"
          height="20"
          fill={project.color}
          fillOpacity=".1"
          stroke={project.color}
          strokeOpacity=".2"
        />
      )}
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        {project.systems.map(
          (system, i) =>
            enabledSystems.includes(system) && (
              <g
                key={system}
                stroke={[project.color, "#7dd3fc", "#fb7185", "#fbbf24"][i]}
                strokeWidth="2.5"
                opacity=".9"
              >
                <path
                  d={
                    tower
                      ? `M${170 + i * 85} 235V${92 + i * 12}h35v120`
                      : hospitality
                        ? `M70 ${240 - i * 13}H570M${170 + i * 100} ${240 - i * 13}V${112 + i * 15}`
                        : `M120 ${155 + i * 18}l${180 - i * 15} 43 210-54M${190 + i * 55} ${171 + i * 18}V${90 + i * 8}`
                  }
                />
                <circle
                  cx={tower ? 170 + i * 85 : 190 + i * 55}
                  cy={tower ? 125 : 100 + i * 8}
                  r="4"
                  fill="#0c1724"
                />
              </g>
            )
        )}
      </g>
      {annotations && (
        <g fill="#d7e3f2" fontSize="11" fontFamily="monospace">
          {project.annotations.map((label, i) => (
            <g key={label}>
              <path
                d={`M${180 + i * 70} ${110 + i * 30}L${80 + i * 210} 40`}
                stroke={project.color}
                strokeWidth="1"
                strokeOpacity=".5"
              />
              <text x={35 + i * 205} y="30">
                0{i + 1}
              </text>
              <text x={35 + i * 205} y="45" fontSize="9">
                {label}
              </text>
            </g>
          ))}
        </g>
      )}
      <text x="22" y="280" fill="#8b9eb7" fontSize="9" fontFamily="monospace">
        {level ? `VIEW: ${level.toUpperCase()} · ` : ""}ILLUSTRATIVE DIAGRAM /
        NOT PROJECT EVIDENCE
      </text>
    </svg>
  );
}
