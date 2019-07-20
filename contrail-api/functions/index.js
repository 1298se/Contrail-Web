const functions = require('firebase-functions');
const app = require('express')();
const { loginUser, registerUser } = require("./handlers/auth");

app.get("/", (req, res) => {
    res.status(200).send({message: "Welcome to Contrail"});
})

app.post("/login", loginUser);
app.post("/register", registerUser);

exports.api = functions.https.onRequest(app);
