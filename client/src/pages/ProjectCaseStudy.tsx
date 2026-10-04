import { useEffect, useState } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowUpRight,
  MapPin,
  Layers3,
  ImageIcon,
} from "lucide-react";
import { projects, automationTools, type Project } from "@/data/portfolio";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectPreview from "@/components/ProjectPreview";
import CoordinationDemo from "@/components/CoordinationDemo";
import NotFound from "./NotFound";

function CaseStudy({ project }: { project: Project }) {
  const [systems, setSystems] = useState(project.systems);
  const [level, setLevel] = useState(0);
  const [annotations, setAnnotations] = useState(true);
  useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]'
    );
    const previousDescription = description?.content;
    document.title = `${project.shortName} | Ahmed Hisham BIM Portfolio`;
    if (description)
      description.content = `${project.role}. ${project.location}. ${project.scope}`;
    return () => {
      document.title = previousTitle;
      if (description && previousDescription !== undefined)
        description.content = previousDescription;
    };
  }, [project]);
  return (
    <div className="portfolio-page">
      <Navbar />
      <main id="main-content" tabIndex={-1} className="case-study">
        <div className="container">
          <Link href="/#projects" className="case-back">
            <ArrowLeft size={16} aria-hidden="true" /> Back to projects
          </Link>
          <header className="case-heading">
            <div className="project-kinds">
              <span className="professional-badge">
                Professional / client project
              </span>
              <span>{project.category}</span>
            </div>
            <h1>{project.name}</h1>
            <p className="project-location">
              <MapPin size={15} aria-hidden="true" />
              {project.location}
            </p>
            <p>{project.role}</p>
            <div className="case-metrics">
              {project.metrics.map(metric => (
                <div key={metric.label}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </div>
              ))}
            </div>
          </header>
          <nav className="case-section-nav" aria-label="Case study sections">
            <a href="#case-overview">Overview</a>
            <a href="#case-scope">Scope</a>
            <a href="#case-workflow">Workflow</a>
            <a href="#case-gallery">Diagram & gallery</a>
            <a href="#case-results">Results</a>
          </nav>
          <div className="case-content-grid">
            <div className="case-main-content">
              <section id="case-overview" className="case-block">
                <span className="section-index">01 / CONTEXT</span>
                <h2>Project Overview</h2>
                <p>{project.overview}</p>
                <h3>Ahmed’s Role</h3>
                <p>
                  {project.role}. {project.scope}
                </p>
              </section>
              <section id="case-scope" className="case-block">
                <span className="section-index">02 / DELIVERY</span>
                <h2>Project Scope</h2>
                <p>{project.scope}</p>
                <h3>Systems Coordinated</h3>
                <div className="tag-list">
                  {project.systems.map(system => (
                    <span key={system}>{system}</span>
                  ))}
                </div>
                <h3>Software Used</h3>
                <div className="tag-list">
                  {project.software.map(software => (
                    <span key={software}>{software}</span>
                  ))}
                </div>
                <div className="challenge-solution">
                  <div>
                    <span>CHALLENGE</span>
                    <p>{project.challenge}</p>
                  </div>
                  <div>
                    <span>APPROACH / SOLUTION</span>
                    <p>{project.solution}</p>
                  </div>
                </div>
              </section>
              <section id="case-workflow" className="case-block">
                <span className="section-index">03 / METHOD</span>
                <h2>Workflow</h2>
                <ol className="workflow-list">
                  {project.workflow.map((step, index) => (
                    <li key={step}>
                      <span>0{index + 1}</span>
                      {step}
                    </li>
                  ))}
                </ol>
                <h3>Deliverables</h3>
                <ul className="deliverable-list">
                  {project.deliverables.map(deliverable => (
                    <li key={deliverable}>{deliverable}</li>
                  ))}
                </ul>
                <h3>Coordination Method</h3>
                <p>{project.coordination}</p>
              </section>
            </div>
            <aside className="case-metadata" aria-label="Project metadata">
              <div className="case-metadata-title">
                <Layers3 size={17} aria-hidden="true" /> PROJECT RECORD
              </div>
              <dl>
                <dt>Project type</dt>
                <dd>{project.category}</dd>
                <dt>Contribution</dt>
                <dd>Professional / client project</dd>
                <dt>Location</dt>
                <dd>{project.location}</dd>
                <dt>LOD level</dt>
                <dd>{project.lod}</dd>
                <dt>Responsibility</dt>
                <dd>{project.role}</dd>
                <dt>Source</dt>
                <dd>Ahmed’s supplied CV</dd>
              </dl>
              <p>
                Project-scale figures describe the wider development. Ahmed’s
                contribution is defined in the delivery scope.
              </p>
              <a href="/documents/ahmed-hisham-cv.pdf">
                View CV <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </aside>
          </div>
          <section id="case-gallery" className="case-block case-gallery">
            <span className="section-index">04 / EXPLORE</span>
            <h2>Gallery / Technical Diagram</h2>
            <p>
              Explore an illustrative service diagram. System switches and the
              view selector explain scope; they do not display live model data.
            </p>
            <div className="case-explorer">
              <div
                className="case-layer-controls"
                role="group"
                aria-label="Case study system layers"
              >
                {project.systems.map(system => (
                  <button
                    type="button"
                    key={system}
                    aria-pressed={systems.includes(system)}
                    onClick={() =>
                      setSystems(current =>
                        current.includes(system)
                          ? current.filter(item => item !== system)
                          : [...current, system]
                      )
                    }
                  >
                    {system}
                  </button>
                ))}
                <button
                  type="button"
                  aria-pressed={annotations}
                  onClick={() => setAnnotations(current => !current)}
                >
                  Annotations
                </button>
              </div>
              <ProjectPreview
                project={project}
                enabledSystems={systems}
                level={project.levels[level]}
                annotations={annotations}
              />
              <div className="case-view-controls">
                <label className="range-label" htmlFor="case-level">
                  {project.category === "Healthcare"
                    ? "Level selector"
                    : "Context view selector"}
                  <strong>{project.levels[level]}</strong>
                </label>
                <input
                  id="case-level"
                  aria-label="Project level or context view"
                  type="range"
                  min="0"
                  max={project.levels.length - 1}
                  step="1"
                  value={level}
                  onChange={event => setLevel(Number(event.target.value))}
                />
                <p className="case-layer-status" aria-live="polite">
                  {systems.length
                    ? `Visible: ${systems.join(" · ")}`
                    : "All service layers hidden"}{" "}
                  · {project.levels[level]}
                </p>
                <div className="case-annotation-list">
                  {annotations &&
                    project.annotations.map((annotation, index) => (
                      <span key={annotation}>
                        <b>0{index + 1}</b> {annotation}
                      </span>
                    ))}
                </div>
              </div>
            </div>
            {(project.category === "Healthcare" ||
              project.category === "High-rise") && <CoordinationDemo />}
            <div className="media-slots">
              <h3>Project media slots</h3>
              <p>
                Reserved for actual model views, drawings and recorded
                coordination evidence.
              </p>
              <div>
                {project.mediaNeeded.map(media => (
                  <figure key={media}>
                    <ImageIcon size={24} aria-hidden="true" />
                    <figcaption>{media}</figcaption>
                    <span>Media to be supplied</span>
                  </figure>
                ))}
              </div>
            </div>
          </section>
          <section id="case-results" className="case-block">
            <span className="section-index">05 / OUTPUT</span>
            <h2>Results</h2>
            <p>{project.result}</p>
            <h3>Related Tools</h3>
            <p>
              Personal tool capabilities relevant to this workflow; this does
              not establish project-specific deployment.
            </p>
            <div className="related-tool-links">
              {project.relatedTools.map(id => (
                <a key={id} href={`/#tool-${id}`}>
                  {automationTools.find(tool => tool.id === id)?.name}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              ))}
            </div>
          </section>
          <div className="case-bottom-nav">
            <Link href="/#projects">
              <ArrowLeft size={17} aria-hidden="true" /> All projects
            </Link>
            <a href="/#contact">
              Discuss this workflow{" "}
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
export default function ProjectCaseStudy({ slug }: { slug: string }) {
  const project = projects.find(item => item.slug === slug);
  return project ? <CaseStudy key={slug} project={project} /> : <NotFound />;
}
