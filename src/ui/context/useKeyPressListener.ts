import { useCallback, useEffect } from "react";

type KeyListeners = Record<string, () => void>;

const inputNodes = ["BUTTON", "INPUT", "LI"];

export function useKeyPressListener(keyListeners: KeyListeners) {
    const onKeyUp = useCallback((e: KeyboardEvent) => {
        if (e.target instanceof Element && inputNodes.includes(e.target.nodeName)) {
            return;
        }

        const callback = keyListeners[e.code];

        if (callback) {
            callback();
        }
    }, [keyListeners]);

    useEffect(() => {
        window.addEventListener("keyup", onKeyUp);

        return () => {
            window.removeEventListener("keyup", onKeyUp);
        };
    }, [onKeyUp]);
}
