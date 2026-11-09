import { useEffect, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, Box, Maximize2, X } from "lucide-react";
import "./smcInteractiveModel.css";

const viewerUrl = "/interactive/smc/architectural-teardown.html";

export default function SMCInteractiveModel() {
  const [open, setOpen] = useState(false);
  const [fullscreenError, setFullscreenError] = useState("");
  const frame = useRef<HTMLIFrameElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const closeFromViewer = (event: MessageEvent) => {
      if (event.origin === location.origin && event.source === frame.current?.contentWindow &&
          event.data?.type === "smc-viewer-close") setOpen(false);
    };
    addEventListener("message", closeFromViewer);
    return () => removeEventListener("message", closeFromViewer);
  }, [open]);
  async function fullscreen() {
    try {
      if (!panel.current?.requestFullscreen) throw new Error("unavailable");
      await panel.current.requestFullscreen();
      setFullscreenError("");
    } catch {
      setFullscreenError("Fullscreen is unavailable here. Use Open in new tab for a larger view.");
    }
  }
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <section className="smc-interactive" aria-label="SMC interactive building anatomy">
        <div className="smc-interactive-poster">
          <img src="/images/projects/smc-model.webp" alt="SMC hospital model, ready to explore in interactive 3D" loading="lazy" />
          <span><Box size={16} aria-hidden="true" /> INTERACTIVE 3D</span>
        </div>
        <div className="smc-interactive-copy">
          <span className="demo-badge">SMC / BUILDING ANATOMY</span>
          <h3>Explore the building.<br />Reveal the systems.</h3>
          <p>Orbit the hospital, peel back its façade, lift the roof and explore the structure, drainage and medical gas models.</p>
          <Dialog.Trigger asChild>
            <button className="smc-launch"><Box size={18} aria-hidden="true" /> Launch interactive 3D <ArrowUpRight size={18} aria-hidden="true" /></button>
          </Dialog.Trigger>
          <small>Starts with a lighter overview. Load additional systems and full detail when you need them.</small>
        </div>
      </section>
      <Dialog.Portal>
        <Dialog.Overlay className="smc-viewer-overlay" />
        <Dialog.Content ref={panel} className="smc-viewer-dialog" onCloseAutoFocus={() => setFullscreenError("")}>
          <div className="smc-viewer-toolbar">
            <Dialog.Title>SMC · Building anatomy</Dialog.Title>
            <div>
              <button onClick={fullscreen} aria-label="Enter fullscreen"><Maximize2 size={16} aria-hidden="true" /><span>Fullscreen</span></button>
              <a aria-label="Open interactive 3D in new tab" href={viewerUrl} target="_blank" rel="noopener noreferrer"><ArrowUpRight size={16} aria-hidden="true" /><span>Open in new tab</span></a>
              <Dialog.Close aria-label="Close interactive 3D"><X size={20} aria-hidden="true" /></Dialog.Close>
            </div>
          </div>
          <Dialog.Description className="sr-only">Interactive hospital model. Drag to orbit, scroll or pinch to zoom, and choose a system. Escape closes the viewer.</Dialog.Description>
          {fullscreenError && <p role="status" className="smc-fullscreen-message">{fullscreenError}</p>}
          {open && <iframe ref={frame} src={viewerUrl} title="SMC hospital interactive 3D model" allow="fullscreen" />}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
