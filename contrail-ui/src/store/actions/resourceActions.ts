import axios from "axios";
import { ThunkAction } from "redux-thunk";
import { authRef, dbRef } from "../../firebase/firebase";
import { IResourceModel, IUserResources } from "../../types/resource.types";
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
                            reject(response.statusText);
                        }
                    })
                    .catch((error) => {
                        dispatch(setAppResourceLoadingState(false));
                        reject(error.response.data);
                    });
            });
        };

export const setResourceListener =
    (): ThunkAction<Promise<any>, {}, null, actions.IResourceFetchAllAction> =>
        (dispatch) => {
            return new Promise(async (resolve, reject) => {
                const user = authRef.currentUser;
                if (user == null) {
                    reject("current user is null");
                    return;
                }
                const doc = dbRef.collection("users").doc(user.uid).collection("root").doc("resources");
                try {
                    const unsubscribe = await doc.onSnapshot((docSnapshot) => {
                        if (docSnapshot.data === undefined) {
                            reject("snapshot data is undefined");
                            return;
                        }
                        dispatch({
                            type: constants.RESOURCE_FETCH_ALL,
                            payload: docSnapshot.data() as IUserResources,
                        });
                    });
                    resolve(unsubscribe);
                } catch (error) {
                    reject(error.message);
                }
            });
        };

export const setSelectedResources = (resources: IResourceModel[]): actions.IResourceSetSelected => {
    return {
        type: constants.RESOURCE_SET_SELECTED,
        payload: resources,
    };
};
