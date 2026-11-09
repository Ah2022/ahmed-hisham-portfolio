# SMC web viewer

The portfolio serves the prebuilt viewer and model chunks from client/public/interactive/smc. Its ordinary build requires no model conversion or external asset service.

The editable viewer source is retained here. Install this folder's two pinned dependencies in an isolated environment and run node scripts/build-web.cjs. Copy the generated teardown-web/viewer.js, viewer.css and architectural-teardown.html into client/public/interactive/smc. Keep the assets directory beside them.

The model catalog describes gzip-compressed group packets: a little-endian uint32 JSON length, UTF-8 group metadata padded to four bytes, Float32 positions, then Uint32 indices. Large compressed packets may be split across files in catalog order. Source names and triangle-to-component metadata are retained.

Overview loads building groups except Frames and Other, plus structure (8,761,946 compressed bytes). Full detail loads the remaining building groups. Drainage, medical gas and localized services load separately. The guided architectural tour never forces these extra downloads.

No iframe or model fetch is mounted until Launch interactive 3D. Closing removes the iframe; hidden documents stop requesting render frames. Explicit pause stays paused. Short phone windows can scroll the viewer, while wider windows use a sidebar. WebGL 2 is required.

All 339 converted groups were checked byte-for-byte against the offline positions, indices and picking metadata. Largest model asset: 8,160,029 bytes. The original offline HTML and data scripts are unchanged in the TearDown workspace.

Browser verification covered overview, façade, structure, drainage, medical gas, services, optional full detail, Escape, focus restoration and iframe removal. Mobile layout was inspected in a resized desktop browser; real mobile GPU performance and throttled-network timing have not been measured.
