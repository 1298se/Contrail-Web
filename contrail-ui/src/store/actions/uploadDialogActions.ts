import * as constants from "../constants";
import { IUploadDialogCloseAction, IUploadDialogOpenAction } from "./";

export const uploadDialogOpen = (): IUploadDialogOpenAction => {
    return {
        type: constants.UPLOAD_DIALOG_OPEN,
    };
};

export const uploadDialogClose = (): IUploadDialogCloseAction => {
    return {
        type: constants.UPLOAD_DIALOG_CLOSE,
    };
};
