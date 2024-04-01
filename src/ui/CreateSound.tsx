import { Add, DeleteForever } from "@mui/icons-material";
import { Box, Divider, IconButton, MenuItem, TextField } from "@mui/material";

import { soundPresets } from "@ui/context/soundPresets";
import { useUiContext } from "@ui/context/UiContext";

export const CreateSound = () => {
    const {
        selectedSound,
        deleteSelectedSound,
        selectedSegmentId,
        selectedSoundPreset,
        setSelectedSoundPreset,
        createSound,
    } = useUiContext();

    function handleSelect(e: React.ChangeEvent<HTMLInputElement>) {
        setSelectedSoundPreset(e.target.value);
    }

    function handleAdd() {
        createSound();
    }

    function handleDelete() {
        deleteSelectedSound();
    }

    return (
        <Box>
            <TextField
                select
                label="Preset"
                onChange={handleSelect}
                value={selectedSoundPreset}
            >
                <MenuItem value="default">
                    {"Default"}
                </MenuItem>
                <Divider />
                <MenuItem value="selected" disabled={!selectedSound}>
                    {"Selected"}
                </MenuItem>
                <Divider />
                {Object.keys(soundPresets).map((key) => (
                    <MenuItem key={key} value={key}>
                        {key}
                    </MenuItem>
                ))}
            </TextField>
            <IconButton onClick={handleAdd} disabled={!selectedSegmentId}>
                <Add />
            </IconButton>
            <IconButton onClick={handleDelete} disabled={!selectedSound}>
                <DeleteForever />
            </IconButton>
        </Box>
    );
};
