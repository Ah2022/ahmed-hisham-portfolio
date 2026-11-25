import {readGroup} from './loader.js';

const architecture = ['Walls','Core','Roof','Glazing','Floors','Podium','Frames','Other','Structure'];
const layers = {
  Exterior: architecture, Roof: architecture, 'Façade': architecture,
  Floors: ['Floors','Structure'], Structure: ['Structure'],
  Drain: ['Drain'], MedicalGas: ['MedicalGas'], HVAC: ['HVAC'],
  Fire: ['Fire','Fuel'], Electrical: ['Electrical'], Equipment: ['Equipment']
};

// Keep only the current chapter's GPU buffers. The browser can cache the
// compressed files for the return to the exterior, or a second walkthrough.
export function createTourModel(meta, addGroup, removeGroup) {
  const resident = new Map();
  let controller;
  function release() {
    controller?.abort();
    for (const mesh of resident.values()) removeGroup(mesh);
    resident.clear();
  }
  async function prepare(mode, progress) {
    controller?.abort();
    const signal = (controller = new AbortController()).signal;
    const wanted = new Set(layers[mode]);
    for (const [group, mesh] of resident) {
      if (!wanted.has(group.category)) {
        removeGroup(mesh);
        resident.delete(group);
      }
    }
    const pending = meta.groups.filter(group => wanted.has(group.category) && !resident.has(group));
    const total = pending.reduce((n, group) => n + group.bytes, 0);
    let done = 0;
    for (const group of pending) {
      const packet = await readGroup(meta, group, signal);
      signal.throwIfAborted();
      resident.set(group, addGroup(packet));
      progress(done += group.bytes, total);
      await new Promise(resolve => setTimeout(resolve, 0));
    }
  }
  return {prepare, release};
}
