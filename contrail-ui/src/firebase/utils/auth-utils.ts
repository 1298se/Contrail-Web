
import Axios, { AxiosAdapter, AxiosResponse } from "axios";
import * as firebase from "firebase/app";
import { authRef } from "../firebase";

// tslint:disable: no-console

/**
 * Regex for email
 */
// tslint:disable-next-line: max-line-length
export const emailRegex = RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
export const minPasswordLength = 6;
export const minDisplayNameLength = 3;

/**
 * Registers a user to Firebase, then logs in using {@link loginUser}.
 * *NOTE*: {@link initializeFirebase} must be called before this.
 * @param displayName the user's display name received from registration
 * @param email the user's email received from registration.
 * @param password the user's password received from registration.
 * @returns a {@link Promise} that resolves with the current user, or rejects with the error
 */
export function registerUser(displayName: string, email: string, password: string): Promise<null> {
    console.log("registering user");
    return new Promise((resolve, reject) => {
        authRef.createUserWithEmailAndPassword(email, password).then(() => {
            const user = authRef.currentUser;
            if (user === null) {
                console.error("registration failed: user is null");
                resolve(null);
            } else {
                console.log("registration successful: updating profile");
                user.updateProfile({
                    displayName,
                }).then(() => {
                    registerUserDb(user).then(() => {
                        resolve();
                    }).catch((error) => {
                        reject(error);
                    });
                }).catch((error) => {
                    console.error("profile update failed:  ", error);
                    reject(error);
                });
            }
        });
    });
}

/**
 * Registers a user to the backend server with @POST "/register".
 *
 * @param registerUserDb the current user's user object.
 * @returns a {@link Promise} that resolves, or rejects with error.
 */
export function registerUserDb(user: firebase.User | null): Promise<AxiosResponse | any> {

    return new Promise((resolve, reject) => {
        if (user != null) {
            user.getIdToken()
                .then((token) => {
                    Axios.post("/register", token)
                        .then((response) => {
                            resolve(response);
                        }).
                        catch((error) => {
                            reject(error);
                        });
                }).catch((error) => {
                    reject(error);
                });
        }
    });
}

/**
 * Logins a user to Firebase.
 * *NOTE* {@link initializeFirebase} must be called before this.
 * @param email the user's email received from login
 * @param password the user's password received from login
 * @return a {@link Promise} that resolves with the current user, or rejects with the error
 */
export function loginUser(email: string, password: string): Promise<firebase.User | null> {
    console.log("logging in user");
    return new Promise((resolve, reject) => {
        authRef.signInWithEmailAndPassword(email, password).then(() => {
            console.log("login successful");
            const user = authRef.currentUser;
            if (user === null) {
                console.error("login failed: user is null");
                resolve(null);
            } else {
                resolve(user);
            }
        }).catch((error) => {
            console.error("login failed: ", error);
            reject(error);
        });
    });
}

export function logoutUser(): Promise<string> {
    return new Promise((resolve, reject) => {
        authRef.signOut()
            .then(() => {
                resolve("success");
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/**
 * Gets the ID Token of a current user, or null
 * @returns a {@link Promise} that resolves null if there is no current user or the user's IDToken if there is,
 *  or rejects with error.
 */
export function getUserToken(): Promise<string | null> {
    return new Promise((resolve, reject) => {
        const user = authRef.currentUser;
        if (user === null) {
            resolve(null);
        } else {
            user.getIdToken(true).then((idToken) => {
                resolve(idToken);
            }).catch((error) => {
                reject(error);
            });
        }
    });
}
