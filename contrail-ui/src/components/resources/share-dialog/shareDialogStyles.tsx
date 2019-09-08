import { createStyles, Theme } from "@material-ui/core";

const styles = (theme: Theme) => createStyles({
  body: {
    backgroundColor: theme.palette.common.white,
  },
  chip: {
    margin: "5px",
  },
  inputRoot: {
    flexWrap: "wrap",
  },
  inputInput: {
    width: "auto",
    flexGrow: 1,
  },
  dialogPaper: {
    overflow: "visible",
  },
  paper: {
    position: "absolute",
    zIndex: 1,
    left: 0,
    right: 0,
  },
  container: {
    flexGrow: 1,
    position: "relative",
    zIndex: 99999999,
  },
  search: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    flexGrow: 1,
  },
  collaborators: {
    maxHeight: "30vh",
    overflowY: "auto",
    overflowX: "hidden",
  },
  collaboratorsWrapper: {
    display: "flex",
    flexDirection: "column",
  },
  unshareButton: {
    alignSelf: "flex-end",
    marginTop: theme.spacing(1),
  },
});

export default styles;
