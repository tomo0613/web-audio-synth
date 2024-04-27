import type { Sound } from "./Sound";

let i = 0;

export class SoundTrack {
    id = `SoundTrack_${i++}`;

    sounds: Map<number, Sound>;

    lastPosition: number | undefined;
    endPosition = 0;

    constructor(sounds: [number, Sound][]) {
        this.sounds = new Map(sounds);

        this.update();
    }

    add(sound: Sound, position: number) {
        this.sounds.set(position, sound);

        this.update();
    }

    remove(position: number) {
        this.sounds.delete(position);

        this.update();
    }

    private update() {
        const positions = Array.from(this.sounds.keys()).sort((a, b) => a - b);

        const lastPosition = positions[positions.length - 1];

        this.lastPosition = lastPosition;
        this.endPosition = lastPosition !== undefined
            ? lastPosition + this.sounds.get(lastPosition)!.length * 16
            : 0;
    }
}
