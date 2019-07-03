import { createStyles, Theme } from "@material-ui/core";

const styles = (theme: Theme) => createStyles({
  body: {
      backgroundColor: theme.palette.common.white,
  },
  dialog: {
    margin: "10px 20px",
    borderStyle: "dashed",
    borderBlockColor: "gray"
  }
});

export default styles;
