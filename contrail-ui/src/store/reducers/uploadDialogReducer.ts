
import { Reducer } from "redux";
import { IUploadDialogAction } from "../actions/uploadDialogActions.types";
import { UPLOAD_DIALOG_CLOSE, UPLOAD_DIALOG_OPEN } from "../constants";
import * as types from "./uploadDialogReducer.types";

const initialUploadDialogState: types.IUploadDialogState = {
    dialogOpen: false,
};

const uploadDialogStateReducer: Reducer< ypes.IUploadDialogState, IUploadDialogAction> = (
    state = initialUploadDialogState,
    action,
) => {
    switch (action.type) {
        case UPLOAD_DIALOG_OPEN:
            return {
                ...state,
                dialogOpen: true,
            };
        case UPLOAD_DIALOG_CLOSE:
            return {
                ...state,
                dialogOpen: false,
            };
        default:
            return state;
    }
};

export default uploadDialogStateReducer;
