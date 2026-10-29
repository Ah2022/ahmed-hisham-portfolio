import { useState } from "react";
import { Download, ExternalLink } from "lucide-react";
import "./smcTechnicalSheets.css";
const sheets = [
  { code: "SMC3-ARTAR-M-B5-PD-1001-DWG", title: "B5 · Drainage master plan" },
  {
    code: "SMC3-ARTAR-M-B5-PW-1001-DWG",
    title: "B5 · Water supply master plan",
  },
  {
    code: "SMC3-ARTAR-P3-B5-PW-1001-DWG",
    title: "B5 · Water supply partial plan 03",
  },
  {
    code: "SMC3-ARTAR-P3-B5-PW-6001-DWG",
    title: "Deep well raw water pump room · Sections and schematic",
  },
  {
    code: "SMC3-ARTAR-P3-B5-FP-1001-DWG",
    title: "B5 · Fire protection partial plan 03",
  },
  {
    code: "SMC3-ARTAR-M-B5-FP-1001-DWG",
    title: "B5 · Fire protection master plan",
  },
  {
    code: "SMC3-ARTAR-M-B1-PM-1005-DWG",
    title: "B1 · Medical gas master plan",
  },
  { code: "SMC3-ARTAR-P3-B1-PF-1005-DWG", title: "B1 · Fuel partial plan 03" },
];
export default function SMCTechnicalSheets() {
  const [selected, setSelected] = useState(0);
  const [zoom, setZoom] = useState(1);
  const sheet = sheets[selected];
  const pdf = `/documents/projects/smc-sheets/${sheet.code}.pdf`;
  return (
    <section
      className="smc-technical-sheets"
      aria-label="SMC 3 Technical Sheets"
    >
      <header>
        <div>
          <span className="section-index">DRAWING DELIVERY / 08 SHEETS</span>
          <h3>Technical Sheets</h3>
          <p>
            Browse the supplied shop drawings. Open or download the original PDF
            for full drawing detail.
          </p>
        </div>
      </header>
      <label className="smc-sheet-select" htmlFor="smc-sheet-select">
        Select technical sheet
        <select
          id="smc-sheet-select"
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
        <label htmlFor="smc-sheet-zoom">
          Preview zoom {Math.round(zoom * 100)}%
          <input
            id="smc-sheet-zoom"
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
          src={`/images/projects/smc-sheets/${sheet.code}.webp`}
          alt={`SMC 3 shop drawing: ${sheet.title}. Drawing ${sheet.code}. Open the original PDF for full-resolution annotations.`}
          style={{ width: `${zoom * 100}%` }}
          decoding="async"
        />
      </div>
    </section>
  );
}
