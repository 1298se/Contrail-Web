import { Action } from "redux";
import * as constants from "../constants";

export interface IAppSetLoadingStateAction extends Action<constants.APP_SET_LOADING_USER_STATE> {
    type: constants.APP_SET_LOADING_USER_STATE;
    payload: boolean;
}

export type AppUiStateActions = IAppSetLoadingStateAction;
