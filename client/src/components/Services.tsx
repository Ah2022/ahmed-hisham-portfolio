import { ArrowUpRight, Layers3, FileText, GitMerge, Code2 } from "lucide-react";
import SectionHeading from "./SectionHeading";
const services = [
  {
    name: "Plumbing & fire protection BIM",
    icon: Layers3,
    description:
      "Service modelling, plant spaces and typical/mechanical-floor documentation within defined project scopes.",
    evidence: "Explore professional projects",
    href: "#projects",
  },
  {
    name: "Shop drawing documentation",
    icon: FileText,
    description:
      "Translate service models into coordinated drawings and sections for execution-stage delivery.",
    evidence: "Inspect hospital delivery scope",
    href: "/projects/smc-hospital",
  },
  {
    name: "Multidisciplinary coordination",
    icon: GitMerge,
    description:
      "Review service routing against architecture, structure and other MEP packages, then update model interfaces.",
    evidence: "Inspect high-rise coordination",
    href: "/projects/nile-business-city",
  },
  {
    name: "Revit workflow development",
    icon: Code2,
    description:
      "Build purpose-specific C#, Python and pyRevit tools for model scanning, issue tracking and calculation workflows.",
    evidence: "Explore the three engines",
    href: "#automation-tools",
  },
];
export default function Services() {
  return (
    <section id="services" className="portfolio-section section-alt">
      <div className="container">
        <SectionHeading
          number="05"
          label="SERVICES"
          title="Clear scope. Tangible deliverables."
          description="Capabilities tied to project contributions and developed tools."
        />
        <div className="services-grid">
          {services.map((service, index) => (
            <article key={service.name}>
              <div className="service-index">
                <service.icon size={22} aria-hidden="true" />
                <span>0{index + 1}</span>
              </div>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <a href={service.href}>
                {service.evidence}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
