import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { PlayCircleOutlined, StopCircleOutlined, VolumeDown, VolumeUp } from '@mui/icons-material';
import { IconButton, Slider, Stack } from '@mui/material';
import { useState } from 'react';
import { AudioAnalyserDisplay } from './AudioAnalyserDisplay';
import { theme } from './theme';

import { testTrack } from "../core/testTrack";
import { context } from "../core/context";
import { AmpEnvelopeControl } from './AmpEnvelopeControl';

export const App = () => {
    const [volume, setVolume] = useState(context.gainNode.gain.value);

    function handleVolumeChange(e: Event, value: number) {
        setVolume(value);

        context.gainNode.gain.value = value;
    }

    function play() {        
        context.tracks[0] = testTrack;
        context.play()
    }

    function stop() {
        context.stop()
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Stack spacing={2} direction="row" sx={{ mb: 4 }} alignItems="center">
                <VolumeDown />
                <Slider min={0} max={1} step={0.001} value={volume} onChange={handleVolumeChange} sx={{ width: "100px" }} />
                <VolumeUp />
            </Stack>
            <Stack spacing={2} direction="row" sx={{ mb: 4 }} alignItems="center">
                <IconButton onClick={play}>
                    <PlayCircleOutlined />
                </IconButton>
                <IconButton onClick={stop}>
                    <StopCircleOutlined />
                </IconButton>
            </Stack>
            <AudioAnalyserDisplay />
            <AmpEnvelopeControl />
        </ThemeProvider>
    )
};
