import { Box } from "@mui/material";

import type { Sound as ISound } from "@core/Sound";

const sx = {
    p: 1,
    border: "1px solid grey",
}

interface SoundProps {
    sound: ISound;
}

export const Sound: React.FC<SoundProps> = ({ sound }) => {
    return (
        <Box sx={sx}>
            {sound.id}
        </Box>
    );
};
