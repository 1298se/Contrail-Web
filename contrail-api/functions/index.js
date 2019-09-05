const functions = require('firebase-functions');
const app = require('express')();
const { authMiddleware } = require('./utils/validation/authValidation');
const { getUserFiles, searchUsers } = require('./actions/user');
const { createFavourites, removeFavourites, addTrash, restoreTrash } = require('./actions/resource');
app.get("/", (req, res) => {
    res.status(200).send({ message: "Welcome to Contrail" });
})

app.get("/resources", authMiddleware, getUserFiles);

app.put("/resources", authMiddleware, (req, res) => {
    const type = req.body.type;
    if (type === "createFavourites") return createFavourites(req, res);
    if (type === "removeFavourites") return removeFavourites(req, res);
    if (type === "addTrash") return addTrash(req, res);
    if (type === "restoreTrash") return restoreTrash(req, res);
    return res.status(500).send({ code: "noRequestType", message: "No request type was provided." });
});

app.get("/search", searchUsers);

exports.api = functions.https.onRequest(app);
