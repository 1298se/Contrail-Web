import { applyMiddleware, createStore } from "redux";
import ReduxThunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};
const middleWare = [ReduxThunk];
const store = createStore(rootReducer, initialState, applyMiddleware(...middleWare));

export default store;
