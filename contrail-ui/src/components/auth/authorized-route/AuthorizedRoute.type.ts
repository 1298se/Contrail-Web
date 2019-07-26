export interface IAuthorizedOwnProps {
    component?: any;
    path: string;
}

export interface IAuthorizedStateProps {
    authToken?: string | null;
    authUser?: firebase.User | null;
}

export type IAuthorizedProps = IAuthorizedOwnProps & IAuthorizedStateProps;
