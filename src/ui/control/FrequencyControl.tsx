import { TextField } from "@mui/material";

import { useUiContext } from "@ui/context/UiContext";

export const FrequencyControl = () => {
    const { selectedSound, frequency, setFrequency } = useUiContext();

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = Number(e.target.value);

        if (Number.isNaN(value)) {
            console.error(`frequency: ${e.target.value} is not a valid`);
        } else {
            selectedSound.frequency = value;
        }

        setFrequency(value);
    }

    return (
        <TextField
            label="Frequency"
            onChange={handleChange}
            type="number"
            value={frequency}
            disabled={!selectedSound}
        />
    );
};
