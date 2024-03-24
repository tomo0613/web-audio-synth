import { Box, styled } from "@mui/material";
import type { BoxProps, SxProps } from "@mui/material";
import { useDrop } from "react-dnd";

import { context } from "@core/context";
import { useUiContext } from "../context/UiContext";
import { segmentWidth } from "./style";

interface StyledSegmentProps extends BoxProps {
    active?: boolean;
    dragOver?: boolean;
}

const StyledSegment = styled(Box, {
    shouldForwardProp(prop) {
        return prop !== "active" && prop !== "dragOver";
    },
})<StyledSegmentProps>(({ theme, active, dragOver }) => ({
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
    ...(dragOver && {
        backgroundColor: "rgba(255, 128, 128, 0.1)",
        "&:nth-of-type(even), &:nth-of-type(odd)": {
            backgroundColor: "rgba(255, 128, 128, 0.1)",
        },
    }),
}));

interface SegmentProps extends BoxProps {
    rowIndex: number;
    columnIndex: number;
}

const Segment: React.FC<SegmentProps> = ({ rowIndex, columnIndex }) => {
    const { progress } = useUiContext();
    const activeSegmentIndex = progress; // ToDo

    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: "BOX",
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
        canDrop() {
            // ToDo + length
            return !context.tracks[rowIndex].sounds.has(columnIndex);
        },
        drop() {
            return { rowIndex, columnIndex };
        },
    }));

    return <StyledSegment active={columnIndex === activeSegmentIndex} dragOver={canDrop && isOver} ref={drop} />;
};

const soundTrackBackPlateSx: SxProps = {
    position: "absolute",
    width: "100%",
    height: "100%",
};

interface SoundTrackBackPlateProps {
    rowIndex: number;
}

export const SoundTrackBackPlate: React.FC<SoundTrackBackPlateProps> = ({ rowIndex }) => {
    const { trackSegmentCount } = useUiContext();

    return (
        <Box sx={soundTrackBackPlateSx}>
            {Array.from({ length: trackSegmentCount }).map((_, i) => (
                <Segment key={`segment_${i}`} rowIndex={rowIndex} columnIndex={i} />
            ))}
        </Box>
    );
};
