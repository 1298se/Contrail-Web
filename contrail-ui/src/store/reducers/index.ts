import { combineReducers } from "redux";
import { IAppReduxState } from "../store.types";
import appUiStateReducer from "./appUiStateReducer";
import authReducer from "./authReducer";
import networkReducer from "./networkReducer";
import uploadDialogReducer from "./uploadDialogReducer";

const rootReducer = combineReducers<IAppReduxState>({
  authState: authReducer,
  appUiState: appUiStateReducer,
  networkState: networkReducer,
  uploadDialogState: uploadDialogReducer,
});

export default rootReducer;
