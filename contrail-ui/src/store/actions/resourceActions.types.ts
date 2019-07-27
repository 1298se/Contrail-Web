import { Action } from "redux";
import { IUserResources } from "../../types/resource.types";
import * as constants from "../constants";

export interface IResourceFetchAllAction extends Action<constants.RESOURCE_FETCH_ALL> {
    type: constants.RESOURCE_FETCH_ALL;
    payload: IUserResources;
}
