import { useEffect, useRef } from 'react';

interface ProjectCardData {
  id: string;
  title: string;
  subtitle: string;
  badge: { text: string; color: string };
  status: { text: string; color: string; dot: string };
  type: { text: string; color: string };
  kpis: { value: string; label: string }[];
  challenge: { title: string; text: string };
  steps: { icon: string; label: string }[];
  tags: string[];
  footer: { icon: string; text: string };
  canvasId: string;
  drawFn: (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => void;
}

const projectsData: ProjectCardData[] = [
  {
    id: 'smc',
    title: 'SMC Hospital — DB-142',
    subtitle: 'DAR International · Al Wadi District, Riyadh, KSA',
    badge: { text: 'MEP coordination', color: 'rgba(41,212,255,0.12)' },
    status: { text: 'Delivered Oct 2024', color: 'rgba(29,158,117,0.12)', dot: '#1d9e75' },
    type: { text: 'LEED v4 Gold', color: 'var(--color-background-success)' },
    kpis: [
      { value: '69,145', label: 'm² facility area' },
      { value: '1,200+', label: 'clashes resolved' },
      { value: '6', label: 'disciplines coordinated' },
    ],
    challenge: {
      title: 'Challenge → solution',
      text: 'Worked as a Plumbing BIM Modeler responsible for developing and coordinating plumbing systems using Autodesk Revit within a multidisciplinary BIM environment. Solving critical MEP/structure overlay conflicts that manual coordination couldn\'t clear fast enough for the deadline. Built an automation workflow combined with Dynamo rerouting scripts — cleared all critical clashes and delivered zero-clash Models on schedule.',
    },
    steps: [
      { icon: '📦', label: 'LOD 400 modeling' },
      { icon: '🔀', label: 'Clash detection' },
      { icon: '💻', label: 'Dynamo automation' },
      { icon: '✓', label: 'IFC delivery' },
    ],
    tags: ['Revit MEP', 'Navisworks', 'Dynamo', 'BIM 360', 'LEED v4 BD+C', 'Healthcare'],
    footer: { icon: '🏢', text: 'DAR International' },
    canvasId: 'c1',
    drawFn: drawHospital,
  },
  {
    id: 'nile',
    title: 'Nile Business City — Nile Towers',
    subtitle: 'Nile Developments · New Administrative Capital, Egypt',
    badge: { text: 'High-rise coordination', color: 'rgba(127,119,221,0.12)' },
    status: { text: 'Ongoing', color: 'rgba(245,158,11,0.1)', dot: '#ba7517' },
    type: { text: 'Supertall mixed-use', color: 'var(--color-background-secondary)' },
    kpis: [
      { value: '50+', label: 'floors coordinated' },
      { value: '4', label: 'MEP disciplines' },
      { value: 'Africa', label: 'tallest towers' },
    ],
    challenge: {
      title: 'Challenge → solution',
      text: 'Contributed to the BIM coordination and plumbing modeling process within an MEP consultant environment. For Vertical MEP shafts across 50+ floors created compounding routing conflicts at every transfer level — a coordination problem that scales exponentially with height. Implemented a level-by-level Navisworks federated model workflow, reducing coordination cycle time per floor by managing discipline clashes in parallel rather than sequentially.',
    },
    steps: [
      { icon: '📐', label: 'Federated model setup' },
      { icon: '🔗', label: 'Level-by-level clash' },
      { icon: '⏱️', label: 'BIM 360 issue tracking' },
      { icon: '📈', label: 'Cycle optimisation' },
    ],
    tags: ['Revit MEP', 'Navisworks', 'BIM 360', 'High-rise', 'Vertical distribution', 'Multi-discipline'],
    footer: { icon: '🏢', text: 'Nile Developments' },
    canvasId: 'c2',
    drawFn: drawTower,
  },
  {
    id: 'clash',
    title: 'Live clash detector',
    subtitle: 'Revit API · Python · Real-time MEP conflict detection',
    badge: { text: 'Automation tool', color: 'rgba(226,75,74,0.12)' },
    status: { text: 'Open source', color: 'rgba(29,158,117,0.12)', dot: '#1d9e75' },
    type: { text: 'Personal tool', color: 'var(--color-background-danger)' },
    kpis: [
      { value: 'Real-time', label: 'detection inside Revit' },
      { value: '0', label: 'Navisworks exports needed' },
      { value: 'Hours', label: 'saved per model session' },
    ],
    challenge: {
      title: 'Problem → tool built',
      text: 'The standard MEP clash workflow requires exporting to Navisworks, running detection, then returning to Revit to fix — a slow round-trip that costs hours per session. Built a Python tool using the Revit API that runs clash detection inside Revit itself, flagging conflicts as you model and eliminating the export cycle entirely.',
    },
    steps: [
      { icon: '🔌', label: 'Revit API hook' },
      { icon: '📡', label: 'Live geometry scan' },
      { icon: '⚠️', label: 'In-model flag' },
      { icon: '📋', label: 'Report export' },
    ],
    tags: ['Python', 'Revit API', 'pyRevit', 'Clash detection', 'MEP automation'],
    footer: { icon: '👤', text: 'Personal project' },
    canvasId: 'c3',
    drawFn: drawClashTool,
  },
  {
    id: 'auditor',
    title: 'Revit model auditor',
    subtitle: 'Dynamo · Python · BIM standards compliance checker',
    badge: { text: 'Automation tool', color: 'rgba(29,158,117,0.12)' },
    status: { text: 'Used on live projects', color: 'rgba(29,158,117,0.12)', dot: '#1d9e75' },
    type: { text: 'Personal tool', color: 'var(--color-background-success)' },
    kpis: [
      { value: 'Auto', label: 'standards compliance check' },
      { value: 'Days → mins', label: 'manual audit replaced' },
      { value: 'Multi', label: 'discipline model support' },
    ],
    challenge: {
      title: 'Problem → tool built',
      text: 'Manual BIM model auditing before IFC submission — checking naming conventions, parameter completeness, workset structure, and LOD compliance — took days of repetitive review and still missed errors. Built a Dynamo + Python auditor that runs the full standards checklist automatically, outputs a flagged report, and cuts pre-submission QA from days to under 30 minutes.',
    },
    steps: [
      { icon: '📥', label: 'Model ingestion' },
      { icon: '✓', label: 'Standards checklist' },
      { icon: '🚩', label: 'Error flagging' },
      { icon: '📊', label: 'QA report output' },
    ],
    tags: ['Dynamo', 'Python', 'Revit API', 'BIM standards', 'QA automation', 'IFC'],
    footer: { icon: '👤', text: 'Personal tool · used on SMC Hospital' },
    canvasId: 'c4',
    drawFn: drawAuditor,
  },
];

function drawHospital(ctx: CanvasRenderingContext2D, W: number, H: number, t: number) {
  const cx = W / 2,
    sc = W / 400;
  ctx.strokeStyle = 'rgba(79,195,247,0.08)';
  ctx.lineWidth = 0.5;
  for (let x = 0; x < W; x += 30 * sc) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, H);
    ctx.stroke();
  }
  for (let y = 0; y < H; y += 30 * sc) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }
  const bx = cx - 55 * sc,
    by = H * 0.15,
    bw = 110 * sc,
    bh = H * 0.7;
  const floors = 6;
  for (let i = 0; i <= floors; i++) {
    const fy = by + (bh * i) / floors;
    const a = 0.15 + 0.4 * (Math.sin(t * 0.02 + i * 0.5) * 0.5 + 0.5);
    ctx.strokeStyle = `rgba(79,195,247,${a})`;
    ctx.lineWidth = 0.6;
    ctx.beginPath();
    ctx.moveTo(bx, fy);
    ctx.lineTo(bx + bw, fy);
    ctx.stroke();
  }
  ctx.strokeStyle = 'rgba(79,195,247,0.5)';
  ctx.lineWidth = 0.8;
  ctx.strokeRect(bx, by, bw, bh);
  const pipes = [
    { y: by + bh * 0.3, c: 'rgba(38,166,154,0.7)' },
    { y: by + bh * 0.55, c: 'rgba(245,158,11,0.6)' },
    { y: by + bh * 0.75, c: 'rgba(79,195,247,0.5)' },
  ];
  pipes.forEach((p) => {
    ctx.strokeStyle = p.c;
    ctx.lineWidth = 3 * sc;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(20 * sc, p.y);
    ctx.lineTo(W - 20 * sc, p.y);
    ctx.stroke();
    const x = ((t * 0.8) % (W - 30 * sc)) + 15 * sc;
    ctx.beginPath();
    ctx.arc(x, p.y, 3 * sc, 0, Math.PI * 2);
    ctx.fillStyle = p.c;
    ctx.fill();
  });
  const scan = ((t * 0.5) % bh) + by;
  ctx.strokeStyle = 'rgba(79,195,247,0.15)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(bx, scan);
  ctx.lineTo(bx + bw, scan);
  ctx.stroke();
}

