
import * as firebase from "firebase/app";
import "firebase/auth";

// TODO: Call initializeFirebase in App component mount. *NOTE* It is currently
// initialized in Auth.js onMount, but it is initialized every time the component mounts
/**
 * Initializes Firebase authentication. Call when app starts.
 */

// tslint:disable: object-literal-sort-keys
// tslint:disable: no-console
export function initializeFirebase() {
    const firebaseConfig = {
        apiKey: "AIzaSyB9tiUIhIC_R9mAibHA71A8WM1Mt9euL0w",
        authDomain: "contrail-db.firebaseapp.com",
        databaseURL: "https://contrail-db.firebaseio.com",
        projectId: "contrail-db",
        storageBucket: "contrail-db.appspot.com",
        messagingSenderId: "342081308461",
        appId: "1:342081308461:web:229362ba93e13630",
    };
    firebase.initializeApp(firebaseConfig);
}

/**
 * Registers a user to Firebase. *NOTE*: {@link initializeFirebase} must be called before.
 * @param displayName the user's display name received from registration
 * @param email the user's email received from registration.
 * @param password the user's password received from registration.
 * @returns a {@link Promise} that resolves with the current user, or rejects with the error
 */
export function registerUser(displayName: string, email: string, password: string): Promise<firebase.User|null> {
    console.log("registering user");
    return new Promise((resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
            const user = firebase.auth().currentUser;
            if (user === null) {
                console.log("registration failed: user is null");
                resolve(null);
            } else {
                console.log("registration successful: updating profile");
                user.updateProfile({
                    displayName,
                }).then(() => {
                    console.log("profile updat successful");
                    resolve(user);
                }).catch((error) => {
                    console.log("profile update failed:  ", error);
                    reject(error);
                });
            }
        });
    });
}

/**
 * Logins a user to Firebase. *NOTE* {@link initializeFirebase} must be called before.
 * @param email the user's email received from login
 * @param password the user's password received from login
 * @return a {@link Promise} that resolves with the current user, or rejects with the error
 */
export function loginUser(email: string, password: string): Promise<firebase.User|null> {
    console.log("logging in user");
    return new Promise((resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
            console.log("login successful");
            const user = firebase.auth().currentUser;
            if (user === null) {
                resolve(null);
            } else {
                resolve(user);
            }
        }).catch((error) => {
            console.log("login failed: ", error);
            reject(error);
        });
    });
}

/**
 * Gets the ID Token of a current user, or null
 * @returns a {@link Promise} that resolves null if there is no current user or the user's IDToken if there is,
 *  or rejects with error.
 */
export function getUserToken(): Promise<string|null> {
    return new Promise((resolve, reject) => {
        const user = firebase.auth().currentUser;
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
