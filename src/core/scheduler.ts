import type { SoundTrack } from "./SoundTrack";

/**
 * @returns timeStep - sixteenth note length
 */
function calculateTimeStep(tempo: number) {
    return 60 / tempo / 4;
}

export class Scheduler {
    loop = true;
    /**
     * scheduleInterval - milliseconds
     */
    scheduleInterval = 100;
    /**
     * scheduleAheadTime - seconds
     */
    scheduleAheadTime = 0.200;
    private active = false;
    private audioContext: AudioContext;
    private tracks: SoundTrack[];
    private currentPosition = 0;
    private startTime = 0;
    private nextSoundStartTime = 0;
    private timeoutId = 0;
    private timeStep = calculateTimeStep(180);
    private _tempo = 180;

    /**
     * tempo - BPM ~ beats (quarter note) per minute
     */
    get tempo() {
        return this._tempo;
    }

    set tempo(value: number) {
        this._tempo = value;
        this.timeStep = calculateTimeStep(value);
    }

    constructor(audioContext: AudioContext, tracks: SoundTrack[]) {
        this.audioContext = audioContext;
        this.tracks = tracks;
    }

    start() {
        this.active = true;
        this.startTime = this.audioContext.currentTime + 0.005;
        this.nextSoundStartTime = 0;
        this.currentPosition = 0;

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
        this.currentPosition++;
        this.nextSoundStartTime += this.timeStep;

        const absoluteLastPosition = this.tracks.reduce((lastPosition, track) => (
            Math.max(lastPosition, track.lastPosition || 0)
        ), 0);
        const lastStep = this.currentPosition > absoluteLastPosition;

        if (lastStep) {
            if (this.loop) {
                this.currentPosition = 0;
            } else {
                this.stop();
            }
        }
    }

    private playAtTime(startTime: number) {
        this.tracks.forEach(({ sounds }) => {
            const sound = sounds.get(this.currentPosition);

            if (!sound) {
                return;
            }

            const absoluteSoundLength = this.timeStep * 16 * sound.length;
            const stopTime = startTime + absoluteSoundLength + sound.envelopes.amp.release;

            sound.play(startTime);
            sound.stop(stopTime);
        });
    }
}
