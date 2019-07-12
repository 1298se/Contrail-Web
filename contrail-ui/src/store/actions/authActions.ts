
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { authRef } from "../../firebase/firebase";
import * as auth from "../../utils/firebase/auth-utils";
import * as constants from "../constants";
import { IAppSetLoadingStateAction } from "./appUiStateActions.types";
import { IAuthFetchUserAction, IAuthLoginUserAction } from "./authActions.types";

export const fetchUserAction =
(): ThunkAction<void, {}, null, IAuthFetchUserAction | IAppSetLoadingStateAction> =>
(dispatch) => {
    dispatch({
        type: constants.APP_SET_LOADING_STATE,
        payload: true,
    });
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
        dispatch({
            type: constants.APP_SET_LOADING_STATE,
            payload: false,
        });
    });
};

export const loginUserAction = (
    email: string, password: string,
): ThunkAction<void, {}, {}, IAuthLoginUserAction> => (dispatch) => {
    auth.loginUser(email, password)
        .then(() => {
            dispatch({
                type: constants.AUTH_USER_LOGIN,
                loginError: null,
            });
        })
        .catch((error) => {
            dispatch({
                type: constants.AUTH_USER_LOGIN,
                loginError: error,
            });
        });
};

export const logoutUserAction = (
): ThunkAction<void, {}, null, Action<string>> => (dispatch) => {
    auth.logoutUser()
        .catch((error) => {
            dispatch({
                type: constants.AUTH_USER_LOGIN,
                logoutError: error,
            });
        });
};
