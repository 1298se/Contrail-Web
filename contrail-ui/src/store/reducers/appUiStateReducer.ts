import { Reducer } from "redux";
import { AppUiStateActions } from "../actions/appUiStateActions.types";
import { APP_SET_LOADING_STATE} from "../constants";
import * as types from "./appUiStateReducer.types";

const initialAppUiState: types.IAppUiState = {
    isLoading: false,
};

const appUiStateReducer: Reducer<types.IAppUiState, AppUiStateActions> = (
    state = initialAppUiState,
    action,
) => {
    switch (action.type) {
        case APP_SET_LOADING_STATE:
            return {
                ...state,
                isLoading: action.payload,
            };
        default:
            return state;
    }
};

export default appUiStateReducer;
