import { DragIndicator } from "@mui/icons-material";
import { Box, BoxProps, styled, type SxProps } from "@mui/material";
import { useDrag } from "react-dnd";

import { context } from "@core/context";
import type { Sound as ISound } from "@core/Sound";
import changeListener from "@ui/context/changeListener";
import { useUiContext } from "@ui/context/UiContext";
import { segmentWidth, trackHeight } from "./style";

interface StyledSoundProps extends BoxProps {
    selected?: boolean;
    dragging?: boolean;
}

const StyledSound = styled(Box, {
    shouldForwardProp(prop) {
        return prop !== "selected" && prop !== "dragging";
    },
})<StyledSoundProps>(({ theme, selected, dragging }) => ({
    cursor: "pointer",
    position: "absolute",
    top: 4,
    height: `${trackHeight - 8}px`,
    border: `1px solid ${theme.palette.common.white}`,
    borderRadius: theme.shape.borderRadius,
    boxSizing: "border-box",
    ...(selected && {
        border: `1px solid ${theme.palette.primary.main}`,
    }),
    ...(dragging && {
        opacity: 0.5,
    }),
}));

interface SoundProps {
    sound: ISound;
    rowIndex: number;
    columnIndex: number;
}

const dragHandleSx: SxProps = {
    width: segmentWidth / 2,
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    cursor: "move",
    "& .MuiSvgIcon-root": {
        width: "inherit",
        height: "inherit",
    },
};

export const Sound: React.FC<SoundProps> = ({ sound, rowIndex, columnIndex }) => {
    const { selectedSound, setSelectedSound } = useUiContext();
    const selected = selectedSound === sound;
    const offset = segmentWidth * columnIndex;
    const width = segmentWidth * 16 * sound.length;

    const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
        type: "BOX",
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        end(item, monitor) {
            const dropResult = monitor.getDropResult<{ rowIndex: number; columnIndex: number } | null>();

            if (dropResult) {
                context.tracks[rowIndex].remove(columnIndex);
                context.tracks[dropResult.rowIndex].add(sound, dropResult.columnIndex);

                changeListener.dispatch("change");
            }
        },
    }), [rowIndex, columnIndex]);

    function handleClick() {
        setSelectedSound(sound);
    }

    return (
        <StyledSound
            onClick={handleClick}
            selected={selected}
            left={offset}
            width={width}
            dragging={isDragging}
            ref={dragPreview}
        >
            {/* {sound.id} */}
            <Box sx={dragHandleSx} role="Handle" ref={drag}>
                <DragIndicator />
            </Box>
        </StyledSound>
    );
};
