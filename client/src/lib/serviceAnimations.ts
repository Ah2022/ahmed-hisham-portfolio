// Helper function for drawing dots
function dot(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, fill: string) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = fill;
  ctx.fill();
}

// Easing function
function eio(x: number): number {
  return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
}

// Clash Detection Animation
export function drawClash(ctx: CanvasRenderingContext2D, W: number, H: number, t: number, phase: number, pt: number) {
  const mx = W / 2,
    my = H / 2;
  const sc = W / 600;

  ctx.strokeStyle = "rgba(41,212,255,0.06)";
  ctx.lineWidth = 0.5;
  for (let x = 0; x < W; x += 40 * sc) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, H);
    ctx.stroke();
  }
  for (let y = 0; y < H; y += 40 * sc) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }

  const pipe_r = 8 * sc;
  const p1y = my - 25 * sc,
    p2y = my + 25 * sc;

  if (phase === 0) {
    const scan = (t * 0.8) % W;
    ctx.strokeStyle = "rgba(79,195,247,0.3)";
    ctx.lineWidth = 1 * sc;
    ctx.setLineDash([6 * sc, 4 * sc]);
    ctx.beginPath();
    ctx.moveTo(scan, 0);
    ctx.lineTo(scan, H);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.strokeStyle = "rgba(79,195,247,0.7)";
    ctx.lineWidth = pipe_r * 1.6;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(40 * sc, p1y);
    ctx.lineTo(W - 40 * sc, p1y);
    ctx.stroke();
    ctx.strokeStyle = "rgba(79,195,247,0.5)";
    ctx.lineWidth = pipe_r * 1.2;
    ctx.beginPath();
    ctx.moveTo(mx - 20 * sc, p2y - 80 * sc);
    ctx.lineTo(mx - 20 * sc, p2y + 80 * sc);
    ctx.stroke();
    dot(ctx, scan, p1y, 4 * sc, "rgba(79,195,247,0.9)");
  }

  if (phase === 1) {
    const pulse = 0.5 + 0.5 * Math.sin(t * 0.18);
    ctx.strokeStyle = `rgba(226,75,74,${0.5 + 0.3 * pulse})`;
    ctx.lineWidth = pipe_r * 1.6;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(40 * sc, p1y);
    ctx.lineTo(W - 40 * sc, p1y);
    ctx.stroke();
    ctx.strokeStyle = `rgba(226,75,74,${0.4 + 0.3 * pulse})`;
    ctx.lineWidth = pipe_r * 1.2;
    ctx.beginPath();
    ctx.moveTo(mx - 20 * sc, p2y - 80 * sc);
    ctx.lineTo(mx - 20 * sc, p2y + 80 * sc);
    ctx.stroke();
    const cx2 = mx - 20 * sc;
    ctx.strokeStyle = `rgba(226,75,74,${0.9})`;
    ctx.lineWidth = 2 * sc;
    for (let a = 0; a < 8; a++) {
      const ang = (a / 8) * Math.PI * 2 + t * 0.05;
      const r = (18 + pulse * 8) * sc;
      ctx.beginPath();
      ctx.moveTo(cx2, p1y);
      ctx.lineTo(cx2 + Math.cos(ang) * r, p1y + Math.sin(ang) * r);
      ctx.stroke();
    }
    dot(ctx, cx2, p1y, 7 * sc * pulse, `rgba(226,75,74,0.8)`);
    ctx.fillStyle = "rgba(226,75,74,0.9)";
    ctx.font = `${10 * sc}px monospace`;
    ctx.textAlign = "center";
    ctx.fillText("CLASH DETECTED", mx, my + 55 * sc);
  }

  if (phase === 2) {
    const progress = eio(pt);
    ctx.strokeStyle = "rgba(245,158,11,0.7)";
    ctx.lineWidth = pipe_r * 1.6;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(40 * sc, p1y);
    ctx.lineTo(W - 40 * sc, p1y);
    ctx.stroke();
    const cx2 = mx - 20 * sc;
    const off = 60 * sc * progress;
    ctx.strokeStyle = "rgba(245,158,11,0.7)";
    ctx.lineWidth = pipe_r * 1.2;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(cx2, p2y - 80 * sc);
    ctx.lineTo(cx2, p1y - 30 * sc - off);
    ctx.bezierCurveTo(cx2, p1y - 30 * sc - off - 20 * sc, cx2 + 40 * sc * progress, p1y + 10 * sc, cx2 + 40 * sc * progress, p1y + 30 * sc + off);
    ctx.lineTo(cx2 + 40 * sc * progress, p2y + 80 * sc);
    ctx.stroke();
    ctx.fillStyle = "rgba(245,158,11,0.8)";
    ctx.font = `${10 * sc}px monospace`;
    ctx.textAlign = "center";
    ctx.fillText("REROUTING…", mx, my + 55 * sc);
  }

  if (phase === 3) {
    ctx.strokeStyle = "rgba(29,158,117,0.8)";
    ctx.lineWidth = pipe_r * 1.6;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(40 * sc, p1y);
    ctx.lineTo(W - 40 * sc, p1y);
    ctx.stroke();
    const cx2 = mx + 20 * sc;
    ctx.strokeStyle = "rgba(29,158,117,0.7)";
    ctx.lineWidth = pipe_r * 1.2;
    ctx.beginPath();
    ctx.moveTo(cx2, p2y - 80 * sc);
    ctx.lineTo(cx2, p2y + 80 * sc);
    ctx.stroke();
    dot(ctx, cx2, p1y, 5 * sc, "rgba(29,158,117,0.9)");
    ctx.fillStyle = "rgba(29,158,117,0.9)";
    ctx.font = `${10 * sc}px monospace`;
    ctx.textAlign = "center";
    ctx.fillText("ZERO CLASH", mx, my + 55 * sc);
  }
}

