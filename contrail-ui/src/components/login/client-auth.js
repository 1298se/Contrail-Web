var xhr = new XMLHttpRequest();

/**
 * Login and Signup button configuration
 */
var loginButton = document.getElementById("loginButton")
var registerButton = document.getElementById("registerButton")

loginButton.addEventListener("click", loginUser)
registerButton.addEventListener("click", registerUser)

/**
 * Logging in user with Firebase Auth.
 */
function loginUser() {
    console.log("logging in user")
    var loginEmail = document.getElementById("loginEmail").value
    var loginPassword = document.getElementById("loginPassword").value

    firebase.auth().signInWithEmailAndPassword(loginEmail, loginPassword).then(function () {
        console.log("login successful")
        validateUser();
    }).catch(function (error) {
        console.log("login failed")
    })
}

/**
 *  Registering user with Firebase Auth. 
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
 * Initialize the Firebase user with username
 * @param registerUsername the username submitted to be registered 
 */
function initializeUser(registerUsername) {
    var user = firebase.auth().currentUser
    console.log("initializing user")

    user.updateProfile({
        displayName: registerUsername
    }).then(function () {
        console.log("initialization successful")
        validateUser()
    }).catch(function (error) {
        console.log("initialization failed")
    })
}

/**
 * Sends token from Firebase to server using {@Link XMLHttpRequest}.
 * On server response 200, redirect to main app page
 */
function validateUser() {
    console.log("validating user")

    firebase.auth().currentUser.getIdToken(true).then(function (idToken) {
        console.log("validation successful")
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                console.log("server response received")
                window.location.href = "http://google.com"
                } else {
                console.log("request failed")
            }
        }

        xhr.open("POST", "/register")
        xhr.setRequestHeader("Content-Type", "application/json")
        xhr.send(idToken)
    }).catch(function (error) {
        console.log("validation failed" + error)
    })
}
