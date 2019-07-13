import { Reducer } from "redux";
import { AppUiStateActions } from "../actions/appUiStateActions.types";
import { APP_SET_LOADING_USER_STATE } from "../constants";
import * as types from "./appUiStateReducer.types";

const initialAppUiState: types.IAppUiState = {
    isLoading: true,
    loadState: {
        isFetchingUser: true,
    },
};

const appUiStateReducer: Reducer<types.IAppUiState, AppUiStateActions> = (
    state = initialAppUiState,
    action,
) => {
    switch (action.type) {
        case APP_SET_LOADING_USER_STATE:
            const prevState: types.IAppUiState = state;
            prevState.loadState.isFetchingUser = action.payload;
            let loading = false;
            for (const isLoading of Object.values(prevState.loadState)) {
                if (isLoading) {
                    loading = true;
                }
            }
            prevState.loadState.isFetchingUser = action.payload;
            return {
                ...state,
                isLoading: loading,
                loadState: {
                    ...state.loadState,
                    isFetchingUser: action.payload,
                },
            };

        default:
            return state;
    }
};

export default appUiStateReducer;
