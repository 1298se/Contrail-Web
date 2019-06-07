/*
For toggling between displaying loginForm or registerForm
*/
var loginToggle = document.getElementById("loginToggle")
var registerToggle = document.getElementById("registerToggle")
var loginForm = document.getElementsByClassName("form-login")[0]
var registerForm = document.getElementsByClassName("form-register")[0]

loginToggle.addEventListener("click", toggleForm)
registerToggle.addEventListener("click", toggleForm)

function toggleForm() {
    console.log("clicked toggle")
    loginForm.classList.toggle("hidden")
    registerForm.classList.toggle("hidden")
}

/*
Login and signup button functionality
*/
var loginButton = document.getElementById("loginButton")
var registerButton = document.getElementById("registerButton")

registerButton.addEventListener("click", registerUser)

function registerUser() {
    console.log("registering user")
    var registerUsername = document.getElementById("registerUsername").value
    var registerEmail = document.getElementById("registerEmail").value
    var registerPassword = document.getElementById("registerPassword").value

    firebase.auth().createUserWithEmailAndPassword(registerEmail, registerPassword).catch(function(error) {
        console.log("fuck")
    })
}
