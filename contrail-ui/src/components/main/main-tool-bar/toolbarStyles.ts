import { createStyles, Theme } from "@material-ui/core/styles";

const styles = (theme: Theme) =>
    createStyles({
        menuButton: {
            marginRight: theme.spacing(2),
        },
        root: {
            flexGrow: 1,
        },
        title: {
            flexGrow: 1,
            marginLeft: theme.spacing(10),
        },
    });
export default styles;
