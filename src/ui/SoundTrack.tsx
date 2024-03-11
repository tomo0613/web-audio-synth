import { Stack, SxProps } from "@mui/material"

import { context } from "@core/context";
import type { SoundTrack as ISoundTrack } from "@core/SoundTrack";
import { Sound } from "./Sound";

const sx: SxProps = {
    p: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)"
};

interface SoundTrackProps {
    track: ISoundTrack;
}

export const SoundTrack: React.FC<SoundTrackProps> = ({ track }) => {
    const sounds = Array.from(track.sounds);

    return (
        <Stack sx={sx} spacing={1} direction={"row"} >
            {sounds.map((sound) => (
                <Sound key={sound.id} sound={sound} />
            ))}
        </Stack>
    );
};