function drawTower(ctx: CanvasRenderingContext2D, W: number, H: number, t: number) {
  const cx = W / 2,
    sc = W / 400;
  ctx.strokeStyle = 'rgba(127,119,221,0.07)';
  ctx.lineWidth = 0.5;
  for (let x = 0; x < W; x += 30 * sc) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, H);
    ctx.stroke();
  }
  for (let y = 0; y < H; y += 30 * sc) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }
  const tw = 18 * sc,
    bh = H * 0.85,
    ty = H * 0.08;
  ctx.strokeStyle = 'rgba(127,119,221,0.6)';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(cx - tw, ty + bh);
  ctx.lineTo(cx - tw, ty);
  ctx.lineTo(cx + tw, ty);
  ctx.lineTo(cx + tw, ty + bh);
  ctx.stroke();
  const fls = 14;
  for (let i = 0; i <= fls; i++) {
    const fy = ty + (bh * i) / fls;
    const pulse = i === Math.floor(((t * 0.03) % 1) * fls) ? 0.8 : 0.2;
    ctx.strokeStyle = `rgba(127,119,221,${pulse})`;
    ctx.lineWidth = i % 3 === 0 ? 0.8 : 0.4;
    ctx.beginPath();
    ctx.moveTo(cx - tw, fy);
    ctx.lineTo(cx + tw, fy);
    ctx.stroke();
  }
  const shafts = [cx - tw * 0.5, cx, cx + tw * 0.5];
  shafts.forEach((x, i) => {
    ctx.strokeStyle = `rgba(127,119,221,0.35)`;
    ctx.lineWidth = 0.5;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(x, ty);
    ctx.lineTo(x, ty + bh);
    ctx.stroke();
    ctx.setLineDash([]);
    const py = ty + ((t * 0.4 + i * 40) % bh);
    ctx.beginPath();
    ctx.arc(x, py, 2.5 * sc, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(127,119,221,0.8)';
    ctx.fill();
  });
}

