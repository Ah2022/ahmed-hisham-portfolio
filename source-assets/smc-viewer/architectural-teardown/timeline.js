import timeline from './timeline.json';
export const {beats, duration:DURATION, fps:FPS} = timeline;
const smooth = x => { x=Math.max(0,Math.min(1,x)); return x*x*(3-2*x); };
export function tourAt(t) {
  const index = beats.findLastIndex(beat => beat.at <= t);
  const beat = beats[Math.max(index,0)];
  const end = beats[index+1]?.at ?? DURATION;
  const amount = ['Roof','Façade','Floors'].includes(beat.mode)
    ? smooth((t-beat.at)/timeline.transitionIn) * (1-smooth((t-end+timeline.transitionOut)/timeline.transitionOut))
    : 0;
  return {...beat,amount};
}
