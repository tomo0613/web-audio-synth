import { useCallback, useEffect, useMemo, useState } from "react";

import { context } from "@core/context";
import { Sound } from "@core/Sound";
import { SoundTrack } from "@core/SoundTrack";
import { useKeyPressListener } from "@ui/context/useKeyPressListener";
import changeListener from "./changeListener";
import { setSoundProperties } from "./soundPresets";
import { defaultContextValue, UiContext } from "./UiContext";
import { useProgress } from "./useProgress";

type DataFormat = Record<string, Partial<Sound>>[];

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

    function importTracks(jsonString: string) {
        setSelectedSound(null);

        try {
            const jsonObject: DataFormat = JSON.parse(jsonString);

            console.log(jsonObject);

            const tracks: SoundTrack[] = [];

            jsonObject.forEach((trackData) => {
                const track = new SoundTrack();

                Object.entries(trackData).forEach(([key, soundData]) => {
                    const sound = new Sound();

                    setSoundProperties(sound, "selected", soundData);

                    track.add(sound, Number(key));
                });

                tracks.push(track);
            });

            context.scheduler.tracks = tracks;
        } catch (error) {
            console.error(error);
        }

        changeListener.dispatch("change");
    }

    function exportTracks() {
        const result = context.scheduler.tracks.reduce<DataFormat>((res, track) => {
            if (track.sounds.size) {
                const sounds = Array.from(track.sounds).reduce((t, [position, sound]) => {
                    t[position] = sound;

                    return t;
                }, {});

                res.push(sounds);
            }

            return res;
        }, []);

        return JSON.stringify(result, undefined, 4);
    }

    const deleteSelectedSound = useCallback(() => {
        if (!selectedSound) {
            return;
        }

        let position: number | undefined = undefined;

        const selectedTrack = context.scheduler.tracks.find((track) => {
            position = getMapKeyByValue(track.sounds, selectedSound);

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
    return context.scheduler.tracks.reduce((n, track) => Math.max(n, track.endPosition || 0), 0);
}

type KeyOfMap<M extends Map<unknown, unknown>> = M extends Map<infer K, unknown> ? K : never;
type ValueOfMap<M extends Map<unknown, unknown>> = M extends Map<unknown, infer V> ? V : never;

function getMapKeyByValue<M extends Map<any, unknown>>(map: M, item: ValueOfMap<M>): KeyOfMap<M> | undefined {
    for (let [key, value] of map.entries()) {
        if (value === item) {
            return key;
        }
    }
}
