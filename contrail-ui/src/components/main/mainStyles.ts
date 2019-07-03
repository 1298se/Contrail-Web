import { createStyles, Theme } from "@material-ui/core/styles";
const drawerWidth = 240;

const styles = (theme: Theme) =>
    createStyles({
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
        },
        appBarSpacer: theme.mixins.toolbar,
        container: {
            padding: theme.spacing(2),
        },
        button: {
            borderRadius: 25,
            margin: theme.spacing(1),
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
        uploadIcon: {
            marginRight: theme.spacing(1),
        },
    });

export default styles;
