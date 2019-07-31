import { Reducer } from "redux";
import { AppUiStateActions } from "../actions/appUiStateActions.types";
import * as constants from "../constants";
import * as types from "./appUiStateReducer.types";

const initialAppUiState: types.IAppUiState = {
    isLoading: true,
    appLoadState: {
        isFetchingUser: true,
        isFetchingRootResources: false,
    },
    dialogState: {
        uploadDialogOpen: false,
        shareDialogOpen: true,
    },
};

const isAppLoading = (state: types.IAppLoadingState) => {
    for (const loadState of Object.values(state)) {
        if (loadState) {
            return true;
        }
    }
    return false;
};

const appUiStateReducer: Reducer<types.IAppUiState, AppUiStateActions> = (
    state = initialAppUiState,
    action,
) => {
    switch (action.type) {
        case constants.APP_SET_LOADING_USER_STATE: {
            const prevState: types.IAppUiState = state;
            prevState.appLoadState.isFetchingUser = action.payload;
            const appLoadState = isAppLoading(prevState.appLoadState);
            return {
                ...state,
                isLoading: appLoadState,
                appLoadState: {
                    ...state.appLoadState,
                    isFetchingUser: action.payload,
                },
            };
        }
        case constants.APP_SET_UPLOAD_DIALOG_OPEN: {
            return {
                ...state,
                dialogState: {
                    ...state.dialogState,
                    uploadDialogOpen: action.payload,
                },
            };
        }
        case constants.APP_SET_LOADING_RESOURCE_STATE: {
            const prevState: types.IAppUiState = state;
            prevState.appLoadState.isFetchingRootResources = action.payload;
            const appLoadState = isAppLoading(prevState.appLoadState);
            return {
                ...state,
                isLoading: appLoadState,
                appLoadState: {
                    ...state.appLoadState,
                    isFetchingRootResources: action.payload,
                },
            };
        }
        case constants.APP_SET_SHARE_DIALOG_OPEN: {
            return {
                ...state,
                dialogState: {
                    ...state.dialogState,
                    shareDialogOpen: action.payload,
                },
            };
        }
        default:
            return state;
    }
};

export default appUiStateReducer;
