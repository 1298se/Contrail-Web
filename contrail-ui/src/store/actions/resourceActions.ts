import { ThunkAction } from "redux-thunk";
import * as constants from "../constants";
import * as actions from "./resourceActions.types";
import axios from "axios";

export const fetchRootResources =
    (): ThunkAction<Promise<any>, {}, null, actions.IResourceFetchAllAction | IAppSetResourceLoadingAction> =>
        (dispatch) => {
            return new Promise((resolve, reject) => {
                
            });
        }