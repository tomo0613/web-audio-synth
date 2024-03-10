import { SoundTrack } from "./SoundTrack";
import { Sound } from "./Sound";

const frequencies = {
    C3: 130.81,     C4: 261.63,
    Db3: 138.59,    Db4: 277.18,
    D3: 146.83,     D4: 293.66,
    Eb3: 155.56,    Eb4: 311.13,
    E3: 164.81,     E4: 329.63,
    F3: 174.61,     F4: 349.23,
    Gb3: 185,       Gb4: 369.99,
    G3: 196,        G4: 392,
    Ab3: 207.65,    Ab4: 415.30,
    A3: 220,        A4: 440,
    Bb3: 233.08,    Bb4: 466.16,
    B3: 246.94,     B4: 493.88
};

export const testTrack = new SoundTrack([
    new Sound({ frequency: frequencies.G3 }),
    new Sound({ frequency: frequencies.G3 }),
    new Sound({ frequency: frequencies.G3 }),
    new Sound({ frequency: frequencies.Eb3, length: 3/4 }),
    new Sound({ frequency: frequencies.Bb3, length: 1/4 }),
]);
