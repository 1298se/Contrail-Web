import { combineReducers } from "redux";
import { IAppReduxState } from "../store.types";
import appUiStateReducer from "./appUiStateReducer";
import authReducer from "./authReducer";

const rootReducer = combineReducers<IAppReduxState>({
  authState: authReducer,
  appUiState: appUiStateReducer,
});

export default rootReducer;
