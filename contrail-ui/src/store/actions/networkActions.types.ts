import { Action } from "redux";
import * as constants from "../constants";

export interface INetworkSetConnectionStateAction extends Action<constants.NETWORK_SET_CONNECTION_STATE> {
    type: constants.NETWORK_SET_CONNECTION_STATE;
    connectionState: boolean;
}

export type NetworkActions = INetworkSetConnectionStateAction;
