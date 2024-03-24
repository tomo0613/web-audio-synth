import { Grid } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import { context } from "@core/context";
import { testTrack } from "@core/testTrack";
import { AudioAnalyserDisplay } from "./AudioAnalyserDisplay";
import { UiContextProvider } from "./context/UiContextProvider";
import { AmpEnvelopeControl } from "./control/AmpEnvelopeControl";
import { FrequencyControl } from "./control/FrequencyControl";
import { MasterVolumeControl } from "./control/MasterVolumeControl";
import { PitchEnvelopeControl } from "./control/PitchEnvelopeControl";
import { PlayControl } from "./control/PlayControl";
import { TempoControl } from "./control/TempoControl";
import { WaveFormControl } from "./control/WaveFormControl";
import { SoundTrackList } from "./soundTrack/SoundTrackList";
import { theme } from "./theme";

// test
context.tracks[0] = testTrack[0];
context.tracks[1] = testTrack[1];
context.tracks[2] = testTrack[2];

export const App = () => {
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
                    </Grid>
                </Grid>
            </UiContextProvider>
        </ThemeProvider>
    );
};
