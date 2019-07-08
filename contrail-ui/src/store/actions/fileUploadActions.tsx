import * as constants from "../constants";

export interface IFileUploadOpen {
    type: constants.FILE_UPLOAD_OPEN;
}

export interface IFileUploadClose {
    type: constants.FILE_UPLOAD_CLOSE;
}

export type AuthTypes = IFileUploadOpen | IFileUploadClose;

export function fileUploadOpen(): IFileUploadOpen {
    return {
        type: constants.FILE_UPLOAD_OPEN,
    };
}

export function fileUploadClose(): IFileUploadClose {
    return {
        type: constants.FILE_UPLOAD_CLOSE
    };
}
