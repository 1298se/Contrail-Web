const { firestore } = require("../utils/firebaseUtils");
const { getUserInfo } = require("./user");
const httpStatus = require("../../http/httpStatus");

exports.createFavourites = (req, res) => {
    const userId = req.uid;
    const resourceIds = req.body.resourceIds;

    if (!resourceIds || !userId) {
        return res.status(400).send(httpStatus.INVALID_REQUEST_BODY);
    }
    const ref = firestore().collection("users").doc(userId).collection("root").doc("resources");
    return ref.update({
        favourites: firestore.FieldValue.arrayUnion(...resourceIds)
    }).then(() => {
        return res.status(200).send();
    }).catch((error) => {
        return res.status(500).send(error);
    });
}

exports.removeFavourites = (req, res) => {
    const userId = req.uid;
    const resourceIds = req.body.resourceIds;

    if (!resourceIds || !userId) {
        return res.status(400).send(httpStatus.INVALID_REQUEST_BODY);
    }
    const ref = firestore().collection("users").doc(userId).collection("root").doc("resources");
    return ref.update({
        favourites: firestore.FieldValue.arrayRemove(...resourceIds)
    }).then(() => {
        return res.status(200).send();
    }).catch((error) => {
        return res.status(500).send(error);
    });
}

exports.addTrash = async (req, res) => {
    const userId = req.uid;
    const { resources, shouldUnshare} = req.body;

    if (!resources || !userId) {
        return res.status(400).send(httpStatus.INVALID_REQUEST_BODY);
    }
    const ref = firestore().collection("users").doc(userId).collection("root").doc("resources");
    if (shouldUnshare) {
        const unsharePromiseMap = [];
        resources.map((resource) => unsharePromiseMap.push(unshareAllFromResource(resource, userId, false)));
        const unshare = await Promise.all(unsharePromiseMap);
    }
    const resourceIds = resources.map((resource) => resource.generation);
    return ref.update({
        trash: firestore.FieldValue.arrayUnion(...resourceIds)
    }).then(() => {
        return res.status(200).send();
    }).catch((error) => {
        return res.status(500).send(error);
    });
}

exports.restoreTrash = (req, res) => {
    const userId = req.uid;
    const resourceIds = req.body.resourceIds;

    if (!resourceIds || !userId) {
        return res.status(400).send(httpStatus.INVALID_REQUEST_BODY);
    }
    const ref = firestore().collection("users").doc(userId).collection("root").doc("resources");
    return ref.update({
        trash: firestore.FieldValue.arrayRemove(...resourceIds)
    }).then(() => {
        return res.status(200).send();
    }).catch((error) => {
        return res.status(500).send(error);
    });
}

shareResource = (resource, collaborators, ownerId) => {
    const batch = firestore().batch();
    const docRef = firestore().collection("documents").doc(resource.generation);
    const ownerRef = firestore().collection("users").doc(ownerId).collection("root").doc("resources");

    batch.update(ownerRef, {
        sharedBy: firestore.FieldValue.arrayUnion(resource.generation),
    });
    collaborators.forEach(collaborator => {
        const collaboratorRef = firestore().collection("users").doc(collaborator).collection("root").doc("resources");
        batch.update(collaboratorRef, {
            root: firestore.FieldValue.arrayUnion(resource),
            sharedTo: firestore.FieldValue.arrayUnion(resource.generation),
        });
        batch.update(docRef, {
            [`permissions.${collaborator}`]: "editor",
        });
    });
    return batch.commit();
}

exports.share = (req, res) => {
    const userId = req.uid;
    const { resources, collaborators } = req.body;

    if (!resources || !collaborators) {
        return res.status(400).send(httpStatus.INVALID_REQUEST_BODY);
    }
    let promiseShareList = [];
    resources.forEach(resource => promiseShareList.push(shareResource(resource, collaborators, userId)));
    return Promise.all(promiseShareList)
        .then(() => {
            console.log(1)
            return res.status(200).send(httpStatus.createCustomStatus("shareSuccess", `${resources.length} file(s) have been successfully shared to ${collaborators.length} users.`));
        })
        .catch((error) => {
            return res.status(500).send(error);
        })
}

