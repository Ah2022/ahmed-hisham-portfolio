import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import ServiceCard from "./ServiceCard";
import { drawClash, drawAutomation, drawMEP, drawAI } from "@/lib/serviceAnimations";

const services = [
  {
    id: "automation",
    title: "BIM Automation",
    desc: "Custom Dynamo scripts and Python tools that automate repetitive BIM tasks — model auditing to schedule generation.",
    tags: ["Dynamo", "Python", "Revit API"],
    states: ["Input", "Processing", "Generating", "Output"],
    stateColors: ["#4fc3f7", "#7f77dd", "#7f77dd", "#1d9e75"],
    draw: drawAutomation,
  },
  {
    id: "mep",
    title: "MEP BIM Modeling",
    desc: "High-precision MEP modeling for HVAC, plumbing, fire protection, and electrical systems. LOD 300-400.",
    tags: ["Revit", "MEP", "LOD 400"],
    states: ["HVAC", "Plumbing", "Fire", "Electrical"],
    stateColors: ["#4fc3f7", "#26a69a", "#e24b4a", "#f59e0b"],
    draw: drawMEP,
  },
  {
    id: "ai",
    title: "AI + BIM Integration",
    desc: "Machine learning and AI to predict clashes, optimize routing, and generate intelligent design alternatives.",
    tags: ["AI/ML", "Optimization", "Prediction"],
    states: ["Analyzing", "Predicting", "Optimizing", "Complete"],
    stateColors: ["#7f77dd", "#7f77dd", "#1d9e75", "#1d9e75"],
    draw: drawAI,
  },
  {
    id: "clash",
    title: "Clash Detection & Coordination",
    desc: "Multi-discipline coordination — zero-clash delivery through systematic detection, resolution, and verification.",
    tags: ["Navisworks", "BIM 360", "IFC"],
    states: ["Scanning", "Detected", "Resolving", "Resolved"],
    stateColors: ["#4fc3f7", "#e24b4a", "#f59e0b", "#1d9e75"],
    draw: drawClash,
  },
];

export default function Services() {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section id="services" className="py-24 sm:py-32 relative" ref={ref}>
      {/* Subtle background pattern */}
      <div className="absolute inset-0 dot-grid opacity-30" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-xs font-mono font-medium text-primary uppercase tracking-widest">
            Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold text-foreground mt-3 mb-4">
            What I <span className="gradient-text">Deliver</span>
          </h2>
          <p className="text-muted-foreground font-body">
            End-to-end BIM solutions that combine engineering precision with cutting-edge automation technology.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
            >
              <ServiceCard {...service} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
