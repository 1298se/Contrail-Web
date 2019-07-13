export interface IAppUiState {
    readonly isLoading: boolean;
    readonly loadState: IAppLoadingState;
}

interface IAppLoadingState {
    isFetchingUser: boolean;
}
