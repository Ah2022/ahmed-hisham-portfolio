import timeline from './timeline.json';
export const beats=timeline.beats;
export const DURATION=timeline.duration;
export const FPS=timeline.fps;
const smooth=x=>{x=Math.max(0,Math.min(1,x));return x*x*(3-2*x);};
export function tourAt(t){
 const [,roof,facade,floors,structure,drain,gas,reassembly]=beats.map(b=>b.at);
 const ease=(start,end)=>smooth((t-start)/timeline.transitionIn)*(1-smooth((t-end+timeline.transitionOut)/timeline.transitionOut));
 if(t<roof)return{mode:'Exterior',amount:0};
 if(t<facade)return{mode:'Roof',amount:ease(roof,facade)};
 if(t<floors)return{mode:'Façade',amount:ease(facade,floors)};
 if(t<structure)return{mode:'Floors',amount:ease(floors,structure)};
 if(t<drain)return{mode:'Structure',amount:0};
 if(t<gas)return{mode:'Drain',amount:0};
 if(t<reassembly)return{mode:'MedicalGas',amount:0};
 return{mode:'Exterior',amount:0};
}

