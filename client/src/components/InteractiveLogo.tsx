import { motion } from "framer-motion";
import { useState } from "react";

export default function InteractiveLogo() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative w-10 h-10 flex items-center justify-center cursor-pointer"
    >
      {/* Main Logo Text */}
      <motion.div
        animate={isHovered ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <span className="text-lg font-bold bg-gradient-to-r from-primary to-chart-5 bg-clip-text text-transparent">
          AH
        </span>
      </motion.div>

      {/* BIM Grid Animation */}
      <motion.svg
        viewBox="0 0 40 40"
        className="absolute inset-0 w-full h-full"
        animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <defs>
          <style>{`
            @keyframes gridPulse {
              0%, 100% { stroke-width: 0.5; opacity: 0.4; }
              50% { stroke-width: 1; opacity: 1; }
            }
            .grid-line { animation: gridPulse 1.5s ease-in-out infinite; }
          `}</style>
        </defs>

        {/* Grid lines */}
        <g stroke="#3B82F6" fill="none" className="grid-line">
          <line x1="5" y1="10" x2="35" y2="10" />
          <line x1="5" y1="20" x2="35" y2="20" />
          <line x1="5" y1="30" x2="35" y2="30" />
          <line x1="10" y1="5" x2="10" y2="35" />
          <line x1="20" y1="5" x2="20" y2="35" />
          <line x1="30" y1="5" x2="30" y2="35" />
        </g>

        {/* Corner accents */}
        <motion.circle
          cx="10"
          cy="10"
          r="1.5"
          fill="#8B5CF6"
          animate={isHovered ? { r: [1.5, 2.5, 1.5] } : {}}
          transition={{ duration: 0.6, repeat: Infinity }}
        />
        <motion.circle
          cx="30"
          cy="10"
          r="1.5"
          fill="#EC4899"
          animate={isHovered ? { r: [1.5, 2.5, 1.5] } : {}}
          transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
        />
        <motion.circle
          cx="10"
          cy="30"
          r="1.5"
          fill="#10B981"
          animate={isHovered ? { r: [1.5, 2.5, 1.5] } : {}}
          transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
        />
        <motion.circle
          cx="30"
          cy="30"
          r="1.5"
          fill="#F59E0B"
          animate={isHovered ? { r: [1.5, 2.5, 1.5] } : {}}
          transition={{ duration: 0.6, repeat: Infinity, delay: 0.6 }}
        />
      </motion.svg>
    </motion.div>
  );
}