function drawClashTool(ctx: CanvasRenderingContext2D, W: number, H: number, t: number) {
  const cx = W / 2,
    my = H / 2,
    sc = W / 400;
  ctx.strokeStyle = 'rgba(226,75,74,0.07)';
  ctx.lineWidth = 0.5;
  for (let x = 0; x < W; x += 30 * sc) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, H);
    ctx.stroke();
  }
  for (let y = 0; y < H; y += 30 * sc) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }
  const phase = Math.floor((t * 0.015) % 3);
  const pt = (t * 0.015) % 1;
  const p1y = my - 20 * sc,
    p2y = my + 20 * sc;
  if (phase === 0) {
    ctx.strokeStyle = 'rgba(79,195,247,0.7)';
    ctx.lineWidth = 8 * sc;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(40 * sc, p1y);
    ctx.lineTo(W - 40 * sc, p1y);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(79,195,247,0.5)';
    ctx.lineWidth = 6 * sc;
    ctx.beginPath();
    ctx.moveTo(cx, my - 60 * sc);
    ctx.lineTo(cx, my + 60 * sc);
    ctx.stroke();
    const sx = ((t * 0.8) % (W - 60 * sc)) + 30 * sc;
    ctx.strokeStyle = 'rgba(79,195,247,0.25)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 3]);
    ctx.beginPath();
    ctx.moveTo(sx, 0);
    ctx.lineTo(sx, H);
    ctx.stroke();
    ctx.setLineDash([]);
  } else if (phase === 1) {
    const pulse = 0.5 + 0.5 * Math.sin(t * 0.2);
    ctx.strokeStyle = `rgba(226,75,74,${0.5 + 0.3 * pulse})`;
    ctx.lineWidth = 8 * sc;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(40 * sc, p1y);
    ctx.lineTo(W - 40 * sc, p1y);
    ctx.stroke();
    ctx.strokeStyle = `rgba(226,75,74,${0.4 + 0.3 * pulse})`;
    ctx.lineWidth = 6 * sc;
    ctx.beginPath();
    ctx.moveTo(cx, my - 60 * sc);
    ctx.lineTo(cx, my + 60 * sc);
    ctx.stroke();
    for (let r = 0; r < 6; r++) {
      const a = (r / 6) * Math.PI * 2 + t * 0.04;
      const rad = (15 + pulse * 8) * sc;
      ctx.strokeStyle = 'rgba(226,75,74,0.5)';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(cx, p1y);
      ctx.lineTo(cx + Math.cos(a) * rad, p1y + Math.sin(a) * rad);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.arc(cx, p1y, 5 * sc * pulse, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(226,75,74,0.9)';
    ctx.fill();
  } else {
    const e = pt < 0.5 ? 2 * pt * pt : 1 - Math.pow(-2 * pt + 2, 2) / 2;
    ctx.strokeStyle = 'rgba(29,158,117,0.8)';
    ctx.lineWidth = 8 * sc;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(40 * sc, p1y);
    ctx.lineTo(W - 40 * sc, p1y);
    ctx.stroke();
    const nx = cx + 30 * sc * e;
    ctx.strokeStyle = 'rgba(29,158,117,0.7)';
    ctx.lineWidth = 6 * sc;
    ctx.beginPath();
    ctx.moveTo(nx, my - 60 * sc);
    ctx.lineTo(nx, my + 60 * sc);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(nx, p1y, 4 * sc, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(29,158,117,1)';
    ctx.fill();
  }
}

function drawAuditor(ctx: CanvasRenderingContext2D, W: number, H: number, t: number) {
  const sc = W / 400,
    mx = W / 2;
  ctx.strokeStyle = 'rgba(29,158,117,0.07)';
  ctx.lineWidth = 0.5;
  for (let x = 0; x < W; x += 30 * sc) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, H);
    ctx.stroke();
  }
  for (let y = 0; y < H; y += 30 * sc) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }
  const rows = 7,
    startY = H * 0.12,
    rowH = (H * 0.76) / rows;
  const checks = [
    'Naming convention',
    'Workset structure',
    'Parameter completeness',
    'LOD compliance',
    'Family standards',
    'System classification',
    'IFC export readiness',
  ];
  const progress = Math.min(rows, (t * 0.04) % rows);
  for (let i = 0; i < rows; i++) {
    const y = startY + i * rowH + rowH / 2;
    const done = i < Math.floor(progress);
    const active = i === Math.floor(progress);
    const barW = W - 80 * sc;
    ctx.fillStyle = done ? 'rgba(29,158,117,0.12)' : active ? 'rgba(29,158,117,0.06)' : 'rgba(255,255,255,0.02)';
    ctx.fillRect(40 * sc, y - (rowH * 0.4), barW, rowH * 0.8);
    ctx.strokeStyle = done ? 'rgba(29,158,117,0.4)' : active ? 'rgba(29,158,117,0.25)' : 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 0.5;
    ctx.strokeRect(40 * sc, y - (rowH * 0.4), barW, rowH * 0.8);
    if (active) {
      const fill = (progress % 1) * barW;
      ctx.fillStyle = 'rgba(29,158,117,0.2)';
      ctx.fillRect(40 * sc, y - (rowH * 0.4), fill, rowH * 0.8);
    }
    ctx.fillStyle = done ? 'rgba(29,158,117,0.9)' : active ? 'rgba(29,158,117,0.6)' : 'rgba(255,255,255,0.15)';
    ctx.font = `${9 * sc}px monospace`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText((done ? '✓ ' : active ? '→ ' : '  ') + checks[i], 48 * sc, y);
  }
}

