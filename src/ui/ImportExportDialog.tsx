import { Button, Dialog, DialogActions, DialogContent, DialogTitle, type SxProps, TextField } from "@mui/material";
import { useEffect, useRef } from "react";

import { useUiContext } from "@ui/context/UiContext";

const textAreaSx: SxProps = {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    "& .MuiInputBase-root": {
        color: "rgba(255, 255, 255, 0.8)",
    },
};

interface ImportExportDialogProps {
    open: boolean;
    onClose: () => void;
}

export const ImportExportDialog: React.FC<ImportExportDialogProps> = ({ open, onClose }) => {
    const {
        importTracks,
        exportTracks,
    } = useUiContext();
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        import("../../comeAlive.json").then((res) => {
            importTracks(JSON.stringify(res.default));
        });
    }, []);

    const content = exportTracks();

    function handleImport() {
        importTracks(textAreaRef?.current?.value || "");

        onClose();
    }

    function toClipboard() {
        void navigator.clipboard.writeText(content);
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
        >
            <DialogTitle>Import / Export</DialogTitle>
            <DialogContent dividers>
                <TextField
                    fullWidth
                    multiline
                    minRows={10}
                    spellCheck={false}
                    sx={textAreaSx}
                    inputRef={textAreaRef}
                    defaultValue={content}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>
                    Cancel
                </Button>
                <Button onClick={handleImport}>
                    Import
                </Button>
            </DialogActions>
        </Dialog>
    );
};
