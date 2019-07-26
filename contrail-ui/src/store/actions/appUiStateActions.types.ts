import { Action } from "redux";
import * as constants from "../constants";

export interface IAppSetUserLoadingAction extends Action<constants.APP_SET_LOADING_USER_STATE> {
    type: constants.APP_SET_LOADING_USER_STATE;
    payload: boolean;
}

export interface IAppSetUploadDialogOpenAction extends Action<constants.APP_SET_UPLOAD_DIALOG_OPEN> {
    type: constants.APP_SET_UPLOAD_DIALOG_OPEN;
    payload: boolean;
}

export type AppUiStateActions = IAppSetUserLoadingAction | IAppSetUploadDialogOpenAction;
