import { Action } from "redux";
import { IUserResourceModel, IUserResources } from "../../types/resource.types";
import * as constants from "../constants";

export interface IResourceFetchAllAction extends Action<constants.RESOURCE_FETCH_ALL> {
    type: constants.RESOURCE_FETCH_ALL;
    payload: IUserResources;
}

export interface IResourceSetSelected extends Action<constants.RESOURCE_SET_SELECTED> {
    type: constants.RESOURCE_SET_SELECTED;
    payload: IUserResourceModel[];
}

export type ResourceActions = IResourceFetchAllAction | IResourceSetSelected;
