# Phase A: interactive BIM hero

The hero now uses one selected mode to drive the SVG building illustration, accent color, technical labels, metrics and explanation. It defaults to MEP. Structure and Electrical show coordination context; they do not claim structural or electrical design responsibility. Project-scale figures are labelled as context, and the illustration is explicitly identified as illustrative.

The portrait uses the supplied photo with pointer tilt, a moving highlight, and a tap/Enter/Space toggle revealing Ahmed's specialisms. Reduced-motion preferences disable movement. No additional runtime packages or external animation assets are required.

The four CTAs link to existing sections or download the supplied CV, now bundled with the site. Both photo and CV are served from `client/public`.

## Validation

- TypeScript: `pnpm check` passed.
- Production Vite build and server bundle passed. Existing analytics-environment and bundle-size warnings remain.
- Chromium checks passed for all five mode buttons, selected states, diagram/label changes, metrics and descriptions.
- Existing section targets and the downloaded PDF were verified; the portrait image loaded.
- Portrait toggle passed keyboard and touch checks; mode selection passed touch checks.
- Layout checks passed at 320, 390, 768 and 1440 px with no hero overflow or controls outside the viewport.
- Reduced-motion checks confirmed animations and portrait transforms were disabled.
- No browser runtime exceptions were observed during the checks.

## Editing content

Update `client/src/components/heroModes.ts` to change mode facts, labels, colors or explanations. Keep personal contribution distinct from overall project scale. Replace assets at `client/public/images/ahmed-hisham.png` and `client/public/documents/ahmed-hisham-cv.pdf` when needed.
