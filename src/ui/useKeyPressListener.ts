import { useEffect } from "react";

import { context } from "@core/context";

function onKeyUp(e: KeyboardEvent) {
    if (e.code === "Space") {
        context.scheduler.toggle();
    }
}

export function useKeyPressListener() {
    useEffect(() => {
        window.addEventListener("keyup", onKeyUp);

        return () => {
            window.removeEventListener("keyup", onKeyUp);
        };
    }, []);
}
