const fs=require('node:fs'),path=require('node:path'),esbuild=require('esbuild');
const root=path.resolve(__dirname,'..'),out=path.join(root,'teardown-web');
fs.mkdirSync(out,{recursive:true});
esbuild.buildSync({entryPoints:[path.join(root,'architectural-web/main.js')],bundle:true,minify:true,format:'iife',outfile:path.join(out,'viewer.js')});
fs.writeFileSync(path.join(out,'viewer.css'),fs.readFileSync(path.join(root,'architectural-web/style.css'),'utf8')+'\n'+fs.readFileSync(path.join(root,'architectural-web/embed.css'),'utf8'));
fs.writeFileSync(path.join(out,'architectural-teardown.html'),'<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><title>SMC · Interactive building anatomy</title><link rel="stylesheet" href="./viewer.css"></head><body><canvas id="gl" aria-label="Interactive SMC hospital model"></canvas><div id="loading" role="status">Preparing the building<span>Loading the architectural overview</span></div><script src="./viewer.js" defer></script></body></html>');
console.log('Built web viewer:',out);
