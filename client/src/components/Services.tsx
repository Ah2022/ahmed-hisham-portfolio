import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { Cpu, Layers, Brain, Search } from "lucide-react";
import { useState, useEffect } from "react";

const services = [
  {
    icon: Cpu,
    title: "BIM Automation",
    description:
      "Custom Dynamo scripts and Python tools that automate repetitive BIM tasks — from model auditing to automated parameter population and schedule generation.",
    tags: ["Dynamo", "Python", "Revit API"],
  },
  {
    icon: Layers,
    title: "MEP BIM Modeling",
    description:
      "High-precision MEP modeling in Revit for HVAC, plumbing, fire protection, and electrical systems. LOD 300-400 models ready for fabrication.",
    tags: ["Revit", "MEP", "LOD 400"],
  },
  {
    icon: Brain,
    title: "AI + BIM Integration",
    description:
      "Leveraging machine learning and AI to predict clashes, optimize routing, and generate intelligent design alternatives within BIM workflows.",
    tags: ["AI/ML", "Optimization", "Prediction"],
  },
  {
    icon: Search,
    title: "Clash Detection & Coordination",
    description:
      "Multi-discipline coordination using Navisworks and BIM 360. Zero-clash delivery through systematic detection, resolution, and verification workflows.",
    tags: ["Navisworks", "BIM 360", "IFC"],
    hasAnimation: true,
  },
];

function ClashDetectionAnimation() {
  const [state, setState] = useState<"detected" | "resolving" | "resolved">("detected");

  useEffect(() => {
    const timer = setInterval(() => {
      setState((prev) => {
        if (prev === "detected") return "resolving";
        if (prev === "resolving") return "resolved";
        return "detected";
      });
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mt-4 p-4 rounded-lg bg-secondary/30 border border-border/50">
      <svg
        viewBox="0 0 300 150"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <style>{`
            @keyframes clashPulse { 0%, 100% { r: 6; } 50% { r: 8; } }
            @keyframes resolveFlow { 0% { offset-distance: 0%; } 100% { offset-distance: 100%; } }
            .clash-indicator { animation: clashPulse 0.6s ease-in-out infinite; }
          `}</style>
        </defs>

        {/* Left Element - Pipe */}
        <rect x="20" y="50" width="60" height="30" fill="#3B82F6" opacity="0.3" rx="4" />
        <text x="50" y="70" fontSize="10" fill="#3B82F6" textAnchor="middle" fontWeight="bold">
          Pipe
        </text>

        {/* Right Element - Duct */}
        <rect x="220" y="50" width="60" height="30" fill="#8B5CF6" opacity="0.3" rx="4" />
        <text x="250" y="70" fontSize="10" fill="#8B5CF6" textAnchor="middle" fontWeight="bold">
          Duct
        </text>

        {/* Connection Line - Changes based on state */}
        {state === "detected" && (
          <>
            <line x1="80" y1="65" x2="220" y2="65" stroke="#EF4444" strokeWidth="2" />
            <circle cx="50" cy="65" r="6" fill="#EF4444" className="clash-indicator" />
            <circle cx="250" cy="65" r="6" fill="#EF4444" className="clash-indicator" />
            <text x="150" y="35" fontSize="11" fill="#EF4444" textAnchor="middle" fontWeight="bold">
              CLASH DETECTED
            </text>
          </>
        )}

        {state === "resolving" && (
          <>
            <path
              d="M 80 65 Q 150 40, 220 65"
              stroke="#F59E0B"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="50" cy="65" r="6" fill="#F59E0B" opacity="0.6" />
            <circle cx="250" cy="65" r="6" fill="#F59E0B" opacity="0.6" />
            <text x="150" y="35" fontSize="11" fill="#F59E0B" textAnchor="middle" fontWeight="bold">
              RESOLVING...
            </text>
            <motion.circle
              cx="150"
              cy="65"
              r="4"
              fill="#F59E0B"
              animate={{ cx: [80, 220] }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </>
        )}

        {state === "resolved" && (
          <>
            <line x1="80" y1="65" x2="220" y2="65" stroke="#22C55E" strokeWidth="2" />
            <circle cx="50" cy="65" r="6" fill="#22C55E" />
            <circle cx="250" cy="65" r="6" fill="#22C55E" />
            <text x="150" y="35" fontSize="11" fill="#22C55E" textAnchor="middle" fontWeight="bold">
              RESOLVED ✓
            </text>
          </>
        )}
      </svg>

      {/* State Label */}
      <div className="mt-3 text-center">
        <span className="text-xs font-mono font-semibold">
          {state === "detected" && <span className="text-red-400">Clash Detected</span>}
          {state === "resolving" && <span className="text-amber-400">Resolving Conflict...</span>}
          {state === "resolved" && <span className="text-green-400">Zero Clashes</span>}
        </span>
      </div>
    </div>
  );
}

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
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className="group p-6 sm:p-8 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 gradient-border"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/15 transition-colors">
                  <service.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="space-y-3 flex-1">
                  <h3 className="text-lg font-sans font-semibold text-foreground group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-body leading-relaxed">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-[10px] font-mono rounded bg-secondary text-secondary-foreground border border-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {service.hasAnimation && <ClashDetectionAnimation />}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
