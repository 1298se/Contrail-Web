import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import React from "react";
import { DialogWrapperProps } from "./dialogWrapper.types";

/**
 * A wrapper for creating a simple dialog with a message.
 * *NOTE*: For success and error messages, use the SnackbarContentWrapper instead.
 */
function SimpleDialog(props: DialogWrapperProps) {
    const { contentText, title, isOpen, shouldDisplayLoading, actionPrimary, actionSecondary, actionTertiary } = props;
    const renderContentText = contentText ?
        (
        <DialogContentText>
            {contentText}
        </DialogContentText>
        ) : null;
    return (
        <Dialog open={isOpen}>
            <DialogTitle id="simple-dialog-title">{title}</DialogTitle>
            <DialogContent>
                {renderContentText}
                {shouldDisplayLoading ? <CircularProgress /> : null}
            </DialogContent>
            <DialogActions>
                {actionTertiary}
                {actionSecondary}
                {actionPrimary}
            </DialogActions>
        </Dialog>
    );
}

export default SimpleDialog;
