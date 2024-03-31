import { Box, MenuItem, TextField } from "@mui/material";

import { useUiContext } from "@ui/context/UiContext";

const oscillatorTypes: OscillatorType[] = [
    "sawtooth",
    "sine",
    "square",
    "triangle",
    "custom",
];

function assertValue(value: string): asserts value is OscillatorType {
    if (!oscillatorTypes.includes(value as OscillatorType)) {
        throw new Error(`value: '${value}' is not an OscillatorType`);
    }
}

export const WaveFormControl = () => {
    const { selectedSound, waveForm, setWaveForm } = useUiContext();

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        assertValue(e.target.value);

        if (selectedSound) {
            selectedSound.waveForm = e.target.value;
        }

        setWaveForm(e.target.value);
    }

    return (
        <Box>
            <TextField
                select
                label="Wave form"
                onChange={handleChange}
                value={waveForm}
                disabled={!selectedSound}
            >
                {oscillatorTypes.map((oscillatorType) => (
                    <MenuItem key={oscillatorType} value={oscillatorType}>
                        {oscillatorType}
                    </MenuItem>
                ))}
            </TextField>
        </Box>
    );
};
