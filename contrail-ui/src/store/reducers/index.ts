import { combineReducers } from "redux";
import { IAppReduxState } from "../store.types";
import appUiStateReducer from "./appUiStateReducer";
import authReducer from "./authReducer";
import networkReducer from "./networkReducer";
import resourceReducer from "./resourceReducer";

const rootReducer = combineReducers<IAppReduxState>({
  authState: authReducer,
  appUiState: appUiStateReducer,
  networkState: networkReducer,
  resourceState: resourceReducer,
});

export default rootReducer;
