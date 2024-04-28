import { Grid } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import { AudioAnalyserDisplay } from "./AudioAnalyserDisplay";
import { UiContextProvider } from "./context/UiContextProvider";
import { AmpEnvelopeControl } from "./control/AmpEnvelopeControl";
import { CompressorControl } from "./control/CompressorControl";
import { DistortionControl } from "./control/DistortionControl";
import { EchoControl } from "./control/EchoControl";
import { FilterEnvelopeControl } from "./control/FilterEnvelopeControl";
import { FrequencyControl } from "./control/FrequencyControl";
import { MasterVolumeControl } from "./control/MasterVolumeControl";
import { NoiseControl } from "./control/NoiseControl";
import { PitchEnvelopeControl } from "./control/PitchEnvelopeControl";
import { PlayControl } from "./control/PlayControl";
import { ReverbControl } from "./control/ReverbControl";
import { TempoControl } from "./control/TempoControl";
import { UnisonControl } from "./control/UnisonControl";
import { WaveFormControl } from "./control/WaveFormControl";
import { CreateSound } from "./CreateSound";
import { SoundTrackList } from "./soundTrack/SoundTrackList";
import { theme } from "./theme";

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
                <Grid container spacing={4} mt={4} columns={20}>
                    <Grid item lg={4} md={5} xs={10}>
                        <FrequencyControl />
                        <WaveFormControl />
                        <NoiseControl />
                    </Grid>
                    <Grid item lg={4} md={5} xs={10}>
                        <UnisonControl />
                    </Grid>
                    <Grid item lg={4} md={5} xs={10}>
                        <AmpEnvelopeControl />
                    </Grid>
                    <Grid item lg={4} md={5} xs={10}>
                        <PitchEnvelopeControl />
                    </Grid>
                    <Grid item lg={4} md={5} xs={10}>
                        <FilterEnvelopeControl />
                    </Grid>
                    <Grid item lg={4} md={5} xs={10}>
                        <CompressorControl />
                    </Grid>
                    <Grid item lg={4} md={5} xs={10}>
                        <DistortionControl />
                    </Grid>
                    <Grid item lg={4} md={5} xs={10}>
                        <ReverbControl />
                    </Grid>
                    <Grid item lg={4} md={5} xs={10}>
                        <EchoControl />
                    </Grid>
                </Grid>
            </UiContextProvider>
        </ThemeProvider>
    );
};
