import { IAppUiState } from "./reducers/appUiStateReducer.types";
import { IAuthState } from "./reducers/authReducer.types";

export interface IAppReduxState {
    readonly authState: IAuthState;
    readonly appUIState: IAppUiState;
}