function ProjectCard({ project }: { project: ProjectCardData }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeRef = useRef(0);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const animate = () => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = (canvas.parentElement?.offsetWidth || 400) * 2;
      canvas.height = (canvas.parentElement?.offsetHeight || 148) * 2;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      project.drawFn(ctx, canvas.width, canvas.height, timeRef.current);
      timeRef.current++;

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [project]);

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="relative h-[148px] bg-slate-950 overflow-hidden border-b border-border">
        <canvas ref={canvasRef} className="w-full h-full" />
        <span
          className="absolute top-2.5 left-2.5 text-xs font-medium px-2 py-1 rounded border"
          style={{
            background: project.badge.color,
            color: project.badge.text === 'MEP coordination' ? '#4fc3f7' : '#7f77dd',
            borderColor: project.badge.text === 'MEP coordination' ? 'rgba(79,195,247,0.3)' : 'rgba(127,119,221,0.3)',
          }}
        >
          {project.badge.text}
        </span>
        <span
          className="absolute top-2.5 right-2.5 text-xs font-medium px-2 py-1 rounded border flex items-center gap-1"
          style={{
            background: project.status.color,
            color: project.status.text === 'Delivered Oct 2024' ? '#1d9e75' : '#ba7517',
            borderColor: project.status.text === 'Delivered Oct 2024' ? 'rgba(29,158,117,0.3)' : 'rgba(186,117,23,0.3)',
          }}
        >
          <span
            className="w-1 h-1 rounded-full"
            style={{ background: project.status.dot }}
          />
          {project.status.text}
        </span>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <div>
            <div className="text-sm font-medium text-foreground">{project.title}</div>
            <div className="text-xs text-muted-foreground">{project.subtitle}</div>
          </div>
          <span className="text-xs font-medium px-2 py-1 rounded whitespace-nowrap flex-shrink-0" style={{ background: project.type.color }}>
            {project.type.text}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-1.5 mb-3">
          {project.kpis.map((kpi, i) => (
            <div key={i} className="bg-secondary rounded text-center p-2">
              <div className="text-sm font-medium text-foreground">{kpi.value}</div>
              <div className="text-xs text-muted-foreground leading-tight">{kpi.label}</div>
            </div>
          ))}
        </div>

        <div className="border-l-2 border-blue-500 bg-blue-500/5 rounded-none p-2.5 mb-3">
          <div className="text-xs font-medium text-blue-500 uppercase tracking-wider mb-1">{project.challenge.title}</div>
          <div className="text-xs text-muted-foreground leading-relaxed">{project.challenge.text}</div>
        </div>

        <div className="grid grid-cols-4 gap-1.5 mb-3">
          {project.steps.map((step, i) => (
            <div key={i} className="bg-secondary rounded text-center p-1.5">
              <div className="text-base mb-1">{step.icon}</div>
              <div className="text-xs text-muted-foreground leading-tight">{step.label}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {project.tags.map((tag, i) => (
            <span key={i} className="text-xs px-2 py-1 rounded bg-secondary text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2.5 border-t border-border">
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            {project.footer.icon} {project.footer.text}
          </span>
          <button className="text-xs font-medium text-blue-500 flex items-center gap-1 hover:text-blue-400 transition-colors">
            Show Project ↗
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProjectCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {projectsData.map((project: ProjectCardData) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
