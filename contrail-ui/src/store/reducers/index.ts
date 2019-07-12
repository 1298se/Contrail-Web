import { combineReducers } from "redux";
import { IAppReduxState } from "../store.types";
import appUIStateReducer from "./appUiStateReducer";
import authReducer from "./authReducer";

const rootReducer = combineReducers<IAppReduxState>({
  authState: authReducer,
});

export default rootReducer;
