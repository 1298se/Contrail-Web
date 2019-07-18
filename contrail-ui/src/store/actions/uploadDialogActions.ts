import * as constants from "../constants";
import { IUploadDialogCloseAction, IUploadDialogOpenAction } from "./uploadDialogActions.types";

export const uploadDialogOpenAction = (): IUploadDialogOpenAction => {
    return {
        type: constants.UPLOAD_DIALOG_OPEN,
    };
};

export const uploadDialogCloseAction = (): IUploadDialogCloseAction => {
    return {
        type: constants.UPLOAD_DIALOG_CLOSE,
    };
};
