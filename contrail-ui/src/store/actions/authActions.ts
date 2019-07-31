import axios from "axios";
import { ThunkAction } from "redux-thunk";
import * as auth from "../../firebase/controllers/authController";
import { authRef } from "../../firebase/firebase";
import * as constants from "../constants";
import { setAppUserLoadingState } from "./appUiStateActions";
import { IAppSetUserLoadingAction } from "./appUiStateActions.types";
import * as actions from "./authActions.types";

/**
 * A {@link ThunkAction} to update the Redux state with the user's user object and tokenId
 * This action should be dispatched in the App componentDidMount to initialize the listener when the app starts.
 * This also dispatches {@link IAppSetLoadingStateAction} to set the loading state for fetching user to false
 * after the listener initiates.
 */
export const setAuthListener =
    (): ThunkAction<void, {}, null, actions.IAuthFetchUserAction | IAppSetUserLoadingAction> =>
        (dispatch) => {
            dispatch(setAppUserLoadingState(true));
            authRef.onAuthStateChanged((user) => {
                if (user) {
                    auth.getUserToken().then((token) => {
                        axios.defaults.headers.common.Authorization = `${token}`;
                        dispatch({
                            type: constants.AUTH_USER_FETCH_USER,
                            authUser: user,
                            authToken: token,
                        });
                        dispatch(setAppUserLoadingState(false));
                    });
                } else {
                    dispatch({
                        type: constants.AUTH_USER_FETCH_USER,
                        authUser: null,
                        authToken: null,
                    });
                    delete axios.defaults.headers.common.Authorization;
                    dispatch(setAppUserLoadingState(false));
                }
            });
        };
