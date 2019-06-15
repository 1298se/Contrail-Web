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
    loginForm.classList.toggle("hidden")
    registerForm.classList.toggle("hidden")
}
