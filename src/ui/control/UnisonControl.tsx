import { Box, Card, Divider, MenuItem, Slider, Stack, type SxProps, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import type { Unison } from "@core/effect/Unison";
import { useUiContext } from "@ui/context/UiContext";

const cardSx: SxProps = {
    p: 4,
};

const unisonModes: Unison["mode"][] = [
    "linear",
    "exponential",
    "parabolic",
];

function assertUnisonModeValue(value?: string): asserts value is Unison["mode"] {
    if (!unisonModes.includes(value as Unison["mode"])) {
        throw new Error(`value: '${value}' is not a Unison mode`);
    }
}

export const UnisonControl = () => {
    const { selectedSound } = useUiContext();
    const [count, setCount] = useState(1);
    const [detune, setDetune] = useState(1);
    const [blend, setBlend] = useState(0);
    const [mode, setMode] = useState<Unison["mode"]>("linear");

    useEffect(() => {
        if (!selectedSound) {
            return;
        }

        setCount(selectedSound.effects.unison.voices);
        setDetune(selectedSound.effects.unison.detune);
        setBlend(selectedSound.effects.unison.blend);
        setMode(selectedSound.effects.unison.mode);
    }, [selectedSound]);

    useEffect(() => {
        if (selectedSound) {
            selectedSound.effects.unison.voices = count;
        }
    }, [count]);

    useEffect(() => {
        if (selectedSound) {
            selectedSound.effects.unison.detune = detune;
        }
    }, [detune]);

    useEffect(() => {
        if (selectedSound) {
            selectedSound.effects.unison.blend = blend;
        }
    }, [blend]);

    useEffect(() => {
        if (selectedSound) {
            selectedSound.effects.unison.mode = mode;
        }
    }, [mode]);

    function handleCountChange(e: Event, value: number) {
        setCount(value);
    }

    function handleDetuneChange(e: Event, value: number) {
        setDetune(value);
    }

    function handleBlendChange(e: Event, value: number) {
        setBlend(value);
    }

    function handleModeSelect(e: React.ChangeEvent<HTMLInputElement>) {
        assertUnisonModeValue(e.target.value);

        setMode(e.target.value);
    }

    return (
        <Card sx={cardSx}>
            <Divider>
                <Typography>
                    Unison
                </Typography>
            </Divider>
            <Stack mt={2} spacing={2}>
                <Box>
                    <Typography>
                        Voices [ {count} ]
                    </Typography>
                    <Slider
                        min={1}
                        max={16}
                        step={1}
                        value={count}
                        onChange={handleCountChange}
                        disabled={!selectedSound}
                        sx={{ width: "100px" }}
                    />
                </Box>
                <Box>
                    <Typography>
                        Detune [ {detune} ]
                    </Typography>
                    <Slider
                        min={0}
                        max={100}
                        step={0.01}
                        value={detune}
                        onChange={handleDetuneChange}
                        disabled={!selectedSound}
                        sx={{ width: "100%" }}
                    />
                </Box>
                <Box>
                    <Typography>
                        Blend [ {blend} ]
                    </Typography>
                    <Slider
                        min={0}
                        max={1}
                        step={0.01}
                        value={blend}
                        onChange={handleBlendChange}
                        disabled={!selectedSound}
                        sx={{ width: "100px" }}
                    />
                </Box>
                <TextField
                    select
                    label="Mode"
                    onChange={handleModeSelect}
                    value={mode}
                    disabled={!selectedSound}
                >
                    {unisonModes.map((unisonMode) => (
                        <MenuItem key={unisonMode} value={unisonMode}>
                            {unisonMode}
                        </MenuItem>
                    ))}
                </TextField>
            </Stack>
        </Card>
    );
};
