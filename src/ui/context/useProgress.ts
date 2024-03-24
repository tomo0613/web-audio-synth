import { useEffect, useState } from "react";

import { context } from "@core/context";
import type { SoundTrack } from "@core/SoundTrack";

let timeoutId = 0;
let startTime = 0;

export function useProgress(defaultValue: number) {
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
        const endTime = startTime + context.tracks.reduce(aggregateEndTime, 0);
        const total = endTime - startTime;
        const current = context.instance.currentTime - startTime;

        setProgress(100 / total * current);

        timeoutId = setTimeout(() => {
            updateProgress();
        }, context.scheduler.timeStep / 4);
    }

    return progress;
}

function aggregateEndTime(n: number, track: SoundTrack) {
    if (track.lastPosition === undefined) {
        return n;
    }

    const lastSound = track.sounds.get(track.lastPosition)!;
    const lastSoundLength = lastSound.length + lastSound.envelopes.amp.release;
    const trackLength = track.lastPosition * context.scheduler.timeStep + lastSoundLength;

    return Math.max(n, trackLength);
}
