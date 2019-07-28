import { makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
    appBarSpacer: theme.mixins.toolbar,
}));

export default useStyles;
