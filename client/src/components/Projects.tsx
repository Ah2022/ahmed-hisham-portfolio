import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import ProjectCards from "./ProjectCards";

export default function Projects() {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section id="projects" className="py-24 sm:py-32 relative" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-xs font-mono font-medium text-primary uppercase tracking-widest">
            Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold text-foreground mt-3 mb-4">
            Featured <span className="gradient-text-blue">Projects</span>
          </h2>
          <p className="text-muted-foreground font-body">
            Landmark projects where precision engineering meets intelligent coordination.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ProjectCards />
        </motion.div>
      </div>
    </section>
  );
}
