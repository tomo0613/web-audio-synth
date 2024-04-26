import { Box, Card, Divider, Slider, Stack, SxProps, TextField, Typography } from "@mui/material";
import { useEffect } from "react";

import { useUiContext } from "@ui/context/UiContext";
import { ActionType, usePitchEnvelopeState } from "./usePitchEnvelopeState";

const cardSx: SxProps = {
    p: 4,
};

export const PitchEnvelopeControl = () => {
    const { selectedSound } = useUiContext();
    const [state, dispatch] = usePitchEnvelopeState();

    useEffect(() => {
        if (!selectedSound) {
            return;
        }

        dispatch({
            type: ActionType.initializeForm,
            payload: selectedSound.envelopes.pitch,
        });
    }, [selectedSound]);

    function handleSliderChange(e: Event, value: number) {
        const key = (e.target as HTMLInputElement).name;

        if (selectedSound) {
            selectedSound.envelopes.pitch[key] = value;
        }

        dispatch({ type: ActionType.setForm, payload: { [key]: value } });
    }

    function handleTextFieldChange(e: React.ChangeEvent<HTMLInputElement>) {
        const key = e.target.name;
        const value = Number(e.target.value);

        if (Number.isNaN(value)) {
            console.error(`pitch[${key}]: ${e.target.value} is not a valid`);
        } else if (selectedSound) {
            selectedSound.envelopes.pitch[key] = value;
        }

        dispatch({ type: ActionType.setForm, payload: { [key]: value } });
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
                    value={state.initial}
                    onChange={handleTextFieldChange}
                    disabled={!selectedSound}
                />
                <TextField
                    type="number"
                    label="End"
                    name="end"
                    value={state.end}
                    onChange={handleTextFieldChange}
                    disabled={!selectedSound}
                />
                <Box>
                    <Typography>
                        Time [ {state.time} ]
                    </Typography>
                    <Slider
                        min={0}
                        max={1}
                        step={0.001}
                        value={state.time}
                        name="time"
                        onChange={handleSliderChange}
                        disabled={!selectedSound}
                    />
                </Box>
            </Stack>
        </Card>
    );
};
