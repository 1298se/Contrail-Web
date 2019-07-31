const functions = require('firebase-functions');
const app = require('express')();
const { authMiddleware } = require('./utils/validation/authValidation');
const { getUserFiles, searchUsers } = require('./actions/user')

app.get("/", (req, res) => {
    res.status(200).send({ message: "Welcome to Contrail" });
})

app.get("/resources", authMiddleware, getUserFiles);

app.get("/search", searchUsers);

exports.api = functions.https.onRequest(app);
