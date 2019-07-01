import { createStyles, Theme } from "@material-ui/core";

const styles = (theme: Theme) => createStyles({
  body: {
      backgroundColor: theme.palette.common.white,
  },
  content: {
    flexGrow: 1,
    height: "100%",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
  },
  paper: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
    overflow: "auto",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

export default styles;
