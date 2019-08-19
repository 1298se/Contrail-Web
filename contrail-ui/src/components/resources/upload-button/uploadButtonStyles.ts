import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
    button: {
        margin: theme.spacing(1),
        maxWidth: 175,
    },
    leftIcon: {
        marginRight: theme.spacing(1),
    },
}));

export default useStyles;
