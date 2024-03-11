import { PlayCircleOutlined, StopCircleOutlined, VolumeDown, VolumeUp } from '@mui/icons-material';
import { IconButton, Stack } from '@mui/material';

import { testTrack } from "@core/testTrack";
import { context } from "@core/context";

export const PlayControl = () => {
    function play() {        
        context.tracks[0] = testTrack;
        context.play()
    }

    function stop() {
        context.stop()
    }

    return (
        <Stack spacing={2} direction="row" sx={{ mb: 4 }} alignItems="center">
            <IconButton onClick={play}>
                <PlayCircleOutlined />
            </IconButton>
            <IconButton onClick={stop}>
                <StopCircleOutlined />
            </IconButton>
        </Stack>
    );
};