// BIM Automation Animation
export function drawAutomation(ctx: CanvasRenderingContext2D, W: number, H: number, t: number, phase: number, pt: number) {
  const sc = W / 600;
  const mx = W / 2,
    my = H / 2;

  ctx.strokeStyle = "rgba(127,119,221,0.06)";
  ctx.lineWidth = 0.5;
  for (let x = 0; x < W; x += 40 * sc) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, H);
    ctx.stroke();
  }
  for (let y = 0; y < H; y += 40 * sc) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }

  const nodes = [
    { x: 100 * sc, y: my, label: "Revit", color: "rgba(79,195,247,0.8)" },
    { x: 230 * sc, y: my, label: "Dynamo", color: "rgba(127,119,221,0.8)" },
    { x: 370 * sc, y: my, label: "Python", color: "rgba(127,119,221,0.8)" },
    { x: 500 * sc, y: my, label: "Output", color: "rgba(29,158,117,0.8)" },
  ];

  nodes.forEach((n, i) => {
    const active = phase === i;
    const r = (active ? 22 : 16) * sc;
    ctx.beginPath();
    ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
    ctx.strokeStyle = n.color;
    ctx.lineWidth = (active ? 2 : 0.8) * sc;
    ctx.stroke();
    ctx.fillStyle = active ? n.color.replace("0.8", "0.15") : "rgba(255,255,255,0.03)";
    ctx.fill();
    if (active) {
      const pulse = 0.5 + 0.5 * Math.sin(t * 0.15);
      ctx.beginPath();
      ctx.arc(n.x, n.y, r + 8 * sc * pulse, 0, Math.PI * 2);
      ctx.strokeStyle = n.color.replace("0.8", "0.3");
      ctx.lineWidth = 1 * sc;
      ctx.stroke();
    }
    ctx.fillStyle = active ? n.color : "rgba(255,255,255,0.4)";
    ctx.font = `${active ? 11 : 10}px monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(n.label, n.x, n.y);
  });

  for (let i = 0; i < nodes.length - 1; i++) {
    const from = nodes[i],
      to = nodes[i + 1];
    const gap = 22 * sc;
    const active = phase === i;
    ctx.strokeStyle = active ? from.color : "rgba(255,255,255,0.12)";
    ctx.lineWidth = active ? 1.5 * sc : 0.5 * sc;
    ctx.setLineDash([5 * sc, 4 * sc]);
    ctx.beginPath();
    ctx.moveTo(from.x + gap, from.y);
    ctx.lineTo(to.x - gap, to.y);
    ctx.stroke();
    ctx.setLineDash([]);
    if (active) {
      const pos = pt;
      const px = from.x + gap + (to.x - gap - (from.x + gap)) * pos;
      dot(ctx, px, from.y, 4 * sc, from.color);
    }
  }

  const labels = ["Model data", "Script logic", "Pipeline", "Schedules"];
  ctx.fillStyle = "rgba(255,255,255,0.3)";
  ctx.font = `${9 * sc}px monospace`;
  ctx.textAlign = "center";
  nodes.forEach((n, i) => {
    ctx.fillText(labels[i], n.x, n.y + 32 * sc);
  });
}

// MEP Modeling Animation
export function drawMEP(ctx: CanvasRenderingContext2D, W: number, H: number, t: number, phase: number, pt: number) {
  const sc = W / 600;
  const mid = H / 2;
  const spread = 35 * sc;
  const yPositions = [mid - spread * 1.5, mid - spread * 0.5, mid + spread * 0.5, mid + spread * 1.5];
  const colors = ["rgba(79,195,247,", "rgba(38,166,154,", "rgba(226,75,74,", "rgba(245,158,11,"];
  const labels2 = ["HVAC", "Plumbing", "Fire prot.", "Electrical"];
  const thicknesses = [10, 8, 7, 6];

  ctx.strokeStyle = "rgba(79,195,247,0.05)";
  ctx.lineWidth = 0.5;
  for (let x = 0; x < W; x += 40 * sc) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, H);
    ctx.stroke();
  }

  yPositions.forEach((y, i) => {
    const active = phase === i;
    const alpha = active ? "0.8)" : "0.3)";
    ctx.strokeStyle = colors[i] + alpha;
    ctx.lineWidth = thicknesses[i] * sc;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(50 * sc, y);
    ctx.lineTo(W - 50 * sc, y);
    ctx.stroke();

    if (i % 2 === 0) {
      const vx = (i === 0 ? 200 : 420) * sc;
      ctx.strokeStyle = colors[i] + (active ? "0.7)" : "0.15)");
      ctx.lineWidth = (thicknesses[i] - 2) * sc;
      ctx.beginPath();
      ctx.moveTo(vx, y - 30 * sc);
      ctx.lineTo(vx, y + 30 * sc);
      ctx.stroke();
    }

    if (active) {
      const sweep = ((t * 1.2) % (W - 100 * sc)) + 50 * sc;
      dot(ctx, sweep, y, 5 * sc, colors[i] + "1)");
      ctx.fillStyle = colors[i] + "0.9)";
      ctx.font = `${10 * sc}px monospace`;
      ctx.textAlign = "left";
      ctx.fillText(labels2[i] + " — active", 55 * sc, y - 12 * sc);
    } else {
      ctx.fillStyle = colors[i] + "0.35)";
      ctx.font = `${9 * sc}px monospace`;
      ctx.textAlign = "left";
      ctx.fillText(labels2[i], 55 * sc, y - 10 * sc);
    }
  });

  if (phase === 3) {
    ctx.strokeStyle = "rgba(29,158,117,0.4)";
    ctx.lineWidth = 1 * sc;
    ctx.setLineDash([3 * sc, 3 * sc]);
    ctx.beginPath();
    ctx.rect(80 * sc, mid - spread * 2, W - 160 * sc, spread * 4);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = "rgba(29,158,117,0.7)";
    ctx.font = `${9 * sc}px monospace`;
    ctx.textAlign = "center";
    ctx.fillText("LOD 400 — all systems coordinated", W / 2, mid + spread * 2 + 15 * sc);
  }
}

// AI + BIM Integration Animation
export function drawAI(ctx: CanvasRenderingContext2D, W: number, H: number, t: number, phase: number, pt: number) {
  const sc = W / 600;
  const mx = W / 2,
    my = H / 2;

  for (let i = 0; i < 40; i++) {
    const angle = (i / 40) * Math.PI * 2;
    const r = (70 + Math.sin(t * 0.02 + i) * 8) * sc;
    const x = mx + Math.cos(angle) * r;
    const y = my + Math.sin(angle) * r;
    const nx = mx + Math.cos(angle + (Math.PI * 2) / 40) * (70 + Math.sin(t * 0.02 + i + 1) * 8) * sc;
    const ny = my + Math.sin(angle + (Math.PI * 2) / 40) * (70 + Math.sin(t * 0.02 + i + 1) * 8) * sc;
    const alpha = phase >= 2 ? 0.3 : 0.1;
    ctx.strokeStyle = `rgba(127,119,221,${alpha})`;
    ctx.lineWidth = 0.5 * sc;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(nx, ny);
    ctx.stroke();
    if (i % 5 === 0) {
      dot(ctx, x, y, 2 * sc, phase >= 2 ? "rgba(127,119,221,0.8)" : "rgba(127,119,221,0.3)");
    }
  }

  const nodeCount = 6;
  for (let i = 0; i < nodeCount; i++) {
    const angle = (i / nodeCount) * Math.PI * 2 + t * 0.003;
    const r = 50 * sc;
    const nx = mx + Math.cos(angle) * r;
    const ny = my + Math.sin(angle) * r;
    const active = phase >= 1;
    dot(ctx, nx, ny, 5 * sc, active ? "rgba(127,119,221,0.9)" : "rgba(127,119,221,0.3)");
    if (active) {
      ctx.strokeStyle = "rgba(127,119,221,0.3)";
      ctx.lineWidth = 0.5 * sc;
      ctx.beginPath();
      ctx.moveTo(mx, my);
      ctx.lineTo(nx, ny);
      ctx.stroke();
    }
  }

  const coreR = (phase >= 2 ? 18 : 12) * sc;
  ctx.beginPath();
  ctx.arc(mx, my, coreR, 0, Math.PI * 2);
  ctx.strokeStyle = phase >= 2 ? "rgba(29,158,117,0.9)" : "rgba(127,119,221,0.7)";
  ctx.lineWidth = 1.5 * sc;
  ctx.stroke();
  ctx.fillStyle = phase >= 2 ? "rgba(29,158,117,0.15)" : "rgba(127,119,221,0.1)";
  ctx.fill();

  const stateLabels = [
    ["Scanning model", "rgba(127,119,221,0.8)"],
    ["Training on data", "rgba(127,119,221,0.9)"],
    ["Routing optimal", "rgba(29,158,117,0.9)"],
    ["60% time saved", "rgba(29,158,117,1)"],
  ];
  ctx.fillStyle = stateLabels[phase][1];
  ctx.font = `${10 * sc}px monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(stateLabels[phase][0], mx, my + 75 * sc);

  if (phase === 2 || phase === 3) {
    const numRays = 12;
    for (let i = 0; i < numRays; i++) {
      const angle = (i / numRays) * Math.PI * 2;
      const r1 = 22 * sc,
        r2 = (35 + pt * 20) * sc;
      ctx.strokeStyle = `rgba(29,158,117,${0.6 * (1 - pt)})`;
      ctx.lineWidth = 1 * sc;
      ctx.beginPath();
      ctx.moveTo(mx + Math.cos(angle) * r1, my + Math.sin(angle) * r1);
      ctx.lineTo(mx + Math.cos(angle) * r2, my + Math.sin(angle) * r2);
      ctx.stroke();
    }
  }
}
