import { combineReducers } from "redux";
import authReducer from "./authReducer";
import fileUploadReducer from "./fileUploadReducer";

const rootReducer = combineReducers({
  authState: authReducer,
  fileUploadState: fileUploadReducer,
});

export default rootReducer;
