const functions = require('firebase-functions');
const app = require('express')();
const { registerUser } = require("./handlers/auth");

app.post("/register", registerUser);

exports.api = functions.https.onRequest(app);
