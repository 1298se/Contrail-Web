import { IAppUiState } from "./reducers/appUiStateReducer.types";
import { IAuthState } from "./reducers/authReducer.types";
import { INetworkState } from "./reducers/networkReducer.types";
import { IResourceState } from "./reducers/resourceReducer.types";

export interface IAppReduxState {
    readonly authState: IAuthState;
    readonly appUiState: IAppUiState;
    readonly networkState: INetworkState;
    readonly resourceState: IResourceState;
}
