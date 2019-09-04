import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        icon: {
            height: "14px",
            marginLeft: theme.spacing(1),
        },
        name: {
            maxWidth: "300px",
            whiteSpace: "nowrap",
        },
        paper: {
            marginBottom: theme.spacing(2),
            width: "100%",
        },
        root: {
            width: "100%",
        },
        table: {
            minWidth: 750,
        },
        tableWrapper: {
            overflowX: "auto",
        },
    }));

export default useStyles;
