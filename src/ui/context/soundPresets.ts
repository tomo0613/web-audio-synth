import type { Sound } from "@core/Sound";

export const soundPresets = {
    "kick_0": {
        frequency: 130.81,
        length: 1 / 8,
        envelopes: {
            amp: {
                attack: 0.03,
                release: 0.22,
            },
            pitch: {
                initial: 110,
                end: -110,
                time: 0.12,
            },
        },
    },
    "kick_1": {
        frequency: 40,
        length: 1 / 8,
        envelopes: {
            amp: {
                attack: 0.001,
                release: 0.45,
            },
            pitch: {
                initial: 80,
                time: 0.144,
            },
            reverb: {
                time: 1,
                decay: 1,
            },
        },
    },
    "snare_0": {
        frequency: 155.56,
        length: 1 / 16,
        noise: 0.145,
        envelopes: {
            amp: {
                decay: 0.025,
                sustain: 0.217,
                release: 0.16,
            },
            pitch: {
                initial: 110,
                end: -110,
                time: 0.65,
            },
        },
    },
    "snare_1": {
        frequency: 40,
        length: 1 / 8,
        noise: 0.1,
        envelopes: {
            amp: {
                attack: 0.005,
                decay: 0.055,
                sustain: 0,
            },
            pitch: {
                initial: 110,
                end: 0,
                time: 0.192,
            },
            reverb: {
                time: 0.45,
                decay: 0.74,
            },
        },
    },
    "hi-hat_0": {
        frequency: 0,
        length: 1 / 8,
        noise: 1,
        envelopes: {
            amp: {
                decay: 0.06,
                sustain: 0,
            },
            filter: {
                type: "highpass",
                frequency: 9000,
            },
        },
        effects: {
            reverb: {
                time: 0.3,
                decay: 0.3,
                reverse: true,
            },
        },
    },
    "hi-hat_1": {
        frequency: 0,
        length: 1 / 8,
        noise: 1,
        envelopes: {
            amp: {
                attack: 0.001,
                decay: 0.05,
                sustain: 0,
                release: 0.2,
            },
            filter: {
                type: "highpass",
                frequency: 5000,
            },
        },
    },
    "pad_0": {
        waveForm: "sawtooth",
        frequency: 293.66,
        length: 1,
        noise: 0.06,
        envelopes: {
            amp: {
                attack: 0.07,
                decay: 0.07,
                sustain: 0.77,
                release: 0.2,
            },
            filter: {
                type: "lowpass",
                frequency: 2000,
                q: 7.5,
                detune: 655,
                _24dB: true,
            },
        },
        effects: {
            reverb: {
                time: 3,
                decay: 1,
            },
            unison: {
                voices: 3,
                detune: 0.8,
                mode: "exponential",
            },
            distortion: {
                amount: 50,
            },
        },
    },
};

const propertyKeyMap = [
    "length",
    "frequency",
    "waveForm",
    "noise",

    "envelopes.amp.attack",
    "envelopes.amp.decay",
    "envelopes.amp.sustain",
    "envelopes.amp.release",

    "envelopes.pitch.initial",
    "envelopes.pitch.end",
    "envelopes.pitch.time",

    "envelopes.filter.type",
    "envelopes.filter.frequency",
    "envelopes.filter.q",
    "envelopes.filter.detune",
    "envelopes.filter._24dB",

    "effects.reverb.time",
    "effects.reverb.decay",
    "effects.reverb.reverse",

    "effects.delay.time",
    "effects.delay.feedback",

    "effects.unison.voices",
    "effects.unison.detune",
    "effects.unison.blend",
    "effects.unison.mode",

    "effects.distortion.amount",
    "effects.distortion.overSample",
];

function findProperty<O extends object>(source: O, propertyKey: string) {
    const [key, ...rest] = propertyKey.split(".");

    if (!rest.length || !source[key]) {
        return source[key];
    }

    return findProperty(source[key], rest.join("."));
}

function assignProperty<O extends object>(target: O, propertyKey: string, value: unknown) {
    const [key, ...rest] = propertyKey.split(".");

    if (!rest.length) {
        target[key] = value;

        return;
    }

    assignProperty(target[key], rest.join("."), value);
}

function setSoundPropertiesBy(target: Sound, source: Partial<Sound>) {
    propertyKeyMap.forEach((propertyKey) => {
        const sourceProperty = findProperty(source, propertyKey);

        if (sourceProperty !== undefined) {
            assignProperty(target, propertyKey, sourceProperty);
        }
    });
}

export function setSoundProperties(sound: Sound, selectedSoundPreset: string, selectedSound: Partial<Sound> | null) {
    if (selectedSoundPreset === "selected" && selectedSound) {
        setSoundPropertiesBy(sound, selectedSound);

        return;
    }

    if (selectedSoundPreset !== "default") {
        setSoundPropertiesBy(sound, soundPresets[selectedSoundPreset]);
    }
}
