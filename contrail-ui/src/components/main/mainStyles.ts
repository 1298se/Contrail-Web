import { createStyles, Theme } from "@material-ui/core/styles";
const drawerWidth = 240;

const styles = (theme: Theme) =>
    createStyles({
        appBarSpacer: theme.mixins.toolbar,
        container: {
            padding: theme.spacing(2),
        },
        content: {
            flexGrow: 1,
            height: "100%",
            overflow: "auto",
        },
        drawer: {
            flexShrink: 0,
            width: drawerWidth,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        root: {
            display: "flex",
        },
    });

export default styles;
