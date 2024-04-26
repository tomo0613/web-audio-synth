import { Box, Card, Divider, FormControlLabel, Slider, Stack, Switch, type SxProps, Typography } from "@mui/material";
import { useEffect } from "react";

import { useUiContext } from "@ui/context/UiContext";
import { ActionType, useCompressorState } from "./useCompressorState";

const cardSx: SxProps = {
    p: 4,
};

const sliderProps = {
    threshold: { min: -100, max: 0, step: 1 },
    knee: { min: 0, max: 40, step: 1 },
    ratio: { min: 1, max: 20, step: 1 },
    attack: { min: 0, max: 1, step: 0.001 },
    release: { min: 0, max: 1, step: 0.001 },
};

function isNumericValue<N extends [string, number], B extends [string, boolean]>(
    entry: N | B,
): entry is N {
    return typeof entry[1] === "number";
}

export const CompressorControl = () => {
    const { selectedSound } = useUiContext();
    const [state, dispatch] = useCompressorState();

    useEffect(() => {
        if (!selectedSound) {
            return;
        }

        dispatch({
            type: ActionType.initializeForm,
            payload: selectedSound.effects.compressor,
        });
    }, [selectedSound]);

    function handleChange(e: Event, value: number) {
        const key = (e.target as HTMLInputElement).name;

        if (selectedSound) {
            selectedSound.effects.compressor[key] = value;
        }

        dispatch({ type: ActionType.setForm, payload: { [key]: value } });
    }

    function handleSwitch(e: React.ChangeEvent<HTMLInputElement>, checked: boolean) {
        if (selectedSound) {
            selectedSound.effects.compressor.disabled = !checked;
        }

        dispatch({ type: ActionType.setForm, payload: { disabled: !checked } });
    }

    return (
        <Card sx={cardSx}>
            <Divider>
                <Typography>
                    Compressor
                </Typography>
            </Divider>
            <Stack mt={2} spacing={2}>
                <FormControlLabel
                    label="Enabled"
                    control={<Switch checked={!state.disabled} onChange={handleSwitch} />}
                    disabled={!selectedSound}
                />
                {Object.entries(state).filter(isNumericValue).map(([key, value]) => (
                    <Box key={key}>
                        <Typography>
                            {key} [ {value} ]
                        </Typography>
                        <Slider
                            min={sliderProps[key].min}
                            max={sliderProps[key].max}
                            step={sliderProps[key].step}
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
