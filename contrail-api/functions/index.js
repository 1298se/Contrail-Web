const functions = require('firebase-functions');
const app = require('express')();
const { authMiddleware } = require('./utils/validation/authValidation');
const userActions = require('./actions/user');
const resourceActions = require('./actions/resource');
const searchActions = require('./actions/search');
const httpStatus = require('../http/httpStatus');

app.get("/resources", authMiddleware, userActions.getUserFiles);

app.put("/resources", authMiddleware, (req, res) => {
    const type = req.body.type;
    if (type === "createFavourites") return resourceActions.createFavourites(req, res);
    if (type === "removeFavourites") return resourceActions.removeFavourites(req, res);
    if (type === "share") return resourceActions.share(req, res);
    if (type === "unshare") return resourceActions.unshare(req, res);
    if (type === "addTrash") return resourceActions.addTrash(req, res);
    if (type === "restoreTrash") return resourceActions.restoreTrash(req, res);
    return res.status(500).send(httpStatus.INVALID_REQUEST_BODY);
});

app.get("/resources/collaborators", authMiddleware, resourceActions.getCollaborators);
app.get("/resources/:resourceId/contents", authMiddleware, resourceActions.downloadResource);
app.post("/zip", authMiddleware, resourceActions.downloadResourceZip);

app.get("/search", authMiddleware, searchActions.searchUsers);

exports.api = functions.https.onRequest(app);
