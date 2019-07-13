export interface IAppDispatchProps {
    fetchUser: () => void;
}

export interface IAppStateProps {
    isLoading: boolean;
}

export type IAppProps = IAppDispatchProps & IAppStateProps;
