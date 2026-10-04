import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
const metrics = [
  {
    value: "70,900 m²",
    label: "Healthcare project area",
    note: "SMC 3 · project scale",
    href: "/projects/smc-hospital",
  },
  {
    value: "56 floors",
    label: "High-rise project context",
    note: "NBC · per tower, not personal floor count",
    href: "/projects/nile-business-city",
  },
  {
    value: "LOD 350–400",
    label: "Model & drawing delivery",
    note: "Plumbing and fire protection",
    href: "/projects/nile-business-city",
  },
  {
    value: "Egypt + KSA",
    label: "Project exposure",
    note: "Four professional project contexts",
    href: "#projects",
  },
  {
    value: "3 engines",
    label: "BIM automation tools",
    note: "Explore capabilities and outputs",
    href: "#automation-tools",
  },
  {
    value: "Plumbing + FP",
    label: "Engineering specialisation",
    note: "Multidisciplinary coordination",
    href: "/projects/nile-business-city#case-scope",
  },
];
export default function MetricRail() {
  const reduced = useReducedMotion();
  return (
    <section
      className="metric-rail"
      aria-label="Engineering metrics and evidence"
    >
      <div className="container">
        <div className="rail-heading">
          <span>PROJECT SCALE / DELIVERY SCOPE</span>
          <span>
            Every metric opens its context <ArrowUpRight size={13} />
          </span>
        </div>
        <div className="metric-grid">
          {metrics.map((metric, index) => (
            <motion.a
              key={metric.value}
              href={metric.href}
              initial={reduced ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.35, delay: index * 0.04 }}
            >
              <span className="metric-number">
                0{index + 1}
                <ArrowUpRight size={15} />
              </span>
              <strong>{metric.value}</strong>
              <span className="metric-label">{metric.label}</span>
              <span className="metric-note">{metric.note}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
