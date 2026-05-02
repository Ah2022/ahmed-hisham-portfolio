import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

const skills = [
  { name: "Revit", level: 95, color: "#3B82F6" },
  { name: "Dynamo", level: 88, color: "#8B5CF6" },
  { name: "Python", level: 85, color: "#EC4899" },
  { name: "Navisworks", level: 90, color: "#F59E0B" },
  { name: "AutoCAD", level: 92, color: "#10B981" },
  { name: "BIM 360", level: 87, color: "#06B6D4" },
];

interface SkillBarProps {
  name: string;
  level: number;
  color: string;
  delay: number;
}

function SkillBar({ name, level, color, delay }: SkillBarProps) {
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (level / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col items-center"
    >
      <div className="relative w-24 h-24">
        {/* Background circle */}
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-secondary"
          />
          {/* Animated progress arc */}
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{
              strokeDashoffset: offset,
            }}
            transition={{
              duration: 1.2,
              delay: delay + 0.2,
              ease: "easeOut",
            }}
            strokeLinecap="round"
          />
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-bold" style={{ color }}>
            {level}%
          </span>
          <span className="text-[10px] text-muted-foreground font-mono">
            proficiency
          </span>
        </div>
      </div>

      {/* Label */}
      <p className="mt-3 text-sm font-semibold text-foreground">{name}</p>
    </motion.div>
  );
}

export default function SkillBars() {
  const { ref } = useInView({ threshold: 0.2 });

  return (
    <div ref={ref as any} className="mt-12">
      <h3 className="text-lg font-semibold text-foreground mb-8">
        Technical Proficiency
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
        {skills.map((skill, i) => (
          <SkillBar
            key={skill.name}
            name={skill.name}
            level={skill.level}
            color={skill.color}
            delay={i * 0.1}
          />
        ))}
      </div>
    </div>
  );
}
