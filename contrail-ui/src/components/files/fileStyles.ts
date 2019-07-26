import { createStyles, Theme } from "@material-ui/core";

const styles = (theme: Theme) => createStyles({
  body: {
      backgroundColor: theme.palette.common.white,
  },
  dialog: {
    borderBlockColor: "gray",
    borderStyle: "dashed",
    margin: "10px 20px",
  },
  name: {
    width: "50%",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  paper: {
    height: "300px",
    overflowY: "auto",
  },
  progress: {
    backgroundColor: "#b7d0f7",
    borderRadius: 20,
    height: 10,
    margin: theme.spacing(1),
  },
});

export default styles;
