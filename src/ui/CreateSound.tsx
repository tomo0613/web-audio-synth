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
    const { selectedSound, setSelectedSound, selectedSegmentId } = useUiContext();
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
        if (!selectedSound) {
            return;
        }

        let position: number | undefined = undefined;

        const selectedTrack = context.tracks.find((track) => {
            position = getMapKeyByValue<number, Sound>(track.sounds, selectedSound);

            return position !== undefined;
        });

        if (!selectedTrack || !position) {
            return;
        }

        selectedTrack.remove(position);

        setSelectedSound(null);

        changeListener.dispatch("change");
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

function getMapKeyByValue<K, V, M extends Map<K, V> = Map<K, V>>(map: M, item: V): K | undefined {
    for (let [key, value] of map.entries()) {
        if (value === item) {
            return key;
        }
    }
}