
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { authRef } from "../../firebase/firebase";
import * as constants from "../constants";
import { IAppSetLoadingStateAction } from "./appUiStateActions.types";

export const setAppLoadingState =
(isLoading: boolean): ThunkAction<void, {isLoading: false}, null, IAppSetLoadingStateAction> =>
 (dispatch) => {
     dispatch ({
         type: constants.APP_SET_LOADING_STATE,
         payload: isLoading,
     });
};
