import { Box, type SxProps } from "@mui/material";

import type { SoundTrack as ISoundTrack } from "@core/SoundTrack";
import { Sound } from "./Sound";
import { SoundTrackBackPlate } from "./SoundTrackBackPlate";
import { trackHeight } from "./style";

const soundTrackSx: SxProps = {
    py: 1,
    height: trackHeight,
    position: "relative",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
};

interface SoundTrackProps {
    track: ISoundTrack;
    index: number;
}

export const SoundTrack: React.FC<SoundTrackProps> = ({ track, index }) => {
    const sounds = Array.from(track.sounds);

    return (
        <Box sx={soundTrackSx}>
            <SoundTrackBackPlate rowIndex={index} />
            {sounds.map(([position, sound]) => (
                <Sound key={sound.id} sound={sound} rowIndex={index} columnIndex={position} />
            ))}
        </Box>
    );
};
