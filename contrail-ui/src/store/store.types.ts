import { IAuthState } from "./reducers/authReducer.types";

export interface IAppReduxState {
    readonly authState: IAuthState;
}
