export interface IAppUiState {
    readonly isLoading: boolean;
    readonly initLoadState: IAppLoadingState;
}

interface IAppLoadingState {
    isFetchingUser: boolean;
}
