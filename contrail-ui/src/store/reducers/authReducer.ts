import { AUTH_USER_FETCH_USER, AUTH_USER_LOGIN_ERROR, AUTH_USER_LOGOUT_ERROR} from "../constants";
import { AuthTypes } from "../store.types";

const INITIAL_STATE = {
    authUser: null,
    authToken: null,
    authError: {
        loginError: null,
        logoutError: null,
    },
};

function authReducer(state = INITIAL_STATE, action: AuthTypes): any {
    switch (action.type) {
        case AUTH_USER_FETCH_USER:
            return {
                authUser: action.authUser,
                authToken: action.authToken,
                authError: {
                    loginError: null,
                    logoutError: null,
                },
            };
        case AUTH_USER_LOGIN_ERROR:
            return {
                ...state,
                authError: {
                    ...state.authError,
                    loginError: action.loginError,
                },
            };
        case AUTH_USER_LOGOUT_ERROR:
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
}

export default authReducer;
