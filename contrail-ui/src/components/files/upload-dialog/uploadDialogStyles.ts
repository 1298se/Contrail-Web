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
    width: "40%",
    maxWidth: "40%",
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
    width: "100%",
    height: 10,
    margin: theme.spacing(1),
  },
  progressContainer: {
    width: '100%'
  },
  doneContainer:{
    width: "10%"
  }
});

export default styles;
