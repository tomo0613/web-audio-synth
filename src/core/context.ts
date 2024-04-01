import { Scheduler } from "./Scheduler";

const audioContext = new AudioContext();

const gainNode = audioContext.createGain();

gainNode.connect(audioContext.destination);

const scheduler = new Scheduler(audioContext);

export const context = {
    instance: audioContext,
    gainNode,
    scheduler,
};
