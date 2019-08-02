export interface IAuthorizedOwnProps {
    component: React.ComponentType;
    path: string;
}

export interface IAuthorizedStateProps {
    authToken?: string | null;
    authUser?: firebase.User | null;
}

export type IAuthorizedProps = IAuthorizedOwnProps & IAuthorizedStateProps;
