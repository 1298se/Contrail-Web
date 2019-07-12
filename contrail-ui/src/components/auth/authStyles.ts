import { createStyles, Theme } from "@material-ui/core";

const styles = (theme: Theme) => createStyles({
    form: {
    },
    formContainer: {
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
    },
    image: {
        alignItems: "center",
        backgroundColor: theme.palette.primary.main,
        display: "none",
        [theme.breakpoints.up("sm")]: {
            display: "flex",
        },
        flexDirection: "column",
        justifyContent: "center",
    },
    largeIcon: {
        height: "200px",
        width: "300px",
    },
    paper: {
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        margin: theme.spacing(4),
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
