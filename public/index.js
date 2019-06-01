var login = document.getElementById("login");
var register = document.getElementById("register");

var login_user_button = document.getElementById("login_user_button");
var register_user_button = document.getElementById("register_user_button");

var login_form = document.getElementsByClassName("login-form")[0];
var register_form = document.getElementsByClassName("register-form")[0];

login.addEventListener("click", toggleForm);
register.addEventListener("click", toggleForm);

login_user_button.addEventListener("click", loginUser);
register_user_button.addEventListener("click", registerUser);

function toggleForm() {
    login_form.classList.toggle("hidden");
    register_form.classList.toggle("hidden");
}

function loginUser() {
    login_form.submit();
}

function registerUser() {
    register_form.submit();
}

function validateInput() {
    
}