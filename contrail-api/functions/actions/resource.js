const { firestore, auth } = require("../utils/firebaseUtils");

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

shareResource = (resource, users, userRef) => {
    const docRef = firestore().collection("documents").doc(resource.generation);
    const batch = firestore().batch();
    console.log("FIN", users, resource)
    batch.update(userRef, {
        sharedBy: firestore.FieldValue.arrayUnion(resource),
    })
    users.map(user => {
        const shareUserRef = firestore().collection("users").doc(user.uid).collection("root").doc("resources");
        batch.update(shareUserRef, {
            sharedTo: firestore.FieldValue.arrayUnion(docInfo),
        })
        batch.update(docRef, {
            [`permissions.${user.id}`]: "editor",
        })
    });
    return batch.commit();
}

exports.share = async (req, res) => {
    const userId = req.uid;
    const { resources, emails } = req.body;
    console.log(userId, resources, emails)
    const userRef = firestore().collection("users").doc(userId).collection("root").doc("resources");
    try {
        let promiseList = [];
        emails.map(email => promiseList.push(auth.getUserByEmail(email)));
        const users = await Promise.all(promiseList)
        console.log(users)
        let promiseList1 = [];
        resources.map(resource => promiseList1.push(shareResource(resource, users, userRef)));
        return Promise.all(promiseList1)
        .then(values => {
            console.log(values)
            return res.status(200).send();
        })
    } catch (error) {
        return res.status(500).json(error);
    }
}