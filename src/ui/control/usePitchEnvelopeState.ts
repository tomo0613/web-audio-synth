import { useReducer } from "react";

import type { PitchEnvelope } from "@core/envelope/PitchEnvelope";

export enum ActionType {
    initializeForm = "initializeForm",
    setForm = "setForm",
}

const defaultState = {
    initial: 0,
    end: 0,
    time: 0,
};

type State = typeof defaultState;

interface InitializeStateAction {
    type: ActionType.initializeForm;
    payload?: PitchEnvelope;
}

interface SetStateAction {
    type: ActionType.setForm;
    payload: Partial<State>;
}

type Action =
    | InitializeStateAction
    | SetStateAction;

export function usePitchEnvelopeState(): [State, React.Dispatch<Action>] {
    return useReducer((state: State, action: Action) => {
        switch (action.type) {
            case ActionType.initializeForm:
                return {
                    initial: action.payload?.initial || defaultState.initial,
                    end: action.payload?.end || defaultState.end,
                    time: action.payload?.time || defaultState.time,
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
