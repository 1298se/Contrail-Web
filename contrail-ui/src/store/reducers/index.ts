import { combineReducers } from "redux";
import { IAppReduxState } from "../store.types";
import appUiStateReducer from "./appUiStateReducer";
import authReducer from "./authReducer";
import networkReducer from "./networkReducer";

const rootReducer = combineReducers<IAppReduxState>({
  authState: authReducer,
  appUiState: appUiStateReducer,
  networkState: networkReducer,
});

export default rootReducer;
