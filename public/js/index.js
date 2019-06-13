/**
 * Toggling between login/register forms
 */
var loginToggle = document.getElementById("loginToggle")
var registerToggle = document.getElementById("registerToggle")
var loginForm = document.getElementsByClassName("form-login")[0]
var registerForm = document.getElementsByClassName("form-register")[0]

loginToggle.addEventListener("click", toggleForm)
registerToggle.addEventListener("click", toggleForm)

function toggleForm() {
    console.log("toggle")
    loginForm.classList.toggle("hidden")
    registerForm.classList.toggle("hidden")
}

/**
 * Login and Signup button functionality
 */
var loginButton = document.getElementById("loginButton")
var registerButton = document.getElementById("registerButton")

loginButton.addEventListener("click", loginUser)
registerButton.addEventListener("click", registerUser)

/**
 * Logging in user with Firebase
 */
function loginUser() {
    console.log("logging in user")
    var loginEmail = document.getElementById("loginEmail").value
    var loginPassword = document.getElementById("loginPassword").value

    firebase.auth().signInWithEmailAndPassword(loginEmail, loginPassword).then(function () {
        console.log("login successful")
    }).catch(function (error) {
        console.log("login failed")
    })
}

/**
 *  Registering user with Firebase
 */
function registerUser() {
    console.log("registering user")
    var registerUsername = document.getElementById("registerUsername").value
    var registerEmail = document.getElementById("registerEmail").value
    var registerPassword = document.getElementById("registerPassword").value

    firebase.auth().createUserWithEmailAndPassword(registerEmail, registerPassword).then(function () {
        console.log("registration successful")

        initializeUser(registerUsername)
    }).catch(function (error) {
        console.log("registration failed")
    })
}

/**
 * Initialize the user's username to Firebase user instance
 * @param registerUsername the username submitted to be registered 
 */
function initializeUser(registerUsername) {
    var user = firebase.auth().currentUser
    console.log("initializing user")

    user.updateProfile({
        displayName: registerUsername
    }).then(function () {
        console.log("initialized user")

        validateUser()
    }).catch(function (error) {

    })
}

/**
 * Sends token from Firebase to server
 */
function validateUser() {
    console.log("validating user")

    firebase.auth().currentUser.getIdToken(true).then(function (idToken) {
        console.log("validated user")
        // TODO: Http Request to Server with idToken
    }).catch(function (error) {

    })
}
