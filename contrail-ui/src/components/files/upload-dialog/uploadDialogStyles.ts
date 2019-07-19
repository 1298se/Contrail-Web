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
    marginBottom: "10px",
  },
  fileContainer : {
    width: "100%",
    display: "flex",
    alignItems: "center",
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
  baseDrop: {
    margin: '10px',
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    outline: 'none',
    transition: 'border .24s ease-in-out'
  }
});

export default styles;
