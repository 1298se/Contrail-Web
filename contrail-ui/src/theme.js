import { createMuiTheme } from '@material-ui/core/styles'
import { amber, blue } from '@material-ui/core/colors/'

const theme = createMuiTheme({
    palette: {
        primary: { main: blue[900] },
        secondary: { main: blue[50] },
        error: { main: amber[500] }
    }

})

export default theme