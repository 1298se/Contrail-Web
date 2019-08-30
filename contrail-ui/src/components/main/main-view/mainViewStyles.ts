import { createStyles, Theme } from "@material-ui/core/styles";
const drawerWidth = 240;

const styles = (theme: Theme) =>
    createStyles({
        appBarSpacer: {
            display: "flex",
            alignItems: "center",
            padding: "0 8px",
            ...theme.mixins.toolbar,
            justifyContent: "flex-end",
        },
        container: {
            padding: theme.spacing(2),
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            overflow: "auto",
        },
    });

export default styles;
