import { Box, Card, Slider, Stack, SxProps, Typography } from "@mui/material"

import type { AmpEnvelope } from "@core/SoundEnvelope";
import { context } from "@core/context";
import { useAmpEnvelopeState, ActionType } from "./useAmpEnvelopeState";

const cardSx: SxProps = {
    width: "320px",
    p: 4,
}

export const AmpEnvelopeControl = () => {
    const [state, dispatch] = useAmpEnvelopeState();

    function handleChange(e: Event, value: number) {
        const key = (e.target as HTMLInputElement).name;

        // ampEnvelope[key]

        dispatch({ type: ActionType.setForm, payload: { [key]: value } });
    }

    return (
        <Card sx={cardSx}>
            <Stack spacing={2}>
                {Object.entries(state).map(([key, value]) => (
                    <Box key={key}>
                        <Typography>
                            {key}
                        </Typography>
                        <Slider min={0} max={1} step={0.001} value={value} name={key} onChange={handleChange} />
                    </Box>
                ))}
            </Stack>
        </Card>
    );
};
