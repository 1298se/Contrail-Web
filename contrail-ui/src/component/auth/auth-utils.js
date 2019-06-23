
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'


export function initializeFirebase() {
    var firebaseConfig = {
        apiKey: "AIzaSyB9tiUIhIC_R9mAibHA71A8WM1Mt9euL0w",
        authDomain: "contrail-db.firebaseapp.com",
        databaseURL: "https://contrail-db.firebaseio.com",
        projectId: "contrail-db",
        storageBucket: "contrail-db.appspot.com",
        messagingSenderId: "342081308461",
        appId: "1:342081308461:web:acee219228373ea8"
      };
      firebase.initializeApp(firebaseConfig);
}

export function registerUser (displayName, email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function() {
        var user = firebase.auth().currentUser
        user.updateProfile({
            displayName: displayName
        })

    }).catch(function(error) {

    })
}

export function loginUser (email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(function() {

    }).catch(function(error) {

    })
}

export function authenticateUser () {
    firebase.auth().onAuthStateChanged(function(user) {

    })
}