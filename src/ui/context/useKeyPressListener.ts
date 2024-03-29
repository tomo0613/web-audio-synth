import { useEffect } from "react";

import { context } from "@core/context";
import type { Sound } from "@core/Sound";

function onKeyUp(e: KeyboardEvent) {
    if (e.code === "Space") {
        context.scheduler.toggle();
    }

    if (e.code === "Delete") {
        // context.scheduler.toggle();
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
