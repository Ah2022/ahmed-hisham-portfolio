# Ahmed Hisham — MEP & BIM Portfolio

A modern, high-performance personal portfolio website for **Ahmed Hisham**, a BIM Automation Engineer, MEP BIM Modeler, AI + BIM Integration Specialist, and MEP Design & Clash Detection Specialist. Built with React 19, Tailwind CSS 4, and Framer Motion, featuring a JetBrains-inspired dark aesthetic.

> **Live Site:** [Ahmed Hisham BIM Portfolio](https://ahmed-hisham-bim-portfolio.blush-lion-9190.chatgpt.site)

---

## Overview

This portfolio website serves as a professional digital presence for Ahmed Hisham, showcasing expertise in MEP engineering, BIM automation, and AI-driven workflows. The site is designed to attract potential clients and collaborators by highlighting core services, featured projects, and direct contact channels.

The design philosophy follows a **"Precision Dark"** approach inspired by JetBrains' signature UI — clean dark surfaces with warm undertones, vibrant gradient accents, and a card-based content architecture that communicates technical sophistication.

---

## Features

| Section | Description |
|---------|-------------|
| **Hero** | Full-viewport landing with profile photo, animated role tags, availability badge, and call-to-action buttons |
| **About** | Hook-driven narrative with key statistics (largest project area, models coordinated, certifications, automation focus) and a technology stack display |
| **Services** | Four detailed service cards — BIM Automation, MEP BIM Modeling, AI + BIM Integration, and Clash Detection & Coordination |
| **Projects** | Two featured case studies — SMC Hospital (Riyadh, 69,145 m²) and Nile Business City (New Administrative Capital, Egypt) with project metadata and imagery |
| **Contact** | Email and LinkedIn contact cards with a consultation CTA |
| **Footer** | Minimal footer with social links and copyright |

Additional highlights include smooth scroll-triggered animations via Framer Motion, a sticky navigation bar with backdrop blur, responsive design across all breakpoints, and a cohesive dark color system using OKLCH color tokens.

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 19** | Component-based UI framework |
| **TypeScript** | Type-safe development |
| **Tailwind CSS 4** | Utility-first styling with OKLCH design tokens |
| **Framer Motion** | Scroll-triggered and entrance animations |
| **Vite 7** | Fast development server and build tooling |
| **Wouter** | Lightweight client-side routing |
| **Lucide React** | Consistent iconography |
| **shadcn/ui** | Pre-built accessible UI components |

---

## Project Structure

```
ahmed-hisham-portfolio/
├── client/
│   ├── public/              # Static config files (favicon, robots.txt)
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── Navbar.tsx       # Sticky navigation with backdrop blur
│   │   │   ├── Hero.tsx         # Hero section with profile and role tags
│   │   │   ├── About.tsx        # About section with stats grid
│   │   │   ├── Services.tsx     # Four service cards
│   │   │   ├── Projects.tsx     # Featured project case studies
│   │   │   ├── Contact.tsx      # Contact cards and CTA
│   │   │   └── Footer.tsx       # Footer with social links
│   │   ├── hooks/
│   │   │   └── useInView.ts     # Intersection Observer hook for animations
│   │   ├── pages/
│   │   │   └── Home.tsx         # Main landing page
│   │   ├── App.tsx              # Root component with routing and theme
│   │   ├── main.tsx             # React entry point
│   │   └── index.css            # Global styles and design tokens
│   └── index.html               # HTML template with font imports
├── server/                      # Express server (production serving)
├── package.json
└── README.md
```

---

## Design System

The website uses a custom dark theme with the following design tokens:

- **Background:** Deep warm black (`oklch(0.11 0.01 260)`)
- **Card surfaces:** Elevated dark panels (`oklch(0.15 0.01 260)`)
- **Primary accent:** Vibrant blue (`oklch(0.65 0.24 265)`)
- **Gradient accents:** Orange-to-magenta for headings, blue-to-teal for technical elements
- **Typography:** Plus Jakarta Sans (display), system sans-serif (body), JetBrains Mono (code/labels)

---

## Getting Started

### Prerequisites

- **Node.js** 22+ and **pnpm** 10+

### Installation

```bash
# Clone the repository
git clone https://github.com/Ah2022/ahmed-hisham-portfolio.git
cd ahmed-hisham-portfolio

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The development server will start at `http://localhost:3000`.

### Build for Production

```bash
pnpm build
pnpm start
```

---

## Featured Projects

### SMC Hospital — Riyadh, Saudi Arabia
A ~69,145 m² state-of-the-art hospital in Riyadh's Al Wadi District (project DB-142), designed by DAR International. Full MEP modeling and multi-discipline coordination in Revit, targeting LEED v4 BD+C Healthcare Gold certification. IFC package issued October 2024.

### Nile Business City — New Administrative Capital, Egypt
One of Africa's tallest skyscrapers by Nile Developments. Comprehensive MEP coordination for this iconic mixed-use supertall tower, managing complex vertical distribution systems across 50+ floors in Egypt's New Administrative Capital.

---

## Contact

- **Email:** [Ahmed.hisham2000.ah@gmail.com](mailto:Ahmed.hisham2000.ah@gmail.com)
- **LinkedIn:** [linkedin.com/in/ahmed-hisham26](https://linkedin.com/in/ahmed-hisham26)

---

## License

This project is proprietary. All rights reserved by Ahmed Hisham.

## Interactive portfolio upgrade

Five BIM hero modes, an interactive portrait, evidence-linked metrics, numbered command navigation, project filters, expandable experience and automation tools, and four interactive project case-study routes. Diagrams are illustrative; project captures can be supplied separately.

Use `pnpm build:site` for static hosting. Photo and CV sources are stored losslessly in `source-assets` and restored automatically on installation/build by `scripts/materialize-assets.mjs`.
