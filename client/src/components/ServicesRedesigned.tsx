import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { ArrowRight, GitMerge, Terminal, Building2, Cpu } from "lucide-react";

const services = [
  {
    id: "c1",
    number: "01",
    title: "Clash detection & coordination",
    description:
      "Multi-discipline coordination using Navisworks and BIM 360. Systematic detection, resolution, and verification — zero-clash IFC delivery on every project.",
    tools: ["Navisworks", "BIM 360", "IFC"],
    deliverables: ["Clash reports", "BCF issue log", "Coordination matrix", "Zero-clash certificate"],
    outcome: "1,200+ clashes resolved",
    icon: GitMerge,
    accentColor: "#e24b4a",
    bgColor: "rgba(226,75,74,0.08)",
    borderColor: "rgba(226,75,74,0.2)",
    textColor: "#a32d2d",
  },
  {
    id: "c2",
    number: "02",
    title: "BIM automation",
    description:
      "Custom Dynamo scripts and Python tools that eliminate repetitive BIM tasks — model auditing, parameter population, schedule generation, and QA in minutes, not days, eg: MEPSizer — Auto Pipe/Duct Sizer",
    tools: ["Dynamo", "Python", "Revit API", "pyRevit"],
    deliverables: ["Custom scripts", "Model auditor", "Auto-schedules", "QA pipeline"],
    outcome: "Days → 30 min QA",
    icon: Terminal,
    accentColor: "#7f77dd",
    bgColor: "rgba(127,119,221,0.08)",
    borderColor: "rgba(127,119,221,0.2)",
    textColor: "#3c3489",
  },
  {
    id: "c3",
    number: "03",
    title: "MEP BIM modeling",
    description:
      "High-precision HVAC, Plumbing and Fire Protection, modeling in Revit. LOD 300–400 models built for fabrication and LEED certification.",
    tools: ["Revit MEP", "AutoCAD", "LOD 400", "LEED"],
    deliverables: ["HVAC systems", "Plumbing design", "Fire protection", "Electrical layout"],
    outcome: "69,145 m² delivered",
    icon: Building2,
    accentColor: "#3a8add",
    bgColor: "rgba(56,138,221,0.08)",
    borderColor: "rgba(56,138,221,0.2)",
    textColor: "#0c447c",
  },
  {
    id: "c4",
    number: "04",
    title: "AI + BIM integration",
    description:
      "AI Clash Addin That Make:\n🔵 Full Scan the entire model With Choosing Target Level option.\n🔴 Generate RFIs and Creates Reports Using GPT-4o.\n🟢 Live Monitor Clashes in Real-time While Modeling.\n🟣Dashboard For Showing Analytics After The Full Scan Within Revit.",
    tools: ["AI", "Python", "Real-time Monitoring", "Prediction"],
    deliverables: ["Clash prediction model", "Route optimizer", "Automation pipeline", "AI clash report"],
    outcome: "60% faster coordination",
    icon: Cpu,
    accentColor: "#1d9e75",
    bgColor: "rgba(29,158,117,0.08)",
    borderColor: "rgba(29,158,117,0.2)",
    textColor: "#085041",
  },
];

const stats = [
  { value: "2+ years", label: "Active project experience" },
  { value: "50+ models", label: "Coordinated & delivered" },
  { value: "Available now", label: "Open for new projects", isActive: true },
];

export default function ServicesRedesigned() {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section id="services" className="py-24 sm:py-32 relative" ref={ref}>
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-6 bg-primary/40" />
            <span className="text-xs font-mono font-medium text-primary uppercase tracking-widest">
              Services
            </span>
            <div className="h-px w-6 bg-primary/40" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold text-foreground mb-4">
            What I <span className="gradient-text-blue">deliver</span>
          </h2>
          <p className="text-muted-foreground font-body">
            End-to-end BIM solutions that combine engineering precision with cutting-edge automation.
          </p>
        </motion.div>

        {/* Service Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border rounded-2xl overflow-hidden border border-border mb-6"
        >
          {services.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
              className="group bg-card p-7 cursor-pointer transition-all duration-300 hover:bg-secondary relative overflow-hidden"
            >
              {/* Accent bar */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                style={{ backgroundColor: service.accentColor }}
              />

              {/* Icon */}
              <div
                className="w-11 h-11 rounded-lg flex items-center justify-center mb-4 border transition-colors duration-200"
                style={{
                  backgroundColor: service.bgColor,
                  borderColor: service.borderColor,
                }}
              >
                <service.icon className="w-5 h-5" style={{ color: service.accentColor }} />
              </div>

              {/* Number */}
              <p className="text-xs font-mono font-medium text-muted-foreground mb-2 tracking-wider">
                {service.number}
              </p>

              {/* Title */}
              <h3 className="text-base font-sans font-semibold text-foreground mb-3 leading-tight">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground mb-4 flex-1 leading-relaxed">
                {service.description}
              </p>

              {/* Tools */}
              <div className="flex flex-wrap gap-2 mb-4">
                {service.tools.map((tool) => (
                  <span
                    key={tool}
                    className="text-xs font-mono px-2 py-1 rounded border"
                    style={{
                      backgroundColor: service.bgColor,
                      color: service.textColor,
                      borderColor: service.borderColor,
                    }}
                  >
                    {tool}
                  </span>
                ))}
              </div>

              {/* Deliverables - Hidden by default, shown on hover */}
              <div className="flex flex-wrap gap-2 mb-4 opacity-0 transform translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-75">
                {service.deliverables.map((deliverable) => (
                  <span
                    key={deliverable}
                    className="text-xs px-2 py-1 rounded border text-muted-foreground"
                    style={{
                      backgroundColor: "var(--color-secondary)",
                      borderColor: "var(--color-border)",
                    }}
                  >
                    {deliverable}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span
                  className="text-xs font-medium px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: service.bgColor,
                    color: service.textColor,
                    border: `0.5px solid ${service.borderColor}`,
                  }}
                >
                  {service.outcome}
                </span>
                <div className="flex items-center gap-1 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs font-medium">
                  <span>Enquire</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-2"
        >
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-secondary border border-border rounded-lg p-4 text-center"
            >
              <div className="text-lg font-semibold text-foreground mb-1">{stat.value}</div>
              <div className="text-xs text-muted-foreground flex items-center justify-center gap-2">
                {stat.isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                )}
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
