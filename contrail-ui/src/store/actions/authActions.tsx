
import * as firebase from "firebase/app";
import * as constants from "../constants";

export interface IAuthUserLogin {
    type: constants.AUTH_USER_LOGIN;
    user: firebase.User;
    authToken: string;
}

export interface IAuthUserLogout {
    type: constants.AUTH_USER_LOGOUT;
}

export type AuthTypes = IAuthUserLogin | IAuthUserLogout;

export function authUserLogin(user: firebase.User, authToken: string): IAuthUserLogin {
    return {
        type: constants.AUTH_USER_LOGIN,
        authToken,
        user,
    };
}

export function authUserLogout(): IAuthUserLogout {
    return {
        type: constants.AUTH_USER_LOGOUT,
    };
}
