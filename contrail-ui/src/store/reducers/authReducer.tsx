import * as firebase from "firebase/app";
import { AuthTypes } from "../actions/authActions";

const INITIAL_STATE = {
    authUser: null,
    authToken: null,
};

function authReducer(state = INITIAL_STATE, action: AuthTypes): any {
    switch (action.type) {
        case "AUTH_USER_LOGIN": {
            return {
                ...state,
                authUser: action.user,
                authToken: action.authToken,
            };
        }
        case "AUTH_USER_LOGOUT": {
            return {
                ...state,
                authUser: null,
                authToken: null,
            };
        }
        default:
            return state;
    }
}

export default authReducer;
