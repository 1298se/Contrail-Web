import { Reducer } from "redux";
import { AuthActions } from "../actions/authActions.types";
import * as constants from "../constants";
import * as types from "./authReducer.types";

const initialAuthState: types.IAuthState = {
    authUser: null,
    authToken: null,
};

const authReducer: Reducer<types.IAuthState, AuthActions> =
    (state = initialAuthState, action) => {
        switch (action.type) {
            case constants.AUTH_USER_FETCH_USER:
                return {
                    ...state,
                    authUser: action.authUser,
                    authToken: action.authToken,
                };
            default: return state;
        }
    };

export default authReducer;
