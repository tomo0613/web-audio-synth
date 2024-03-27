import { Grid } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import { context } from "@core/context";
import { testTrack } from "@core/testTrack";
import { UiContextProvider } from "./context/UiContextProvider";
import { AmpEnvelopeControl } from "./control/AmpEnvelopeControl";
import { FrequencyControl } from "./control/FrequencyControl";
import { MasterVolumeControl } from "./control/MasterVolumeControl";
import { PitchEnvelopeControl } from "./control/PitchEnvelopeControl";
import { PlayControl } from "./control/PlayControl";
import { TempoControl } from "./control/TempoControl";
import { WaveFormControl } from "./control/WaveFormControl";
import { NoiseControl } from "./control/NoiseControl";
import { SoundTrackList } from "./soundTrack/SoundTrackList";
import { AudioAnalyserDisplay } from "./AudioAnalyserDisplay";
import { CreateSound } from "./CreateSound";
import { useKeyPressListener } from "./useKeyPressListener";
import { theme } from "./theme";

// test
context.tracks[0] = testTrack[0];
context.tracks[1] = testTrack[1];
context.tracks[2] = testTrack[2];

export const App = () => {
    useKeyPressListener();

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <UiContextProvider>
                <MasterVolumeControl />
                <TempoControl />
                <PlayControl />
                <SoundTrackList />
                <AudioAnalyserDisplay />
                <Grid container spacing={4}>
                    <Grid item xs={3}>
                        <AmpEnvelopeControl />
                    </Grid>
                    <Grid item xs={3}>
                        <PitchEnvelopeControl />
                    </Grid>
                    <Grid item xs={3}>
                        <FrequencyControl />
                        <WaveFormControl />
                        <NoiseControl />
                        <CreateSound />
                    </Grid>
                </Grid>
            </UiContextProvider>
        </ThemeProvider>
    );
};
