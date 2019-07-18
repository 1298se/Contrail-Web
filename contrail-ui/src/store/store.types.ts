import { IAppUiState } from "./reducers/appUiStateReducer.types";
import { IAuthState } from "./reducers/authReducer.types";
import { INetworkState } from "./reducers/networkReducer.types";

export interface IAppReduxState {
    readonly authState: IAuthState;
    readonly appUiState: IAppUiState;
    readonly networkState: INetworkState;
}
