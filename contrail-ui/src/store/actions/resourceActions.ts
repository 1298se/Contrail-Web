import axios from "axios";
import { ThunkAction } from "redux-thunk";
import * as constants from "../constants";
import { setAppResourceLoadingState } from "./appUiStateActions";
import { IAppSetResourceLoadingAction } from "./appUiStateActions.types";
import * as actions from "./resourceActions.types";

export const fetchRootResources =
    (): ThunkAction<Promise<any>, {}, null, actions.IResourceFetchAllAction | IAppSetResourceLoadingAction> =>
        (dispatch) => {
            dispatch(setAppResourceLoadingState(true));
            return new Promise((resolve, reject) => {
                axios.get("/resources")
                .then((response) => {
                    if (response.status === 200) {
                        dispatch(setAppResourceLoadingState(false));
                        dispatch({
                            type: constants.APP_SET_LOADING_RESOURCE_STATE,
                            payload: response.data,
                        });
                        resolve();
                    }
                })
                .catch((error) => {
                    dispatch(setAppResourceLoadingState(false));
                    reject(error);
                });
            });
        };
