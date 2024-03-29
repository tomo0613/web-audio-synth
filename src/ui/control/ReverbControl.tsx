import { Box, Card, Divider, FormControlLabel, Slider, Stack, Switch, type SxProps, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { useUiContext } from "@ui/context/UiContext";

const cardSx: SxProps = {
    p: 4,
};

export const ReverbControl = () => {
    const { selectedSound } = useUiContext();
    const [time, setTime] = useState(0);
    const [decay, setDecay] = useState(0);
    const [reverse, setReverse] = useState(false);

    useEffect(() => {
        if (!selectedSound) {
            return;
        }

        setTime(selectedSound.effects.reverb.time);
        setDecay(selectedSound.effects.reverb.decay);
        setReverse(selectedSound.effects.reverb.reverse);
    }, [selectedSound]);

    useEffect(() => {
        if (selectedSound) {
            selectedSound.effects.reverb.time = time;
        }
    }, [time]);

    useEffect(() => {
        if (selectedSound) {
            selectedSound.effects.reverb.decay = decay;
        }
    }, [decay]);

    useEffect(() => {
        if (selectedSound) {
            selectedSound.effects.reverb.reverse = reverse;
        }
    }, [reverse]);

    function handleTimeChange(e: Event, value: number) {
        setTime(value);
    }

    function handleDecayChange(e: Event, value: number) {
        setDecay(value);
    }

    function handleReverseChange(e: React.ChangeEvent<HTMLInputElement>, value: boolean) {
        setReverse(value);
    }

    return (
        <Card sx={cardSx}>
            <Divider>
                <Typography>
                    Reverb
                </Typography>
            </Divider>
            <Stack mt={2} spacing={2}>
                <Box>
                    <Typography>
                        Time [ {time} ]
                    </Typography>
                    <Slider
                        min={0}
                        max={1}
                        step={0.001}
                        value={time}
                        onChange={handleTimeChange}
                        disabled={!selectedSound}
                        sx={{ width: "100px" }}
                    />
                </Box>
                <Box>
                    <Typography>
                        Decay [ {decay} ]
                    </Typography>
                    <Slider
                        min={0}
                        max={1}
                        step={0.001}
                        value={decay}
                        onChange={handleDecayChange}
                        disabled={!selectedSound}
                        sx={{ width: "100px" }}
                    />
                </Box>
                <FormControlLabel
                    control={<Switch checked={reverse} onChange={handleReverseChange} />}
                    label="Reverse"
                />
            </Stack>
        </Card>
    );
};
