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
                        dispatch({
                            type: constants.RESOURCE_FETCH_ALL,
                            payload: response.data,
                        });
                        dispatch(setAppResourceLoadingState(false));
                        resolve();
                    } else {
                        // TODO: Handle error response
                    }
                })
                .catch((error) => {
                    dispatch(setAppResourceLoadingState(false));
                    reject(error.message);
                });
            });
        };
