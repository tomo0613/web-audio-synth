import { useState } from 'react';
import { VolumeDown, VolumeUp } from '@mui/icons-material';
import { Slider, Stack } from '@mui/material';
import { context } from "@core/context";

export const MasterVolumeControl = () => {
    const [volume, setVolume] = useState(context.gainNode.gain.value);

    function handleVolumeChange(e: Event, value: number) {
        setVolume(value);

        context.gainNode.gain.value = value;
    }

    return (
        <Stack spacing={2} direction="row" sx={{ mb: 4 }} alignItems="center">
            <VolumeDown />
            <Slider min={0} max={1} step={0.001} value={volume} onChange={handleVolumeChange} sx={{ width: "100px" }} />
            <VolumeUp />
        </Stack>
    );
};
