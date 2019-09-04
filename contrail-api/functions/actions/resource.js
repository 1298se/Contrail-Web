const { firestore } = require("../utils/firebaseUtils");
const httpStatus = require("../../http/httpStatus");

exports.createFavourites = (req, res) => {
    const userId = req.uid;
    const resourceIds = req.body.resourceIds

    if (resourceIds && userId) {
        const ref = firestore().collection("users").doc(userId).collection("root").doc("resources");
        ref.update({
            favourites: firestore.FieldValue.arrayUnion(...resourceIds)
        }).then(() => {
            res.status(200).send();
        }).catch((error) => {
            res.status(500).send(error);
        });
    } else {
        res.status(400).send(httpStatus.INVALID_REQUEST_BODY);
    }
}

exports.removeFavourites = (req, res) => {
    const userId = req.uid;
    const resourceIds = req.body.resourceIds

    if (resourceIds && userId) {
        const ref = firestore().collection("users").doc(userId).collection("root").doc("resources");
        ref.update({
            favourites: firestore.FieldValue.arrayRemove(...resourceIds)
        }).then(() => {
            res.status(200).send();
        }).catch((error) => {
            res.status(500).send(error);
        });
    } else {
        res.status(400).send(httpStatus.INVALID_REQUEST_BODY);
    }
}

exports.addTrash = (req, res) => {
    const userId = req.uid;
    const resourceIds = req.body.resourceIds

    if (resourceIds && userId) {
        const ref = firestore().collection("users").doc(userId).collection("root").doc("resources");
        ref.update({
            trash: firestore.FieldValue.arrayUnion(...resourceIds)
        }).then(() => {
            res.status(200).send();
        }).catch((error) => {
            res.status(500).send(error);
        });
    } else {
        res.status(400).send(httpStatus.INVALID_REQUEST_BODY);
    }
}
