const { firestore } = require("../utils/firebaseUtils");

exports.createFavourites = async (req, res) => {
    const userId = req.uid;
    const resources = req.body.resources

    const ref = firestore().collection("users").doc(userId).collection("root").doc("resources");
    ref.update({
        favourites: firestore.FieldValue.arrayUnion(...resources)
    }).then(() => {
        res.status(200).send();
    }).catch((error) => {
        res.status(500).send(error);
    });
}

exports.removeFavourites = async (req, res) => {
    const userId = req.uid;
    const resources = req.body.resources

    const ref = firestore().collection("users").doc(userId).collection("root").doc("resources");
    ref.update({
        favourites: firestore.FieldValue.arrayRemove(...resources)
    }).then(() => {
        res.status(200).send();
    }).catch((error) => {
        res.status(500).send(error);
    });
}
