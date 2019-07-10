import * as constants from "./constants";

export interface IAuthState {
    authUser: firebase.User;
    authToken: string;
    authError: string;
}

export interface IAuthFetchUser {
    type: constants.AUTH_USER_FETCH_USER;
    authUser: firebase.User;
    authToken: string;
}

export interface IAuthFetchUserError {
    type: constants.AUTH_USER_FETCH_USER_ERROR;
    fetchError: string;
}

export interface IAuthLoginUserError {
    type: constants.AUTH_USER_LOGIN_ERROR;
    loginError: string;
}
export interface IAuthUserLogoutError {
    type: constants.AUTH_USER_LOGOUT_ERROR;
    logoutError: string;
}

export type AuthTypes = IAuthFetchUser | IAuthFetchUserError
    | IAuthLoginUserError | IAuthUserLogoutError;

