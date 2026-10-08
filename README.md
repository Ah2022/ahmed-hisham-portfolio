# Ahmed Hisham — MEP & BIM Portfolio

A modern, interactive portfolio website for **Ahmed Hisham**, a BIM Automation Engineer, MEP BIM Modeler, Revit Add-in Developer, and AI + BIM Integration Specialist.

> **Live Site:** [Ahmed Hisham BIM Portfolio](https://ahmed-hisham-bim-portfolio.ah256.chatgpt.site)

## Portfolio status

The website is currently in **Phase 3 — Automation Explorer and Coordination Sandbox**, with the foundation from Phase A and Phase 2 completed.

- **Phase A — Interactive BIM hero:** completed
- **Phase 2 — Portfolio layout and evidence structure:** completed
- **Phase 3 — Automation workflows and coordination sandbox:** implemented
- **Next phase — Evidence, conversion, and professional distribution:** planned

The next major milestone is not another visual redesign. It is adding verified project media, real tool recordings, sample reports, analytics, SEO improvements, and stronger conversion paths.

## Visual showcase

The following images are served from the live portfolio website and demonstrate the current visual direction and project presentation.

### Interactive BIM hero

<a href="https://ahmed-hisham-bim-portfolio.ah256.chatgpt.site">
  <img src="https://ahmed-hisham-bim-portfolio.ah256.chatgpt.site/images/ahmed-hisham.png" alt="Ahmed Hisham interactive BIM portfolio hero" width="760" />
</a>

### Featured project covers

<table>
  <tr>
    <td align="center"><a href="https://ahmed-hisham-bim-portfolio.ah256.chatgpt.site/projects/smc-hospital"><img src="https://ahmed-hisham-bim-portfolio.ah256.chatgpt.site/images/projects/smc-cover.webp" alt="SMC Hospital project cover" width="380" /></a><br /><strong>SMC Hospital</strong></td>
    <td align="center"><a href="https://ahmed-hisham-bim-portfolio.ah256.chatgpt.site/projects/nile-business-city"><img src="https://ahmed-hisham-bim-portfolio.ah256.chatgpt.site/images/projects/nbc-cover.webp" alt="Nile Business City project cover" width="380" /></a><br /><strong>Nile Business City</strong></td>
  </tr>
  <tr>
    <td align="center"><a href="https://ahmed-hisham-bim-portfolio.ah256.chatgpt.site/projects/ceer-automotive-park"><img src="https://ahmed-hisham-bim-portfolio.ah256.chatgpt.site/images/projects/ceer-cover.webp" alt="CEER Automotive Supplier Park project cover" width="380" /></a><br /><strong>CEER Automotive Supplier Park</strong></td>
    <td align="center"><a href="https://ahmed-hisham-bim-portfolio.ah256.chatgpt.site/projects/envi-al-shafa"><img src="https://ahmed-hisham-bim-portfolio.ah256.chatgpt.site/images/projects/envi-cover.webp" alt="ENVI Al Shafa project cover" width="380" /></a><br /><strong>ENVI Al Shafa</strong></td>
  </tr>
</table>

> **Note:** The README uses the published website asset URLs so the images render directly on GitHub. The original lossless assets remain in `source-assets/` and are materialized during installation and builds.

## What is implemented

- Interactive BIM hero with five selectable modes: Structure, MEP, Electrical, Clashes, and Automation
- Interactive portrait, responsive layout, keyboard support, touch support, and reduced-motion behavior
- Evidence-linked metric rail and command-style navigation
- Four professional project case studies:
  - [SMC Hospital](https://ahmed-hisham-bim-portfolio.ah256.chatgpt.site/projects/smc-hospital)
  - [Nile Business City](https://ahmed-hisham-bim-portfolio.ah256.chatgpt.site/projects/nile-business-city)
  - [CEER Automotive Supplier Park](https://ahmed-hisham-bim-portfolio.ah256.chatgpt.site/projects/ceer-automotive-park)
  - [ENVI Al Shafa](https://ahmed-hisham-bim-portfolio.ah256.chatgpt.site/projects/envi-al-shafa)
- Project filters and expandable scope, workflow, deliverables, coordination, and result sections
- Experience timeline with BIM, MEP, Automation, Maintenance, Site Engineering, and Education filters
- Three named personal automation tools:
  - ClashResolveAI
  - BIM Engine
  - Plumbing Engine
- Interactive BIM coordination sandbox with synthetic L03 service elements
- Clash detection, issue creation, lifecycle status, before/current views, and elevation controls
- JSON coordination report download and topic-only BCF 2.1 ZIP export
- Real project cover images and an NBC case-study video
- CV download, email contact, LinkedIn contact, routing, direct case-study refresh, and accessible navigation

## Current assessment

The website is now a strong **interactive portfolio platform** and has reached the end of its core product-build phase. Its main weakness is not functionality; it is evidence depth.

The current case-study diagrams and coordination sandbox are explicitly illustrative. They demonstrate workflow thinking but do not yet replace verified project captures, model excerpts, or confirmed production deployment examples.

## What is missing for the next phase

### 1. Verified project evidence

Prioritize SMC Hospital and Nile Business City with sanitized, publishable material:

- Coordinated Revit service views
- Pump-room, plant-room, or mechanical-floor sections
- Medical-gas or typical-floor drawing crops
- Riser sections and tank-area excerpts
- Matched before/after coordination examples
- Captions identifying Ahmed's personal contribution

CEER and ENVI should follow with industrial and compound-service evidence.

### 2. Real automation demonstrations

For each personal tool, add one 30–60 second recording and one sample output:

- ClashResolveAI: issue grouping, lifecycle tracking, and BCF exchange
- BIM Engine: model extraction, geometry checks, issue navigation, and reports
- Plumbing Engine: calculation inputs, rule checks, QA/QC, and generated reports

### 3. Trust and conversion

- Add privacy-conscious analytics for CV downloads, project opens, tool engagement, and contact clicks
- Add a clearer primary CTA for hiring or consultation
- Add testimonials, references, or approved collaboration evidence where available
- Add tool maturity labels such as Prototype, Internal Tool, or Production Candidate

### 4. Discoverability and maintainability

- Add Open Graph and social preview metadata
- Add structured data for Ahmed, the website, and project case studies
- Add sitemap and canonical URLs
- Add GitHub Actions checks for TypeScript, builds, and tests
- Address the remaining bundle-size warning through route/component lazy loading

## Tech stack

| Technology | Purpose |
| --- | --- |
| **React 19** | Component-based UI framework |
| **TypeScript** | Type-safe development |
| **Tailwind CSS 4** | Utility-first styling and design tokens |
| **Framer Motion** | Interactive and scroll-triggered animation |
| **Vite 7** | Frontend build tooling |
| **Wouter** | Lightweight client-side routing |
| **Lucide React** | Interface icons |
| **Express** | Production server bundle |
| **BCF 2.1 export logic** | Coordination issue exchange demonstration |

## Project structure

```text
ahmed-hisham-portfolio/
├── client/
│   ├── public/              # Materialized website assets
│   └── src/
│       ├── components/      # Hero, projects, automation, services, contact, UI
│       ├── data/            # Project, experience, service, and tool records
│       ├── lib/             # Clash simulation and export logic
│       ├── pages/           # Home and project case-study routes
│       ├── contexts/        # Theme and application contexts
│       └── App.tsx          # Router and application shell
├── docs/
│   ├── phase-a/            # Interactive BIM hero documentation
│   ├── phase-2/            # Portfolio layout and evidence plan
│   └── phase-3/            # Automation explorer and coordination sandbox
├── scripts/
│   └── materialize-assets.mjs # Restores binary assets from base64 sources
├── source-assets/           # Lossless source images, videos, CV, and documents
├── tests/                   # Clash simulation and BCF/ZIP validation tests
├── server/                  # Express production serving
├── package.json
└── README.md
```

## How to run

### Prerequisites

- Node.js 22+
- pnpm 10+

### Install and develop

```bash
pnpm install
pnpm dev
```

The development server runs at `http://localhost:3000`.

### Validate and build

```bash
pnpm check
node --import tsx --test tests/clashSimulation.test.ts
pnpm build
```

For static hosting:

```bash
pnpm build:site
```

## Contact

- **Email:** [ahmed.hisham2000@gmail.com](mailto:ahmed.hisham2000@gmail.com)
- **LinkedIn:** [linkedin.com/in/ahmed-hisham26](https://linkedin.com/in/ahmed-hisham26)

## License

This project is proprietary. All rights reserved by Ahmed Hisham.
