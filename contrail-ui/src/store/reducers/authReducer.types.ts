export interface IAuthState {
    readonly authUser: firebase.User | null;
    readonly authToken: string | null;
}
