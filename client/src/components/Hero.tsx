import { motion } from "framer-motion";

const roles = [
  "BIM Automation Engineer",
  "MEP BIM Modeler",
  "AI + BIM Integration Specialist",
  "MEP Design & Clash Detection",
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background - Animated BIM Wireframe */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 w-full h-full opacity-20">
          <svg
            viewBox="0 0 800 600"
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <style>{`
                @keyframes fadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }
                @keyframes rotate3d { 
                  0% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); } 
                  100% { transform: rotateX(15deg) rotateY(360deg) rotateZ(5deg); } 
                }
                .structural { animation: fadeIn 2s ease-in-out 0s forwards; }
                .mep { animation: fadeIn 2s ease-in-out 2s forwards; opacity: 0; }
                .electrical { animation: fadeIn 2s ease-in-out 4s forwards; opacity: 0; }
                .wireframe-container { animation: rotate3d 20s linear infinite; transform-origin: 400px 300px; }
              `}</style>
            </defs>
            <g className="wireframe-container">
              {/* Structural Frame - Blue */}
              <g className="structural" stroke="#3B82F6" strokeWidth="2" fill="none">
                <rect x="200" y="150" width="400" height="300" opacity="0.3"/>
                <line x1="200" y1="200" x2="600" y2="200" opacity="0.5"/>
                <line x1="200" y1="250" x2="600" y2="250" opacity="0.5"/>
                <line x1="200" y1="300" x2="600" y2="300" opacity="0.5"/>
                <line x1="200" y1="350" x2="600" y2="350" opacity="0.5"/>
                <line x1="250" y1="150" x2="250" y2="450"/>
                <line x1="350" y1="150" x2="350" y2="450"/>
                <line x1="450" y1="150" x2="450" y2="450"/>
                <line x1="550" y1="150" x2="550" y2="450"/>
              </g>
              {/* MEP Systems - Purple */}
              <g className="mep" stroke="#8B5CF6" strokeWidth="3" fill="none" strokeLinecap="round">
                <path d="M 220 180 Q 280 160, 340 180 Q 400 200, 460 180 Q 520 160, 580 180"/>
                <path d="M 220 240 L 580 240"/>
                <path d="M 230 220 Q 300 240, 370 220 Q 440 200, 510 220 Q 580 240, 600 260"/>
                <path d="M 200 300 L 600 300"/>
              </g>
              {/* Electrical Systems - Pink */}
              <g className="electrical" stroke="#EC4899" strokeWidth="2" fill="none" strokeDasharray="5,5">
                <path d="M 210 200 L 210 400"/>
                <path d="M 590 200 L 590 400"/>
                <path d="M 300 150 L 300 450"/>
                <path d="M 500 150 L 500 450"/>
              </g>
            </g>
          </svg>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
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
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-mono font-medium text-primary">
                  Available for Projects
                </span>
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
