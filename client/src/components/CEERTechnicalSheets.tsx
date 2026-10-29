import { useState } from "react";
import { Download, ExternalLink } from "lucide-react";
import "./smcTechnicalSheets.css";
const sheets = [
  {
    "code": "ASP-MBL-PL2-00-SD-PH-00026",
    "title": "Sector 6 · Underground drainage layout"
  },
  {
    "code": "ASP-MBL-PL2-XX-SD-PH-00116",
    "title": "Sector 6 · Enlarged underground drainage and sections"
  },
  {
    "code": "ASP-MBL-PL2-XX-SD-PH-00119",
    "title": "Sector 9 · Enlarged underground drainage and coordination sections"
  },
  {
    "code": "ASP-MBL-PL2-XX-SD-PH-00115",
    "title": "Sector 5 · Enlarged underground toilet drainage"
  },
  {
    "code": "ASP-MBL-PL2-00-SD-PH-00025",
    "title": "Sector 5 · Underground drainage layout"
  },
  {
    "code": "MAS-ARC-PL2-00-SD-PH-04201",
    "title": "Sector 7 · Ground floor bathroom water supply details"
  },
  {
    "code": "MAS-ARC-PL2-00-SD-PH-01407",
    "title": "Sector 7 · Level 2 water supply layout"
  },
  {
    "code": "MAS-ARC-PL2-00-SD-PH-01307",
    "title": "Sector 7 · Level 1 water supply layout"
  }
];
export default function CEERTechnicalSheets() {
  const [selected, setSelected] = useState(0);
  const [zoom, setZoom] = useState(1);
  const sheet = sheets[selected];
  const pdf = `/documents/projects/ceer-sheets/${sheet.code}.pdf`;
  return (
    <section
      className="smc-technical-sheets"
      aria-label="CEER Automotive Supplier Park Technical Sheets"
    >
      <header>
        <div>
          <span className="section-index">DRAWING DELIVERY / 08 SHEETS</span>
          <h3>Technical Sheets</h3>
          <p>
            Browse the supplied technical drawings. Open or download the original PDF
            for full drawing detail.
          </p>
        </div>
      </header>
      <label className="smc-sheet-select" htmlFor="ceer-sheet-select">
        Select technical sheet
        <select
          id="ceer-sheet-select"
          value={selected}
          onChange={e => {
            setSelected(Number(e.target.value));
            setZoom(1);
          }}
        >
          {sheets.map((item, index) => (
            <option key={item.code} value={index}>
              {String(index + 1).padStart(2, "0")} · {item.title}
            </option>
          ))}
        </select>
      </label>
      <div className="smc-sheet-record" aria-live="polite">
        <strong>{sheet.title}</strong>
        <span>{sheet.code}</span>
      </div>
      <div className="smc-sheet-actions">
        <label htmlFor="ceer-sheet-zoom">
          Preview zoom {Math.round(zoom * 100)}%
          <input
            id="ceer-sheet-zoom"
            type="range"
            min="1"
            max="3"
            step="0.25"
            value={zoom}
            onChange={e => setZoom(Number(e.target.value))}
          />
        </label>
        <a href={pdf} target="_blank" rel="noopener noreferrer">
          Open PDF <ExternalLink size={15} aria-hidden="true" />
        </a>
        <a href={pdf} download={`${sheet.code}.pdf`}>
          Download <Download size={15} aria-hidden="true" />
        </a>
      </div>
      <div
        className="smc-sheet-preview"
        role="region"
        aria-label="Scrollable technical sheet preview"
        tabIndex={0}
      >
        <img
          key={sheet.code}
          src={`/images/projects/ceer-sheets/${sheet.code}.webp`}
          alt={`CEER Automotive Supplier Park shop drawing: ${sheet.title}. Drawing ${sheet.code}. Open the original PDF for full-resolution annotations.`}
          style={{ width: `${zoom * 100}%` }}
          decoding="async"
        />
      </div>
    </section>
  );
}
