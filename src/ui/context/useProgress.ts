import { useEffect, useState } from "react";

import { context } from "@core/context";

let timeoutId = 0;
let startTime = 0;

export function useProgress(trackSegmentCount: number, defaultValue: number) {
    const [progress, setProgress] = useState(defaultValue);

    useEffect(() => {
        context.scheduler.listener.add("start", onStart);
        context.scheduler.listener.add("stop", onStop);
        // onTempoChange

        return () => {
            context.scheduler.listener.remove("start", onStart);
            context.scheduler.listener.remove("stop", onStop);
        };
    }, []);

    function onStart() {
        startTime = context.instance.currentTime;

        updateProgress();
    }

    function onStop() {
        setProgress(defaultValue);

        clearTimeout(timeoutId);
    }

    function updateProgress() {
        const total = trackSegmentCount * context.scheduler.timeStep;
        const current = context.instance.currentTime - startTime;

        setProgress(100 / total * current);

        // timeoutId = setTimeout(() => {
        //     updateProgress();
        // }, context.scheduler.timeStep / 4);
    }

    return progress;
}
