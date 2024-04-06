import { Box, Card, Divider, MenuItem, Slider, Stack, type SxProps, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { useUiContext } from "@ui/context/UiContext";

const cardSx: SxProps = {
    p: 4,
};

const overSampleTypes: OverSampleType[] = [
    "2x",
    "4x",
    "none",
];

function assertOverSampleTypeValue(value?: string): asserts value is OverSampleType {
    if (!overSampleTypes.includes(value as OverSampleType)) {
        throw new Error(`value: '${value}' is not an OverSampleType`);
    }
}

export const DistortionControl = () => {
    const { selectedSound } = useUiContext();
    const [amount, setAmount] = useState(0);
    const [overSampleType, setOverSampleType] = useState<OverSampleType>("4x");

    useEffect(() => {
        if (!selectedSound) {
            return;
        }

        setAmount(selectedSound.effects.distortion.amount);
        setOverSampleType(selectedSound.effects.distortion.overSample);
    }, [selectedSound]);

    useEffect(() => {
        if (selectedSound) {
            selectedSound.effects.distortion.amount = amount;
        }
    }, [amount]);

    useEffect(() => {
        if (selectedSound) {
            selectedSound.effects.distortion.overSample = overSampleType;
        }
    }, [overSampleType]);

    function handleAmountChange(e: Event, value: number) {
        setAmount(value);
    }

    function handleOverSampleTypeSelect(e: React.ChangeEvent<HTMLInputElement>) {
        assertOverSampleTypeValue(e.target.value);

        setOverSampleType(e.target.value);
    }

    return (
        <Card sx={cardSx}>
            <Divider>
                <Typography>
                    Distortion
                </Typography>
            </Divider>
            <Stack mt={2} spacing={2}>
                <Box>
                    <Typography>
                        Amount [ {amount} ]
                    </Typography>
                    <Slider
                        min={0}
                        max={100}
                        step={0.1}
                        value={amount}
                        onChange={handleAmountChange}
                        disabled={!selectedSound}
                        sx={{ width: "100%" }}
                    />
                </Box>
                <TextField
                    select
                    label="Oversampling type"
                    onChange={handleOverSampleTypeSelect}
                    value={overSampleType}
                    disabled={!selectedSound}
                >
                    {overSampleTypes.map((type) => (
                        <MenuItem key={type} value={type}>
                            {type}
                        </MenuItem>
                    ))}
                </TextField>
            </Stack>
        </Card>
    );
};
