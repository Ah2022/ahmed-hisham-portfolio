import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { AlertCircle, CheckCircle2, Zap } from "lucide-react";

interface Element {
  id: string;
  type: "pipe" | "duct" | "conduit";
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  label: string;
}

export default function ClashDetectionDemo() {
  const { ref, inView } = useInView({ threshold: 0.2 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [elements, setElements] = useState<Element[]>([
    {
      id: "pipe-1",
      type: "pipe",
      x: 80,
      y: 120,
      width: 200,
      height: 40,
      color: "#3B82F6",
      label: "Water Pipe",
    },
    {
      id: "duct-1",
      type: "duct",
      x: 150,
      y: 200,
      width: 180,
      height: 50,
      color: "#8B5CF6",
      label: "HVAC Duct",
    },
    {
      id: "conduit-1",
      type: "conduit",
      x: 320,
      y: 140,
      width: 150,
      height: 30,
      color: "#EC4899",
      label: "Electrical Conduit",
    },
  ]);

  const [dragging, setDragging] = useState<string | null>(null);
  const [clashes, setClashes] = useState<string[]>([]);
  const [resolved, setResolved] = useState(false);

  // Detect clashes between elements
  const detectClashes = (els: Element[]) => {
    const newClashes: string[] = [];
    for (let i = 0; i < els.length; i++) {
      for (let j = i + 1; j < els.length; j++) {
        const a = els[i];
        const b = els[j];
        // Simple AABB collision detection
        if (
          a.x < b.x + b.width &&
          a.x + a.width > b.x &&
          a.y < b.y + b.height &&
          a.y + a.height > b.y
        ) {
          newClashes.push(`${a.id}-${b.id}`);
        }
      }
    }
    return newClashes;
  };

  // Handle canvas mouse down
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Find clicked element
    for (let i = elements.length - 1; i >= 0; i--) {
      const el = elements[i];
      if (x >= el.x && x <= el.x + el.width && y >= el.y && y <= el.y + el.height) {
        setDragging(el.id);
        break;
      }
    }
  };

  // Handle canvas mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!dragging) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newElements = elements.map((el) => {
      if (el.id === dragging) {
        return {
          ...el,
          x: Math.max(0, Math.min(x - el.width / 2, canvas.width - el.width)),
          y: Math.max(0, Math.min(y - el.height / 2, canvas.height - el.height)),
        };
      }
      return el;
    });

    setElements(newElements);
    const newClashes = detectClashes(newElements);
    setClashes(newClashes);
    setResolved(newClashes.length === 0);
  };

  const handleMouseUp = () => {
    setDragging(null);
  };

  // Draw canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = "rgba(15, 23, 42, 0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = "rgba(148, 163, 184, 0.1)";
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 40) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for (let i = 0; i < canvas.height; i += 40) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }

    // Draw elements
    elements.forEach((el) => {
      const hasClash = clashes.some((c) => c.includes(el.id));

      // Draw element
      ctx.fillStyle = hasClash ? "rgba(239, 68, 68, 0.3)" : el.color + "40";
      ctx.strokeStyle = hasClash ? "#EF4444" : el.color;
      ctx.lineWidth = hasClash ? 3 : 2;
      ctx.fillRect(el.x, el.y, el.width, el.height);
      ctx.strokeRect(el.x, el.y, el.width, el.height);

      // Draw label
      ctx.fillStyle = "#E2E8F0";
      ctx.font = "12px monospace";
      ctx.textAlign = "center";
      ctx.fillText(el.label, el.x + el.width / 2, el.y + el.height / 2 + 4);

      // Draw clash indicator
      if (hasClash) {
        ctx.fillStyle = "#EF4444";
        ctx.beginPath();
        ctx.arc(el.x + el.width - 8, el.y + 8, 6, 0, Math.PI * 2);
        ctx.fill();
      }
    });
  }, [elements, clashes]);

  return (
    <section id="clash-demo" className="py-24 sm:py-32 relative" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="text-xs font-mono font-medium text-primary uppercase tracking-widest">
            Interactive Demo
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold text-foreground mt-3 mb-4">
            AI-Powered <span className="gradient-text">Clash Detection</span>
          </h2>
          <p className="text-muted-foreground font-body">
            Drag the elements to see real-time clash detection in action. Watch as the AI identifies conflicts and resolves them automatically.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-4xl mx-auto"
        >
          {/* Canvas */}
          <div className="relative rounded-xl overflow-hidden border border-border bg-card/50 backdrop-blur-sm">
            <canvas
              ref={canvasRef}
              width={800}
              height={400}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              className="w-full h-auto cursor-move block"
            />
          </div>

          {/* Status and Legend */}
          <div className="grid sm:grid-cols-2 gap-4 mt-8">
            {/* Status */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 }}
              className={`p-4 rounded-lg border transition-all ${
                resolved
                  ? "bg-green-500/10 border-green-500/30"
                  : "bg-red-500/10 border-red-500/30"
              }`}
            >
              <div className="flex items-center gap-3">
                {resolved ? (
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-400" />
                )}
                <div>
                  <span className="text-sm font-semibold text-foreground block">
                    {resolved ? "No Clashes Detected" : `${clashes.length} Clash${clashes.length !== 1 ? "es" : ""} Found`}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {resolved ? "All systems clear" : "Drag to resolve conflicts"}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Legend */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="p-4 rounded-lg border border-border bg-card/50"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: "#3B82F6" }} />
                  <span className="text-xs text-muted-foreground">Water Pipe</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: "#8B5CF6" }} />
                  <span className="text-xs text-muted-foreground">HVAC Duct</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: "#EC4899" }} />
                  <span className="text-xs text-muted-foreground">Electrical Conduit</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="mt-8 p-6 rounded-lg bg-primary/5 border border-primary/20"
          >
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-foreground mb-1">How It Works</p>
                <p className="text-sm text-muted-foreground">
                  This demo simulates real-time MEP clash detection. In production BIM workflows, AI algorithms analyze thousands of elements across multiple disciplines, automatically identifying spatial conflicts and suggesting optimal routing paths to eliminate clashes before construction begins.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
