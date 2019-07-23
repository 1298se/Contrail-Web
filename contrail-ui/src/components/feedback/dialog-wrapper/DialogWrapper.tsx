import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
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
    const { title, isOpen, shouldDisplayLoading, actionPrimary, actionSecondary } = props;

    return (
        <Dialog open={isOpen}>
            <DialogTitle id="simple-dialog-title">{title}</DialogTitle>
            <DialogContent className={classes.content}>
                {shouldDisplayLoading ? <CircularProgress /> : null}
            </DialogContent>
            <DialogActions>
                {actionPrimary}
                {actionSecondary}
            </DialogActions>
        </Dialog>
    );
}

export default SimpleDialog;
