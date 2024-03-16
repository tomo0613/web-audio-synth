import { Box, BoxProps, styled } from "@mui/material";

import type { Sound as ISound } from "@core/Sound";
import { useUiContext } from "@ui/context/UiContext";
import { segmentWidth, trackHeight } from "./style";

interface StyledSoundProps extends BoxProps {
    selected?: boolean;
}

const StyledSound = styled(Box, {
    shouldForwardProp(prop) {
        return prop !== "selected";
    },
})<StyledSoundProps>(({ theme, selected }) => ({
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
}));

interface SoundProps {
    sound: ISound;
    position: number;
}

export const Sound: React.FC<SoundProps> = ({ sound, position }) => {
    const uiContext = useUiContext();
    const selected = uiContext.selectedSound === sound;
    const offset = segmentWidth * position;
    const width = segmentWidth * 16 * sound.length;

    function handleClick() {
        uiContext.setSelectedSound(sound);
    }

    return (
        <StyledSound onClick={handleClick} selected={selected} left={offset} width={width}>
            {/* {sound.id} */}
        </StyledSound>
    );
};
