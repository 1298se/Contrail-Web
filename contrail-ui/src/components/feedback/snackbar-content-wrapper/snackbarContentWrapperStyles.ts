import { makeStyles, Theme } from "@material-ui/core";
import { amber, green } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.main,
    },
    info: {
        backgroundColor: theme.palette.primary.main,
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
        marginRight: theme.spacing(1),
        opacity: 0.9,
    },
    message: {
        display: "flex",
        alignItems: "center",
    },
}));

export default useStyles;
