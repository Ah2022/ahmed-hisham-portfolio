import { motion } from "framer-motion";
import StatusIndicator from "./StatusIndicator";
import BIMWireframeHero from "./BIMWireframeHero";

const roles = [
  "BIM Automation Engineer",
  "MEP BIM Modeler",
  "AI + BIM Integration Specialist",
  "MEP Design & Clash Detection",
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background - Custom BIM Wireframe Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <BIMWireframeHero />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
      </div>

      <div className="container relative z-10 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20"
              >
                <StatusIndicator showLabel={true} />
              </motion.div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-bold leading-tight tracking-tight">
                <span className="text-foreground">Ahmed</span>{" "}
                <span className="gradient-text">Hisham</span>
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground font-body max-w-lg leading-relaxed">
                Transforming MEP engineering through intelligent automation and AI-driven BIM workflows.
              </p>
            </div>

            {/* Role Tags */}
            <div className="flex flex-wrap gap-2">
              {roles.map((role, i) => (
                <motion.span
                  key={role}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="px-3 py-1.5 text-xs font-mono font-medium rounded-md bg-secondary border border-border text-secondary-foreground"
                >
                  {role}
                </motion.span>
              ))}
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#projects"
                className="px-6 py-3 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="px-6 py-3 text-sm font-semibold rounded-lg border border-border text-foreground hover:bg-accent transition-colors"
              >
                Get in Touch
              </a>
            </motion.div>
          </motion.div>

          {/* Right - Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-primary/20 via-transparent to-chart-5/20 blur-2xl" />
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-2 border-border/50 shadow-2xl">
                <img
                  src="/manus-storage/profile_ahmed_e78b9a39.png"
                  alt="Ahmed Hisham"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-2 -right-2 sm:bottom-4 sm:right-0 px-4 py-2 rounded-lg bg-card border border-border shadow-xl"
              >
                <span className="font-mono text-xs text-primary font-semibold">2+ Years</span>
                <span className="block text-[10px] text-muted-foreground">Experience</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-4 h-6 rounded-full border border-muted-foreground/30 flex items-start justify-center p-1"
          >
            <div className="w-1 h-1.5 rounded-full bg-muted-foreground" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
