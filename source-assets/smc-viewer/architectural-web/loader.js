let catalog;
const models={};
export async function getCatalog(){
  if(!catalog){const r=await fetch('./assets/catalog.json');if(!r.ok)throw Error('Model catalog could not be loaded.');catalog=await r.json();}
  return catalog;
}
export async function loadModel(stem,onGroup,{detail=false,onProgress=()=>{}}={}){
  const meta=(await getCatalog()).models[stem];
  const state=models[stem]??={loaded:new Set(),pending:null};
  if(state.pending)await state.pending;
  const groups=meta.groups.filter((g,i)=>!state.loaded.has(i)&&(stem!=='building'||detail||!['Frames','Other'].includes(g.category)));
  const total=groups.reduce((s,g)=>s+g.bytes,0);let done=0;
  state.pending=(async()=>{
    // Sequential decoding bounds peak memory; each completed group can render immediately.
    for(const g of groups){
      const parts=[];
      for(const part of g.files){const r=await fetch('./assets/'+part.file);if(!r.ok)throw Error('A model file could not be loaded. Please retry.');parts.push(await r.arrayBuffer());done+=part.bytes;onProgress(done,total);}
      const buffer=await new Response(new Blob(parts).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer();
      const length=new DataView(buffer).getUint32(0,true);
      const group=JSON.parse(new TextDecoder().decode(new Uint8Array(buffer,4,length)));
      const start=4+length+(4-length%4)%4;
      group.positionOffset+=start;group.indexOffset+=start;
      onGroup({...meta,groups:[group],buffer});state.loaded.add(meta.groups.indexOf(g));
      await new Promise(resolve=>setTimeout(resolve,0));
    }
  })();
  try{await state.pending;}finally{state.pending=null;}
  return {...meta,groups:[],buffer:null};
}
