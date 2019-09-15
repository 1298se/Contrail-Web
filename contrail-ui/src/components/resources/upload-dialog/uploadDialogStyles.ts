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
  fileContainer : {
    display: "flex",
  },
  fileInfoContainer : {
    justifyContent: "flex-start",
    flexGrow: 1,
    width: "80%",
    margin: theme.spacing(1),
  },
  progress: {
    backgroundColor: "#b7d0f7",
    borderRadius: 20,
    width: "100%",
    height: 10,
    marginBottom: "10px",
  },
  statusContainer : {
    alignContent: "flex-end",
  },
  cancel: {
    padding: 0,
  },
  baseDrop: {
    minHeight: "300px",
    margin: "10px",
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    transition: "border .24s ease-in-out",
  },
});

export default styles;
