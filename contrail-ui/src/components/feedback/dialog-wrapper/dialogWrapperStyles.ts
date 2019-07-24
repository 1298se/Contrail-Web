import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
    content: {
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: theme.spacing(2),
    },
    contentText: {
        width: "100%",
    },
}));

export default useStyles;
