import { LoopOutlined, PlayCircleOutlined, StopCircleOutlined } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import { useEffect, useState } from "react";

import { context } from "@core/context";

export const PlayControl = () => {
    const [loop, setLoop] = useState(context.scheduler.loop);
    const [play, setPlay] = useState(false);

    useEffect(() => {
        context.scheduler.listener.add("start", onStart);
        context.scheduler.listener.add("stop", onStop);

        return () => {
            context.scheduler.listener.remove("start", onStart);
            context.scheduler.listener.remove("stop", onStop);
        };
    }, []);

    useEffect(() => {
        context.scheduler.loop = loop;
    }, [loop]);

    function onStart() {
        setPlay(true);
    }

    function onStop() {
        setPlay(false);
    }

    function handleToggleLoop() {
        setLoop((value) => !value);
    }

    function handlePlay() {
        context.scheduler.start();
    }

    function handleStop() {
        context.scheduler.stop();
    }

    return (
        <Stack spacing={2} direction="row" sx={{ mb: 4 }} alignItems="center">
            <IconButton onClick={handleToggleLoop} color={loop ? "primary" : "default"}>
                <LoopOutlined />
            </IconButton>
            <IconButton onClick={handlePlay} color={play ? "primary" : "default"}>
                <PlayCircleOutlined />
            </IconButton>
            <IconButton onClick={handleStop}>
                <StopCircleOutlined />
            </IconButton>
        </Stack>
    );
};
