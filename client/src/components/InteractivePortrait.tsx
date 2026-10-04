import { useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, Fingerprint } from "lucide-react";

export default function InteractivePortrait({ color }: { color: string }) {
  const [expanded, setExpanded] = useState(false);
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), {
    stiffness: 170,
    damping: 24,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), {
    stiffness: 170,
    damping: 24,
  });
  const glintX = useTransform(x, [-0.5, 0.5], [-35, 35]);
  const glintY = useTransform(y, [-0.5, 0.5], [-20, 20]);
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="hero-portrait-wrap">
      <motion.button
        type="button"
        className="hero-portrait"
        aria-pressed={expanded}
        aria-label={
          expanded ? "Hide Ahmed's specialisms" : "Reveal Ahmed's specialisms"
        }
        onClick={() => setExpanded(value => !value)}
        onPointerMove={event => {
          if (reduceMotion || event.pointerType !== "mouse") return;
          const rect = event.currentTarget.getBoundingClientRect();
          x.set((event.clientX - rect.left) / rect.width - 0.5);
          y.set((event.clientY - rect.top) / rect.height - 0.5);
        }}
        onPointerLeave={reset}
        onBlur={reset}
        style={{
          rotateX: reduceMotion ? 0 : rotateX,
          rotateY: reduceMotion ? 0 : rotateY,
        }}
      >
        <div className="hero-portrait-photo">
          <img
            src="/images/ahmed-hisham.png"
            alt="Ahmed Hisham"
            width="384"
            height="366"
            fetchPriority="high"
          />
        </div>
        <motion.div
          className="hero-portrait-glint"
          aria-hidden="true"
          style={{ x: reduceMotion ? 0 : glintX, y: reduceMotion ? 0 : glintY }}
        />
        <div className="hero-portrait-copy">
          <span className="hero-portrait-kicker" style={{ color }}>
            <Fingerprint size={14} /> THE ENGINEER BEHIND THE MODEL
          </span>
          <span className="hero-portrait-name">Engineering meets code.</span>
          <span className="hero-portrait-detail" aria-live="polite">
            {expanded
              ? "Mechatronics background. Plumbing & fire protection. C#, Python and Revit API."
              : "Tap to explore my engineering mindset."}
          </span>
        </div>
        <ArrowUpRight
          className="hero-portrait-arrow"
          size={20}
          style={{ color }}
          aria-hidden="true"
        />
      </motion.button>
    </div>
  );
}
