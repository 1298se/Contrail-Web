import { createStyles, Theme } from "@material-ui/core";

const styles = (theme: Theme) => createStyles({
    form: {
        width: "100%", // Fix IE 11 issue.
    },
    formContainer: {
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
    },
    image: {
        backgroundColor: theme.palette.primary.main,
    },
    paper: {
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        margin: theme.spacing(0, 4, 0, 4),
        padding: theme.spacing(4),
    },
    root: {
        height: "100vh",
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

export default styles;
