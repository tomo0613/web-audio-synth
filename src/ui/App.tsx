import { Grid } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import { context } from "@core/context";
import { testTrack } from "@core/testTrack";
import { AudioAnalyserDisplay } from "./AudioAnalyserDisplay";
import { UiContextProvider } from "./context/UiContextProvider";
import { AmpEnvelopeControl } from "./control/ampEnvelope/AmpEnvelopeControl";
import { FrequencyControl } from "./control/FrequencyControl";
import { MasterVolumeControl } from "./control/MasterVolumeControl";
import { PlayControl } from "./control/PlayControl";
import { SoundTrackList } from "./SoundTrackList";
import { theme } from "./theme";

context.tracks[0] = testTrack;

export const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <UiContextProvider>
                <MasterVolumeControl />
                <PlayControl />
                <SoundTrackList />
                <AudioAnalyserDisplay />
                <Grid container>
                    <Grid item xs={4}>
                        <AmpEnvelopeControl />
                    </Grid>
                    <Grid item xs={4}>
                        <FrequencyControl />
                    </Grid>
                </Grid>
            </UiContextProvider>
        </ThemeProvider>
    );
};
