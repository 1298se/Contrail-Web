import { combineReducers } from "redux";
import authReducer from "./authReducer";
import uploadDialogReducer from "./uploadDialogReducer";

const rootReducer = combineReducers({
  authState: authReducer,
  uploadDialogState: uploadDialogReducer,
});

export default rootReducer;
