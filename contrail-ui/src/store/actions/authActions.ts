
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { authRef } from "../../firebase/firebase";
import * as auth from "../../utils/firebase/auth-utils";
import * as constants from "../constants";
import { IAppReduxState } from "../store.types";
import { IAuthFetchUserAction } from "./authActions.types";

export const fetchUserAction = (): ThunkAction<void, {}, null, IAuthFetchUserAction> => (dispatch) => {
    authRef.onIdTokenChanged((user) => {
        if (user) {
            auth.getUserToken().then((token) => {
                dispatch({
                    type: constants.AUTH_USER_FETCH_USER,
                    authUser: user,
                    authToken: token,
                });
            });
        } else {
            dispatch({
                type: constants.AUTH_USER_FETCH_USER,
                authUser: null,
                authToken: null,
            });
        }
    });
};

export const authUserLoginAction = (
    email: string, password: string,
): ThunkAction<void, IAppReduxState, null, Action<string>> => (dispatch) => {
    auth.loginUser(email, password)
        .catch((error) => {
            dispatch({
                type: constants.AUTH_USER_LOGIN,
                loginError: error,
            });
        });
};

export const authUserLogoutAction = (
): ThunkAction<void, IAppReduxState, null, Action<string>> => (dispatch) => {
    auth.logoutUser()
        .catch((error) => {
            dispatch({
                type: constants.AUTH_USER_LOGIN,
                logoutError: error,
            });
        });
};
