import { createContext, useContext } from "react";

import { noop } from "@common/common";
import type { Sound } from "@core/Sound";
import { Action as SetAmpEnvelopeStateAction, ampEnvelopeDefaultState } from "./useAmpEnvelopeState";
import { Action as SetPitchEnvelopeStateAction, pitchEnvelopeDefaultState } from "./usePitchEnvelopeState";

export const defaultContextValue = {
    selectedSound: null as Sound | null,
    setSelectedSound: noop as React.Dispatch<React.SetStateAction<Sound | null>>,
    deleteSelectedSound: noop,
    selectedSegmentId: "",
    setSelectedSegmentId: noop as React.Dispatch<React.SetStateAction<string>>,
    selectedSoundPreset: "default",
    setSelectedSoundPreset: noop as React.Dispatch<React.SetStateAction<string>>,
    createSound: noop,
    importTracks: noop,
    exportTracks: noop,
    frequency: 440,
    setFrequency: noop as React.Dispatch<React.SetStateAction<number>>,
    waveForm: "sine" as OscillatorType,
    setWaveForm: noop as React.Dispatch<React.SetStateAction<OscillatorType>>,
    ampEnvelopeState: ampEnvelopeDefaultState,
    ampEnvelopeDispatch: noop as React.Dispatch<SetAmpEnvelopeStateAction>,
    pitchEnvelopeState: pitchEnvelopeDefaultState,
    pitchEnvelopeDispatch: noop as React.Dispatch<SetPitchEnvelopeStateAction>,
    trackSegmentCount: 0,
    setTrackSegmentCount: noop as React.Dispatch<React.SetStateAction<number>>,
    progress: 0,
};

export const UiContext = createContext(defaultContextValue);

export const useUiContext = () => useContext(UiContext);
