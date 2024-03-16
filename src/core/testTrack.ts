import { Sound } from "./Sound";
import { SoundTrack } from "./SoundTrack";

const frequencies = {
    C3: 130.81,
    Db3: 138.59,
    D3: 146.83,
    Eb3: 155.56,
    E3: 164.81,
    F3: 174.61,
    Gb3: 185,
    G3: 196,
    Ab3: 207.65,
    A3: 220,
    Bb3: 233.08,
    B3: 246.94,
    //
    C4: 261.63,
    Db4: 277.18,
    D4: 293.66,
    Eb4: 311.13,
    E4: 329.63,
    F4: 349.23,
    Gb4: 369.99,
    G4: 392,
    Ab4: 415.30,
    A4: 440,
    Bb4: 466.16,
    B4: 493.88,
};

export const testTrack = [
    new SoundTrack([
        [0, new Sound({ frequency: frequencies.A3, length: 1 / 2 })],
        //
        [2, new Sound({ frequency: frequencies.G4, length: 1 / 16 })],
        [3, new Sound({ frequency: frequencies.A4, length: 1 / 16 })],
        [4, new Sound({ frequency: frequencies.B4, length: 1 / 4 })],
        [5, new Sound({ frequency: frequencies.G4, length: 1 / 4 })],
        [6, new Sound({ frequency: frequencies.D4, length: 1 / 2 })],
        [7, new Sound({ frequency: frequencies.A3, length: 1 / 4 })],
        //
        [9, new Sound({ frequency: frequencies.D4, length: 1 / 4 })],
    ]),
    new SoundTrack([
        [0, new Sound({ frequency: frequencies.C4, length: 1 / 2 })],
        //
        [6, new Sound({ frequency: frequencies.B3, length: 1 / 2 })],
        [7, new Sound({ frequency: frequencies.C4, length: 1 / 4 })],
    ]),
    new SoundTrack([
        [0, new Sound({ frequency: frequencies.E4, length: 1 / 2 })],
        //
        [6, new Sound({ frequency: frequencies.G3, length: 1 / 2 })],
        [7, new Sound({ frequency: frequencies.E4, length: 1 / 4 })],
    ]),
];
