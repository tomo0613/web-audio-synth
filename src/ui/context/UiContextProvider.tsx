import { useEffect, useState } from "react";

import { context } from "@core/context";
import { UiContext } from "./UiContext";
import { ActionType, useAmpEnvelopeState,  } from "./useAmpEnvelopeState";
import type { Sound } from "@core/Sound";

export const UiContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [selectedSound, setSelectedSound] = useState<Sound>(null);
    const [frequency, setFrequency] = useState(440);
    const [ampEnvelopeState, ampEnvelopeDispatch] = useAmpEnvelopeState();

    useEffect(() => {
        if (!selectedSound) {
            return;
        }

        setFrequency(selectedSound.frequency);
        ampEnvelopeDispatch({ type: ActionType.initializeForm, payload: selectedSound.envelopes.amp });
    }, [selectedSound]);

    const contextValue = {
        selectedSound,
        setSelectedSound,
        frequency,
        setFrequency,
        ampEnvelopeState,
        ampEnvelopeDispatch,
    };

    return (
        <UiContext.Provider value={contextValue}>
            {children}
        </UiContext.Provider>
    );
};
