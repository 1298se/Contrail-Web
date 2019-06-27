import { createStyles, Theme } from "@material-ui/core/styles";
const drawerWidth = 240;

const styles = (theme: Theme) =>
    createStyles({
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
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
        toolbar: theme.mixins.toolbar,
    });
export default styles;
