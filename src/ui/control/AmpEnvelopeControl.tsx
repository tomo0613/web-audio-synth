import { Box, Card, Divider, Slider, Stack, SxProps, Typography } from "@mui/material";

import { useUiContext } from "@ui/context/UiContext";
import { ActionType } from "@ui/context/useAmpEnvelopeState";

const cardSx: SxProps = {
    p: 4,
};

export const AmpEnvelopeControl = () => {
    const { selectedSound, ampEnvelopeState, ampEnvelopeDispatch } = useUiContext();

    function handleChange(e: Event, value: number) {
        const key = (e.target as HTMLInputElement).name;

        if (selectedSound) {
            selectedSound.envelopes.amp[key] = value;
        }

        ampEnvelopeDispatch({ type: ActionType.setForm, payload: { [key]: value } });
    }

    return (
        <Card sx={cardSx}>
            <Divider>
                <Typography>
                    Amplitude ( ADSR )
                </Typography>
            </Divider>
            <Stack mt={2} spacing={2}>
                {Object.entries(ampEnvelopeState).map(([key, value]) => (
                    <Box key={key}>
                        <Typography>
                            {key} [ {value} ]
                        </Typography>
                        <Slider
                            min={0}
                            max={1}
                            step={0.001}
                            value={value}
                            name={key}
                            onChange={handleChange}
                            disabled={!selectedSound}
                        />
                    </Box>
                ))}
            </Stack>
        </Card>
    );
};
