import { Box, Slider, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { useUiContext } from "@ui/context/UiContext";

export const NoiseControl = () => {
    const { selectedSound } = useUiContext();
    const [noiseVolume, setNoiseVolume] = useState(0);

    useEffect(() => {
        if (!selectedSound) {
            return;
        }

        setNoiseVolume(selectedSound.noise);
    }, [selectedSound]);

    function handleNoiseVolumeChange(e: Event, value: number) {
        setNoiseVolume(value);

        if (selectedSound) {
            selectedSound.noise = value;
        }
    }

    return (
        <Box>
            <Typography>
                Noise [ {noiseVolume} ]
            </Typography>
            <Slider
                min={0}
                max={1}
                step={0.001}
                value={noiseVolume}
                onChange={handleNoiseVolumeChange}
                sx={{ width: "100px" }}
            />
        </Box>
    );
};
