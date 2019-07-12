import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import ReduxThunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};
const middleWare = [ReduxThunk];
const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleWare)));

export default store;
