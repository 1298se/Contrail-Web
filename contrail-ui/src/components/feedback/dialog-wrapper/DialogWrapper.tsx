import { DialogContent } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import React from "react";
import { DialogWrapperProps } from "./dialogWrapper.types";
import useStyles from "./dialogWrapperStyles";

/**
 * A wrapper for creating a simple dialog with a message.
 * *NOTE*: For success and error messages, use the SnackbarContentWrapper instead.
 */
function SimpleDialog(props: DialogWrapperProps) {
  const classes = useStyles();
  const { message, isOpen } = props;

  return (
    <Dialog open={isOpen}>
      <DialogTitle id="simple-dialog-title">{message}</DialogTitle>
      <DialogContent className={classes.content}>
          <CircularProgress />
      </DialogContent>
    </Dialog>
  );
}

export default SimpleDialog;
