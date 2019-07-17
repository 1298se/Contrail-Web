import { DialogContent } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { blue } from "@material-ui/core/colors";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import * as types from "./networkDisconnectedDialog.types";

function SimpleDialog(props: types.NetworkDisconnectedProps) {
  const { message, isOpen } = props;

  return (
    <Dialog open={isOpen}>
      <DialogTitle id="simple-dialog-title">{message}</DialogTitle>
      <DialogContent>
        <CircularProgress />
      </DialogContent>
    </Dialog>
  );
}

export default SimpleDialog;
