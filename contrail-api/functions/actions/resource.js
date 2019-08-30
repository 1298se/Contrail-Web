const { firestore, auth } = require("../utils/firebaseUtils");

exports.createFavourites = async (req, res) => {
    const userId = req.uid;
    const resources = req.body.resources

    const ref = firestore().collection("users").doc(userId).collection("root").doc("resources");
    ref.update({
        favourites: firestore.FieldValue.arrayUnion(...resources)
    }).then(() => {
        return res.status(200).send();
    }).catch((error) => {
        return res.status(500).send(error);
    });
}

exports.removeFavourites = async (req, res) => {
    const userId = req.uid;
    const resources = req.body.resources

    const ref = firestore().collection("users").doc(userId).collection("root").doc("resources");
    ref.update({
        favourites: firestore.FieldValue.arrayRemove(...resources)
    }).then(() => {
        return res.status(200).send();
    }).catch((error) => {
        return res.status(500).send(error);
    });
}

shareResource = (resource, users, userRef) => {
    const docRef = firestore().collection("documents").doc(resource.generation);
    const batch = firestore().batch();
    batch.update(userRef, {
        sharedBy: firestore.FieldValue.arrayUnion(resource),
    })
    users.forEach(user => {
        const shareUserRef = firestore().collection("users").doc(user).collection("root").doc("resources");
        batch.update(shareUserRef, {
            root: firestore.FieldValue.arrayUnion(resource),
            sharedTo: firestore.FieldValue.arrayUnion(resource),
        })
        batch.update(docRef, {
            [`permissions.${user}`]: "editor",
        })
    });
    return batch.commit();
}

exports.share = async (req, res) => {
    const userId = req.uid;
    const { resources, shareIds } = req.body;
    const userRef = firestore().collection("users").doc(userId).collection("root").doc("resources");
    try {
        let promiseShareList = [];
        resources.map(resource => promiseShareList.push(shareResource(resource, shareIds, userRef)));
        return Promise.all(promiseShareList)
            .then(() => {
                return res.status(200).send({ message: "Resources shared successfully" });
            })
    } catch (error) {
        return res.status(500).send(error);
    }
}

exports.unshare = async (req, res) => {
    const userId = req.uid;
    const { resource, shareUserId } = req.body;
    const batch = firestore().batch();
    const docRef = firestore().collection("documents").doc(resource.generation);
    const userRef = firestore().collection("users").doc(userId).collection("root").doc("resources");
    const shareUserRef = firestore().collection("users").doc(shareUserId).collection("root").doc("resources");
    batch.update(shareUserRef, {
        root: firestore.FieldValue.arrayRemove(resource),
        sharedTo: firestore.FieldValue.arrayRemove(resource)
    })
    batch.update(docRef, {
        [`permissions.${shareUserId}`]: firestore.FieldValue.delete(),
    })
    try {
        const doc = await docRef.get()
        if (doc.exists) {
            const { permissions } = doc.data()
            const ids = Object.keys(permissions).filter(id => id !== userId);
            if (ids.length === 1) {
                batch.update(userRef, {
                    sharedBy: firestore.FieldValue.arrayRemove(resource)
                });
            }
            return batch.commit()
                .then(() => {
                    return res.status(200).send()
                })
        } else {
            return res.status(500).send({ code: "noRequestType", message: "No document found" });
        }
    } catch (error) {
        return res.status(500).send(error);
    }
}

getCollaboratorsforResource = (userId, resource) => {
    const docRef = firestore().collection("documents").doc(resource);
    return docRef.get()
        .then(async (doc) => {
            if (doc.exists) {
                const { permissions, id, name } = doc.data();
                const ids = Object.keys(permissions).filter(id => id !== userId);
                let promiseList = [];
                ids.map(id => promiseList.push(auth.getUser(id)));
                const collaborators = await Promise.all(promiseList);
                return {
                    generation: id,
                    name,
                    collaborators,
                };
            } else {
                throw new Error("Document does not exist");
            }
        })
        .catch((error) => {
            throw error;
        });
}

exports.getCollaborators = async (req, res) => {
    const userId = req.uid;
    const resources = req.query.ids;
    return Promise.all(resources.map(async resource => {
        return await getCollaboratorsforResource(userId, resource)
    }))
        .then((values) => {
            return res.status(200).send(values)
        })
        .catch((error) => {
            return res.status(500).send(error)
        })
}