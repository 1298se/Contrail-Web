import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
    content: {
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        padding: theme.spacing(2),
    },
}));

export default useStyles;
