export interface IAuthState {
    readonly authUser: firebase.User | null;
    readonly authToken: string | null;
    readonly authError: IAuthError;
}

interface IAuthError {
    loginError: any;
    logoutError: any;
}
