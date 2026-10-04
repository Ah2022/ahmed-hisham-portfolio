import { useEffect } from "react";
import { useLocation } from "wouter";
export default function RouteScroll() {
  const [location] = useLocation();
  useEffect(() => {
    let frame = 0;
    const move = () => {
      const id = window.location.hash.slice(1);
      const target = id
        ? document.getElementById(decodeURIComponent(id))
        : null;
      if (target) {
        // Evidence links also reveal details when the evidence is collapsed.
        if (target instanceof HTMLDetailsElement) target.open = true;
        target.scrollIntoView({ behavior: "instant", block: "start" });
      } else if (!id) window.scrollTo({ top: 0, behavior: "instant" });
    };
    frame = requestAnimationFrame(move);
    const hashChange = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(move);
    };
    window.addEventListener("hashchange", hashChange);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", hashChange);
    };
  }, [location]);
  return null;
}
