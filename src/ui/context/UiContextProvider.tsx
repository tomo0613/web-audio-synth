import { useCallback, useEffect, useMemo, useState } from "react";

import { context } from "@core/context";
import type { Sound } from "@core/Sound";
import { useKeyPressListener } from "@ui/context/useKeyPressListener";
import changeListener from "./changeListener";
import { defaultContextValue, UiContext } from "./UiContext";
import { ActionType as SetAmpEnvelopeStateActionType, useAmpEnvelopeState } from "./useAmpEnvelopeState";
import { ActionType as SetPitchEnvelopeStateActionType, usePitchEnvelopeState } from "./usePitchEnvelopeState";
import { useProgress } from "./useProgress";

export const UiContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [selectedSound, setSelectedSound] = useState(defaultContextValue.selectedSound);
    const [selectedSegmentId, setSelectedSegmentId] = useState(defaultContextValue.selectedSegmentId);
    const [frequency, setFrequency] = useState(defaultContextValue.frequency);
    const [waveForm, setWaveForm] = useState(defaultContextValue.waveForm);
    const [ampEnvelopeState, ampEnvelopeDispatch] = useAmpEnvelopeState();
    const [pitchEnvelopeState, pitchEnvelopeDispatch] = usePitchEnvelopeState();
    const [trackSegmentCount, setTrackSegmentCount] = useState(getInitialSegmentCount());
    const progress = useProgress(defaultContextValue.progress);

    useEffect(() => {
        if (!selectedSound) {
            return;
        }

        setFrequency(selectedSound.frequency);
        setWaveForm(selectedSound.waveForm);
        ampEnvelopeDispatch({
            type: SetAmpEnvelopeStateActionType.initializeForm,
            payload: selectedSound.envelopes.amp,
        });
        pitchEnvelopeDispatch({
            type: SetPitchEnvelopeStateActionType.initializeForm,
            payload: selectedSound.envelopes.pitch,
        });
    }, [selectedSound]);

    const deleteSelectedSound = useCallback(() => {
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
    }, [selectedSound]);

    const keyListeners = useMemo(() => ({
        "Space": () => {
            context.scheduler.toggle();
        },
        "Delete": deleteSelectedSound,
    }), [deleteSelectedSound]);

    useKeyPressListener(keyListeners);

    const contextValue = {
        selectedSound,
        setSelectedSound,
        deleteSelectedSound,
        selectedSegmentId,
        setSelectedSegmentId,
        frequency,
        setFrequency,
        waveForm,
        setWaveForm,
        ampEnvelopeState,
        ampEnvelopeDispatch,
        pitchEnvelopeState,
        pitchEnvelopeDispatch,
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
    return context.tracks.reduce((n, track) => Math.max(n, track.lastPosition || 0), 0);
}

function getMapKeyByValue<K, V, M extends Map<K, V> = Map<K, V>>(map: M, item: V): K | undefined {
    for (let [key, value] of map.entries()) {
        if (value === item) {
            return key;
        }
    }
}
