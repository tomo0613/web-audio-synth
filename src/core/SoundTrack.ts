import type { Sound } from "./Sound";

export class SoundTrack {
    sounds: Set<Sound>;

    constructor(sounds: Sound[]) {
        this.sounds = new Set(sounds);
    }

    add(sound: Sound) {
        this.sounds.add(sound);
    }
    
    remove(sound: Sound) {
        this.sounds.delete(sound);
    }

    play(now: number) {
        let i = 0;

        this.sounds.forEach((sound) => {
            i++;

            sound.play(now + i * 1);
        });
    }

    stop() {
        this.sounds.forEach((sound) => {
            sound.stop();
        });
    }
}
