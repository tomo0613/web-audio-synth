import { useReducer } from "react";

import type { PitchEnvelope } from "@core/SoundEnvelope";

export enum ActionType {
    initializeForm = "initializeForm",
    setForm = "setForm",
}

export const pitchEnvelopeDefaultState = {
    initial: 0,
    end: 0,
    time: 0,
};

type State = typeof pitchEnvelopeDefaultState;

interface InitializeStateAction {
    type: ActionType.initializeForm;
    payload?: PitchEnvelope;
}

interface SetStateAction {
    type: ActionType.setForm;
    payload: Partial<State>;
}

export type Action =
    | InitializeStateAction
    | SetStateAction;

export function usePitchEnvelopeState(): [State, React.Dispatch<Action>] {
    return useReducer((state: State, action: Action) => {
        switch (action.type) {
            case ActionType.initializeForm:
                return {
                    initial: action.payload.initial,
                    end: action.payload.end,
                    time: action.payload.time,
                };
            case ActionType.setForm:
                return {
                    ...state,
                    ...action.payload,
                };
            default:
                throw new Error();
        }
    }, pitchEnvelopeDefaultState);
}
