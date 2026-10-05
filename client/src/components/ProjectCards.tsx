import { Link } from "wouter";
import { ArrowUpRight, MapPin, FileText } from "lucide-react";
import { automationTools, projects } from "@/data/portfolio";
import type { ProjectFilter } from "./Projects";
import ProjectCover from "./ProjectCover";
export default function ProjectCards({ filter }: { filter: ProjectFilter }) {
  const selected = projects.filter(
    project => filter === "All" || project.category === filter
  );
  const showTools = filter === "All" || filter === "Automation Tools";
  return (
    <div>
      <p className="portfolio-result-count" aria-live="polite">
        {selected.length} professional project{selected.length !== 1 ? "s" : ""}
        {showTools ? " · 3 personal automation tools" : ""}
      </p>
      <div className="project-grid">
        {selected.map(project => (
          <article
            className="portfolio-project-card"
            key={project.slug}
            style={{ "--project-color": project.color } as React.CSSProperties}
          >
            <Link
              href={`/projects/${project.slug}`}
              className="project-visual-link"
              aria-label={`Open ${project.shortName} case study`}
            >
              <ProjectCover project={project} />
              <span className="preview-kind">Supplied project cover</span>
            </Link>
            <div className="project-card-body">
              <div className="project-kinds">
                <span className="professional-badge">
                  Professional / client project
                </span>
                <span>{project.category}</span>
              </div>
              <h3>
                <Link href={`/projects/${project.slug}`}>
                  {project.shortName}
                </Link>
              </h3>
              <p className="project-location">
                <MapPin size={13} aria-hidden="true" />
                {project.location}
              </p>
              <p className="project-role">{project.role}</p>
              <div className="project-card-metrics">
                {project.metrics.map(metric => (
                  <div key={metric.label}>
                    <strong>{metric.value}</strong>
                    <span>{metric.label}</span>
                  </div>
                ))}
              </div>
              <div className="tag-list">
                {project.systems.map(system => (
                  <span key={system}>{system}</span>
                ))}
                {project.software.map(software => (
                  <span key={software}>{software}</span>
                ))}
              </div>
              <details className="project-card-details">
                <summary>
                  <FileText size={14} aria-hidden="true" /> Scope, approach &
                  deliverables
                </summary>
                <dl>
                  <dt>LOD level</dt>
                  <dd>{project.lod}</dd>
                  <dt>Challenge</dt>
                  <dd>{project.challenge}</dd>
                  <dt>Solution</dt>
                  <dd>{project.solution}</dd>
                  <dt>Deliverables</dt>
                  <dd>{project.deliverables.join(" · ")}</dd>
                  <dt>Result</dt>
                  <dd>{project.result}</dd>
                  <dt>Relevant personal tools</dt>
                  <dd>
                    {project.relatedTools.map(id => (
                      <a key={id} href={`/#tool-${id}`}>
                        {automationTools.find(tool => tool.id === id)?.name}
                      </a>
                    ))}
                    <small>
                      Capabilities relevant to this workflow; project-specific
                      deployment is not asserted.
                    </small>
                  </dd>
                </dl>
              </details>
              <Link
                href={`/projects/${project.slug}`}
                className="project-open-link"
              >
                Show Project <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </article>
        ))}
      </div>
      {showTools && (
        <div className="tool-summary-grid">
          {automationTools.map(tool => (
            <article key={tool.id} className="tool-summary-card">
              <span className="personal-badge">
                Personal tool / in-house development
              </span>
              <h3>{tool.name}</h3>
              <p>{tool.summary}</p>
              <div className="tag-list">
                {tool.stack.slice(0, 3).map(stack => (
                  <span key={stack}>{stack}</span>
                ))}
              </div>
              <a href={`#tool-${tool.id}`}>
                Explore tool <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
