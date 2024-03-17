import { Box, Divider, LinearProgress, Stack } from "@mui/material";
import type { SxProps } from "@mui/material";

import { context } from "@core/context";
import { useUiContext } from "../context/UiContext";
import { SoundTrack } from "./SoundTrack";
import { SoundTrackListBackPlate } from "./SoundTrackListBackPlate";
import { segmentWidth } from "./style";

const SoundtrackProgress = () => {
    const { progress } = useUiContext();

    return (
        <LinearProgress variant="determinate" value={progress} />
        // <LinearProgress />
    );
};

const soundTrackListSx: SxProps = {
    position: "relative",
    "& .MuiDivider-root": {
        borderColor: "rgba(0, 0, 0, 0.5)",
    },
};

export const SoundTrackList = () => {
    const { trackSegmentCount } = useUiContext();
    const width = trackSegmentCount * segmentWidth;

    return (
        <Box sx={soundTrackListSx} width={width}>
            <SoundTrackListBackPlate />
            <Stack divider={<Divider />}>
                <SoundtrackProgress />
                {context.tracks.map((track) => <SoundTrack key={track.id} track={track} />)}
            </Stack>
        </Box>
    );
};
