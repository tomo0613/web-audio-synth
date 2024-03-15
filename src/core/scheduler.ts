import type { SoundTrack } from "./SoundTrack";

export class Scheduler {
    loop = true;
    // tempo = 120;
    /**
     * scheduleInterval milliseconds
     */
    scheduleInterval = 500;
    /**
     * scheduleAheadTime seconds
     */
    scheduleAheadTime = 0.600;
    private active = false;
    private audioContext: AudioContext;
    private tracks: SoundTrack[];
    private startTime = 0;
    private nextSoundStartTime = 0;
    private timeoutId = 0;

    constructor(audioContext: AudioContext, tracks: SoundTrack[]) {
        this.audioContext = audioContext;
        this.tracks = tracks;
    }

    start() {
        this.active = true;
        this.startTime = this.audioContext.currentTime + 0.005;
        this.nextSoundStartTime = 0;

        this.schedule();
    }

    stop() {
        this.active = false;

        clearTimeout(this.timeoutId);
    }

    private schedule() {
        if (!this.active) {
            return;
        }

        const elapsedTime = this.audioContext.currentTime - this.startTime;

        console.log("--schedule--", { elapsedTime, nextSoundStartTime: this.nextSoundStartTime });
        // this.nextSoundStartTime < Infinity  if  loop

        while (this.nextSoundStartTime < elapsedTime + this.scheduleAheadTime) {
            const playTime = this.nextSoundStartTime + this.startTime;

            this.playAtTime(playTime);
            this.prepareNextSound();
        }

        this.timeoutId = setTimeout(() => {
            this.schedule();
        }, this.scheduleInterval);
    }

    private prepareNextSound() {
        let next: number;

        this.tracks.forEach(({ positions }) => {
            if (!positions.length) {
                return;
            }

            const index = positions.indexOf(this.nextSoundStartTime);
            const nextOnTrack: number | undefined = positions[index + 1];

            if (next === undefined || nextOnTrack < next) {
                next = nextOnTrack;
            }
        });

        console.log("--prepareNextSound--", { next });

        if (!next && !this.loop) {
            this.stop();
        }

        this.nextSoundStartTime = next || 0;
    }

    private playAtTime(startTime: number) {
        this.tracks.forEach(({ sounds }) => {
            const sound = sounds.get(this.nextSoundStartTime);
            const stopTime = startTime + sound.length + sound.envelopes.amp.release;

            sound.play(startTime);
            sound.stop(stopTime);
        });
    }
}
