import { ThunkAction } from "redux-thunk";
import * as constants from "../constants";
import * as types from "./networkActions.types";

export const setNetworkState =
    (isConnected: boolean): ThunkAction<void, {}, null, types.INetworkSetConnectionStateAction> =>
        (dispatch) => {
            dispatch({
                type: constants.NETWORK_SET_CONNECTION_STATE,
                connectionState: isConnected,
            });
        };
