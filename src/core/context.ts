import { Scheduler } from "./Scheduler";
import type { SoundTrack } from "./SoundTrack";

const audioContext = new AudioContext();

const gainNode = audioContext.createGain();

gainNode.connect(audioContext.destination);

const tracks: SoundTrack[] = [];

const scheduler = new Scheduler(audioContext, tracks);

export const context = {
    instance: audioContext,
    gainNode,
    tracks,
    scheduler,
};
