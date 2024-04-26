import { createTheme } from "@mui/material";

export const theme = createTheme({
    spacing: 4,
    palette: {
        mode: "dark",
        primary: {
            main: "#79a469",
        },
        secondary: {
            main: "#f50057",
        },
        background: {
            default: "#2e3437",
            paper: "#202723",
        },
        text: {
            primary: "rgba(190,214,191,0.87)",
        },
        success: {
            main: "#2e7d32",
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                "& body": {
                    backgroundColor: "#15161a",
                },
            },
        },
        MuiButton: {
            defaultProps: {
                size: "small",
            },
        },
        MuiFilledInput: {
            defaultProps: {
                margin: "dense",
            },
        },
        MuiFormControl: {
            defaultProps: {
                margin: "dense",
            },
        },
        MuiFormHelperText: {
            defaultProps: {
                margin: "dense",
            },
        },
        MuiIconButton: {
            defaultProps: {
                size: "small",
            },
        },
        MuiInputBase: {
            defaultProps: {
                margin: "dense",
            },
        },
        MuiInputLabel: {
            defaultProps: {
                margin: "dense",
            },
        },
        MuiListItem: {
            defaultProps: {
                dense: true,
            },
        },
        MuiOutlinedInput: {
            defaultProps: {
                margin: "dense",
            },
        },
        MuiTextField: {
            defaultProps: {
                margin: "dense",
            },
        },
        MuiToolbar: {
            defaultProps: {
                variant: "dense",
            },
        },
    },
});
