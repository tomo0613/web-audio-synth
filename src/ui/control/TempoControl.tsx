import { TextField } from "@mui/material";
import { useState } from "react";

import { context } from "@core/context";

export const TempoControl = () => {
    const [tempo, setTempo] = useState(context.scheduler.tempo);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = Number(e.target.value);

        setTempo(value);

        context.scheduler.tempo = value;
    }

    return <TextField type="number" onChange={handleChange} value={tempo} label={"Tempo"} />;
};
