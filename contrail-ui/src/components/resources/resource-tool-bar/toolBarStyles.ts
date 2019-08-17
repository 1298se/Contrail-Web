import { createStyles, Theme } from "@material-ui/core/styles";

const styles = (theme: Theme) =>
createStyles({
    grow: {
        flexGrow: 1,
    },
    sectionDesktop: {
        display: "none",
        [theme.breakpoints.up("md")]: {
        display: "flex",
        },
    },
    sectionMobile: {
        display: "flex",
        [theme.breakpoints.up("md")]: {
        display: "none",
        },
    },
    title: {
        display: "block",
    },
});

export default styles;
