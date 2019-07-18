import { Action } from "redux";
import * as constants from "../constants";

export interface IUploadDialogOpenAction extends Action<constants.UPLOAD_DIALOG_OPEN> {
    type: constants.UPLOAD_DIALOG_OPEN;
}

export interface IUploadDialogCloseAction extends Action<constants.UPLOAD_DIALOG_CLOSE> {
    type: constants.UPLOAD_DIALOG_CLOSE;
}

export type IUploadDialogAction = IUploadDialogOpenAction & IUploadDialogCloseAction;
