import { amber, blue } from "@material-ui/core/colors/";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
    palette: {
        error: { main: amber[500] },
        primary: { main: blue[900] },
        secondary: { main: "#ffffff" },
    },

});

export default theme;
