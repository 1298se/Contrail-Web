import Button from "@material-ui/core/Button";
import React from "react";
import * as filesController from "../../../firebase/controllers/filesController";
import DialogWrapper from "../../feedback/dialog-wrapper/DialogWrapper";
import withSnackbar from "../../feedback/snackbar-component/SnackbarComponent";
import { PermanentDeleteDialogProps } from "./permanentDeleteDialog.types";

const PermanentDeleteDialog = (props: PermanentDeleteDialogProps) => {
    const message = "Are you sure you want to permanently delete this item?";

    const handlePermanentDeleteClick = () => {
        props.handleDialogClose(true);
        filesController.permanentDeleteResource(props.selectedResources)
            .then((response) => {
                props.setSnackbarDisplay("success", response);
            }).catch((error) => {
                props.setSnackbarDisplay("error", error);
            });
    };

    const handleDismissClick = () => {
        props.handleDialogClose(false);
    };

    const permanentDeleteAction = (
        <Button
            color="primary"
            onClick={handlePermanentDeleteClick}
        >
            Delete
        </Button>
    );

    const dismissAction = (
        <Button
            color="primary"
            onClick={handleDismissClick}
        >
            Dismiss
        </Button>
    );

    return (
        <DialogWrapper
            title={"Permanently Delete Resource"}
            contentText={message}
            isOpen={props.shouldDisplayDialog}
            actionPrimary={permanentDeleteAction}
            actionSecondary={dismissAction}
        />
    );
};

export default withSnackbar(PermanentDeleteDialog);
