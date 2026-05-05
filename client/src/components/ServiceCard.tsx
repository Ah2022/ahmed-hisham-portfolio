import { useEffect, useRef } from "react";

interface ServiceCardProps {
  id: string;
  title: string;
  desc: string;
  tags: string[];
  states: string[];
  stateColors: string[];
  draw: (ctx: CanvasRenderingContext2D, W: number, H: number, t: number, phase: number, pt: number) => void;
}

export default function ServiceCard({
  id,
  title,
  desc,
  tags,
  states,
  stateColors,
  draw,
}: ServiceCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animStateRef = useRef({ t: 0, phase: 0, phaseT: 0, running: true, raf: null as number | null });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const ctxTyped = ctx as CanvasRenderingContext2D;

    const st = animStateRef.current;
    canvas.width = canvas.parentElement?.offsetWidth ? canvas.parentElement.offsetWidth * 2 : 600;
    canvas.height = 320;

    const CYCLE = 120;

    function updateStateDots(phase: number) {
      const dots = document.querySelectorAll(`[data-dot-id="${id}"]`);
      dots.forEach((dot, i) => {
        const el = dot as HTMLElement;
        el.className = "state-dot" + (i === phase ? " active" : "");
        el.style.background = i === phase ? stateColors[phase] : "var(--color-border-tertiary)";
      });

      const lbl = document.querySelector(`[data-label-id="${id}"]`) as HTMLElement;
      if (lbl) {
        lbl.textContent = states[phase];
        lbl.style.color = stateColors[phase];
      }
    }

    function tick() {
      if (!st.running || !canvas) return;

      st.t++;
      st.phaseT++;

      if (st.phaseT >= CYCLE) {
        st.phaseT = 0;
        st.phase = (st.phase + 1) % states.length;
        updateStateDots(st.phase);
      }

      const W = canvas.width;
      const H = canvas.height;
      ctxTyped.clearRect(0, 0, W, H);
      draw(ctxTyped, W, H, st.t, st.phase, st.phaseT / CYCLE);

      st.raf = requestAnimationFrame(tick);
    }

    tick();

    return () => {
      st.running = false;
      if (st.raf) cancelAnimationFrame(st.raf);
    };
  }, [id, states, stateColors, draw]);

  return (
    <div className="bg-[var(--color-background-primary)] border border-[var(--color-border-tertiary)] rounded-lg overflow-hidden hover:border-[var(--color-border-secondary)] transition-colors">
      <div className="bg-[#060e1c] relative h-40">
        <canvas
          ref={canvasRef}
          className="w-full h-full block"
          style={{ display: "block" }}
        />
      </div>
      <div className="p-4">
        <div className="text-sm font-medium text-[var(--color-text-primary)] mb-1">{title}</div>
        <div className="text-xs text-[var(--color-text-secondary)] leading-relaxed mb-2.5">{desc}</div>
        <div className="flex items-center gap-1.5">
          {states.map((_, i) => (
            <div
              key={i}
              data-dot-id={id}
              className="state-dot w-1.5 h-1.5 rounded-full bg-[var(--color-border-tertiary)] transition-all"
              style={{ background: i === 0 ? stateColors[0] : "var(--color-border-tertiary)" }}
            />
          ))}
          <span
            data-label-id={id}
            className="text-xs font-mono tracking-widest text-[var(--color-text-tertiary)] ml-1 transition-colors"
            style={{ color: stateColors[0] }}
          >
            {states[0]}
          </span>
        </div>
        <div className="flex gap-1.5 flex-wrap mt-2.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.75 rounded bg-[var(--color-background-secondary)] text-[var(--color-text-secondary)] tracking-tight"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        .state-dot {
          transition: background 0.4s, transform 0.3s;
        }
        .state-dot.active {
          transform: scale(1.4);
        }
      `}</style>
    </div>
  );
}
