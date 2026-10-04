import { useState } from "react";
import { MapPin, ArrowUpRight } from "lucide-react";
import { experiences, type ExperienceCategory } from "@/data/portfolio";
import SectionHeading from "./SectionHeading";
const categories: ("All" | ExperienceCategory)[] = [
  "All",
  "BIM",
  "MEP",
  "Automation",
  "Maintenance",
  "Site Engineering",
  "Education",
];
export default function ExperienceTimeline() {
  const [category, setCategory] = useState<"All" | ExperienceCategory>("All");
  const selected = experiences.filter(
    entry => category === "All" || entry.categories.includes(category)
  );
  return (
    <section id="experience" className="portfolio-section">
      <div className="container">
        <SectionHeading
          number="04"
          label="EXPERIENCE"
          title="A systems mindset, applied to buildings."
          description="From mechatronics and site engineering to BIM delivery and tool development. Expand an entry to inspect responsibilities and supporting context."
        />
        <div
          className="filter-bar"
          role="group"
          aria-label="Experience categories"
        >
          {categories.map(item => (
            <button
              key={item}
              type="button"
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <p className="portfolio-result-count" aria-live="polite">
          {selected.length} experience entr{selected.length === 1 ? "y" : "ies"}
        </p>
        <div className="experience-timeline">
          {selected.map(entry => (
            <details
              id={`experience-${entry.id}`}
              key={entry.id}
              className="timeline-entry"
            >
              <summary>
                <span className="timeline-dot" aria-hidden="true" />
                <span className="timeline-date">{entry.date}</span>
                <span className="timeline-main">
                  <span className="timeline-organization">
                    {entry.organization}
                  </span>
                  <span className="timeline-role">{entry.role}</span>
                  <span className="timeline-location">
                    <MapPin size={12} aria-hidden="true" />
                    {entry.location}
                  </span>
                </span>
                <span className="timeline-toggle" aria-hidden="true">
                  +
                </span>
              </summary>
              <div className="timeline-details">
                <div className="tag-list">
                  {entry.categories.map(item => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
                <ul>
                  {entry.responsibilities.map(responsibility => (
                    <li key={responsibility}>{responsibility}</li>
                  ))}
                </ul>
                <h4>Relevant tools & methods</h4>
                <div className="tag-list">
                  {entry.tools.map(tool => (
                    <span key={tool}>{tool}</span>
                  ))}
                </div>
                <div className="timeline-evidence">
                  {entry.evidence.map(evidence => (
                    <a key={evidence.href} href={evidence.href}>
                      {evidence.label}
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
