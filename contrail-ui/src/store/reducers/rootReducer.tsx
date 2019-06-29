import { combineReducers } from "redux";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  authState: authReducer,
});

export default rootReducer;
