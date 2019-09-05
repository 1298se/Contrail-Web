const functions = require('firebase-functions');
const app = require('express')();
const { authMiddleware } = require('./utils/validation/authValidation');
const { getUserFiles, searchUsers } = require('./actions/user');
const { createFavourites, removeFavourites, share, unshare, getCollaborators, addTrash, restoreTrash } = require('./actions/resource');
const httpStatus = require("../http/httpStatus");

app.get("/resources", authMiddleware, getUserFiles);

app.put("/resources", authMiddleware, (req, res) => {
    const type = req.body.type;
    if (type === "createFavourites") return createFavourites(req, res);
    if (type === "removeFavourites") return removeFavourites(req, res);
    if (type === "share") return share(req, res);
    if (type === "unshare") return unshare(req, res);
    if (type === "addTrash") return addTrash(req, res);
    if (type === "restoreTrash") return restoreTrash(req, res);
    return res.status(500).send(httpStatus.INVALID_REQUEST_BODY);
});

app.get("/search", authMiddleware, searchUsers);

app.get("/shares", authMiddleware, getCollaborators);

exports.api = functions.https.onRequest(app);
