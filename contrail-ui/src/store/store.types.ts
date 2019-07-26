import { IAppUiState } from "./reducers/appUiStateReducer.types";
import { IAuthState } from "./reducers/authReducer.types";
import { INetworkState } from "./reducers/networkReducer.types";
import { IUploadDialogState } from "./reducers/uploadDialogReducer.types";

export interface IAppReduxState {
    readonly authState: IAuthState;
    readonly appUiState: IAppUiState;
    readonly networkState: INetworkState;
    readonly uploadDialogState: IUploadDialogState;
}
