const functions = require('firebase-functions');
const app = require('express')();
const { registerUser } = require("./handlers/auth");

app.get("/", (req, res) => {
    res.status(200).send({message: "Welcome to Contrail"});
})

app.post("/register", registerUser);

exports.api = functions.https.onRequest(app);
