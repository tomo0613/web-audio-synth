import { Box, BoxProps, styled } from "@mui/material";

import type { Sound as ISound } from "@core/Sound";
import { useUiContext } from "./context/UiContext";

interface StyledSoundProps extends BoxProps {
    selected?: boolean;
}

const StyledSound = styled(Box, {
    shouldForwardProp(prop) {
        return prop !== "selected";
    },
})<StyledSoundProps>(({ selected }) => ({
    p: 1,
    border: "1px solid grey",
    ...(selected && {
        border: "1px solid red",
    }),
}));

interface SoundProps {
    sound: ISound;
}

export const Sound: React.FC<SoundProps> = ({ sound }) => {
    const uiContext = useUiContext();
    const selected = uiContext.selectedSound === sound;

    function handleClick() {
        uiContext.setSelectedSound(sound);
    }

    return (
        <StyledSound onClick={handleClick} selected={selected}>
            {sound.id}
        </StyledSound>
    );
};
