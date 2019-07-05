import { amber, blue } from "@material-ui/core/colors/";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
    overrides: {
        MuiCssBaseline: {
            "@global": {
                "*::-webkit-scrollbar": {
                  width: "0.5em",
                },
                "*::-webkit-scrollbar-thumb": {
                    backgroundColor: "slategrey",
                    outline: "1px solid slategrey",
                },
                "*::-webkit-scrollbar-track": {
                  "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)"
                },
            },
        },
    },
    palette: {
        error: { main: amber[500] },
        primary: { main: blue[900] },
        secondary: { main: "#ffffff" },
    },
});

export default theme;
