import { useState, type CSSProperties } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Building2,
  Cpu,
  Download,
  Layers3,
  Mail,
  Zap,
  TriangleAlert,
} from "lucide-react";
import BIMWireframeHero from "./BIMWireframeHero";
import InteractivePortrait from "./InteractivePortrait";
import { heroModes, type HeroModeId } from "./heroModes";
import "./hero.css";

const icons = {
  structure: Building2,
  mep: Layers3,
  electrical: Zap,
  clashes: TriangleAlert,
  automation: Cpu,
};

export default function Hero() {
  const [activeMode, setActiveMode] = useState<HeroModeId>("mep");
  const mode = heroModes.find(item => item.id === activeMode)!;

  return (
    <section
      id="hero"
      className="interactive-hero"
      style={{ "--hero-accent": mode.color } as CSSProperties}
      aria-label="Ahmed Hisham interactive BIM portfolio"
    >
      <div className="container hero-layout">
        <div className="hero-intro">
          <div className="hero-eyebrow">
            <span /> CAIRO, EGYPT · BIM & AUTOMATION
          </div>
          <div className="hero-identity">
            <svg
              className="hero-brand-logo"
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
            <h1>
              Ahmed
              <br />
              <span>Hisham.</span>
            </h1>
          </div>
          <p className="hero-role">
            BIM Engineer <span>&</span>
            <br className="hero-role-break" /> Revit Add-in Developer
          </p>
          <p className="hero-value">
            I turn complex building services into coordinated,
            construction-ready models—and build the tools that make delivery
            smarter.
          </p>
          <div className="hero-specialisms">
            <span>Plumbing & fire protection</span>
            <span>C# · Python · pyRevit</span>
          </div>
          <div className="hero-ctas">
            <a className="hero-cta-primary" href="#projects">
              Explore BIM Work <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <a className="hero-cta-secondary" href="#automation-tools">
              View Automation Tools <Cpu size={17} aria-hidden="true" />
            </a>
            <a
              className="hero-cta-text"
              href="/documents/ahmed-hisham-cv.pdf"
              download="Ahmed-Hisham-CV.pdf"
            >
              <Download size={16} aria-hidden="true" /> Download CV
            </a>
            <a className="hero-cta-text" href="#contact">
              <Mail size={16} aria-hidden="true" /> Get in Touch
            </a>
          </div>
          <InteractivePortrait color={mode.color} />
        </div>

        <div className="hero-explorer">
          <div className="hero-explorer-heading">
            <span>
              <Layers3 size={15} aria-hidden="true" /> THE COORDINATED BUILDING
            </span>
            <span>01 / EXPLORE</span>
          </div>
          <div
            className="hero-mode-controls"
            role="group"
            aria-label="Building visualization mode"
          >
            {heroModes.map(item => {
              const Icon = icons[item.id];
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={activeMode === item.id}
                  aria-controls="hero-mode-details"
                  onClick={() => setActiveMode(item.id)}
                >
                  <Icon size={15} aria-hidden="true" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
          <BIMWireframeHero mode={mode} />
          <div
            className="hero-technical-labels"
            aria-label="Active technical labels"
          >
            {mode.labels.map((label, index) => (
              <span key={label}>
                <b>0{index + 1}</b> {label}
              </span>
            ))}
          </div>
          <div
            id="hero-mode-details"
            className="hero-mode-details"
            aria-live="polite"
            aria-atomic="true"
          >
            <div className="hero-mode-title">
              <span /> <h2>{mode.title}</h2>
            </div>
            <div className="hero-metrics">
              {mode.metrics.map(metric => (
                <div key={metric.label}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </div>
              ))}
            </div>
            <p>{mode.description}</p>
          </div>
          <div className="hero-explorer-footnote">
            <span>SELECT A LAYER TO EXPLORE</span>
            <span>Illustrative visualization</span>
          </div>
        </div>
        <a href="#projects" className="hero-scroll">
          <ArrowDownRight size={18} aria-hidden="true" /> Discover the work
          behind the model
        </a>
      </div>
    </section>
  );
}
