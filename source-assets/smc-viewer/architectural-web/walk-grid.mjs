export function decodeGrid(data){return {...data,cells:Uint8Array.from(atob(data.cells),c=>c.charCodeAt(0))};}
export function cellAt(nav,x,z){const cx=Math.floor((x-nav.ox)/nav.step),cz=Math.floor((z-nav.oz)/nav.step);return cx<0||cz<0||cx>=nav.width||cz>=nav.height?-1:cz*nav.width+cx;}
export function pointAt(nav,i){return {x:nav.ox+(i%nav.width+.5)*nav.step,z:nav.oz+(Math.floor(i/nav.width)+.5)*nav.step};}
export function canTravel(nav,a,b){const n=Math.max(1,Math.ceil(Math.hypot(b.x-a.x,b.z-a.z)/(nav.step/4)));for(let k=0;k<=n;k++){const t=k/n;if(!nav.cells[cellAt(nav,a.x+(b.x-a.x)*t,a.z+(b.z-a.z)*t)])return false;}return true;}
