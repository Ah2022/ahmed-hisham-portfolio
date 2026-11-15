// Derive a conservative pedestrian grid from the exported geometry, in source metres.
// No room names or Revit levels are inferred. Closed doors remain obstacles.
const fs=require('node:fs'),path=require('node:path'),zlib=require('node:zlib');
const base=path.resolve(__dirname,'../teardown-web/assets');
const catalog=JSON.parse(fs.readFileSync(path.join(base,'catalog.json')));
const step=.3, y=.05, ox=-132, oz=-32, width=810, height=280;
const floor=new Uint8Array(width*height),blocked=new Uint8Array(width*height),detailGroups=[];
function clip(poly,h,above){const out=[];for(let i=0;i<poly.length;i++){const a=poly[i],b=poly[(i+1)%poly.length],ina=above?a[1]>=h:a[1]<=h,inb=above?b[1]>=h:b[1]<=h;if(ina)out.push(a);if(ina!==inb){const t=(h-a[1])/(b[1]-a[1]);out.push(a.map((v,j)=>v+t*(b[j]-v)));}}return out;}
function raster(poly,target,pad=0){
 if(poly.length<3)return;
 const xs=poly.map(p=>p[0]),zs=poly.map(p=>p[2]);
 const minx=Math.max(0,Math.floor((Math.min(...xs)-pad-ox)/step)),maxx=Math.min(width-1,Math.ceil((Math.max(...xs)+pad-ox)/step));
 const minz=Math.max(0,Math.floor((Math.min(...zs)-pad-oz)/step)),maxz=Math.min(height-1,Math.ceil((Math.max(...zs)+pad-oz)/step));
 for(let z=minz;z<=maxz;z++)for(let x=minx;x<=maxx;x++){
  const px=ox+(x+.5)*step,pz=oz+(z+.5)*step;let inside=false,near=false;
  for(let i=0,j=poly.length-1;i<poly.length;j=i++){
   const a=poly[j],b=poly[i],dx=b[0]-a[0],dz=b[2]-a[2];
   if((a[2]>pz)!==(b[2]>pz)&&px<(b[0]-a[0])*(pz-a[2])/(b[2]-a[2])+a[0])inside=!inside;
   if(pad){const t=Math.max(0,Math.min(1,((px-a[0])*dx+(pz-a[2])*dz)/(dx*dx+dz*dz||1)));if(Math.hypot(px-a[0]-t*dx,pz-a[2]-t*dz)<=pad)near=true;}
  }
  if(inside||near)target[z*width+x]=1;
 }
}
for(const stem of ['building','structure'])for(const [gi,entry] of catalog.models[stem].groups.entries()){
 const data=zlib.gunzipSync(Buffer.concat(entry.files.map(f=>fs.readFileSync(path.join(base,f.file)))));
 const n=data.readUInt32LE(0),g=JSON.parse(data.subarray(4,4+n)),start=4+n+(4-n%4)%4;
 // Add metadata for selective interior loading without changing binary geometry.
 entry.bounds=g.bounds;entry.band=g.band;
 if(g.bounds[1][1]<y-.15||g.bounds[0][1]>y+2.1)continue;
 if(stem==='building'&&['Frames','Other'].includes(g.category))detailGroups.push(gi);
 const p=new Float32Array(data.buffer,data.byteOffset+start,g.positionLength),ix=new Uint32Array(data.buffer,data.byteOffset+start+g.indexOffset,g.indexLength);
 for(let i=0;i<ix.length;i+=3){
  const tri=[ix[i],ix[i+1],ix[i+2]].map(j=>[p[j*3],p[j*3+1],p[j*3+2]]),lo=Math.min(...tri.map(p=>p[1])),hi=Math.max(...tri.map(p=>p[1]));
  if(g.category==='Floors'&&hi-lo<.025&&Math.abs((hi+lo)/2-y)<.09)raster(tri,floor);
  if(hi>y+.18&&lo<y+1.95)raster(clip(clip(tri,y+.18,true),y+1.95,false),blocked,.22+step*Math.SQRT2/2);
 }
}
const cells=new Uint8Array(floor.length);
for(let z=1;z<height-1;z++)for(let x=1;x<width-1;x++){const i=z*width+x;if(blocked[i])continue;let safe=true;for(let dz=-1;dz<=1;dz++)for(let dx=-1;dx<=1;dx++)if(!floor[i+dz*width+dx])safe=false;if(safe)cells[i]=1;}
function neighbors(i){const x=i%width,z=Math.floor(i/width);return [x>0?i-1:-1,x<width-1?i+1:-1,z>0?i-width:-1,z<height-1?i+width:-1].filter(j=>j>=0&&cells[j]);}
const seen=new Uint8Array(cells.length);let largest=[];
for(let i=0;i<cells.length;i++)if(cells[i]&&!seen[i]){const q=[i];seen[i]=1;for(let k=0;k<q.length;k++)for(const n of neighbors(q[k]))if(!seen[n]){seen[n]=1;q.push(n);}if(q.length>largest.length)largest=q;}
const keep=new Set(largest);for(let i=0;i<cells.length;i++)cells[i]=keep.has(i)?1:0;
function bfs(start){const q=[start],prev=new Int32Array(cells.length).fill(-1);prev[start]=start;for(let k=0;k<q.length;k++)for(const n of neighbors(q[k]))if(prev[n]<0){prev[n]=q[k];q.push(n);}return {end:q.at(-1),prev};}
if(largest.length<100)throw Error('No sufficiently large connected walking surface.');
const start=bfs(largest[0]).end,{end,prev}=bfs(start),route=[end];while(route.at(-1)!==start)route.push(prev[route.at(-1)]);route.reverse();
const result={version:1,label:'Interior · elevation +0.05 m',eyeHeight:1.65,y,step,ox,oz,width,height,cells:Buffer.from(cells).toString('base64'),start,route,detailGroups,source:'Geometry-derived pilot floor; not a certified Revit level. Closed doors are barriers.'};
fs.writeFileSync(path.join(base,'walk-nav.json'),JSON.stringify(result));
fs.writeFileSync(path.join(base,'catalog.json'),JSON.stringify(catalog));
console.log(JSON.stringify({walkableCells:largest.length,areaM2:largest.length*step*step,routeMetres:(route.length-1)*step,start,end,detailGroups},null,2));
