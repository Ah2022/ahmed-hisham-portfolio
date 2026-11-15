import * as THREE from 'three';
import {decodeGrid,pointAt,cellAt,canTravel} from './walk-grid.mjs';

export function createWalk({camera,controls,canvas,center,load,prepare,restore,resize}){
 let nav,active=false,loading=false,guided=false,routeIndex=1,yaw=0,pitch=0,lastTime=null,saved,drag=null;
 const keys=new Set(),abort=new AbortController(),signal=abort.signal;
 const $=id=>document.getElementById(id);
 document.querySelector('.views').insertAdjacentHTML('beforeend','<button id="enter-walk">Walk inside ↗</button>');
 document.body.insertAdjacentHTML('beforeend',`<section id="walk-panel" aria-label="Interior walkthrough" hidden>
 <div class="walk-heading"><div><span class="eyebrow">SMC / WALKTHROUGH</span><h2>Inside the architecture</h2></div><button id="exit-walk">Exit to orbit</button></div>
 <p id="walk-level">Interior · elevation +0.05 m</p><p class="walk-help">Drag to look · W A S D or arrow keys to walk · Esc to exit</p>
 <div class="walk-actions"><button id="walk-tour">Start guided walk</button><button id="walk-home">Return to start</button><label>Speed <select id="walk-speed"><option value="1.2">Normal</option><option value=".6">Slow</option></select></label></div>
 <div class="walk-stops"><label for="walk-stop">Viewpoint</label><select id="walk-stop"><option value="0">01 · Route start</option><option value="1">02 · Along the route</option><option value="2">03 · Route end</option></select><button id="walk-go">Go to viewpoint</button></div>
 <p id="walk-feedback" role="status">Preparing the interior…</p><canvas id="walk-map" width="240" height="130" aria-label="Walking area and current position"></canvas>
 <p class="walk-note">Pilot floor from the supplied model. Closed doors stay closed.</p>
 <div class="walk-pad" aria-label="Touch walking controls"><button data-walk="ArrowUp" aria-label="Walk forward">↑</button><button data-walk="ArrowLeft" aria-label="Step left">←</button><button data-walk="ArrowDown" aria-label="Walk backward">↓</button><button data-walk="ArrowRight" aria-label="Step right">→</button></div></section>`);
 const map=$('walk-map'),ctx=map.getContext('2d');let mapImage,mapBounds;
 function setFeedback(s){$('walk-feedback').textContent=s;}
 function stop(){guided=false;keys.clear();$('walk-tour').textContent='Start guided walk';}
 function sourcePosition(){return {x:camera.position.x+center.x,z:camera.position.z+center.z};}
 function orient(){camera.rotation.set(pitch,yaw,0,'YXZ');}
 function place(index){const p=pointAt(nav,nav.route[index]),q=pointAt(nav,nav.route[Math.min(index+1,nav.route.length-1)]);camera.position.set(p.x-center.x,nav.y+nav.eyeHeight-center.y,p.z-center.z);if(index<nav.route.length-1)yaw=Math.atan2(-(q.x-p.x),-(q.z-p.z));pitch=0;orient();routeIndex=Math.min(index+1,nav.route.length-1);drawMap();}
 function prepareMap(){const indices=Array.from(nav.cells.keys()).filter(i=>nav.cells[i]);const xs=indices.map(i=>i%nav.width),zs=indices.map(i=>Math.floor(i/nav.width));mapBounds={x:Math.min(...xs)-3,z:Math.min(...zs)-3,w:Math.max(...xs)-Math.min(...xs)+7,h:Math.max(...zs)-Math.min(...zs)+7};ctx.fillStyle='#e4eae1';ctx.fillRect(0,0,map.width,map.height);ctx.fillStyle='#92afa1';for(const i of indices){const p=mapPoint(pointAt(nav,i));ctx.fillRect(p.x,p.y,Math.max(1,map.width/mapBounds.w),Math.max(1,map.height/mapBounds.h));}ctx.strokeStyle='#3b7769';ctx.lineWidth=1.5;ctx.beginPath();nav.route.forEach((i,j)=>{const p=mapPoint(pointAt(nav,i));j?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y);});ctx.stroke();mapImage=ctx.getImageData(0,0,map.width,map.height);}
 function mapPoint(p){return {x:((p.x-nav.ox)/nav.step-mapBounds.x)*map.width/mapBounds.w,y:((p.z-nav.oz)/nav.step-mapBounds.z)*map.height/mapBounds.h};}
 function drawMap(){if(!mapImage)return;ctx.putImageData(mapImage,0,0);const p=mapPoint(sourcePosition());ctx.fillStyle='#a54c27';ctx.beginPath();ctx.arc(p.x,p.y,4,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#a54c27';ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(p.x-Math.sin(yaw)*11,p.y-Math.cos(yaw)*11);ctx.stroke();}
 async function enter(){if(active||loading)return;loading=true;$('enter-walk').disabled=true;$('enter-walk').textContent='Loading interior…';
  try{if(!nav){const r=await fetch('./assets/walk-nav.json');if(!r.ok)throw Error('The walking area could not be loaded.');nav=decodeGrid(await r.json());}await load(nav);
   saved={position:camera.position.clone(),quaternion:camera.quaternion.clone(),target:controls.target.clone(),fov:camera.fov,near:camera.near};prepare();active=true;controls.enabled=false;camera.fov=68;camera.near=.04;camera.updateProjectionMatrix();document.body.classList.add('walking');$('walk-panel').hidden=false;canvas.tabIndex=0;resize();prepareMap();place(0);setFeedback('Ready to explore · eye height 1.65 m');$('exit-walk').focus();
  }catch(e){$('enter-walk').textContent='Retry walkthrough';$('enter-walk').title=e.message;throw e;}finally{loading=false;$('enter-walk').disabled=false;if(active)$('enter-walk').textContent='Walk inside ↗';}}
 function exit(){if(!active)return;stop();active=false;drag=null;document.body.classList.remove('walking');$('walk-panel').hidden=true;camera.position.copy(saved.position);camera.quaternion.copy(saved.quaternion);camera.fov=saved.fov;camera.near=saved.near;camera.updateProjectionMatrix();controls.target.copy(saved.target);controls.enabled=true;restore();resize();$('enter-walk').focus();}
 $('exit-walk').onclick=exit;$('walk-home').onclick=()=>{stop();place(0);setFeedback('Returned to the route start.');};
 $('walk-go').onclick=()=>{stop();place(Math.round(Number($('walk-stop').value)*(nav.route.length-1)/2));setFeedback('Viewpoint '+(Number($('walk-stop').value)+1)+' · drag to look around.');};
 $('walk-tour').onclick=()=>{if(guided){stop();setFeedback('Guided walk paused.');$('walk-tour').textContent='Resume guided walk';}else{if(!canTravel(nav,sourcePosition(),pointAt(nav,nav.route[routeIndex])))place(0);if(routeIndex>=nav.route.length-1)place(0);guided=true;$('walk-tour').textContent='Pause guided walk';setFeedback('Following the model-derived route.');}};
 function move(dx,dz){const p=sourcePosition(),next={x:p.x+dx,z:p.z+dz};if(canTravel(nav,p,next)){camera.position.x+=dx;camera.position.z+=dz;return true;}return false;}
 const allowed=new Set(['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight']);
 window.addEventListener('keydown',e=>{if(!active)return;if(e.key==='Escape'){e.preventDefault();e.stopImmediatePropagation();exit();return;}if(/INPUT|SELECT|TEXTAREA/.test(e.target.tagName))return;if(allowed.has(e.code)){e.preventDefault();guided=false;$('walk-tour').textContent='Start guided walk';keys.add(e.code);setFeedback('Free walk · movement stays inside the walking area.');}},{capture:true,signal});
 window.addEventListener('keyup',e=>keys.delete(e.code),{signal});window.addEventListener('blur',()=>{if(active&&guided)setFeedback('Guided walk paused while the viewer is inactive.');stop();drag=null;},{signal});document.addEventListener('visibilitychange',()=>{if(document.hidden){if(active&&guided)setFeedback('Guided walk paused while the viewer is inactive.');stop();drag=null;}},{signal});
 canvas.addEventListener('pointerdown',e=>{if(!active)return;stop();drag={id:e.pointerId,x:e.clientX,y:e.clientY};canvas.setPointerCapture(e.pointerId);canvas.focus();},{signal});
 canvas.addEventListener('pointermove',e=>{if(!active||drag?.id!==e.pointerId)return;yaw-=(e.clientX-drag.x)*.004;pitch=THREE.MathUtils.clamp(pitch-(e.clientY-drag.y)*.004,-1.25,1.25);drag={id:e.pointerId,x:e.clientX,y:e.clientY};orient();drawMap();},{signal});
 const release=()=>{drag=null;};canvas.addEventListener('pointerup',release,{signal});canvas.addEventListener('pointercancel',release,{signal});
 document.querySelectorAll('[data-walk]').forEach(b=>{b.addEventListener('pointerdown',e=>{e.preventDefault();stop();keys.add(b.dataset.walk);b.setPointerCapture(e.pointerId);},{signal});for(const type of ['pointerup','pointercancel','lostpointercapture'])b.addEventListener(type,()=>keys.delete(b.dataset.walk),{signal});});
 return {get active(){return active;},get loading(){return loading;},enter,exit,
  visible(g){return ['building','structure'].includes(g.role)&&g.bounds[0][1]<nav.y+4.5&&g.bounds[1][1]>nav.y-.5;},
  inspect(){const p=sourcePosition();return {active,guided,position:p,cell:nav?cellAt(nav,p.x,p.z):null,routeIndex};},
  update(t){const dt=Math.min(.05,Math.max(0,lastTime===null?0:t-lastTime));lastTime=t;if(!active)return;const speed=Number($('walk-speed').value);
   if(guided){let budget=dt*speed;while(budget>0&&guided){const p=sourcePosition(),q=pointAt(nav,nav.route[routeIndex]),dx=q.x-p.x,dz=q.z-p.z,d=Math.hypot(dx,dz);if(d<.001){if(++routeIndex>=nav.route.length){routeIndex=nav.route.length-1;stop();setFeedback('Route complete · explore here or return to start.');break;}continue;}const step=Math.min(d,budget);if(!move(dx/d*step,dz/d*step)){stop();setFeedback('Route paused at the walking boundary.');break;}const desired=Math.atan2(-dx,-dz),delta=Math.atan2(Math.sin(desired-yaw),Math.cos(desired-yaw));yaw+=THREE.MathUtils.clamp(delta,-dt*2,dt*2);pitch*=.9;orient();budget-=step;}}
   else{const f=Number(keys.has('KeyW')||keys.has('ArrowUp'))-Number(keys.has('KeyS')||keys.has('ArrowDown')),r=Number(keys.has('KeyD')||keys.has('ArrowRight'))-Number(keys.has('KeyA')||keys.has('ArrowLeft'));if(f||r){const d=dt*speed/Math.hypot(f,r),dx=(-Math.sin(yaw)*f+Math.cos(yaw)*r)*d,dz=(-Math.cos(yaw)*f-Math.sin(yaw)*r)*d;if(!move(dx,dz)){move(dx,0);move(0,dz);setFeedback('Walking boundary · turn or choose a viewpoint.');}}}drawMap();
  },dispose(){abort.abort();$('walk-panel').remove();$('enter-walk').remove();}};
}
