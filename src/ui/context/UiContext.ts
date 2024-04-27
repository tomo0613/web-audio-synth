import { createContext, useContext } from "react";

import { noop } from "@common/common";
import type { Sound } from "@core/Sound";

export const defaultContextValue = {
    selectedSound: null as Sound | null,
    setSelectedSound: noop as React.Dispatch<React.SetStateAction<Sound | null>>,
    deleteSelectedSound: noop,
    selectedSegmentId: "",
    setSelectedSegmentId: noop as React.Dispatch<React.SetStateAction<string>>,
    selectedSoundPreset: "default",
    setSelectedSoundPreset: noop as React.Dispatch<React.SetStateAction<string>>,
    createSound: noop,
    importTracks: noop as (data: string) => void,
    exportTracks: noop as () => string,
    frequency: 440,
    setFrequency: noop as React.Dispatch<React.SetStateAction<number>>,
    waveForm: "sine" as OscillatorType,
    setWaveForm: noop as React.Dispatch<React.SetStateAction<OscillatorType>>,
    trackSegmentCount: 0,
    setTrackSegmentCount: noop as React.Dispatch<React.SetStateAction<number>>,
    progress: 0,
};

export const UiContext = createContext(defaultContextValue);

export const useUiContext = () => useContext(UiContext);
