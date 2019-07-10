export interface IAuthState {
    authUser: firebase.User;
    authToken: string;
    authError: string;
}
