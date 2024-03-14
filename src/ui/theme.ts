import { createTheme } from "@mui/material";

export const theme = createTheme({
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
    },
});
