import { Divider, LinearProgress, Stack } from "@mui/material";
import type { SxProps } from "@mui/material";
import { useEffect, useReducer } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { context } from "@core/context";
import changeListener from "@ui/context/changeListener";
import { useUiContext } from "../context/UiContext";
import { SoundTrack } from "./SoundTrack";

const progressBarSx: SxProps = {
    "& .MuiLinearProgress-bar": {
        transition: "none",
    },
};

const SoundtrackProgress = () => {
    const { progress } = useUiContext();

    return <LinearProgress sx={progressBarSx} variant="determinate" value={progress} />;
};

const soundTrackListSx: SxProps = {
    "& .MuiDivider-root": {
        borderColor: "rgba(0, 0, 0, 0.5)",
    },
};

export const SoundTrackList = () => {
    const [, forceUpdate] = useReducer((changes: number) => changes + 1, 0);

    function handleUiChange() {
        forceUpdate();
    }

    useEffect(() => {
        changeListener.add("change", handleUiChange);

        return () => {
            changeListener.remove("change", handleUiChange);
        };
    }, []);

    return (
        <DndProvider backend={HTML5Backend}>
            <Stack divider={<Divider />} sx={soundTrackListSx}>
                <SoundtrackProgress />
                {context.tracks.map((track, i) => <SoundTrack key={track.id} track={track} index={i} />)}
            </Stack>
        </DndProvider>
    );
};
