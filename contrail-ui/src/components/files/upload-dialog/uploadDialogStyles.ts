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
    width: "80%",
    height: 10,
    order: 2,
    marginBottom: "14px",
  },
  fileContainer : {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    alignContent: "center",
  },
  status : {
    alignSelf: "flex-end",
    order: 1,
  },
  fileInfo : {
    alignSelf: "flex-start",
    order: -1,
    flex: "1 0 50%",
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
