import type { Sound } from "./Sound";

let i = 0;

export class SoundTrack {
    id = `SoundTrack_${i++}`;

    sounds: Map<number, Sound>;

    positions: number[] = [];

    constructor(sounds: [number, Sound][]) {
        this.sounds = new Map(sounds);

        this.updatePositions();
    }

    add(sound: Sound, position: number) {
        this.sounds.set(position, sound);

        this.updatePositions();
    }

    move(sound: Sound, currentPosition: number, nextPosition: number) {
        this.sounds.delete(currentPosition);
        this.sounds.set(nextPosition, sound);

        this.updatePositions();
    }

    remove(position: number) {
        this.sounds.delete(position);

        this.updatePositions();
    }

    private updatePositions() {
        this.positions = Array.from(this.sounds.keys()).sort();
    }
}
