import { blue, red } from "@material-ui/core/colors/";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
    palette: {
        error: { main: red[900] },
        primary: { main: blue[900] },
        secondary: { main: "#ffffff" },
    },

});

export default theme;
