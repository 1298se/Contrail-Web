import CircularProgress from "@material-ui/core/CircularProgress";
import { blue } from "@material-ui/core/colors";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";
import * as types from "./networkDisconnectedDialog.types";

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

function SimpleDialog(props: types.NetworkDisconnectedProps) {
  const classes = useStyles();
  const { message, isOpen } = props;

  return (
    <Dialog open={isOpen}>
      <DialogTitle id="simple-dialog-title">{message}</DialogTitle>
        <CircularProgress color="primary" />
    </Dialog>
  );
}

export default SimpleDialog;
