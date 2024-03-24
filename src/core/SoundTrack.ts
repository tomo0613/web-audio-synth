import type { Sound } from "./Sound";

let i = 0;

export class SoundTrack {
    id = `SoundTrack_${i++}`;

    sounds: Map<number, Sound>;

    lastPosition: number | undefined;

    constructor(sounds: [number, Sound][]) {
        this.sounds = new Map(sounds);

        this.updateLastPosition();
    }

    add(sound: Sound, position: number) {
        this.sounds.set(position, sound);

        this.updateLastPosition();
    }

    remove(position: number) {
        this.sounds.delete(position);

        this.updateLastPosition();
    }

    private updateLastPosition() {
        const positions = Array.from(this.sounds.keys()).sort();

        this.lastPosition = positions[positions.length - 1];
    }
}
