import Button from "@material-ui/core/Button";
import React from "react";
import { addResourcesToTrash } from "../../../firebase/controllers/filesController";
import DialogWrapper from "../../feedback/dialog-wrapper/DialogWrapper";
import { TrashDialogProps } from "./trashDialog.types";

const TrashDialog = (props: TrashDialogProps) => {

    const unshareMessage = "Your selected file(s) contain shares to other users.\
                        Do you want to unshare before removing them?";

    const handleCancelClick = () => {
        props.handleDialogClose();
    };

    const handleUnshareClick = () => {
        props.handleDialogClose();
        return addResourcesToTrash(props.selectedResources, true)
            .then(() => {
                props.setSnackbarDisplay("success", "File(s) have been successfully trashed.");
            }).catch((error) => {
                props.setSnackbarDisplay("error", error);
            });
    };

    const handleTrashClick = () => {
        props.handleDialogClose();
        return addResourcesToTrash(props.selectedResources, false)
            .then(() => {
                props.setSnackbarDisplay("success", "File(s) have been successfully trashed.");
            }).catch((error) => {
                props.setSnackbarDisplay("error", error);
            });
    };

    const unshareTrashAction =
        (
            <Button
                onClick={handleUnshareClick}
                color="primary"
            >
                Unshare and Remove
            </Button>
        );

    const trashOnlyAction =
        (
            <Button
                onClick={handleTrashClick}
                color="primary"
            >
                Remove
            </Button>
        );

    const dismissAction = (
        <Button
            onClick={handleCancelClick}
            color="primary"
        >
            Cancel
        </Button>
    );

    return (
        <DialogWrapper
            title={"File(s) contain shares to other users."}
            contentText={unshareMessage}
            isOpen={props.shouldDisplayDialog}
            actionPrimary={dismissAction}
            actionSecondary={trashOnlyAction}
            actionTertiary={unshareTrashAction}
        />
    );
};

export default TrashDialog;
