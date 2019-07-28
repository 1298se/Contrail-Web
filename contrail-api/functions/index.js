const functions = require('firebase-functions');
const app = require('express')();
const { authMiddleware } = require('./utils/validation/authValidation');
const { getUserFiles } = require('./handlers/resources')

app.get("/", (req, res) => {
    res.status(200).send({message: "Welcome to Contrail"});
})

app.get("/resources", authMiddleware, getUserFiles);

exports.api = functions.https.onRequest(app);
