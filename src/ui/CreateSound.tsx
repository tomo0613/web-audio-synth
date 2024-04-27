import { Add, DeleteForever } from "@mui/icons-material";
import { Box, Button, Divider, IconButton, MenuItem, TextField, Tooltip, Typography } from "@mui/material";
import { useState } from "react";

import { soundPresets } from "@ui/context/soundPresets";
import { useUiContext } from "@ui/context/UiContext";
import { ImportExportDialog } from "./ImportExportDialog";

const ButtonTooltipContent = ({ text, hotKey }: { text: string; hotKey: string }) => (
    <>
        <Typography variant="inherit">
            {text}
        </Typography>
        <Typography variant="inherit" color="text.secondary">
            [ {hotKey} ]
        </Typography>
    </>
);

interface ButtonTooltipProps extends React.PropsWithChildren {
    text: string;
    hotKey: string;
}

const ButtonTooltip: React.FC<ButtonTooltipProps> = ({ children, text, hotKey }) => (
    <Tooltip title={<ButtonTooltipContent text={text} hotKey={hotKey} />}>
        <span>
            {children}
        </span>
    </Tooltip>
);

export const CreateSound = () => {
    const {
        selectedSound,
        deleteSelectedSound,
        selectedSegmentId,
        selectedSoundPreset,
        setSelectedSoundPreset,
        createSound,
    } = useUiContext();
    const [dialogOpen, setDialogOpen] = useState(false);

    function openDialog() {
        setDialogOpen(true);
    }

    function closeDialog() {
        setDialogOpen(false);
    }

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
            <ButtonTooltip text="Create new sound (by preset, at selected segment)" hotKey="Numpad +">
                <IconButton onClick={handleAdd} disabled={!selectedSegmentId}>
                    <Add />
                </IconButton>
            </ButtonTooltip>
            <ButtonTooltip text="Delete selected sound" hotKey="Del">
                <IconButton onClick={handleDelete} disabled={!selectedSound}>
                    <DeleteForever />
                </IconButton>
            </ButtonTooltip>
            <Button onClick={openDialog}>
                Import / Export
            </Button>
            <ImportExportDialog open={dialogOpen} onClose={closeDialog} />
        </Box>
    );
};
