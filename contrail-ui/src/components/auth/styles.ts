import { createStyles, Theme } from "@material-ui/core";

const styles = (theme: Theme) => createStyles({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  "paper": {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  "form": {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  "submit": {
    margin: theme.spacing(3, 0, 2),
  },
    "root": {
      display: "flex",
    },
    "appBar": {
      zIndex: theme.zIndex.drawer + 1,
    },
    "drawer": {
      width: 240,
      flexShrink: 0,
    },
    "drawerPaper": {
      width: 240,
    },
    "content": {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    "toolbar": theme.mixins.toolbar,
});

export default styles;
