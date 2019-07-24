import { createStyles, Theme } from "@material-ui/core/styles";

const styles = (theme: Theme) =>
createStyles({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    appBarTitle: {
        flexGrow: 1,
    },
    drawerButton: {
        marginRight: theme.spacing(2),
    },
});

export default styles;
