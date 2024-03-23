import { useEffect, useState } from "react";

import { context } from "@core/context";
import type { Sound } from "@core/Sound";
import { defaultContextValue, UiContext } from "./UiContext";
import { ActionType, useAmpEnvelopeState } from "./useAmpEnvelopeState";
import { useProgress } from "./useProgress";

export const UiContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [selectedSound, setSelectedSound] = useState<Sound>(defaultContextValue.selectedSound);
    const [frequency, setFrequency] = useState(defaultContextValue.frequency);
    const [waveForm, setWaveForm] = useState(defaultContextValue.waveForm);
    const [ampEnvelopeState, ampEnvelopeDispatch] = useAmpEnvelopeState();
    const [trackSegmentCount, setTrackSegmentCount] = useState(getInitialSegmentCount());
    const progress = useProgress(defaultContextValue.progress);

    useEffect(() => {
        if (!selectedSound) {
            return;
        }

        setFrequency(selectedSound.frequency);
        setWaveForm(selectedSound.waveForm);
        ampEnvelopeDispatch({ type: ActionType.initializeForm, payload: selectedSound.envelopes.amp });
    }, [selectedSound]);

    const contextValue = {
        selectedSound,
        setSelectedSound,
        frequency,
        setFrequency,
        waveForm,
        setWaveForm,
        ampEnvelopeState,
        ampEnvelopeDispatch,
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
