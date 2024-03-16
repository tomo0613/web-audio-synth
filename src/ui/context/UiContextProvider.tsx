import { useEffect, useState } from "react";

import { context } from "@core/context";
import type { Sound } from "@core/Sound";
import { UiContext } from "./UiContext";
import { ActionType, useAmpEnvelopeState } from "./useAmpEnvelopeState";

export const UiContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [selectedSound, setSelectedSound] = useState<Sound>(null);
    const [frequency, setFrequency] = useState(440);
    const [waveForm, setWaveForm] = useState<OscillatorType>("sine");
    const [ampEnvelopeState, ampEnvelopeDispatch] = useAmpEnvelopeState();

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
    };

    return (
        <UiContext.Provider value={contextValue}>
            {children}
        </UiContext.Provider>
    );
};
