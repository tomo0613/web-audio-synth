import { useReducer } from "react";

import type { Compressor } from "@core/effect/Compressor";

export enum ActionType {
    initializeForm = "initializeForm",
    setForm = "setForm",
}

const defaultState = {
    disabled: true,
    threshold: -24,
    knee: 30,
    ratio: 12,
    attack: 0.003,
    release: 0.25,
};

type State = typeof defaultState;

interface InitializeStateAction {
    type: ActionType.initializeForm;
    payload?: Compressor;
}

interface SetStateAction {
    type: ActionType.setForm;
    payload: Partial<State>;
}

type Action =
    | InitializeStateAction
    | SetStateAction;

export function useCompressorState(): [State, React.Dispatch<Action>] {
    return useReducer((state: State, action: Action) => {
        switch (action.type) {
            case ActionType.initializeForm:
                return {
                    disabled: action.payload?.disabled ?? defaultState.disabled,
                    threshold: action.payload?.threshold ?? defaultState.threshold,
                    knee: action.payload?.knee ?? defaultState.knee,
                    ratio: action.payload?.ratio ?? defaultState.ratio,
                    attack: action.payload?.attack ?? defaultState.attack,
                    release: action.payload?.release ?? defaultState.release,
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
