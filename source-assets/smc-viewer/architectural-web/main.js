import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {runSim} from './runtime.js';
import {tourAt,beats,DURATION,FPS} from '../architectural-teardown/timeline.js';

import {getCatalog,loadModel} from './loader.js';
const names={Glazing:'Curtain wall',Frames:'Façade framing',Podium:'Precast & coping',Floors:'Floor plates',Structure:'Structure',Core:'Concrete walls',Walls:'Walls',Roof:'Roof & PV panels',Services:'Localized services',Drain:'Drain model',MedicalGas:'Medical gas model',Other:'Building component'};
const colors={Glazing:0x72aeb0,Frames:0x536c70,Podium:0xc6b99e,Floors:0xd3d0c7,Structure:0x9aa3a1,Core:0xa5aba7,Walls:0xd4c8b2,Roof:0x687e82,Services:0x278d88,Drain:0x195b53,MedicalGas:0x795025,Other:0xaab8b1};
const descriptions={Exterior:'The building in its exported coordinates. Overview omits dense framing and interior detail; full detail is available.',Façade:'Curtain panels, framing and precast components separate from the building.',Roof:'Uppermost building components lift together to reveal the roof assembly.',Floors:'Floor plates separate by geometric height bands. These are not certified level names.',Structure:'The dedicated structural model from st.fbx, including foundations, slabs, walls and framing.',Drain:'The dedicated drainage model from pd.fbx. Click a pipe or fitting to inspect its source name.',MedicalGas:'The dedicated medical gas model from pm.fbx. Source geometry and element names are retained.',Services:'A localized services export: pipework, valves, fittings and cable trays.',Reset:'Return to the original camera and assembled exterior.'};

