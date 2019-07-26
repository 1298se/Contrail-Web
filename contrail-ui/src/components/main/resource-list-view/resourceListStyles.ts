import { createStyles, Theme } from "@material-ui/core/styles";

const styles = (theme: Theme) =>
    createStyles({
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
    });

export default styles;
