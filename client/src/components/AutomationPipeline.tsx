import { useEffect, useState, type CSSProperties } from "react";
import { ArrowDownRight, ArrowUpRight, Workflow } from "lucide-react";
import { automationWorkflows } from "@/data/automationWorkflows";
import SectionHeading from "./SectionHeading";
import "./automation.css";

export default function AutomationPipeline() {
  const [toolIndex, setToolIndex] = useState(0);
  const [nodeIndex, setNodeIndex] = useState(0);
  useEffect(() => {
    const followHash = () => {
      const index = automationWorkflows.findIndex(
        t => `#tool-${t.id}` === window.location.hash
      );
      if (index >= 0) {
        setToolIndex(index);
        setNodeIndex(0);
      }
    };
    followHash();
    window.addEventListener("hashchange", followHash);
    return () => window.removeEventListener("hashchange", followHash);
  }, []);
  const tool = automationWorkflows[toolIndex];
  const node = tool.nodes[nodeIndex];
  return (
    <section
      id="automation-tools"
      className="portfolio-section section-alt automation-signature"
      style={{ "--automation-accent": tool.color } as CSSProperties}
    >
      <div className="container">
        <SectionHeading
          number="03"
          label="AUTOMATION / ENGINEERING LOGIC"
          title="From model data to engineering decisions."
          description="Inspect the workflow behind each engine. Select a tool, then open a stage to see its inputs, outputs and engineering purpose."
        />
        <div
          className="engine-selector"
          role="group"
          aria-label="Automation tool selector"
        >
          {automationWorkflows.map((t, i) => (
            <button
              id={`tool-${t.id}`}
              key={t.id}
              type="button"
              aria-pressed={i === toolIndex}
              aria-controls="engine-workspace"
              onClick={() => {
                setToolIndex(i);
                setNodeIndex(0);
              }}
            >
              <span>0{i + 1} / ENGINE</span>
              <strong>{t.name}</strong>
              <small>{i === 3 ? "Prototype concept" : "Personal tool"}</small>
            </button>
          ))}
        </div>
        <div id="engine-workspace" className="engine-workspace">
          <header className="engine-header">
            <div>
              <span className="engine-eyebrow">
                <Workflow size={16} aria-hidden="true" /> WORKFLOW EXPLORER
              </span>
              <h3>{tool.name}</h3>
              <p>{tool.summary}</p>
            </div>
            <span className="engine-status">{tool.status}</span>
          </header>
          <ol
            className="workflow-nodes"
            aria-label={`${tool.name} workflow stages`}
          >
            {tool.nodes.map((n, i) => (
              <li key={n.title}>
                <button
                  type="button"
                  aria-pressed={i === nodeIndex}
                  aria-controls="workflow-inspector"
                  onClick={() => setNodeIndex(i)}
                >
                  <span>STAGE 0{i + 1}</span>
                  <strong>{n.title}</strong>
                  <ArrowDownRight size={20} aria-hidden="true" />
                </button>
                {i < tool.nodes.length - 1 && (
                  <span className="workflow-connector" aria-hidden="true">
                    →
                  </span>
                )}
              </li>
            ))}
          </ol>
          <article
            id="workflow-inspector"
            className="workflow-inspector"
            aria-label="Selected workflow stage"
            aria-live="polite"
            aria-atomic="true"
          >
            <div>
              <span className="engine-eyebrow">
                STAGE 0{nodeIndex + 1} /{" "}
                {tool.nodes.length.toString().padStart(2, "0")}
              </span>
              <h4>{node.title}</h4>
              <p>{node.description}</p>
              <a href="#clash-demo">
                Try the coordination sandbox{" "}
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </div>
            <dl>
              {[
                ["Input", node.input],
                ["Output", node.output],
                ["Technology", node.technology],
                ["Engineering benefit", node.benefit],
                ["Related project use case", node.useCase],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </article>
        </div>
        <p className="evidence-note">
          The three personal tools are documented in Ahmed’s CV. These diagrams
          explain their workflows; recordings and validated outputs remain the
          next evidence step. Revit Model Auditor is a proposed prototype. The
          browser demo below uses synthetic elements and has no live Revit
          connection.
        </p>
      </div>
    </section>
  );
}
