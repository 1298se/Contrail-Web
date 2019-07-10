import { combineReducers } from "redux";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  authState: authReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;
