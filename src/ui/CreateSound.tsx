import { context } from "@core/context";
import { Sound } from "@core/Sound";
import { Add, DeleteForever } from "@mui/icons-material";
import { Box, Divider, IconButton, MenuItem, TextField } from "@mui/material";

import changeListener from "@ui/context/changeListener";
import { useUiContext } from "@ui/context/UiContext";
import { useState } from "react";

const soundPresets = {
    "kick_0": {
        frequency: 130.81,
        length: 1 / 4,
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

    "effects.reverb.time",
    "effects.reverb.decay",
    "effects.reverb.reverse",

    "effects.delay.time",
    "effects.delay.feedback",
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

function setSoundProperties(sound: Sound, selectedSoundPreset: string, selectedSound: Sound | null) {
    if (selectedSoundPreset === "selected" && selectedSound) {
        setSoundPropertiesBy(sound, selectedSound);

        return;
    }

    if (selectedSoundPreset !== "default") {
        setSoundPropertiesBy(sound, soundPresets[selectedSoundPreset]);
    }
}

export const CreateSound = () => {
    const { selectedSound, deleteSelectedSound, selectedSegmentId } = useUiContext();
    const [selectedSoundPreset, setSelectedSoundPreset] = useState("default");

    function handleSelect(e: React.ChangeEvent<HTMLInputElement>) {
        setSelectedSoundPreset(e.target.value);
    }

    function handleAdd() {
        const [rowIndex, columnIndex] = selectedSegmentId.split("/").map(Number);
        const selectedTrack = context.tracks[rowIndex];

        if (selectedTrack.sounds.has(columnIndex)) {
            return;
        }

        const sound = new Sound();

        setSoundProperties(sound, selectedSoundPreset, selectedSound);

        selectedTrack.add(sound, columnIndex);

        changeListener.dispatch("change");
    }

    function handleDelete() {
        deleteSelectedSound();
    }

    return (
        <Box>
            <TextField
                select
                label="Preset"
                onChange={handleSelect}
                value={selectedSoundPreset}
            >
                <MenuItem value="default">
                    {"Default"}
                </MenuItem>
                <Divider />
                <MenuItem value="selected" disabled={!selectedSound}>
                    {"Selected"}
                </MenuItem>
                <Divider />
                {Object.keys(soundPresets).map((key) => (
                    <MenuItem key={key} value={key}>
                        {key}
                    </MenuItem>
                ))}
            </TextField>
            <IconButton onClick={handleAdd} disabled={!selectedSegmentId}>
                <Add />
            </IconButton>
            <IconButton onClick={handleDelete} disabled={!selectedSound}>
                <DeleteForever />
            </IconButton>
        </Box>
    );
};
