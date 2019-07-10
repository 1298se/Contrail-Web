import * as firebase from "firebase/app";
import { AuthTypes } from "../actions/authActions";
import { AUTH_USER_FETCH_USER } from "../constants";

const INITIAL_STATE = {
    authUser: null,
    authToken: null,
    authError: null,
};

function authReducer(state = INITIAL_STATE, action: AuthTypes): any {
    switch (action.type) {
        case AUTH_USER_FETCH_USER: {
            return {
                ...state,
                authUser: action.authUser,
                authToken: action.authToken,
            };
        }
        default:
            return state;
    }
}

export default authReducer;
