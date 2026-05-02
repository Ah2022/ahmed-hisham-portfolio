import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import SkillBars from "./SkillBars";

const stats = [
  { value: "69,145", unit: "m²", label: "Largest Project" },
  { value: "50+", unit: "", label: "Models Coordinated" },
  { value: "LEED", unit: "Gold", label: "Certified Projects" },
  { value: "AI", unit: "Driven", label: "Automation Tools" },
];

export default function About() {
  const { ref, inView } = useInView({ threshold: 0.2 });

  return (
    <section id="about" className="py-24 sm:py-32 relative" ref={ref}>
      <div className="container">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Left Column - Hook */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 space-y-6"
          >
            <div className="space-y-3">
              <span className="text-xs font-mono font-medium text-primary uppercase tracking-widest">
                About
              </span>
              <h2 className="text-3xl sm:text-4xl font-sans font-bold text-foreground leading-tight">
                Where <span className="gradient-text-blue">Artificial Intelligence</span> meets Building Information Modeling
              </h2>
            </div>

            <div className="space-y-4 text-muted-foreground font-body leading-relaxed">
              <p className="text-lg">
                I don't just model buildings — I engineer the intelligence behind them. While others draw pipes and ducts, I build systems that think, coordinate, and resolve conflicts before they ever reach a construction site.
              </p>
              <p>
                With a deep foundation in Mechanical Engineering and MEP systems, I've evolved beyond traditional BIM workflows. I develop custom Dynamo scripts, Python-powered automation tools, and AI-integrated pipelines that slash coordination time by up to 60%. My approach transforms Revit from a modeling tool into an intelligent design engine.
              </p>
              <p>
                From a 69,145 m² hospital in Riyadh targeting LEED Gold certification to iconic skyscrapers in Egypt's New Administrative Capital — I bring precision, speed, and innovation to every project I touch.
              </p>
            </div>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-2 pt-4">
              {["Revit", "Dynamo", "Python", "Navisworks", "AutoCAD", "AI/ML", "IFC", "BIM 360"].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-mono rounded-md bg-accent border border-border text-accent-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors duration-300"
                >
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-sans font-bold text-foreground">{stat.value}</span>
                    {stat.unit && (
                      <span className="text-sm font-mono text-primary">{stat.unit}</span>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground mt-1 block">{stat.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Animated Skill Bars */}
            <SkillBars />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
