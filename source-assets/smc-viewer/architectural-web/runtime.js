export async function runSim(options,init){
  const canvas=document.getElementById('gl');
  let gl;
  try{gl=canvas.getContext('webgl2');}catch{}
  if(!gl)throw Error('Interactive 3D needs WebGL 2. Try another browser or use the project image gallery.');
  const instance=await init({canvas,capture:false});
  instance.resize();addEventListener('resize',()=>instance.resize());
  let frame=0,last=0,elapsed=0;
  const tick=time=>{
    frame=requestAnimationFrame(tick);
    if(time-last<32)return;
    elapsed+=Math.min((time-last)/1000,.1);last=time;instance.render(elapsed);
  };
  document.addEventListener('visibilitychange',()=>{
    cancelAnimationFrame(frame);
    if(!document.hidden){last=performance.now();frame=requestAnimationFrame(tick);}
  });
  frame=requestAnimationFrame(tick);
  addEventListener('pagehide',()=>{cancelAnimationFrame(frame);instance.dispose?.();},{once:true});
  window.SIM={ready:true};
}
