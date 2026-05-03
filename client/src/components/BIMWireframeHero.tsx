import { useEffect, useRef } from "react";

export default function BIMWireframeHero() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!stageRef.current) return;

    const stage = stageRef.current;
    const canvas = stage.querySelector("canvas") as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    function resize() {
      canvas.width = stage.clientWidth;
      canvas.height = stage.clientHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const PHASES = [
      { name: "Structural", color: "rgba(41,212,255,", accent: "#29d4ff" },
      { name: "MEP systems", color: "rgba(38,166,154,", accent: "#26a69a" },
      { name: "Electrical", color: "rgba(245,158,11,", accent: "#f59e0b" },
    ];

    let t = 0;
    let phase = 0;
    let modeT = 0;
    const FADE_IN = 90,
      HOLD = 200,
      FADE_OUT = 60,
      CYCLE = FADE_IN + HOLD + FADE_OUT;

    function easeInOut(x: number) {
      return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
    }

    function drawBuilding(alpha: number, phaseIdx: number) {
      if (!ctx) return;
      const W = canvas.width,
        H = canvas.height;
      const cx = W * 0.5,
        base = H * 0.88,
        top = H * 0.06;
      const bw = W * 0.13,
        tw = W * 0.04;
      const bldH = base - top;
      const col = PHASES[phaseIdx].color;

      const a = (v: number) => col + v * alpha + ")";

      if (phaseIdx === 0) {
        const numFloors = 18;
        for (let i = 0; i <= numFloors; i++) {
          const fy = top + (bldH / numFloors) * i;
          const fw = tw + ((bw - tw) * (fy - top)) / bldH;
          ctx.beginPath();
          ctx.moveTo(cx - fw, fy);
          ctx.lineTo(cx + fw, fy);
          ctx.strokeStyle = a(i % 3 === 0 ? 0.6 : 0.25);
          ctx.lineWidth = i % 3 === 0 ? 0.8 : 0.4;
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.moveTo(cx - bw, base);
        ctx.lineTo(cx - tw, top);
        ctx.strokeStyle = a(0.9);
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(cx + bw, base);
        ctx.lineTo(cx + tw, top);
        ctx.strokeStyle = a(0.9);
        ctx.lineWidth = 1;
        ctx.stroke();

        for (let i = 2; i < numFloors - 2; i += 3) {
          const y1 = top + (bldH / numFloors) * i;
          const y2 = top + (bldH / numFloors) * (i + 3);
          const fw1 = tw + ((bw - tw) * (y1 - top)) / bldH;
          const fw2 = tw + ((bw - tw) * (y2 - top)) / bldH;
          ctx.beginPath();
          ctx.moveTo(cx - fw1, y1);
          ctx.lineTo(cx + fw2, y2);
          ctx.strokeStyle = a(0.3);
          ctx.lineWidth = 0.5;
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(cx + fw1, y1);
          ctx.lineTo(cx - fw2, y2);
          ctx.strokeStyle = a(0.3);
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }

        const cw = W * 0.025;
        ctx.strokeStyle = a(0.8);
        ctx.lineWidth = 1;
        ctx.strokeRect(cx - cw, top, cw * 2, bldH);

        for (let i = 0; i <= numFloors; i++) {
          const fy = top + (bldH / numFloors) * i;
          ctx.beginPath();
          ctx.moveTo(cx - cw, fy);
          ctx.lineTo(cx + cw, fy);
          ctx.strokeStyle = a(0.4);
          ctx.lineWidth = 0.4;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.moveTo(cx, top);
        ctx.lineTo(cx, top - H * 0.08);
        ctx.strokeStyle = a(0.7);
        ctx.lineWidth = 0.8;
        ctx.stroke();

        const obsR = W * 0.055;
        ctx.beginPath();
        ctx.ellipse(cx, top, obsR, H * 0.012, 0, 0, Math.PI * 2);
        ctx.strokeStyle = a(0.6);
        ctx.lineWidth = 0.8;
        ctx.stroke();

        const baseW = W * 0.22;
        ctx.beginPath();
        ctx.moveTo(cx - baseW, base + H * 0.02);
        ctx.lineTo(cx - bw, base);
        ctx.lineTo(cx + bw, base);
        ctx.lineTo(cx + baseW, base + H * 0.02);
        ctx.strokeStyle = a(0.5);
        ctx.lineWidth = 0.8;
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(cx - W * 0.28, base + H * 0.03);
        ctx.lineTo(cx + W * 0.28, base + H * 0.03);
        ctx.strokeStyle = a(0.25);
        ctx.lineWidth = 0.5;
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(cx - W * 0.22, base + H * 0.02);
        ctx.lineTo(cx - W * 0.22, base + H * 0.05);
        ctx.strokeStyle = a(0.35);
        ctx.lineWidth = 0.4;
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(cx + W * 0.22, base + H * 0.02);
        ctx.lineTo(cx + W * 0.22, base + H * 0.05);
        ctx.strokeStyle = a(0.35);
        ctx.lineWidth = 0.4;
        ctx.stroke();
      }

      if (phaseIdx === 1) {
        const pipes = [
          { x: cx - tw * 1.8, from: top + bldH * 0.15, to: base - H * 0.03, w: 0.9 },
          { x: cx + tw * 1.8, from: top + bldH * 0.15, to: base - H * 0.03, w: 0.9 },
          { x: cx - tw * 0.6, from: top + bldH * 0.1, to: base - H * 0.04, w: 1.2 },
        ];
        pipes.forEach((p) => {
          ctx.beginPath();
          ctx.moveTo(p.x, p.from);
          ctx.lineTo(p.x, p.to);
          ctx.strokeStyle = a(0.7);
          ctx.lineWidth = p.w;
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(p.x - W * 0.006, p.from);
          ctx.lineTo(p.x - W * 0.006, p.to);
          ctx.strokeStyle = a(0.2);
          ctx.lineWidth = p.w * 2;
          ctx.stroke();
        });

        const numFloors = 18;
        for (let i = 2; i < numFloors; i += 2) {
          const fy = top + (bldH / numFloors) * i;
          const fw = (tw + ((bw - tw) * (fy - top)) / bldH) * 0.85;
          pipes.forEach((p) => {
            ctx.beginPath();
            ctx.moveTo(p.x, fy);
            const dir = p.x < cx ? 1 : -1;
            ctx.lineTo(cx + dir * fw * 0.6, fy);
            ctx.strokeStyle = a(0.45);
            ctx.lineWidth = 0.6;
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(p.x, fy, W * 0.004, 0, Math.PI * 2);
            ctx.fillStyle = a(0.8);
            ctx.fill();
          });
        }

        for (let i = 3; i < numFloors; i += 4) {
          const fy = top + (bldH / numFloors) * i;
          const fw = tw + ((bw - tw) * (fy - top)) / bldH;
          ctx.beginPath();
          ctx.moveTo(cx - fw * 0.3, fy - H * 0.012);
          ctx.lineTo(cx + fw * 0.3, fy - H * 0.012);
          ctx.lineTo(cx + fw * 0.3, fy + H * 0.012);
          ctx.lineTo(cx - fw * 0.3, fy + H * 0.012);
          ctx.closePath();
          ctx.strokeStyle = a(0.4);
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      if (phaseIdx === 2) {
        const numFloors = 18;
        const busX = cx - tw * 1.1;
        ctx.beginPath();
        ctx.moveTo(busX, top + bldH * 0.12);
        ctx.lineTo(busX, base - H * 0.03);
        ctx.strokeStyle = a(0.8);
        ctx.lineWidth = 1.2;
        ctx.stroke();

        for (let i = 1; i < numFloors; i++) {
          const fy = top + (bldH / numFloors) * i;
          const fw = tw + ((bw - tw) * (fy - top)) / bldH;
          const runEnd = cx + fw * 0.55;
          ctx.beginPath();
          ctx.moveTo(busX, fy);
          ctx.lineTo(runEnd, fy);
          ctx.strokeStyle = a(i % 2 === 0 ? 0.55 : 0.3);
          ctx.lineWidth = i % 2 === 0 ? 0.8 : 0.4;
          ctx.stroke();

          if (i % 3 === 0) {
            ctx.beginPath();
            ctx.arc(busX, fy, W * 0.004, 0, Math.PI * 2);
            ctx.fillStyle = a(1);
            ctx.fill();
          }
          if (i % 4 === 0) {
            const nx = runEnd - W * 0.025;
            ctx.beginPath();
            ctx.rect(nx - W * 0.008, fy - H * 0.008, W * 0.016, H * 0.016);
            ctx.strokeStyle = a(0.6);
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        const conduits = [cx + tw * 0.5, cx + tw * 1.4];
        conduits.forEach((x) => {
          ctx.beginPath();
          ctx.moveTo(x, top + bldH * 0.2);
          ctx.lineTo(x, base - H * 0.03);
          ctx.strokeStyle = a(0.4);
          ctx.lineWidth = 0.7;
          ctx.setLineDash([4, 3]);
          ctx.stroke();
          ctx.setLineDash([]);
        });
      }
    }

    function drawScanLine(alpha: number) {
      if (!ctx) return;
      const W = canvas.width,
        H = canvas.height;
      const cx = W * 0.5,
        base = H * 0.88,
        top = H * 0.06;
      const scanY = top + ((base - top) * ((t * 0.003) % 1));
      const scanBw = W * 0.13 + ((W * 0.04 - W * 0.13) * (scanY - top)) / (base - top);
      ctx.beginPath();
      ctx.moveTo(cx - scanBw - 10, scanY);
      ctx.lineTo(cx + scanBw + 10, scanY);
      ctx.strokeStyle = `rgba(41,212,255,${alpha * 0.15})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    function drawGrid(alpha: number) {
      if (!ctx) return;
      const W = canvas.width,
        H = canvas.height;
      ctx.strokeStyle = `rgba(41,212,255,${alpha * 0.04})`;
      ctx.lineWidth = 0.3;
      for (let x = 0; x < W; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let y = 0; y < H; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }
    }

    function drawGlow(alpha: number, phaseIdx: number) {
      if (!ctx) return;
      const W = canvas.width,
        H = canvas.height;
      const cx = W * 0.5,
        base = H * 0.88,
        top = H * 0.06;
      const colors = ["rgba(41,212,255,", "rgba(38,166,154,", "rgba(245,158,11,"];
      const col = colors[phaseIdx];
      const midY = (top + base) / 2;
      const grad = ctx.createRadialGradient(cx, midY, 0, cx, midY, W * 0.35);
      grad.addColorStop(0, col + 0.06 * alpha + ")");
      grad.addColorStop(1, col + "0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);
    }

    function updateLabels(phaseIdx: number, alpha: number) {
      const lblMap: Record<number, string[]> = {
        0: ["l1", "l2", "l3"],
        1: ["l4", "l5"],
        2: ["l6", "l7"],
      };
      for (let i = 0; i < 3; i++) {
        const ids = lblMap[i] || [];
        ids.forEach((id) => {
          const el = stage.querySelector(`#${id}`) as HTMLElement;
          if (el) el.style.opacity = i === phaseIdx ? (alpha * 0.9).toString() : "0";
        });
      }
    }

    function updatePhaseUI(idx: number, alpha: number) {
      ["pd0", "pd1", "pd2"].forEach((id, i) => {
        const el = stage.querySelector(`#${id}`) as HTMLElement;
        el.className = "phase-dot" + (i === idx ? " active" : "");
        if (i === idx) el.style.background = PHASES[idx].accent;
        else el.style.background = "rgba(255,255,255,0.2)";
      });
      const lbl = stage.querySelector("#phase-label") as HTMLElement;
      lbl.textContent = PHASES[idx].name;
      lbl.style.color = PHASES[idx].accent + "99";
    }

    function loop() {
      if (!ctx) return;
      t++;
      modeT++;

      if (modeT > CYCLE) {
        modeT = 0;
        phase = (phase + 1) % 3;
      }

      let alpha = 0;
      if (modeT < FADE_IN) {
        alpha = easeInOut(modeT / FADE_IN);
      } else if (modeT < FADE_IN + HOLD) {
        alpha = 1;
      } else {
        alpha = 1 - easeInOut((modeT - FADE_IN - HOLD) / FADE_OUT);
      }

      const W = canvas.width,
        H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      drawGrid(1);
      drawGlow(alpha, phase);
      drawBuilding(alpha, phase);
      if (phase > 0) drawBuilding(Math.min(1, alpha + 0.3) * 0.18, 0);
      drawScanLine(1);

      updateLabels(phase, alpha);
      updatePhaseUI(phase, alpha);

      requestAnimationFrame(loop);
    }

    loop();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div
      ref={stageRef}
      id="stage"
      className="w-full bg-[#050d1a] rounded-xl overflow-hidden relative min-h-[520px] flex items-center justify-center"
    >
      <canvas id="c" className="block" />
      <div id="labels" className="absolute inset-0 w-full h-full pointer-events-none">
        <div
          className="lbl"
          id="l1"
          style={{ top: "12%", right: "12%", color: "#29d4ff" }}
        >
          <div className="lbl-line" />
          <span>Level 40 — Antenna</span>
        </div>
        <div
          className="lbl"
          id="l2"
          style={{ top: "22%", right: "8%", color: "#29d4ff" }}
        >
          <div className="lbl-line" />
          <span>Observation deck</span>
        </div>
        <div
          className="lbl"
          id="l3"
          style={{ top: "38%", right: "10%", color: "#4fc3f7" }}
        >
          <div className="lbl-line" />
          <span>Structural core</span>
        </div>
        <div
          className="lbl"
          id="l4"
          style={{ top: "55%", right: "8%", color: "#26a69a" }}
        >
          <div className="lbl-line" />
          <span>HVAC riser</span>
        </div>
        <div
          className="lbl"
          id="l5"
          style={{ top: "65%", right: "12%", color: "#26a69a" }}
        >
          <div className="lbl-line" />
          <span>MEP floor zone</span>
        </div>
        <div
          className="lbl"
          id="l6"
          style={{ top: "76%", right: "8%", color: "#f59e0b" }}
        >
          <div className="lbl-line" />
          <span>Electrical bus</span>
        </div>
        <div
          className="lbl"
          id="l7"
          style={{ top: "85%", right: "12%", color: "#f59e0b" }}
        >
          <div className="lbl-line" />
          <span>Foundation slab</span>
        </div>
      </div>
      <div
        id="phase-label"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10px] font-mono tracking-widest uppercase"
        style={{ color: "rgba(41,212,255,0.6)" }}
      >
        Structural
      </div>
      <div
        id="phase-bar"
        className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2.5 items-center"
      >
        <div className="phase-dot active" id="pd0" />
        <div className="phase-dot" id="pd1" />
        <div className="phase-dot" id="pd2" />
      </div>

      <style>{`
        .lbl {
          position: absolute;
          font-size: 10px;
          font-family: monospace;
          letter-spacing: 0.06em;
          opacity: 0;
          transition: opacity 0.6s;
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .lbl-line {
          height: 0.5px;
          width: 28px;
          background: currentColor;
        }
        .lbl span {
          font-size: 9px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .phase-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          transition: background 0.5s, transform 0.3s;
        }
        .phase-dot.active {
          background: #29d4ff;
          transform: scale(1.4);
        }
      `}</style>
    </div>
  );
}
