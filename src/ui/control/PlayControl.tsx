import { PlayCircleOutlined, StopCircleOutlined } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";

import { context } from "@core/context";

export const PlayControl = () => {
    function play() {
        context.scheduler.start();
    }

    function stop() {
        context.scheduler.stop();
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
