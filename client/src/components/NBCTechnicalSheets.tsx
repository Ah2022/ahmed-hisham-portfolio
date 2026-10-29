import { useState } from "react";
import { Download, ExternalLink } from "lucide-react";
import "./smcTechnicalSheets.css";
const sheets = [
  {
    "code": "NBC-07-MAAP-DD-TW-A-F34-FP-DWG-1234",
    "title": "Tower A · F34 mechanical floor firefighting"
  },
  {
    "code": "NBC-07-MAAP-DD-TW-A-F28-FP-DWG-1228",
    "title": "Tower A · F28 typical floor master plan"
  },
  {
    "code": "NBC-07-MAAP-DD-TW-A-F15-FP-DWG-000",
    "title": "Tower A · F15 mechanical floor opening sections"
  },
  {
    "code": "NBC-07-MAAP-D.D-TW-A-F34-PW-DWG-1334",
    "title": "Tower A · Mechanical floor water supply plan"
  },
  {
    "code": "NBC-07-MAAP-D.D-TW-A-F28-PW-DWG-1328",
    "title": "Tower A · Typical floors 26–28 water supply plan"
  },
  {
    "code": "NBC-07-MAAP-DD-TW-A-F28-PD-DWG-1428",
    "title": "Tower A · F28 typical floor drainage plan"
  },
  {
    "code": "NBC-07-MAAP-DD-TW-A-ALL-PD-DWG-0070",
    "title": "Tower A · Drainage riser diagram master"
  }
];
export default function NBCTechnicalSheets() {
  const [selected, setSelected] = useState(0);
  const [zoom, setZoom] = useState(1);
  const sheet = sheets[selected];
  const pdf = `/documents/projects/nbc-sheets/${sheet.code}.pdf`;
  return (
    <section
      className="smc-technical-sheets"
      aria-label="Nile Business City Technical Sheets"
    >
      <header>
        <div>
          <span className="section-index">DRAWING DELIVERY / 07 SHEETS</span>
          <h3>Technical Sheets</h3>
          <p>
            Browse the supplied technical drawings. Open or download the original PDF
            for full drawing detail.
          </p>
        </div>
      </header>
      <label className="smc-sheet-select" htmlFor="nbc-sheet-select">
        Select technical sheet
        <select
          id="nbc-sheet-select"
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
        <label htmlFor="nbc-sheet-zoom">
          Preview zoom {Math.round(zoom * 100)}%
          <input
            id="nbc-sheet-zoom"
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
          src={`/images/projects/nbc-sheets/${sheet.code}.webp`}
          alt={`Nile Business City shop drawing: ${sheet.title}. Drawing ${sheet.code}. Open the original PDF for full-resolution annotations.`}
          style={{ width: `${zoom * 100}%` }}
          decoding="async"
        />
      </div>
    </section>
  );
}
