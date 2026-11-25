# SMC web viewer

The portfolio serves the prebuilt viewer and model chunks from client/public/interactive/smc. Its ordinary build requires no model conversion or external asset service.

The editable viewer source is retained here. Install this folder's two pinned dependencies in an isolated environment and run node scripts/build-web.cjs. Copy the generated teardown-web/viewer.js, viewer.css and architectural-teardown.html into client/public/interactive/smc. Keep the assets directory beside them.

The model catalog describes gzip-compressed group packets: a little-endian uint32 JSON length, UTF-8 group metadata padded to four bytes, Float32 positions, then Uint32 indices. Large compressed packets may be split across files in catalog order. Source names and triangle-to-component metadata are retained.

The interactive overview uses 3DView2 for architecture and the dedicated structural export for context. Full architectural detail also loads frames, miscellaneous components and medical equipment. The manual drainage, medical gas and services controls use their dedicated models.

Play tour streams the coordinated 3DView export from the separate tour entry in the catalog. The 65-second timeline selects the architectural, structural and building-services groups for each chapter. The playback clock waits for the next chapter to load. Leaving the tour cancels pending downloads, releases its geometry and returns to the manual model.

Both architectural exports use Revit feet and Z-up coordinates. The browser packets contain Y-up geometry in metres with component transforms applied. Dense source meshes use reduced triangle counts for web viewing. Original FBX files are outside the web distribution.

The viewer requires WebGL 2 and a static HTTP server. Launching the viewer mounts the iframe. Closing it removes the iframe and its model scene.
