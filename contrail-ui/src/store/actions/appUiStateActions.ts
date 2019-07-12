import * as constants from "../constants";
import { IAppSetLoadingStateAction } from "./appUiStateActions.types";

export const setAppLoadingState = (isLoading: boolean): IAppSetLoadingStateAction => {
    return {
        type: constants.APP_SET_LOADING_STATE,
        payload: isLoading,
    };
};
