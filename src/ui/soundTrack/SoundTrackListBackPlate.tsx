import { Box, styled } from "@mui/material";
import type { BoxProps, SxProps } from "@mui/material";

import { useUiContext } from "../context/UiContext";
import { segmentWidth } from "./style";

interface SegmentProps extends BoxProps {
    active?: boolean;
}

const Segment = styled(Box, {
    shouldForwardProp(prop) {
        return prop !== "active";
    },
})<SegmentProps>(({ theme, active }) => ({
    width: `${segmentWidth}px`,
    height: "100%",
    display: "inline-block",
    borderRight: `1px solid ${theme.palette.divider}`,
    "&:nth-of-type(8n + 1), &:nth-of-type(8n + 2), &:nth-of-type(8n + 3), &:nth-of-type(8n + 4)": {
        backgroundColor: "rgba(0, 64, 0, 0.1)",
    },
    ...(active && {
        border: `1px solid ${theme.palette.primary.dark}`,
    }),
}));

const soundTrackBackPlateSx: SxProps = {
    position: "absolute",
    width: "100%",
    height: "100%",
};

export const SoundTrackListBackPlate = () => {
    const { trackSegmentCount, progress } = useUiContext();
    const activeSegmentIndex = progress; // ToDo

    return (
        <Box sx={soundTrackBackPlateSx}>
            {Array.from({ length: trackSegmentCount }).map((_, i) => (
                <Segment key={`segment_${i}`} active={i === activeSegmentIndex} />
            ))}
        </Box>
    );
};