runSim({duration:DURATION,fps:FPS,theme:'light',hud:{enabled:false,title:'SMC',subtitle:'Architectural teardown'},director:{enabled:false}},async({canvas,capture})=>{
 const catalog=await getCatalog();
 const models=Object.fromEntries(Object.entries(catalog.models).map(([k,m])=>[k,{...m,groups:[]}]));
 const {building,structure}=models;
 const renderer=new THREE.WebGLRenderer({canvas,antialias:true,powerPreference:'high-performance',preserveDrawingBuffer:capture});renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.localClippingEnabled=true;renderer.setClearColor(0xeef1ec);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.25;
 const scene=new THREE.Scene();scene.add(new THREE.HemisphereLight(0xf6fcff,0x7b8170,2.6));const sun=new THREE.DirectionalLight(0xfff3df,3.2);sun.position.set(-120,180,100);scene.add(sun);const fill=new THREE.DirectionalLight(0xb9dde4,1.4);fill.position.set(100,45,-100);scene.add(fill);
 const bounds=new THREE.Box3(new THREE.Vector3(...building.bounds[0]),new THREE.Vector3(...building.bounds[1]));bounds.union(new THREE.Box3(new THREE.Vector3(...structure.bounds[0]),new THREE.Vector3(...structure.bounds[1])));const center=bounds.getCenter(new THREE.Vector3()),size=bounds.getSize(new THREE.Vector3());
 const camera=new THREE.PerspectiveCamera(32,innerWidth/innerHeight,.1,5000),controls=new OrbitControls(camera,canvas);controls.enableDamping=false;controls.maxPolarAngle=Math.PI*.93;controls.minDistance=8;controls.maxDistance=Math.max(size.x,size.z)*5;
 const root=new THREE.Group();root.position.copy(center).negate();scene.add(root);const meshes=[];let triangles=0;
 function addModel(model){for(const g of model.groups){const geom=new THREE.BufferGeometry();geom.setAttribute('position',new THREE.BufferAttribute(new Float32Array(model.buffer,g.positionOffset,g.positionLength),3));geom.setIndex(new THREE.BufferAttribute(new Uint32Array(model.buffer,g.indexOffset,g.indexLength),1));geom.computeVertexNormals();geom.computeBoundingSphere();const mat=['Drain','MedicalGas'].includes(g.category)?new THREE.MeshBasicMaterial({color:colors[g.category],side:THREE.DoubleSide,toneMapped:false}):new THREE.MeshStandardMaterial({color:colors[g.category],roughness:g.category==='Glazing'?.29:.75,metalness:g.category==='Glazing'?.25:.05,side:THREE.DoubleSide,clippingPlanes:[]});const mesh=new THREE.Mesh(geom,mat);mesh.userData={...g,source:model.source,role:model.role||'services',count:g.parts.length};root.add(mesh);meshes.push(mesh);triangles+=g.indexLength/3;}}

 const ground=new THREE.Mesh(new THREE.PlaneGeometry(size.x*2.6,size.z*3),new THREE.MeshStandardMaterial({color:0xe4e7dd,roughness:1}));ground.rotation.x=-Math.PI/2;ground.position.y=-size.y/2-.5;scene.add(ground);
 const grid=new THREE.GridHelper(Math.max(size.x,size.z)*2,32,0xc0cac2,0xd9dfd7);grid.position.y=ground.position.y+.03;scene.add(grid);
 let mode='Exterior',amount=0,manual=true,lastInput=0,nowTime=0,tourOffset=0,selected=null,lastMode='',quality='laptop';
 const modeNames=['Exterior','Façade','Roof','Floors','Structure','Drain','MedicalGas','Services'];
 document.body.insertAdjacentHTML('beforeend',`<header><div class="brand">SMC<span>BUILDING ANATOMY</span></div><div class="source-tag"><i></i> SOURCE MODEL / INTERACTIVE STUDY</div><button id="tour">Play tour</button></header><aside><div class="eyebrow">01 — EXPLORE THE ASSEMBLY</div><h1>Architecture,<br>layer by layer.</h1><p class="intro">From the outer skin to the structure within.</p><nav>${modeNames.map((n,i)=>`<button data-mode="${n}"><span>0${i+1}</span>${({Drain:'Drain model',MedicalGas:'Medical gas',Services:'Services detail'})[n]||n}<b>↗</b></button>`).join('')}</nav><div class="control"><label>TEARDOWN <output id="amountText">0%</output></label><input aria-label="Teardown percentage" id="amount" type="range" min="0" max="100" value="0"></div><div class="views"><button data-view="hero">Perspective</button><button data-view="front">Front</button><button data-view="top">Above</button><button id="reset">Reset ↺</button></div></aside><div class="caption"><div id="chapter">01 / EXTERIOR</div><h2 id="title">The assembled building</h2><p id="description"></p></div><div class="inspector"><span class="eyebrow">MODEL INFORMATION</span><h3 id="pickTitle">Select a component</h3><p id="pickDetail">Click the building to inspect its source element.</p><div class="metric"><span>Visible source parts</span><strong id="parts">—</strong></div><div class="metric"><span>Display units</span><strong>metres</strong></div><p class="note">Geometry: supplied Revit FBX exports.<br>Finishes: illustrative, matched to the image.<br>Overview omits framing and interior details. Load full detail above.</p></div><footer><div id="status">GUIDED TOUR</div><div class="progress"><div id="progress"></div></div><span>Drag to orbit · Scroll to zoom · Click to inspect</span></footer><div id="cursor"></div>`);
 const $=id=>document.getElementById(id);const fmt=n=>n.toLocaleString('en-US');
 document.querySelector('.views').insertAdjacentHTML('beforeend','<select id="quality" aria-label="Rendering quality"><option value="laptop">Overview · faster loading</option><option value="balanced">Load full architectural detail</option></select>');

 let busy=false,requestId=0,detailLoaded=false;
 const loadStatus=document.createElement('div');loadStatus.id='load-status';loadStatus.hidden=true;loadStatus.setAttribute('role','status');document.body.append(loadStatus);
 function progress(done,total){loadStatus.textContent=`Loading model · ${Math.round(done/Math.max(1,total)*100)}%`;}
 async function ensureModel(role,detail=false){
   loadStatus.hidden=false;
   try{await loadModel(role,model=>{addModel(model);apply();},{detail,onProgress:progress});}
   finally{loadStatus.hidden=true;}
 }
 function showError(error,retry){
   loadStatus.replaceChildren(document.createTextNode(error.message+' '));
   const button=document.createElement('button');button.textContent='Retry';button.onclick=retry;loadStatus.append(button);loadStatus.hidden=false;
 }
 async function loadDetail(){
   if(busy)return;input();busy=true;$('quality').disabled=true;
   try{await ensureModel('building',true);detailLoaded=true;quality='balanced';renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));}
   catch(error){$('quality').value='laptop';showError(error,loadDetail);}
   finally{busy=false;$('quality').disabled=false;}
 }
 $('quality').onchange=e=>{input();if(e.target.value==='balanced'&&!detailLoaded)loadDetail();else{quality=e.target.value;renderer.setPixelRatio(quality==='laptop'?1:Math.min(devicePixelRatio,1.5));}};

 const span=Math.max(size.x,size.z);const target=new THREE.Vector3(0,size.y*.03,0);
 function view(v='hero',s=1){const d=span*1.55*s*Math.max(1,1.25/camera.aspect);if(v==='front')camera.position.set(0,size.y*.15,d);else if(v==='top')camera.position.set(.01,d,.01);else camera.position.set(-d*.48,d*.29,d*.98);controls.target.copy(target);controls.update();}
 view();
 function input(){manual=true;lastInput=performance.now();$('tour').textContent='Play tour';$('status').textContent='YOUR VIEW';}
 ['pointerdown','wheel','keydown'].forEach(e=>addEventListener(e,event=>{if(!capture&&event.target.id!=='tour')input();},{passive:true}));
 addEventListener('pointermove',event=>{if(!capture&&event.buttons)input();},{passive:true});
 function modelView(role){const model=models[role];const b=new THREE.Box3(new THREE.Vector3(...model.bounds[0]),new THREE.Vector3(...model.bounds[1]));const c=b.getCenter(new THREE.Vector3()).sub(center),dim=b.getSize(new THREE.Vector3()),d=Math.max(dim.x,dim.y,dim.z)*1.45*Math.max(1,1.25/camera.aspect);controls.target.copy(c);camera.position.copy(c).add(new THREE.Vector3(-d*.48,d*.29,d*.98));controls.update();}

 function setMode(m){mode=m;amount=['Façade','Roof','Floors'].includes(m)?1:0;const role={Services:'services',Drain:'drain',MedicalGas:'medicalgas',Structure:'structure'}[m];if(role)modelView(role);else view('hero',m==='Façade'||m==='Floors'?1.12:1);}
 async function chooseMode(m){
   input();const id=++requestId;
   const role={Services:'services',Drain:'drain',MedicalGas:'medicalgas'}[m];
   if(busy)return;
   if(!role){setMode(m);return;}
   busy=true;document.querySelectorAll('[data-mode]').forEach(b=>b.disabled=true);
   try{await ensureModel(role);if(id===requestId)setMode(m);}
   catch(error){showError(error,()=>chooseMode(m));}
   finally{busy=false;document.querySelectorAll('[data-mode]').forEach(b=>b.disabled=false);}
 }


 document.querySelectorAll('[data-mode]').forEach(b=>b.onclick=()=>{chooseMode(b.dataset.mode);});document.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>{input();view(b.dataset.view);});
 $('amount').oninput=e=>{input();amount=+e.target.value/100;if(mode==='Exterior')mode='Façade';};$('reset').onclick=()=>{input();requestId++;setMode('Exterior');selected=null;$('pickTitle').textContent='Select a component';$('pickDetail').textContent='Click the building to inspect its source element.';};$('tour').onclick=()=>{if(busy)return;if(manual){manual=false;tourOffset=nowTime;view();$('tour').textContent='Pause tour';}else input();};
 const ray=new THREE.Raycaster(),mouse=new THREE.Vector2();let down;
 canvas.addEventListener('pointerdown',e=>down=[e.clientX,e.clientY]);canvas.addEventListener('pointerup',e=>{if(!down||Math.hypot(e.clientX-down[0],e.clientY-down[1])>5)return;const rect=canvas.getBoundingClientRect();mouse.set((e.clientX-rect.left)/rect.width*2-1,1-(e.clientY-rect.top)/rect.height*2);ray.setFromCamera(mouse,camera);const hit=ray.intersectObjects(meshes.filter(m=>m.visible))[0];if(!hit)return;selected=hit.object;const p=selected.userData.parts.find(p=>hit.faceIndex>=p.first&&hit.faceIndex<p.first+p.triangles);$('pickTitle').textContent=names[selected.userData.category];$('pickDetail').textContent=(p?.name||'Source component')+' · '+selected.userData.source;});
 function apply(){grid.visible=!['Drain','MedicalGas'].includes(mode);let visible=0;for(const mesh of meshes){const g=mesh.userData,c=g.category;mesh.position.set(0,0,0);mesh.visible=['building','structure'].includes(g.role);mesh.material.emissive?.setHex(selected===mesh?0x10413c:0x000000);mesh.material.emissiveIntensity=.35;
 if(mode==='Structure')mesh.visible=g.role==='structure';
 if(mode==='Drain')mesh.visible=g.role==='drain';
 if(mode==='MedicalGas')mesh.visible=g.role==='medicalgas';
 if(mode==='Services')mesh.visible=g.role==='services';
 if(mode==='Façade'&&['Glazing','Frames','Podium'].includes(c)){const offsets={east:[1,0,0],west:[-1,0,0],front:[0,0,1],back:[0,0,-1]};mesh.position.fromArray(offsets[g.side]||[0,0,1]).multiplyScalar(amount*span*.11);mesh.position.y=amount*2;}
 if(mode==='Roof'){const y=(g.bounds[0][1]+g.bounds[1][1])/2;if(c==='Roof'||y>bounds.max.y-5)mesh.position.y=amount*14;}
 if(mode==='Floors'){mesh.visible=g.role==='structure'||(g.role==='building'&&c==='Floors');if(c==='Floors')mesh.position.y=amount*Math.max(0,g.band*4-bounds.min.y)*.5;}
 if(quality==='laptop'&&['Frames','Other'].includes(c))mesh.visible=false;if(mesh.visible)visible+=g.count;
 }$('parts').textContent=fmt(visible);$('amount').disabled=['Structure','Drain','MedicalGas','Services'].includes(mode);$('amount').value=Math.round(amount*100);$('amountText').textContent=Math.round(amount*100)+'%';
 if(lastMode!==mode){document.querySelectorAll('[data-mode]').forEach(b=>b.classList.toggle('active',b.dataset.mode===mode));$('chapter').textContent='0'+(modeNames.indexOf(mode)+1)+' / '+mode.toUpperCase();$('title').textContent={Exterior:'The assembled building',Façade:'Peel back the outer skin',Roof:'Reveal the roof assembly',Floors:'Read the building in layers',Structure:'The supporting framework',Drain:'The drainage network',MedicalGas:'The medical gas network',Services:'Inside the services zone'}[mode];$('description').textContent=descriptions[mode];lastMode=mode;}}

 renderer.setPixelRatio(1);renderer.setSize(canvas.clientWidth,canvas.clientHeight,false);camera.aspect=canvas.clientWidth/canvas.clientHeight;camera.updateProjectionMatrix();view();
 const initialProgress=(done,total)=>{document.querySelector('#loading span').textContent=`Loading overview · ${Math.round(done/Math.max(total,1)*100)}%`;};
 await loadModel('building',addModel,{onProgress:initialProgress});
 await loadModel('structure',addModel,{onProgress:initialProgress});
 apply();await renderer.compileAsync(scene,camera);$('loading').remove();
 $('status').textContent='YOUR VIEW';$('tour').textContent='Play tour';
 addEventListener('keydown',e=>{if(e.key==='Escape'&&parent!==window)parent.postMessage({type:'smc-viewer-close'},location.origin);});
 canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();showError(Error('The graphics session was interrupted.'),()=>location.reload());});
