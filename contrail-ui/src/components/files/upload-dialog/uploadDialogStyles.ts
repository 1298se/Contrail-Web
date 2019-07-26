import { createStyles, Theme } from "@material-ui/core";
import { display } from "@material-ui/system";

const styles = (theme: Theme) => createStyles({
  body: {
      backgroundColor: theme.palette.common.white,
  },
  dialog: {
    borderBlockColor: "gray",
    borderStyle: "dashed",
    margin: "10px 20px",
  },
  paper: {
    height: "300px",
    overflowY: "auto",
  },
  fileContainer : {
    width: "100%",
    display: "flex",
    alignItems: "center",
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
    justifyContent: "flex-end",
  },
  fileInfoContainer : {
    justifyContent: "flex-start",
    flex: "0 0 50%",
    flexGrow: 1,
  },
  name: {
    width: "40%",
    maxWidth: "40%",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  baseDrop: {
    margin: "10px",
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    transition: "border .24s ease-in-out",
  },
});

export default styles;
