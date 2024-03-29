import { Box, Card, Divider, Slider, Stack, SxProps, TextField, Typography } from "@mui/material";

import { useUiContext } from "@ui/context/UiContext";
import { ActionType } from "@ui/context/usePitchEnvelopeState";

const cardSx: SxProps = {
    p: 4,
};

export const PitchEnvelopeControl = () => {
    const { selectedSound, pitchEnvelopeState, pitchEnvelopeDispatch } = useUiContext();

    function handleSliderChange(e: Event, value: number) {
        const key = (e.target as HTMLInputElement).name;

        if (selectedSound) {
            selectedSound.envelopes.pitch[key] = value;
        }

        pitchEnvelopeDispatch({ type: ActionType.setForm, payload: { [key]: value } });
    }

    function handleTextFieldChange(e: React.ChangeEvent<HTMLInputElement>) {
        const key = e.target.name;
        const value = Number(e.target.value);

        if (Number.isNaN(value)) {
            console.error(`pitch[${key}]: ${e.target.value} is not a valid`);
        } else if (selectedSound) {
            selectedSound.envelopes.pitch[key] = value;
        }

        pitchEnvelopeDispatch({ type: ActionType.setForm, payload: { [key]: value } });
    }

    return (
        <Card sx={cardSx}>
            <Divider>
                <Typography>
                    Pitch
                </Typography>
            </Divider>
            <Stack mt={4} spacing={2}>
                <TextField
                    type="number"
                    label="Initial"
                    name="initial"
                    value={pitchEnvelopeState.initial}
                    onChange={handleTextFieldChange}
                    disabled={!selectedSound}
                />
                <TextField
                    type="number"
                    label="End"
                    name="end"
                    value={pitchEnvelopeState.end}
                    onChange={handleTextFieldChange}
                    disabled={!selectedSound}
                />
                <Box>
                    <Typography>
                        Time [ {pitchEnvelopeState.time} ]
                    </Typography>
                    <Slider
                        min={0}
                        max={1}
                        step={0.001}
                        value={pitchEnvelopeState.time}
                        name="time"
                        onChange={handleSliderChange}
                        disabled={!selectedSound}
                    />
                </Box>
            </Stack>
        </Card>
    );
};
