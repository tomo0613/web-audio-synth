import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import { AudioAnalyserDisplay } from './AudioAnalyserDisplay';
import { theme } from './theme';

import { AmpEnvelopeControl } from './control/ampEnvelope/AmpEnvelopeControl';
import { MasterVolumeControl } from './control/MasterVolumeControl';
import { PlayControl } from './control/PlayControl';
import { SoundTrackList } from './SoundTrackList';

export const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <MasterVolumeControl />
            <PlayControl />
            <SoundTrackList />
            <AudioAnalyserDisplay />
            <AmpEnvelopeControl />
        </ThemeProvider>
    )
};
