import { createStyles, Theme } from "@material-ui/core/styles";
const drawerWidth = 240;

const styles = (theme: Theme) =>
    createStyles({
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
        },
        appBarSpacer: theme.mixins.toolbar,
        content: {
            flexGrow: 1,
            height: "100%",
            overflow: "auto",
            padding: theme.spacing(2),
        },
        drawer: {
            flexShrink: 0,
            width: drawerWidth,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        paper: {
            display: "flex",
            flexDirection: "column",
            width: "100%",
        },
        root: {
            display: "flex",
        },
    });
export default styles;
