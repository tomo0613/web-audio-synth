import { useState } from "react";
import { FormControlLabel, Switch } from "@mui/material";

import { useUiContext } from "@ui/context/UiContext";

export const NoiseControl = () => {
    const { selectedSound } = useUiContext();
    const [noiseEnabled, setNoiseEnabled] = useState(false);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>, checked: boolean) {
        setNoiseEnabled(checked);

        if (selectedSound) {
            selectedSound.noise = checked;
        }
    }

    return (
        <FormControlLabel 
            label="Noise" 
            control={(
                <Switch checked={noiseEnabled} onChange={handleChange} disabled={!selectedSound} />
            )} 
        />
    );
};
