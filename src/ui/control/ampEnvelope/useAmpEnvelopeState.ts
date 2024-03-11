import { useReducer } from "react";
import type { AmpEnvelope } from "@core/SoundEnvelope";

export enum ActionType {
    initializeForm = "initializeForm",
    setForm = "setForm",
}

export const defaultState = {
    attack: 0,
    decay: 0,
    sustain: 0,
    release: 0,
};

type State = typeof defaultState;

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
                    attack: action.payload.attack,
                    decay: action.payload.decay,
                    sustain: action.payload.sustain,
                    release: action.payload.release,
                };
            case ActionType.setForm:
                return {
                    ...state,
                    ...action.payload,
                };
            default:
                throw new Error();
        }
    }, defaultState);
}
