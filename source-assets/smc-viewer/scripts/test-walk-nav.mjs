import fs from 'node:fs';
import assert from 'node:assert/strict';
import {decodeGrid,pointAt,cellAt,canTravel} from '../architectural-web/walk-grid.mjs';
const nav=decodeGrid(JSON.parse(fs.readFileSync(new URL('../teardown-web/assets/walk-nav.json',import.meta.url))));
assert.equal(nav.cells.length,nav.width*nav.height);
assert.ok(nav.route.length>20);
for(let i=0;i<nav.route.length;i++){
 const p=pointAt(nav,nav.route[i]);assert.equal(cellAt(nav,p.x,p.z),nav.route[i]);assert.equal(nav.cells[nav.route[i]],1);
 if(i){const a=nav.route[i-1],b=nav.route[i];assert.ok(Math.abs(a-b)===1||Math.abs(a-b)===nav.width);assert.ok(canTravel(nav,pointAt(nav,a),p));}
}
assert.equal(canTravel(nav,pointAt(nav,nav.start),{x:nav.ox-1,z:nav.oz-1}),false);
// A long step must not tunnel through an occupied cell, even with safe endpoints.
const wall={ox:0,oz:0,step:1,width:5,height:1,cells:new Uint8Array([1,1,0,1,1])};
assert.equal(canTravel(wall,{x:.5,z:.5},{x:4.5,z:.5}),false);
assert.equal(cellAt(wall,-.01,.5),-1);assert.equal(cellAt(wall,5,.5),-1);
assert.ok(nav.detailGroups.length>0);
console.log(`PASS: ${nav.route.length} route points supported, contiguous and collision-safe; boundary and tunnelling checks passed.`);
