export interface IAppUiState {
    readonly isLoading: boolean;
    readonly appLoadState: IAppLoadingState;
    readonly dialogState: IAppDialogState;
}

export interface IAppDialogState {
    uploadDialogOpen: boolean;
    shareDialogOpen: boolean;
}

export interface IAppLoadingState {
    isFetchingUser: boolean;
    isFetchingRootResources: boolean;
}
