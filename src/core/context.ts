import type { SoundTrack } from "./SoundTrack";

const audioContext = new AudioContext();

const gainNode = audioContext.createGain();

gainNode.connect(audioContext.destination);

const tracks: SoundTrack[] = [];

function play() {
    tracks.forEach((track) => {
        track.play(audioContext.currentTime);
    })
}

function stop() {
    tracks.forEach((track) => {
        track.stop();
    })
}

export const context = {
    instance: audioContext,
    gainNode,
    tracks,
    play,
    stop,

    bpm: 120,
};
