
import axios, { AxiosError, AxiosResponse } from "axios";
import * as firebase from "firebase/app";
import { authRef } from "../firebase";

// tslint:disable: no-console

/**
 * Regex for email
 */
// tslint:disable-next-line: max-line-length
export const emailRegex = RegExp(/^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
export const passwordRegex = RegExp(/^\S*$/);

export const minPasswordLength = 6;
export const minDisplayNameLength = 3;

/**
 * Registers a user to the server.
 *
 * @param displayName the user's display name received from registration
 * @param email the user's email received from registration.
 * @param password the user's password received from registration.
 * @returns a {@link Promise} that resolves or rejects with the error.
 */

export function registerUser(displayName: string, email: string, password: string):
    Promise<AxiosResponse | AxiosError> {
    const user = {
        displayName,
        email,
        password,
    };

    return new Promise((resolve, reject) => {
        axios.post("/register", user)
            .then(() => {
                resolve();
            })
            .catch((error) => {
                reject(error);
            });
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

export function sendEmailVerification(): Promise<void> {
    return new Promise((resolve, reject) => {
        const user = authRef.currentUser;
        if (user === null) {
            reject();
        } else {
            user.sendEmailVerification()
            .then(() => {
                resolve();
            });
        }
    });
}
