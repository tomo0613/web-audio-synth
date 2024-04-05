import { useCallback, useEffect } from "react";

type KeyListeners = Record<string, () => void>;

export function useKeyPressListener(keyListeners: KeyListeners) {
    const onKeyUp = useCallback((e: KeyboardEvent) => {
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
