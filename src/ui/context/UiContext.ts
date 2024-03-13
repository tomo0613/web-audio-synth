import { createContext, useContext } from "react";

import { noop } from "@common/common";
import { ampEnvelopeDefaultState, Action } from "./useAmpEnvelopeState";
import type { Sound } from "@core/Sound";

export const defaultContextValue = {
    selectedSound: null as Sound | null,
    setSelectedSound: noop as React.Dispatch<React.SetStateAction<Sound>>,
    frequency: 440, 
    setFrequency: noop as React.Dispatch<React.SetStateAction<number>>,
    ampEnvelopeState: ampEnvelopeDefaultState,
    ampEnvelopeDispatch: noop as React.Dispatch<Action>,
};

export const UiContext = createContext(defaultContextValue);

export const useUiContext = () => useContext(UiContext);
