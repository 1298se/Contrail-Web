import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
    button: {
        margin: theme.spacing(1),
        maxWidth: 175,
    },
    extendedButton: {
        marginBottom: theme.spacing(2),
    },
    leftIcon: {
        marginRight: theme.spacing(1),
    },
}));

export default useStyles;
