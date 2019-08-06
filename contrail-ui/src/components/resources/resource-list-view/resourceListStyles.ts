import { makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
        column: {
            whiteSpace: "nowrap",
        },
        name: {
            textOverflow: "ellipsis",
            maxWidth: "500px",
            overflow: "hidden",
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
