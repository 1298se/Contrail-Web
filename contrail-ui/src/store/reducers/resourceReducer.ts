import { Reducer } from "redux";
import { ResourceActions } from "../actions/resourceActions.types";
import * as constants from "../constants";
import * as types from "./resourceReducer.types";

const initialResourceState: types.IResourceState = {
    userResources: {
        favourites: [],
        root: [],
        sharedBy: [],
        sharedTo: [],
        trash: [],
    },
};

const resourceReducer: Reducer<types.IResourceState, ResourceActions> =
    (state = initialResourceState, action) => {
        switch (action.type) {
            case constants.RESOURCE_FETCH_ALL:
                return {
                    ...state,
                    userResources: action.payload,
                };
            default: return state;
        }
    };

export default resourceReducer;