window.TEARDOWN={building:{bounds:building.bounds,count:building.count},services:{bounds:models.services.bounds,count:models.services.count},models:Object.fromEntries(Object.entries(models).map(([k,v])=>[k,{source:v.source,count:v.count,bounds:v.bounds}])),triangles,setMode,inspect:()=>({mode,amount,manual,visible:meshes.filter(m=>m.visible).length,sources:[...new Set(meshes.filter(m=>m.visible).map(m=>m.userData.source))],drawCalls:renderer.info.render.calls,triangles:renderer.info.render.triangles}),ready:true};
 return{dispose(){controls.dispose();meshes.forEach(m=>{m.geometry.dispose();m.material.dispose();});renderer.dispose();renderer.forceContextLoss();},resize(){camera.aspect=canvas.clientWidth/canvas.clientHeight;camera.updateProjectionMatrix();renderer.setSize(canvas.clientWidth,canvas.clientHeight,false);},render(t){nowTime=t;const phase=capture?t:((t-tourOffset)%DURATION+DURATION)%DURATION;if(capture||!manual){const s=tourAt(phase);mode=['Drain','MedicalGas'].includes(s.mode)?'Exterior':s.mode;amount=s.amount;if(mode==='Drain'||mode==='MedicalGas')modelView(mode==='Drain'?'drain':'medicalgas');else view('hero',mode==='Floors'?1+.15*amount:mode==='Façade'?1+.12*amount:1);const angle=Math.sin(phase/DURATION*Math.PI*2)*.06;camera.position.applyAxisAngle(new THREE.Vector3(0,1,0),angle);controls.update();$('tour').textContent='Pause tour';$('status').textContent='GUIDED TOUR · '+Math.floor(phase)+' / 65 s';const el=document.querySelector('[data-mode="'+mode+'"]');const r=el.getBoundingClientRect();$('cursor').style.transform=`translate(${r.right-28}px,${r.top+r.height/2}px)`;$('cursor').style.opacity='1';}else $('cursor').style.opacity='0';$('progress').style.width=(phase/DURATION*100)+'%';apply();renderer.render(scene,camera);return{};}};
}).catch(e=>{console.error(e);const l=document.getElementById('loading');if(l){l.replaceChildren(document.createTextNode(e.message));const b=document.createElement('button');b.textContent='Retry viewer';b.onclick=()=>location.reload();l.append(b);}});





