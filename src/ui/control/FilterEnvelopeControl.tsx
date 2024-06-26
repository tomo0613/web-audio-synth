import {
    Box,
    Card,
    Divider,
    FormControlLabel,
    MenuItem,
    Slider,
    Stack,
    Switch,
    SxProps,
    TextField,
    Typography,
} from "@mui/material";

import { context } from "@core/context";
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

export const FilterEnvelopeControl = () => {
    const { selectedSound } = useUiContext();
    const [filterType, setFilterType] = useState<BiquadFilterType | "disabled">("disabled");
    const [frequency, setFrequency] = useState(0);
    const [qFactor, setQFactor] = useState(0);
    const [detune, setDetune] = useState(0);
    const [_24dB, set_24dB] = useState(false);

    useEffect(() => {
        if (selectedSound) {
            setFilterType(selectedSound.envelopes.filter.type || "disabled");
            setFrequency(selectedSound.envelopes.filter.frequency);
            setQFactor(selectedSound.envelopes.filter.q);
            setDetune(selectedSound.envelopes.filter.detune);
            set_24dB(selectedSound.envelopes.filter._24dB);
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

    function handleFrequencyChange(e: Event, value: number) {
        if (selectedSound) {
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

    function handleDetuneChange(e: Event, value: number) {
        if (selectedSound) {
            selectedSound.envelopes.filter.detune = value;
        }

        setDetune(value);
    }

    function handle_24Change(e: React.ChangeEvent<HTMLInputElement>, checked: boolean) {
        if (selectedSound) {
            selectedSound.envelopes.filter._24dB = checked;
        }

        set_24dB(checked);
    }

    return (
        <Card sx={cardSx}>
            <Divider>
                <Typography>
                    Filter
                </Typography>
            </Divider>
            <Stack mt={4} spacing={2}>
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
                <Box>
                    <Typography>
                        Frequency [ {frequency} ]
                    </Typography>
                    <Slider
                        min={10}
                        max={context.instance.sampleRate / 2}
                        step={1}
                        value={frequency}
                        onChange={handleFrequencyChange}
                        disabled={!selectedSound}
                    />
                </Box>
                <Box>
                    <Typography>
                        Q [ {qFactor} ]
                    </Typography>
                    <Slider
                        min={0.0001}
                        max={1000}
                        step={0.0001}
                        value={qFactor}
                        onChange={handleQFactorChange}
                        disabled={!selectedSound}
                    />
                </Box>
                <Box>
                    <Typography>
                        Detune [ {detune} ]
                    </Typography>
                    <Slider
                        min={0}
                        max={10000}
                        step={1}
                        value={detune}
                        onChange={handleDetuneChange}
                        disabled={!selectedSound}
                    />
                </Box>
                <FormControlLabel
                    control={<Switch checked={_24dB} onChange={handle_24Change} />}
                    label="24dB"
                />
            </Stack>
        </Card>
    );
};
