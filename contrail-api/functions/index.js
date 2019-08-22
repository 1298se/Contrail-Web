const functions = require('firebase-functions');
const app = require('express')();
const { authMiddleware } = require('./utils/validation/authValidation');
const { getUserFiles, searchUsers } = require('./actions/user');
const { createFavourites, removeFavourites, share, unshare, getCollaborators } = require('./actions/resource');

app.get("/", (req, res) => {
    res.status(200).send({ message: "Welcome to Contrail" });
})

app.get("/resources", authMiddleware, getUserFiles);

app.put("/resources", authMiddleware, (req, res) => {
    const type = req.body.type;
    if (type === "addFavourites") return createFavourites(req, res);
    if (type === "removeFavourites") return removeFavourites(req, res);
    if (type === "share") return share(req, res);
    if (type === "unshare") return unshare(req, res);
    return res.status(500).send({ code: "noRequestType", message: "No request type was provided." });
});

app.get("/search", authMiddleware, searchUsers);

app.get("/shares", authMiddleware, getCollaborators);

exports.api = functions.https.onRequest(app);
