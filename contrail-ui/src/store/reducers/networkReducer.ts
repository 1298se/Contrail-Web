import { Reducer } from "redux";
import { NetworkActions } from "../actions/networkActions.types";
import * as constants from "../constants";
import { INetworkState } from "./networkReducer.types";

const initialNetworkState: INetworkState = {
    hasInternetConnection: true,
};

const networkReducer: Reducer<INetworkState, NetworkActions> = (state = initialNetworkState, action) => {
    switch (action.type) {
        case constants.NETWORK_SET_CONNECTION_STATE:
            return {
                ...state,
                hasInternetConnection: action.connectionState,
            };
        default: return state;
    }
};

export default networkReducer;
