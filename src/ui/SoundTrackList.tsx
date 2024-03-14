import { Stack } from "@mui/material";

import { context } from "@core/context";
import { SoundTrack } from "./SoundTrack";

export const SoundTrackList = () => {
    return (
        <Stack>
            {context.tracks.map((track) => <SoundTrack key={track.id} track={track} />)}
        </Stack>
    );
};
