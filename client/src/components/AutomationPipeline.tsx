import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { ArrowRight, Database, Zap, FileText } from "lucide-react";

const pipelineSteps = [
  { icon: Database, label: "Revit Model", color: "#3B82F6" },
  { icon: Zap, label: "Python Script", color: "#8B5CF6" },
  { icon: FileText, label: "Output", color: "#10B981" },
];

export default function AutomationPipeline() {
  const { ref, inView } = useInView({ threshold: 0.2 });

  return (
    <section id="automation-tools" className="py-24 sm:py-32 relative" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-xs font-mono font-medium text-primary uppercase tracking-widest">
            Automation Tools
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold text-foreground mt-3 mb-4">
            AI-Powered <span className="gradient-text">Workflow Pipeline</span>
          </h2>
          <p className="text-muted-foreground font-body">
            Watch how your BIM data transforms through intelligent automation — from model to insights in seconds.
          </p>
        </motion.div>

        {/* Pipeline Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-4xl mx-auto"
        >
          <div className="p-8 rounded-xl bg-card border border-border">
            {/* SVG Pipeline */}
            <svg
              viewBox="0 0 800 300"
              className="w-full h-auto mb-8"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <style>{`
                  @keyframes flowData {
                    0% { offset-distance: 0%; }
                    100% { offset-distance: 100%; }
                  }
                  @keyframes pulse {
                    0%, 100% { r: 6; opacity: 1; }
                    50% { r: 8; opacity: 0.6; }
                  }
                  .data-packet { animation: flowData 3s linear infinite; }
                  .node-pulse { animation: pulse 2s ease-in-out infinite; }
                `}</style>
              </defs>

              {/* Nodes */}
              <g>
                {/* Revit Model Node */}
                <circle cx="100" cy="150" r="40" fill="#3B82F6" opacity="0.2" />
                <circle cx="100" cy="150" r="30" fill="none" stroke="#3B82F6" strokeWidth="2" />
                <text x="100" y="155" fontSize="20" textAnchor="middle" fill="#3B82F6" fontWeight="bold">
                  📦
                </text>

                {/* Python Script Node */}
                <circle cx="400" cy="150" r="40" fill="#8B5CF6" opacity="0.2" />
                <circle cx="400" cy="150" r="30" fill="none" stroke="#8B5CF6" strokeWidth="2" />
                <text x="400" y="155" fontSize="20" textAnchor="middle" fill="#8B5CF6" fontWeight="bold">
                  ⚙️
                </text>

                {/* Output Node */}
                <circle cx="700" cy="150" r="40" fill="#10B981" opacity="0.2" />
                <circle cx="700" cy="150" r="30" fill="none" stroke="#10B981" strokeWidth="2" />
                <text x="700" y="155" fontSize="20" textAnchor="middle" fill="#10B981" fontWeight="bold">
                  📊
                </text>
              </g>

              {/* Connection Lines */}
              <g stroke="#94A3B8" strokeWidth="2" fill="none" strokeDasharray="5,5">
                <line x1="140" y1="150" x2="360" y2="150" />
                <line x1="440" y1="150" x2="660" y2="150" />
              </g>

              {/* Animated Data Packets */}
              <g>
                {/* Packet 1 */}
                <motion.circle
                  cx="100"
                  cy="150"
                  r="6"
                  fill="#3B82F6"
                  animate={{ cx: [100, 400] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="data-packet"
                />
                {/* Packet 2 */}
                <motion.circle
                  cx="100"
                  cy="150"
                  r="6"
                  fill="#8B5CF6"
                  animate={{ cx: [100, 400] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1 }}
                  className="data-packet"
                />
                {/* Packet 3 */}
                <motion.circle
                  cx="400"
                  cy="150"
                  r="6"
                  fill="#10B981"
                  animate={{ cx: [400, 700] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="data-packet"
                />
                {/* Packet 4 */}
                <motion.circle
                  cx="400"
                  cy="150"
                  r="6"
                  fill="#10B981"
                  animate={{ cx: [400, 700] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1 }}
                  className="data-packet"
                />
              </g>

              {/* Labels */}
              <text x="100" y="210" fontSize="14" textAnchor="middle" fill="#E2E8F0" fontWeight="bold">
                Revit Model
              </text>
              <text x="400" y="210" fontSize="14" textAnchor="middle" fill="#E2E8F0" fontWeight="bold">
                Python Script
              </text>
              <text x="700" y="210" fontSize="14" textAnchor="middle" fill="#E2E8F0" fontWeight="bold">
                Output
              </text>
            </svg>

            {/* Pipeline Steps */}
            <div className="grid sm:grid-cols-3 gap-4">
              {pipelineSteps.map((step, i) => (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="p-4 rounded-lg bg-secondary/50 border border-border/50 text-center"
                >
                  <div
                    className="inline-flex items-center justify-center w-10 h-10 rounded-lg mb-2"
                    style={{ backgroundColor: step.color + "20", color: step.color }}
                  >
                    <step.icon className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-semibold text-foreground">{step.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {i === 0 && "Input BIM data"}
                    {i === 1 && "Process & analyze"}
                    {i === 2 && "Generate reports"}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="mt-8 p-6 rounded-lg bg-primary/5 border border-primary/20"
          >
            <p className="text-sm text-foreground">
              <span className="font-semibold">How it works:</span> Your Revit model feeds into custom Python automation scripts that extract parameters, detect clashes, generate schedules, and produce coordinated output — all without manual intervention. This pipeline reduces coordination time by up to 60% and eliminates human error.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
