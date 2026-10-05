import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import { Menu, X, ArrowUpRight } from "lucide-react";

const sections = [
  { id: "hero", label: "Overview" },
  { id: "projects", label: "Projects" },
  { id: "automation-tools", label: "Automation" },
  { id: "experience", label: "Experience" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
];
export default function Navbar() {
  const [location] = useLocation();
  const [active, setActive] = useState("hero");
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const onHome = location === "/";

  useEffect(() => {
    setOpen(false);
    let frame = 0;
    const update = () => {
      frame = 0;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(
        height > 0
          ? Math.min(100, Math.max(0, (window.scrollY / height) * 100))
          : 0
      );
      if (!onHome) {
        setActive("projects");
        return;
      }
      let current = "hero";
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element && element.getBoundingClientRect().top <= 170)
          current = section.id;
      }
      if (height > 0 && window.scrollY >= height - 4) current = "contact";
      setActive(current);
    };
    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    const observer = new ResizeObserver(requestUpdate);
    observer.observe(document.body);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [location, onHome]);

  useEffect(() => {
    if (!open) return;
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !navRef.current?.contains(event.target)
      )
        setOpen(false);
    };
    document.addEventListener("keydown", escape);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", escape);
      document.removeEventListener("pointerdown", outside);
    };
  }, [open]);

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <nav className="command-nav" aria-label="Main navigation" ref={navRef}>
        <div className="command-bar">
          <a
            className="command-brand"
            href={onHome ? "#hero" : "/#hero"}
            aria-label="Ahmed Hisham overview"
          >
            <svg
              className="command-brand-logo"
              viewBox="393 775 662 499"
              aria-hidden="true"
              focusable="false"
            >
              <image
                href="/images/ahmed-hisham-logo.png"
                width="1448"
                height="2048"
              />
            </svg>
            <span>/ ENGINEERING</span>
          </a>
          <div className="command-links">
            {sections.map((section, index) => (
              <a
                key={section.id}
                href={`${onHome ? "" : "/"}#${section.id}`}
                aria-current={
                  active === section.id
                    ? onHome
                      ? "location"
                      : "page"
                    : undefined
                }
              >
                <span>0{index + 1}</span>
                {section.label}
              </a>
            ))}
          </div>
          <a
            className="command-contact"
            href={`${onHome ? "" : "/"}#contact`}
            aria-label="Get in touch"
          >
            <ArrowUpRight size={18} />
          </a>
          <button
            className="command-menu-toggle"
            type="button"
            ref={toggleRef}
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            aria-controls="mobile-command-menu"
            onClick={() => setOpen(value => !value)}
          >
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
        <div
          className="command-progress"
          role="progressbar"
          aria-label="Page reading progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress)}
        >
          <span style={{ width: `${progress}%` }} />
        </div>
        <div
          id="mobile-command-menu"
          className="mobile-command-menu"
          hidden={!open}
        >
          {sections.map((section, index) => (
            <a
              key={section.id}
              href={`${onHome ? "" : "/"}#${section.id}`}
              aria-current={active === section.id ? "location" : undefined}
              onClick={() => setOpen(false)}
            >
              <span>0{index + 1}</span>
              {section.label}
              <ArrowUpRight size={16} />
            </a>
          ))}
        </div>
      </nav>
    </>
  );
}
