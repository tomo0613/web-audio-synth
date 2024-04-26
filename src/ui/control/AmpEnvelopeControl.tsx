import { Box, Card, Divider, Slider, Stack, SxProps, Typography } from "@mui/material";
import { useEffect } from "react";

import { useUiContext } from "@ui/context/UiContext";
import { ActionType, useAmpEnvelopeState } from "./useAmpEnvelopeState";

const cardSx: SxProps = {
    p: 4,
};

export const AmpEnvelopeControl = () => {
    const { selectedSound } = useUiContext();
    const [state, dispatch] = useAmpEnvelopeState();

    useEffect(() => {
        if (!selectedSound) {
            return;
        }

        dispatch({
            type: ActionType.initializeForm,
            payload: selectedSound.envelopes.amp,
        });
    }, [selectedSound]);

    function handleChange(e: Event, value: number) {
        const key = (e.target as HTMLInputElement).name;

        if (selectedSound) {
            selectedSound.envelopes.amp[key] = value;
        }

        dispatch({ type: ActionType.setForm, payload: { [key]: value } });
    }

    return (
        <Card sx={cardSx}>
            <Divider>
                <Typography>
                    Amplitude ( ADSR )
                </Typography>
            </Divider>
            <Stack mt={2} spacing={2}>
                {Object.entries(state).map(([key, value]) => (
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
