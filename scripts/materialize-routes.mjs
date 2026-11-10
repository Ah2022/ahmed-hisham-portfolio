import {readFileSync,writeFileSync,mkdirSync} from "node:fs";
// Explicit HTML entry points make direct case-study links work on static hosts,
// including deployments without a single-page-application fallback.
const html=readFileSync("build/index.html","utf8");
const data=readFileSync("client/src/data/portfolio.ts","utf8");
mkdirSync("build/projects",{recursive:true});
for(const [,slug] of data.matchAll(/slug:\s*"([a-z0-9-]+)"/g)){
  writeFileSync(`build/projects/${slug}.html`,html);
}
