# SMC website viewer

This is the maintained website adaptation of architectural-teardown. The original offline deliverable is unchanged.

From the workspace root:

1. `node scripts/build-web-assets.cjs` converts the five existing offline data scripts into bounded gzip group packets in teardown-web/assets.
2. `node scripts/verify-web-assets.cjs` checks all positions, indices and picking metadata against the original package.
3. `node scripts/build-web.cjs` bundles this viewer into teardown-web.

For the walkthrough, run `node scripts/build-walk-nav.cjs` after asset conversion and `node scripts/test-walk-nav.mjs` before bundling. The generator reads all architectural and structural triangles, derives slab support at elevation +0.05 m, clips obstacle geometry to pedestrian body height, and pads obstacles for body radius plus grid-cell diagonal. It keeps the largest connected supported area and derives a contiguous four-neighbour route. The resulting pilot is approximately 237 m² with a 33.3 m route; these are model-derived dimensions, not certified level or room names.

Walk inside loads only the relevant additional architectural groups. Movement uses the same conservative 0.3 m grid as the guided route, samples each step to prevent tunnelling, and fixes eye height at 1.65 m. Drag to look; WASD/arrows or on-screen buttons move; Escape returns to orbit before closing the iframe. Three viewpoint buttons relocate within the connected area. Closed doors remain barriers. Stairs, additional floors, and semantic room labels are not part of this pilot.

Serve teardown-web over HTTP; this version uses fetch and does not support opening directly from file://. The original teardown-out/dist viewer remains the offline version.

The initial overview excludes Frames and Other building categories and loads the dedicated structure. Optional full detail restores these categories without changing their geometry. Other disciplines load on selection. The 65-second architectural tour stays within the initial models so it does not silently download additional systems.

The portfolio integration lives in portfolio-integration-study/.sites-checkout/.sites-checkout. Its SMCInteractiveModel component mounts the iframe only after launch and removes it on close. The public assets are in client/public/interactive/smc; editable viewer source is also retained under source-assets/smc-viewer.

The one-time scripts/prepare-web-source.py was used to derive the initial web source. Do not rerun it over this maintained source: subsequent responsive and loading fixes live here.
