const { firestore, auth } = require("../utils/firebaseUtils");
const httpStatus = require("../../http/httpStatus");

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

shareResource = (resource, userIds, ownerRef) => {
    const docRef = firestore().collection("documents").doc(resource.generation);
    const batch = firestore().batch();
    batch.update(ownerRef, {
        sharedBy: firestore.FieldValue.arrayUnion(resource.generation),
    })
    userIds.forEach(userId => {
        const shareUserRef = firestore().collection("users").doc(userId).collection("root").doc("resources");
        batch.update(shareUserRef, {
            root: firestore.FieldValue.arrayUnion(resource),
            sharedTo: firestore.FieldValue.arrayUnion(resource.generation),
        });
        batch.update(docRef, {
            [`permissions.${userId}`]: "editor",
        });
    });
    return batch.commit();
}

exports.share = (req, res) => {
    const userId = req.uid;
    const { resources, shareIds } = req.body;
    if (!resources || !shareIds) {
        return res.status(400).send(httpStatus.INVALID_REQUEST_BODY);
    }
    try {
        const ownerRef = firestore().collection("users").doc(userId).collection("root").doc("resources");
        let promiseShareList = [];
        resources.map(resource => promiseShareList.push(shareResource(resource, shareIds, ownerRef)));
        return Promise.all(promiseShareList)
            .then(() => {
                return res.status(200).send(httpStatus.SHARE_SUCCESS);
            })
    } catch (error) {
        return res.status(500).send(error);
    }
}

// unshares is a map with resourceModel keys and userIds array values
unshareResources = (resource, userIds, ownerId) => {
    const batch = firestore().batch();
    const docRef = firestore().collection("documents").doc(resource.generation);
    const ownerRef = firestore().collection("users").doc(ownerId).collection("root").doc("resources");
    userIds.forEach(userId => {
        const shareUserRef = firestore().collection("users").doc(userId).collection("root").doc("resources");
        batch.update(shareUserRef, {
            root: firestore.FieldValue.arrayRemove(resource),
            favourites: firestore.FieldValue.arrayRemove(resource.generation),
            trash: firestore.FieldValue.arrayRemove(resource.generation),
            sharedBy: firestore.FieldValue.arrayRemove(resource.generation),
            sharedTo: firestore.FieldValue.arrayRemove(resource.generation)
        });
        batch.update(docRef, {
            [`permissions.${userId}`]: firestore.FieldValue.delete(),
        });
    });
    return docRef.get()
        .then((doc) => {
            if (doc.exists) {
                const { permissions } = doc.data()
                const ids = Object.keys(permissions).filter(id => id !== ownerId);
                console.log(ids)
                console.log(userIds)
                if (ids.length === userIds.length) {
                    batch.update(ownerRef, {
                        sharedBy: firestore.FieldValue.arrayRemove(resource.generation)
                    });
                }
            }
            console.log("1")
            return batch.commit();
        })
        .catch((e) => {
            console.log("2", e)
            return batch.commit();

        })
}

exports.unshare = (req, res) => {
    const userId = req.uid;
    const { unshares } = req.body;
    console.log(unshares)
    return Promise.all(unshares.map(async unshare => {
        return await unshareResources(unshare.resource, unshare.userIds, userId)
    }))
        .then(() => {
            return res.status(200).send(httpStatus.UNSHARE_SUCCESS);
        })
        .catch((error) => {
            return res.status(500).send(error);
        })
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