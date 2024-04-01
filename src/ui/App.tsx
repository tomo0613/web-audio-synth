import { Grid } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import { context } from "@core/context";
import { testTrack } from "@core/testTrack";
import { AudioAnalyserDisplay } from "./AudioAnalyserDisplay";
import { UiContextProvider } from "./context/UiContextProvider";
import { AmpEnvelopeControl } from "./control/AmpEnvelopeControl";
import { EchoControl } from "./control/EchoControl";
import { FilterEnvelopeControl } from "./control/FilterEnvelopeControl";
import { FrequencyControl } from "./control/FrequencyControl";
import { MasterVolumeControl } from "./control/MasterVolumeControl";
import { NoiseControl } from "./control/NoiseControl";
import { PitchEnvelopeControl } from "./control/PitchEnvelopeControl";
import { PlayControl } from "./control/PlayControl";
import { ReverbControl } from "./control/ReverbControl";
import { TempoControl } from "./control/TempoControl";
import { WaveFormControl } from "./control/WaveFormControl";
import { CreateSound } from "./CreateSound";
import { SoundTrackList } from "./soundTrack/SoundTrackList";
import { theme } from "./theme";

// test
context.scheduler.tracks = testTrack.slice(0, 4);

export const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <UiContextProvider>
                <Grid container spacing={4}>
                    <Grid item xs={3}>
                        <MasterVolumeControl />
                        <TempoControl />
                        <PlayControl />
                    </Grid>
                    <Grid item xs={3}>
                        <AudioAnalyserDisplay />
                    </Grid>
                    <Grid item xs={3}>
                        <CreateSound />
                    </Grid>
                </Grid>
                <SoundTrackList />
                <Grid container spacing={4} mt={4}>
                    <Grid item xs={3}>
                        <AmpEnvelopeControl />
                    </Grid>
                    <Grid item xs={3}>
                        <PitchEnvelopeControl />
                    </Grid>
                    <Grid item xs={3}>
                        <FilterEnvelopeControl />
                    </Grid>
                    <Grid item xs={3}>
                        <FrequencyControl />
                        <WaveFormControl />
                        <NoiseControl />
                    </Grid>
                    <Grid item xs={3}>
                        <ReverbControl />
                    </Grid>
                    <Grid item xs={3}>
                        <EchoControl />
                    </Grid>
                </Grid>
            </UiContextProvider>
        </ThemeProvider>
    );
};
