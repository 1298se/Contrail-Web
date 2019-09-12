import Button from "@material-ui/core/Button";
import React from "react";
import { addResourcesToTrash } from "../../../firebase/controllers/filesController";
import DialogWrapper from "../../feedback/dialog-wrapper/DialogWrapper";
import { TrashDialogProps } from "./trashDialog.types";

const TrashDialog = (props: TrashDialogProps) => {

    const unshareMessage = "You have shares associated with these selected files.\
                           Do you want to unshare before you trash?";

    const handleCancelClick = () => {
        props.handleDialogClose();
    };

    const handleUnshareClick = () => {
        return addResourcesToTrash(props.selectedResources, true)
            .then(() => {
                props.setSnackbarDisplay("success", "File(s) have been successfully trashed.");
                props.handleDialogClose();
            }).catch((error) => {
                props.setSnackbarDisplay("error", error);
            });
    };

    const handleTrashClick = () => {
        return addResourcesToTrash(props.selectedResources, false)
            .then(() => {
                props.setSnackbarDisplay("success", "File(s) have been successfully trashed.");
                props.handleDialogClose();
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
                Unshare and Trash
            </Button>
        );

    const trashOnlyAction =
        (
            <Button
                onClick={handleTrashClick}
                color="primary"
            >
                Trash only
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
            title={"Unshare and Trash"}
            contentText={unshareMessage}
            isOpen={props.shouldDisplayDialog}
            actionPrimary={dismissAction}
            actionSecondary={trashOnlyAction}
            actionTertiary={unshareTrashAction}
        />
    );
};

export default TrashDialog;
