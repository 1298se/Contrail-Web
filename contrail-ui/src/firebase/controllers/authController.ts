
import * as firebase from "firebase/app";
import { authRef, dbRef } from "../firebase";

/**
 * A class for handling all things involving authentication that requires {@link firebase}
 * *Note*: Firebase must be initialized before calling any of these functions.
 */

/**
 * Regex for email
 */
// tslint:disable-next-line: max-line-length
export const emailRegex = RegExp(/^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
export const passwordRegex = RegExp(/^\S*$/);

export const minPasswordLength = 6;
export const minDisplayNameLength = 3;

/**
 * Errors for auth forms.
 */
export const DISPLAY_NAME_LENGTH_ERROR = "Username must have a minimum of 4 characters.";
export const EMAIL_REGEX_ERROR = "Please enter a valid email address.";
export const PASSWORD_LENGTH_ERROR = "Password must have a minimum of 6 characters.";
export const PASSWORD_NO_WHITESPACE = "Password must not contain whitespace.";

/**
 * Registers a user to Firebase with their email and password. Then, updates their firebase
 * display name and sends a verification email to the user.
 *
 * @param displayName the user's display name received from registration
 * @param email the user's email received from registration.
 * @param password the user's password received from registration.
 * @returns a {@link Promise} that resolves or rejects with the error.
 */

export function registerUser(displayName: string, email: string, password: string):
    Promise<any> {

    return new Promise(async (resolve, reject) => {
        try {
            const userCredentials = await authRef.createUserWithEmailAndPassword(email, password);
            const currentUser = userCredentials.user;
            if (currentUser == null) {
                reject("The current user is null.");
            } else {
                await currentUser.updateProfile({ displayName });
                addUserToDb(currentUser)
                .then(async () => {
                    try {
                        await currentUser.sendEmailVerification();
                        await authRef.signOut();
                        resolve();
                    } catch (error) {
                        reject(error.message);
                    }
                })
                .catch(async (error) => {
                    try {
                        await currentUser.delete();
                        reject(error.message);
                    } catch (error) {
                        reject(error.message);
                    }
                });
            }
        } catch (error) {
            reject(error.message);
        }
    });
}

export function addUserToDb(user: firebase.User): Promise<any> {
    return new Promise((resolve, reject) => {
        dbRef.collection("users").doc(user.uid).collection("root").doc("resources").set({
            root: [],
            favourites: [],
            trash: [],
            sharedTo: [],
            sharedBy: [],
        })
        .then(() => {
            resolve();
        })
        .catch((error) => {
            reject(error.message);
        });
    });
}

/**
 * Logins a user to Firebase.
 *
 * @param email the user's email received from login
 * @param password the user's password received from login
 * @return a {@link Promise} that resolves with the current user, or rejects with the error
 */
export function loginUser(email: string, password: string): Promise<firebase.User | null> {
    return new Promise((resolve, reject) => {
        authRef.signInWithEmailAndPassword(email, password).then(() => {
            const user = authRef.currentUser;
            if (user === null) {
                resolve(null);
            } else {
                resolve(user);
            }
        }).catch((error) => {
            reject(error.message);
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
                reject(error.message);
            });
    });
}

/**
 * Gets the ID Token of a current user, or null.
 *
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
                reject(error.message);
            });
        }
    });
}

/**
 * Sends a verification email to the current authenticated user.
 *
 * @returns a {@link Promise} that resolve or rejects with the error.
 */
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
