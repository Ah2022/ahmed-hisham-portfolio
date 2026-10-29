import { ExternalLink } from "lucide-react";
import "./smcProjectMedia.css";
const media = [
  { id: "level-1-medical-gas", title: "Level 1 Medical Gas · 3D View" },
  { id: "mri-room", title: "MRI Room" },
  {
    id: "water-treatment",
    title: "Close-up Coordination of Water Treatment Pump Room",
  },
  {
    id: "medical-gas-reserve",
    title:
      "Abstract 3D View of Medical Gas Reserve Cylinders and Liquid Oxygen Tank",
  },
  { id: "patient-rooms", title: "Drone View of Patient Rooms" },
  {
    id: "basement-1",
    title: "Coordinated View of Mechanical Disciplines · Basement 1",
  },
];
export default function SMCProjectMedia() {
  return (
    <section className="smc-project-media" aria-label="SMC 3 project media">
      <h3>Project media</h3>
      <p>
        Explore room details, plant spaces and coordinated service views. Select
        an image to inspect it at full resolution.
      </p>
      <div className="smc-media-grid">
        {media.map((item, index) => (
          <figure key={item.id}>
            <a
              href={`/images/projects/smc-detail-${item.id}.webp`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${item.title} at full resolution (new tab)`}
            >
              <img
                src={`/images/projects/smc-detail-${item.id}.webp`}
                alt={`SMC 3 — ${item.title}`}
                loading="lazy"
                decoding="async"
              />
              <span className="smc-media-open">
                <ExternalLink size={16} aria-hidden="true" /> Full resolution
              </span>
            </a>
            <figcaption>
              <span>{String(index + 1).padStart(2, "0")} / MODEL VIEW</span>
              <strong>{item.title}</strong>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
