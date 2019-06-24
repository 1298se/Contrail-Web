
import * as firebase from "firebase/app";
import "firebase/auth";

// TODO: Call initializeFirebase in App component mount. *NOTE* It is currently
// initialized in Auth.js onMount, but it is initialized every time the component mounts
/**
 * Initializes Firebase authentication. Call when app starts.
 */
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
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }
    console.log("firebase initialized");
}

/**
 * Registers a user to Firebase. *NOTE*: {@link initializeFirebase} must be called before.
 * @param displayName the user's display name received from registration
 * @param email the user's email received from registration.
 * @param password the user's password received from registration.
 *
 */
export function registerUser(displayName: string, email: string, password: string) : boolean{
    console.log("registering user");
    firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
        console.log("registration successful, updating profile");
        const user = firebase.auth().currentUser;
        if (user === null) {
            throw Error("User not found");
        }
        user.updateProfile({
            displayName,
        }).then(() => {
            console.log("profile update successful");
            return true;
        });

    }).catch((error) => {
        console.error("registration failed: ", error);
    });
    return false;
}

/**
 * Logins a user to Firebase. *NOTE* {@link initializeFirebase} must be called before.
 * @param email the user's email received from login
 * @param password the user's password received from login
 */
export function loginUser(email: string, password: string): Promise<firebase.auth.UserCredential | void> {
    console.log("logging in user");
    return firebase.auth().signInWithEmailAndPassword(email, password).then((auth: firebase.auth.UserCredential) => {
        return auth;
    }).catch((error) => {
        console.error("login failed: ", error);
    });
}

/**
 * Gets the ID Token of a current user, or null
 * @returns current user ID Token, or null
 */
export async function getUserToken(): Promise<string | null> {
    const user = firebase.auth().currentUser;
    if (user == null) {
        return null;
    }
    try {
        return await user.getIdToken(true);
    } catch (error) {
        throw Error("Can not get token");
    }
}
