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
        // + 7 = 7,
        // [8, 1/2]
        // + 7 = 15,
        // [16, 1/4]
        // + 3 = 19,
        // [20, 1/8]
        // + 1 = 21
        [22, new Sound({ frequency: frequencies.G4, length: 1 / 16 })],
        [23, new Sound({ frequency: frequencies.A4, length: 1 / 16 })],
        [24, new Sound({ frequency: frequencies.B4, length: 1 / 4 })],
        // + 3 = 27
        [28, new Sound({ frequency: frequencies.G4, length: 1 / 4 })],
        // + 3 = 31
        [32, new Sound({ frequency: frequencies.D4, length: 1 / 2 })],
        // + 7 = 39
        // [40, 1/4]
        // + 3 = 43,
        [44, new Sound({ frequency: frequencies.A3, length: 1 / 4 })],
        // + 3 = 47
        // [48, 1/2]
        // + 7 = 55,
        // [56, 1/4]
        // + 3 = 59,
        [60, new Sound({ frequency: frequencies.D4, length: 1 / 4 })],
    ]),
    new SoundTrack([
        [0, new Sound({ frequency: frequencies.C4, length: 1 / 2 })],
        //
        [32, new Sound({ frequency: frequencies.B3, length: 1 / 2 })],
        [44, new Sound({ frequency: frequencies.C4, length: 1 / 4 })],
    ]),
    new SoundTrack([
        [0, new Sound({ frequency: frequencies.E4, length: 1 / 2 })],
        //
        [32, new Sound({ frequency: frequencies.G3, length: 1 / 2 })],
        [44, new Sound({ frequency: frequencies.E4, length: 1 / 4 })],
    ]),
];
