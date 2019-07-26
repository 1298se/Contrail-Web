export interface IAppUiState {
    readonly isLoading: boolean;
    readonly initLoadState: IAppLoadingState;
    readonly dialogState: IAppDialogState;
}

interface IAppDialogState {
    uploadDialogDisplay: boolean;
}

interface IAppLoadingState {
    isFetchingUser: boolean;
}
