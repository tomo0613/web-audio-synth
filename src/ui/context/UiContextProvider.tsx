import { useCallback, useEffect, useMemo, useState } from "react";

import { context } from "@core/context";
import { Sound } from "@core/Sound";
import { useKeyPressListener } from "@ui/context/useKeyPressListener";
import changeListener from "./changeListener";
import { setSoundProperties } from "./soundPresets";
import { defaultContextValue, UiContext } from "./UiContext";
import { useProgress } from "./useProgress";

export const UiContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [selectedSound, setSelectedSound] = useState(defaultContextValue.selectedSound);
    const [selectedSegmentId, setSelectedSegmentId] = useState(defaultContextValue.selectedSegmentId);
    const [selectedSoundPreset, setSelectedSoundPreset] = useState(defaultContextValue.selectedSoundPreset);
    const [frequency, setFrequency] = useState(defaultContextValue.frequency);
    const [waveForm, setWaveForm] = useState(defaultContextValue.waveForm);
    const [trackSegmentCount, setTrackSegmentCount] = useState(getInitialSegmentCount());
    const progress = useProgress(defaultContextValue.progress);

    useEffect(() => {
        if (!selectedSound) {
            return;
        }

        setFrequency(selectedSound.frequency);
        setWaveForm(selectedSound.waveForm);
    }, [selectedSound]);

    function importTracks() {
        console.log("ToDo");
    }

    function exportTracks() {
        const result = context.scheduler.tracks.reduce<Partial<Sound>[]>((res, track) => {
            if (track.sounds.size) {
                const sounds = Array.from(track.sounds).reduce((t, [position, sound]) => {
                    t[position] = sound;

                    return t;
                }, {});

                res.push(sounds);
            }

            return res;
        }, []);

        console.info(JSON.stringify(result, undefined, 4));
    }

    const deleteSelectedSound = useCallback(() => {
        if (!selectedSound) {
            return;
        }

        let position: number | undefined = undefined;

        const selectedTrack = context.scheduler.tracks.find((track) => {
            position = getMapKeyByValue<number, Sound>(track.sounds, selectedSound);

            return position !== undefined;
        });

        if (!selectedTrack || position === undefined) {
            return;
        }

        selectedTrack.remove(position);

        setSelectedSound(null);

        changeListener.dispatch("change");
    }, [selectedSound]);

    function createSound() {
        const [rowIndex, columnIndex] = selectedSegmentId.split("/").map(Number);
        const selectedTrack = context.scheduler.tracks[rowIndex];

        if (selectedTrack.sounds.has(columnIndex)) {
            return;
        }

        const sound = new Sound();

        setSoundProperties(sound, selectedSoundPreset, selectedSound);

        selectedTrack.add(sound, columnIndex);

        changeListener.dispatch("change");
    }

    const keyListeners = useMemo(() => ({
        "Space": () => {
            context.scheduler.toggle();
        },
        "NumpadAdd": createSound,
        "Delete": deleteSelectedSound,
    }), [deleteSelectedSound, createSound]);

    useKeyPressListener(keyListeners);

    const contextValue = {
        selectedSound,
        setSelectedSound,
        deleteSelectedSound,
        selectedSegmentId,
        setSelectedSegmentId,
        selectedSoundPreset,
        setSelectedSoundPreset,
        createSound,
        importTracks,
        exportTracks,
        frequency,
        setFrequency,
        waveForm,
        setWaveForm,
        trackSegmentCount,
        setTrackSegmentCount,
        progress,
    };

    return (
        <UiContext.Provider value={contextValue}>
            {children}
        </UiContext.Provider>
    );
};

function getInitialSegmentCount() {
    return context.scheduler.tracks.reduce((n, track) => Math.max(n, track.lastPosition || 0), 0);
}

function getMapKeyByValue<K, V, M extends Map<K, V> = Map<K, V>>(map: M, item: V): K | undefined {
    for (let [key, value] of map.entries()) {
        if (value === item) {
            return key;
        }
    }
}
