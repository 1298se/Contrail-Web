const { firestore, bucket } = require("../utils/firebaseUtils");
const httpStatus = require("../../http/httpStatus");
const fs = require("fs");
const path = require("path");

exports.createFavourites = (req, res) => {
    const userId = req.uid;
    const resourceIds = req.body.resourceIds

    if (resourceIds && userId) {
        const ref = firestore().collection("users").doc(userId).collection("root").doc("resources");
        return ref.update({
            favourites: firestore.FieldValue.arrayUnion(...resourceIds)
        }).then(() => {
            return res.status(200).send();
        }).catch((error) => {
            return res.status(500).send(error);
        });
    } else {
        return res.status(400).send(httpStatus.INVALID_REQUEST_BODY);
    }
}

exports.removeFavourites = (req, res) => {
    const userId = req.uid;
    const resourceIds = req.body.resourceIds

    if (resourceIds && userId) {
        const ref = firestore().collection("users").doc(userId).collection("root").doc("resources");
        return ref.update({
            favourites: firestore.FieldValue.arrayRemove(...resourceIds)
        }).then(() => {
            return res.status(200).send();
        }).catch((error) => {
            return res.status(500).send(error);
        });
    } else {
        return res.status(400).send(httpStatus.INVALID_REQUEST_BODY);
    }
}

exports.addTrash = (req, res) => {
    const userId = req.uid;
    const resourceIds = req.body.resourceIds

    if (resourceIds && userId) {
        const ref = firestore().collection("users").doc(userId).collection("root").doc("resources");
        return ref.update({
            trash: firestore.FieldValue.arrayUnion(...resourceIds)
        }).then(() => {
            return res.status(200).send();
        }).catch((error) => {
            return res.status(500).send(error);
        });
    } else {
        return res.status(400).send(httpStatus.INVALID_REQUEST_BODY);
    }
}

exports.restoreTrash = (req, res) => {
    const userId = req.uid;
    const resourceIds = req.body.resourceIds

    if (resourceIds && userId) {
        const ref = firestore().collection("users").doc(userId).collection("root").doc("resources");
        return ref.update({
            trash: firestore.FieldValue.arrayRemove(...resourceIds)
        }).then(() => {
            return res.status(200).send();
        }).catch((error) => {
            return res.status(500).send(error);
        });
    } else {
        return res.status(400).send(httpStatus.INVALID_REQUEST_BODY);
    }
}

exports.downloadResource = async (req, res) => {
    const userId = req.uid;
    const resourceId = req.params.resourceId;

    if (resourceId && userId) {
        const doc = await firestore().collection("documents").doc(resourceId).get();
        if (doc.exists) {
            if (Object.keys(doc.data().permissions).includes(userId)) {
                const fileOptions = {
                    prefix: doc.data().path,
                };
                bucket.getFiles(fileOptions, (error, files) => {
                    files[0].download((error, contents) => {
                        res.setHeader('Content-disposition', 'attachment; filename=' + path.basename(files[0].name));
                        res.end(contents, "binary");
                    });
                });
            }    
        } else {
            res.status(400).send();
        }
    } else {
        res.status(500).send();
    }
}
