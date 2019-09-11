const { firestore, bucket } = require("../utils/firebaseUtils");
const httpStatus = require("../../http/httpStatus");
const fs = require("fs");
const path = require("path");
const archiver = require("archiver");

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
                    prefix: `${userId}/${doc.data().name}`
                };
                bucket.getFiles(fileOptions, (error, files) => {
                    files[0].download((error, contents) => {
                        res.setHeader('Content-Disposition', 'attachment; filename=' + doc.data().name);
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

exports.downloadResourceZip = async (req, res) => {
    const userId = req.uid;
    const resourceIds = req.body.resourceIds;

    console.log(resourceIds);

    const archive = archiver('zip', {
        zlib: { level: 9 }
    });

    const output = fs.createWriteStream(`${__dirname}/example.zip`);
    output.on('close', () => {
        res.download(`${__dirname}/example.zip`);
    });

    resourceIds.forEach((resourceId) => {
        const doc = firestore().collection("documents").doc(resourceId).get();
        if (doc.exists) {
            console.log("doc exists");
            if (Object.keys(doc.data().permissions).includes(userId)) {
                const fileOptions = {
                    prefix: `${userId}/${doc.data().name}`
                };

                bucket.getFiles(fileOptions, (error, files) => {
                    files[0].download((error, contents) => {
                        archive.append(contents, { name: `${doc.data().name}` })
                    })
                })
            }
        }

        console.log("doc does not exist");
    });

    archive.finalize();
}
