export interface IAppUiState {
    readonly isLoading: boolean;
    readonly initLoadState: IAppLoadingState;
    readonly dialogState: IAppDialogState;
}

interface IAppDialogState {
    uploadDialogOpen: boolean;
}

interface IAppLoadingState {
    isFetchingUser: boolean;
}
