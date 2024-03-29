import { Box, Card, Divider, MenuItem, Slider, Stack, SxProps, TextField, Typography } from "@mui/material";

import { useUiContext } from "@ui/context/UiContext";
import { useEffect, useState } from "react";

const cardSx: SxProps = {
    p: 4,
};

const filterTypes: BiquadFilterType[] = [
    "allpass",
    "bandpass",
    "highpass",
    "highshelf",
    "lowpass",
    "lowshelf",
    "notch",
    "peaking",
];

function assertFilterTypeValue(value?: string): asserts value is BiquadFilterType | undefined {
    if (value && !filterTypes.includes(value as BiquadFilterType)) {
        throw new Error(`value: '${value}' is not an BiquadFilterType`);
    }
}

const numberInputProps = {
    min: 0,
};

export const FilterEnvelopeControl = () => {
    const { selectedSound } = useUiContext();
    const [filterType, setFilterType] = useState<BiquadFilterType | "disabled">("disabled");
    const [frequency, setFrequency] = useState(0);
    const [qFactor, setQFactor] = useState(0);

    useEffect(() => {
        if (selectedSound) {
            setFilterType(selectedSound.envelopes.filter.type || "disabled");
            setFrequency(selectedSound.envelopes.filter.frequency);
            setQFactor(selectedSound.envelopes.filter.q);
        }
    }, [selectedSound]);

    function handleTypeSelect(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value === "disabled" ? undefined : e.target.value;

        assertFilterTypeValue(value);

        if (selectedSound) {
            selectedSound.envelopes.filter.type = value;
        }

        setFilterType(value || "disabled");
    }

    function handleFrequencyChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = Number(e.target.value);

        if (Number.isNaN(value)) {
            console.error(`frequency: ${e.target.value} is not a valid`);
        } else if (selectedSound) {
            selectedSound.envelopes.filter.frequency = value;
        }

        setFrequency(value);
    }

    function handleQFactorChange(e: Event, value: number) {
        if (selectedSound) {
            selectedSound.envelopes.filter.q = value;
        }

        setQFactor(value);
    }

    return (
        <Card sx={cardSx}>
            <Divider>
                <Typography>
                    Filter
                </Typography>
            </Divider>
            <Stack mt={2} spacing={2}>
                <TextField
                    select
                    label="Type"
                    onChange={handleTypeSelect}
                    value={filterType}
                    disabled={!selectedSound}
                >
                    <MenuItem value="disabled">
                        Disabled
                    </MenuItem>
                    <Divider />
                    {filterTypes.map((filterType) => (
                        <MenuItem key={filterType} value={filterType}>
                            {filterType}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    label="Frequency"
                    onChange={handleFrequencyChange}
                    type="number"
                    value={frequency}
                    disabled={!selectedSound}
                    inputProps={numberInputProps}
                />
                <Box>
                    <Typography>
                        Q [ {qFactor} ]
                    </Typography>
                    <Slider
                        min={0}
                        max={1}
                        step={0.001}
                        value={qFactor}
                        onChange={handleQFactorChange}
                        disabled={!selectedSound}
                    />
                </Box>
            </Stack>
        </Card>
    );
};
