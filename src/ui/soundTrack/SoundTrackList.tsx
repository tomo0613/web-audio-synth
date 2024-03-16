import { Box, Divider, LinearProgress, Stack, styled, SxProps } from "@mui/material";

import { context } from "@core/context";
import { useUiContext } from "../context/UiContext";
import { SoundTrack } from "./SoundTrack";
import { segmentWidth } from "./style";

const Segment = styled(Box)(({ theme }) => ({
    width: `${segmentWidth}px`,
    height: "100%",
    display: "inline-block",
    borderRight: `1px solid ${theme.palette.divider}`,
    "&:nth-of-type(even)": {
        backgroundColor: "rgba(0, 0, 0, 0.1)",
    },
    "&:nth-of-type(4n)": {
        borderRight: `1px solid ${theme.palette.primary.main}`,
    },
}));

const soundTrackBackPlateSx: SxProps = {
    position: "absolute",
    width: "100%",
    height: "100%",
};

const SoundTrackBackPlate = () => {
    const { trackSegmentCount } = useUiContext();

    return (
        <Box sx={soundTrackBackPlateSx}>
            {Array.from({ length: trackSegmentCount }).map((_, i) => <Segment key={`segment_${i}`} />)}
        </Box>
    );
};

const SoundtrackProgress = () => {
    // const p = context.scheduler.
    return (
        // <LinearProgress variant="determinate" value={progress} />
        <LinearProgress />
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
            <SoundTrackBackPlate />
            <Stack divider={<Divider />}>
                {context.tracks.map((track) => <SoundTrack key={track.id} track={track} />)}
            </Stack>
        </Box>
    );
};
