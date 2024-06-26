import EventListener from "@common/EventListener";
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
    listener = new EventListener<"start" | "stop">();
    private active = false;
    private audioContext: AudioContext;
    private _tracks: SoundTrack[] = [];
    private currentPosition = 0;
    private startTime = 0;
    private nextSoundStartTime = 0;
    private timeoutId = 0;
    private _tempo = 180;
    private _timeStep = calculateTimeStep(180);

    /**
     * tempo - BPM ~ beats (quarter note) per minute
     */
    get tempo() {
        return this._tempo;
    }

    set tempo(value: number) {
        this._tempo = value;
        this._timeStep = calculateTimeStep(value);
    }

    get timeStep() {
        return this._timeStep;
    }

    get tracks() {
        return this._tracks;
    }

    set tracks(value: SoundTrack[]) {
        this._tracks = value;
    }

    constructor(audioContext: AudioContext) {
        this.audioContext = audioContext;
    }

    start() {
        if (this.active) {
            return;
        }
        this.active = true;
        this.startTime = this.audioContext.currentTime + 0.005;
        this.nextSoundStartTime = 0;
        this.currentPosition = 0;

        this.schedule();

        this.listener.dispatch("start");
    }

    stop() {
        this.active = false;

        clearTimeout(this.timeoutId);

        this.listener.dispatch("stop");
    }

    toggle() {
        if (this.active) {
            this.stop();
        } else {
            this.start();
        }
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

        const endPosition = this._tracks.reduce((result, track) => Math.max(result, track.endPosition), 0);

        const lastStep = this.currentPosition >= endPosition;

        if (lastStep) {
            if (this.loop) {
                this.currentPosition = 0;
            } else {
                this.stop();
            }
        }
    }

    private playAtTime(startTime: number) {
        this._tracks.forEach(({ sounds }) => {
            const sound = sounds.get(this.currentPosition);

            if (!sound) {
                return;
            }

            const absoluteSoundLength = this.timeStep * 16 * sound.length;
            const stopTime = startTime + absoluteSoundLength + sound.envelopes.amp.release;

            sound.play(startTime, absoluteSoundLength);
            sound.stop(stopTime);
        });
    }
}
