import { Box, SxProps } from "@mui/material";

import type { SoundTrack as ISoundTrack } from "@core/SoundTrack";
import { Sound } from "./Sound";
import { trackHeight } from "./style";

const sx: SxProps = {
    py: 1,
    height: trackHeight,
    position: "relative",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
};

interface SoundTrackProps {
    track: ISoundTrack;
}

export const SoundTrack: React.FC<SoundTrackProps> = ({ track }) => {
    const sounds = Array.from(track.sounds);

    return (
        <Box sx={sx}>
            {sounds.map(([position, sound]) => <Sound key={sound.id} sound={sound} position={position} />)}
        </Box>
    );
};
