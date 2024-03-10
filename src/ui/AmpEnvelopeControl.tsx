import { useState } from "react";
import { Box, Card, Slider, Stack, SxProps, Typography } from "@mui/material"

import { context } from "../core/context";

const cardSx: SxProps = {
    width: "320px",
    p: 4,
}



const defaultState = {
    attack: 0,
    decay: 0,
    sustain: 1,
    release: 0,
};

export const AmpEnvelopeControl = () => {
    const [attack, setAttack] = useState(defaultState.attack);

    function handleChange(e: Event, value: number) {
        const inputName = (e.target as HTMLInputElement).name;
   
        switch (inputName) {
            case "attack":
                setAttack(value);
                break;
        }
    }

    return (
        <Card sx={cardSx}>
            <Stack spacing={2}>
                {Object.entries(defaultState).map(([key, value]) => (
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
