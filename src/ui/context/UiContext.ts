import { createContext, useContext } from "react";

import { noop } from "@common/common";
import type { Sound } from "@core/Sound";
import { Action, ampEnvelopeDefaultState } from "./useAmpEnvelopeState";

export const defaultContextValue = {
    selectedSound: null as Sound | null,
    setSelectedSound: noop as React.Dispatch<React.SetStateAction<Sound>>,
    frequency: 440,
    setFrequency: noop as React.Dispatch<React.SetStateAction<number>>,
    waveForm: "sine" as OscillatorType,
    setWaveForm: noop as React.Dispatch<React.SetStateAction<OscillatorType>>,
    ampEnvelopeState: ampEnvelopeDefaultState,
    ampEnvelopeDispatch: noop as React.Dispatch<Action>,
    trackSegmentCount: 0,
    setTrackSegmentCount: noop as React.Dispatch<React.SetStateAction<number>>,
    progress: 0,
};

export const UiContext = createContext(defaultContextValue);

export const useUiContext = () => useContext(UiContext);
