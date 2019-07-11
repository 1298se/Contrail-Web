import { Reducer } from "redux";
import { AuthActions } from "../actions/authActions.types";
import { AUTH_USER_FETCH_USER, AUTH_USER_LOGIN, AUTH_USER_LOGOUT} from "../constants";
import * as types from "./authReducer.types";

const initialAuthState: types.IAuthState = {
    authUser: null,
    authToken: null,
    authError: {
        loginError: null,
        logoutError: null,
    },
};

const authReducer: Reducer<types.IAuthState, AuthActions> = (
    state = initialAuthState,
    action,
) => {
    switch (action.type) {
        case AUTH_USER_FETCH_USER:
            return {
                ...state,
                authUser: action.authUser,
                authToken: action.authToken,
            };
        case AUTH_USER_LOGIN:
            return {
                ...state,
                authError: {
                    ...state.authError,
                    loginError: action.loginError,
                },
            };
        case AUTH_USER_LOGOUT:
            return {
                ...state,
                authError: {
                    ...state.authError,
                    logoutError: action.logoutError,
                },
            };
        default:
            return state;
    }
};

export default authReducer;
