import { useState } from "react";
import SectionHeading from "./SectionHeading";
import ProjectCards from "./ProjectCards";
export const projectFilters = [
  "All",
  "Healthcare",
  "High-rise",
  "Industrial",
  "Hospitality",
  "Automation Tools",
] as const;
export type ProjectFilter = (typeof projectFilters)[number];
export default function Projects() {
  const [filter, setFilter] = useState<ProjectFilter>("All");
  return (
    <section id="projects" className="portfolio-section">
      <div className="container">
        <SectionHeading
          number="02"
          label="SELECTED WORK"
          title="Engineering in context."
          description="Explore four professional project contributions and the personal tools that support BIM workflows."
        />
        <div
          className="filter-bar"
          role="group"
          aria-label="Project categories"
        >
          {projectFilters.map(category => (
            <button
              key={category}
              type="button"
              aria-pressed={filter === category}
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <ProjectCards filter={filter} />
      </div>
    </section>
  );
}
