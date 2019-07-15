import { Action } from "redux";
import * as constants from "../constants";

export interface IAuthFetchUserAction extends Action<constants.AUTH_USER_FETCH_USER> {
    type: constants.AUTH_USER_FETCH_USER;
    authUser: firebase.User | null;
    authToken: string | null;
}

export type AuthActions = IAuthFetchUserAction;
