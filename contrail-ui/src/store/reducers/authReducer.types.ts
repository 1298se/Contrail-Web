export interface IAuthState {
    readonly authUser: firebase.User | null;
    readonly authToken: string | null;
    readonly authError: IAuthError;
}

interface IAuthError {
    readonly loginError: any;
    readonly logoutError: any;
}
