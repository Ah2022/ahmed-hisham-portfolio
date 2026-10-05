import type { Project } from "@/data/portfolio";
import { projectCovers } from "@/data/projectCovers";
export default function ProjectCover({
  project,
  caseStudy = false,
}: {
  project: Project;
  caseStudy?: boolean;
}) {
  const cover = projectCovers[project.slug];
  return (
    <figure
      className={`project-cover ${caseStudy ? "case-cover" : "card-cover"}`}
    >
      {caseStudy && cover.video ? (
        <video
          controls
          playsInline
          preload="none"
          poster={cover.image}
          aria-label={`${project.shortName} supplied project cover video`}
        >
          <source src={cover.video} type="video/mp4" />
          <p>
            {cover.alt} <a href={cover.video}>Download the supplied video</a>.
          </p>
        </video>
      ) : (
        <img
          src={cover.image}
          alt={cover.alt}
          loading={caseStudy ? "eager" : "lazy"}
          decoding="async"
        />
      )}
      {caseStudy && (
        <figcaption>
          Project cover supplied by Ahmed
          {cover.video
            ? " · Short exterior presentation; use the player controls to view it."
            : ""}
        </figcaption>
      )}
    </figure>
  );
}
