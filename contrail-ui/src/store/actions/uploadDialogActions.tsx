import * as constants from "../constants";

export interface IUploadDialogOpen {
    type: constants.UPLOAD_DIALOG_OPEN;
}

export interface IUploadDialogClose {
    type: constants.UPLOAD_DIALOG_CLOSE;
}

export type AuthTypes = IUploadDialogOpen | IUploadDialogClose;

export function uploadDialogOpen(): IUploadDialogOpen {
    return {
        type: constants.UPLOAD_DIALOG_OPEN,
    };
}

export function uploadDialogClose(): IUploadDialogClose {
    return {
        type: constants.UPLOAD_DIALOG_CLOSE,
    };
}
