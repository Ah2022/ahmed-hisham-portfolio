import { Cpu, ArrowUpRight } from "lucide-react";
import { automationTools } from "@/data/portfolio";
import SectionHeading from "./SectionHeading";
export default function AutomationTools() {
  return (
    <section id="automation-tools" className="portfolio-section section-alt">
      <div className="container">
        <SectionHeading
          number="03"
          label="AUTOMATION"
          title="Tools built around the workflow."
          description="Three personal BIM engines. Explore their documented capabilities, development stacks and outputs."
        />
        <div className="automation-tool-grid">
          {automationTools.map((tool, index) => (
            <article
              id={`tool-${tool.id}`}
              key={tool.id}
              className="automation-tool-card"
              style={{ "--project-color": tool.color } as React.CSSProperties}
            >
              <div className="tool-card-top">
                <Cpu size={24} aria-hidden="true" />
                <span>ENGINE / 0{index + 1}</span>
              </div>
              <span className="personal-badge">
                {tool.type} · in-house development
              </span>
              <h3>{tool.name}</h3>
              <p>{tool.summary}</p>
              <div className="tag-list">
                {tool.stack.map(stack => (
                  <span key={stack}>{stack}</span>
                ))}
              </div>
              <details>
                <summary>
                  Inspect capabilities{" "}
                  <ArrowUpRight size={15} aria-hidden="true" />
                </summary>
                <ul>
                  {tool.capabilities.map(capability => (
                    <li key={capability}>{capability}</li>
                  ))}
                </ul>
                <p className="tool-output">
                  <strong>Output</strong>
                  {tool.output}
                </p>
              </details>
            </article>
          ))}
        </div>
        <p className="evidence-note">
          Tool descriptions are based on the CV. Recordings and sample outputs
          will provide direct demonstrations; no live Revit connection is
          implied.
        </p>
      </div>
    </section>
  );
}
