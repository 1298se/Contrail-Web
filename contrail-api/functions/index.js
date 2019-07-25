const functions = require('firebase-functions');
const app = require('express')();

app.get("/", (req, res) => {
    res.status(200).send({message: "Welcome to Contrail"});
})

exports.api = functions.https.onRequest(app);
