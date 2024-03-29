import { useReducer } from "react";

import type { AmpEnvelope } from "@core/envelope/AmpEnvelope";

export enum ActionType {
    initializeForm = "initializeForm",
    setForm = "setForm",
}

export const ampEnvelopeDefaultState = {
    attack: 0,
    decay: 0,
    sustain: 0,
    release: 0,
};

type State = typeof ampEnvelopeDefaultState;

interface InitializeStateAction {
    type: ActionType.initializeForm;
    payload?: AmpEnvelope;
}

interface SetStateAction {
    type: ActionType.setForm;
    payload: Partial<State>;
}

export type Action =
    | InitializeStateAction
    | SetStateAction;

export function useAmpEnvelopeState(): [State, React.Dispatch<Action>] {
    return useReducer((state: State, action: Action) => {
        switch (action.type) {
            case ActionType.initializeForm:
                return {
                    attack: action.payload?.attack || ampEnvelopeDefaultState.attack,
                    decay: action.payload?.decay || ampEnvelopeDefaultState.decay,
                    sustain: action.payload?.sustain || ampEnvelopeDefaultState.sustain,
                    release: action.payload?.release || ampEnvelopeDefaultState.release,
                };
            case ActionType.setForm:
                return {
                    ...state,
                    ...action.payload,
                };
            default:
                throw new Error();
        }
    }, ampEnvelopeDefaultState);
}
