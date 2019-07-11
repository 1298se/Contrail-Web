import { Action } from "redux";
import * as constants from "../constants";

export interface IAuthFetchUserAction extends Action<constants.AUTH_USER_FETCH_USER> {
    type: constants.AUTH_USER_FETCH_USER;
    authUser: firebase.User | null;
    authToken: string | null;
}

export interface IAuthLoginUserAction extends Action<constants.AUTH_USER_LOGIN> {
    type: constants.AUTH_USER_LOGIN;
    loginError: any;
}
export interface IAuthUserLogoutAction extends Action<constants.AUTH_USER_LOGOUT> {
    type: constants.AUTH_USER_LOGOUT;
    logoutError: any;
}

export type AuthActions =
    IAuthFetchUserAction
    | IAuthLoginUserAction
    | IAuthUserLogoutAction;