unshareResource = (resource, collaborators, ownerId) => {
    const batch = firestore().batch();
    const docRef = firestore().collection("documents").doc(resource.generation);
    const ownerRef = firestore().collection("users").doc(ownerId).collection("root").doc("resources");

    collaborators.forEach(collaborator => {
        const collaboratorRef = firestore().collection("users").doc(collaborator).collection("root").doc("resources");
        batch.update(collaboratorRef, {
            root: firestore.FieldValue.arrayRemove(resource),
            favourites: firestore.FieldValue.arrayRemove(resource.generation),
            trash: firestore.FieldValue.arrayRemove(resource.generation),
            sharedBy: firestore.FieldValue.arrayRemove(resource.generation),
            sharedTo: firestore.FieldValue.arrayRemove(resource.generation)
        });
        batch.update(docRef, {
            [`permissions.${collaborator}`]: firestore.FieldValue.delete(),
        });
    });
    return docRef.get()
        .then((doc) => {
            if (doc.exists) {
                const { permissions } = doc.data()
                const permissionIds = Object.keys(permissions).filter(id => id !== ownerId);
                if (permissionIds.every(id => collaborators.includes(id))) {
                    batch.update(ownerRef, {
                        sharedBy: firestore.FieldValue.arrayRemove(resource.generation)
                    });
                }
            }
            return batch.commit();
        })
        .catch(() => {
            return batch.commit();
        });
}

unshareAllFromResource = (resource, ownerId, includeOwner) => {
    const docRef = firestore().collection("documents").doc(resource.generation);

    return docRef.get()
        .then((doc) => {
            if (doc.exists) {
                const batch = firestore().batch();
                const { permissions } = doc.data();
                const userIds = includeOwner ? Object.keys(permissions) : Object.keys(permissions).filter(id => id !== ownerId);
                userIds.forEach((userId) => {
                    const userRef = firestore().collection("users").doc(userId).collection("root").doc("resources");
                    batch.update(userRef, {
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
                return batch.commit();
            } else {
                return reject(new Error("document not found"));
            }
        })
        .catch((error) => {
            reject(error);
        });
};

exports.unshare = (req, res) => {
    const userId = req.uid;
    const { shares } = req.body;

    if (!shares) {
        return res.status(400).send(httpStatus.INVALID_REQUEST_BODY);
    }
    let promiseUnshareList = [];
    shares.map(share => promiseUnshareList.push(unshareResource(share.resource, share.userIds, userId)));
    return Promise.all(promiseUnshareList)
        .then(() => {
            return res.status(200).send(httpStatus.createCustomStatus("unshareSuccess", `${shares.length} file(s) have been successfully unshared.`));
        })
        .catch((error) => {
            return res.status(500).send(error);
        });
}

getCollaboratorsForResource = (userId, resource) => {
    const docRef = firestore().collection("documents").doc(resource);

    return docRef.get()
        .then(async (doc) => {
            if (doc.exists) {
                const { permissions, id, name } = doc.data();
                const ids = Object.keys(permissions).filter(id => id !== userId);
                let promiseList = [];
                ids.map(id => promiseList.push(getUserInfo(id)));
                const collaborators = await Promise.all(promiseList);
                return {
                    generation: id,
                    name,
                    collaborators,
                };
            } else {
                return reject(new Error("Document does not exist"));
            }
        })
        .catch((error) => {
            reject(error);
        });
}

exports.getCollaborators = async (req, res) => {
    const userId = req.uid;
    const resources = req.query.ids;

    return Promise.all(resources.map(async resource => {
        return await getCollaboratorsForResource(userId, resource)
    }))
        .then((values) => {
            return res.status(200).send(values)
        })
        .catch((error) => {
            return res.status(500).send(error)
        });
}
