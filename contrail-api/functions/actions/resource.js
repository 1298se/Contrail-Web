const { firestore, getUserDocRef, getResourceDocRef } = require('../utils/firebaseUtils');
const { getUserInfo } = require('./user');
const httpStatus = require('../../http/httpStatus');

exports.createFavourites = (req, res) => {
    const userId = req.uid;
    const resourceIds = req.body.resourceIds;

    if (!resourceIds || !userId) {
        return res.status(400).send(httpStatus.INVALID_REQUEST_BODY);
    }

    const ref = getUserDocRef(userId);
    return ref.update({
        favourites: firestore.FieldValue.arrayUnion(...resourceIds)
    }).then(() => {
        return res.status(200).send(httpStatus.FAVOURITE_SUCCESSFUL(resourceIds.length));
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

    const ref = getUserDocRef(userId);
    return ref.update({
        favourites: firestore.FieldValue.arrayRemove(...resourceIds)
    }).then(() => {
        return res.status(200).send(httpStatus.UNFAVOURITE_SUCCESSFUL(resourceIds.length));
    }).catch((error) => {
        return res.status(500).send(error);
    });
}

exports.addTrash = (req, res) => {
    const userId = req.uid;
    const { resources, shouldUnshare } = req.body;

    if (!resources || !userId) {
        return res.status(400).send(httpStatus.INVALID_REQUEST_BODY);
    }

    const ref = getUserDocRef(userId);
    if (shouldUnshare) {
        const unsharePromiseList = resources.map((resource) => unshareAllFromResource(resource, userId, false));
        Promise.all(unsharePromiseList)
        .catch((error) => {
            return res.status(500).send(error);
        });
    }
    const resourceIds = resources.map((resource) => resource.generation);
    return ref.update({
        trash: firestore.FieldValue.arrayUnion(...resourceIds)
    }).then(() => {
        return res.status(200).send(httpStatus.TRASH_SUCCESSFUL(resources.length));
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

    const ref = getUserDocRef(userId);
    return ref.update({
        trash: firestore.FieldValue.arrayRemove(...resourceIds)
    }).then(() => {
        return res.status(200).send(httpStatus.RESTORE_SUCCESSFUL(resourceIds.length));
    }).catch((error) => {
        return res.status(500).send(error);
    });
}

shareResource = (resource, collaboratorIds, ownerId) => {
    const batch = firestore().batch();
    const docRef = getResourceDocRef(resource.generation)
    const ownerRef = getUserDocRef(ownerId);

    batch.update(ownerRef, {
        sharedBy: firestore.FieldValue.arrayUnion(resource.generation),
    });
    collaboratorIds.forEach(collaboratorId => {
        const collaboratorRef = getUserDocRef(collaboratorId);
        batch.update(collaboratorRef, {
            root: firestore.FieldValue.arrayUnion(resource),
            sharedTo: firestore.FieldValue.arrayUnion(resource.generation),
        });
        batch.update(docRef, {
            [`permissions.${collaboratorId}`]: "editor",
        });
    });
    return batch.commit();
}

exports.share = (req, res) => {
    const userId = req.uid;
    const { resources, collaboratorIds } = req.body;

    if (!resources || !collaboratorIds) {
        return res.status(400).send(httpStatus.INVALID_REQUEST_BODY);
    }

    const promiseShareList = resources.map(resource => shareResource(resource, collaboratorIds, userId));
    return Promise.all(promiseShareList)
        .then(() => {
            return res.status(200).send(httpStatus.SHARE_SUCCESSFUL(resources.length, collaboratorIds.length));
        })
        .catch((error) => {
            return res.status(500).send(error);
        });
}

unshareResource = (resource, collaboratorIds, ownerId) => {
    const batch = firestore().batch();
    const docRef = getResourceDocRef(resource.generation);
    const ownerRef = getUserDocRef(ownerId);

    collaboratorIds.forEach(collaboratorId => {
        const collaboratorRef = getUserDocRef(collaboratorId)
        batch.update(collaboratorRef, {
            root: firestore.FieldValue.arrayRemove(resource),
            favourites: firestore.FieldValue.arrayRemove(resource.generation),
            trash: firestore.FieldValue.arrayRemove(resource.generation),
            sharedBy: firestore.FieldValue.arrayRemove(resource.generation),
            sharedTo: firestore.FieldValue.arrayRemove(resource.generation)
        });
        batch.update(docRef, {
            [`permissions.${collaboratorId}`]: firestore.FieldValue.delete(),
        });
    });
    return docRef.get()
        .then((doc) => {
            if (doc.exists) {
                const { permissions } = doc.data()
                const permissionIds = Object.keys(permissions).filter(id => id !== ownerId);
                if (permissionIds.every(id => collaboratorIds.includes(id))) {
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
    const docRef = getResourceDocRef(resource.generation);

    return docRef.get()
        .then((doc) => {
            if (doc.exists) {
                const batch = firestore().batch();
                const { permissions } = doc.data();
                const userIds = includeOwner ? Object.keys(permissions) : Object.keys(permissions).filter(id => id !== ownerId);
                userIds.forEach((userId) => {
                    const userRef = getUserDocRef(userId);
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

    const promiseUnshareList = shares.map(share => unshareResource(share.resource, share.userIds, userId));
    return Promise.all(promiseUnshareList)
        .then(() => {
            return res.status(200).send(httpStatus.UNSHARE_SUCCESSFUL(shares.length));
        })
        .catch((error) => {
            return res.status(500).send(error);
        });
}

getCollaboratorsForResource = (userId, resourceId) => {
    const docRef = getResourceDocRef(resourceId);

    return docRef.get()
        .then(async (doc) => {
            if (doc.exists) {
                const { permissions, id, name } = doc.data();
                const ids = Object.keys(permissions).filter(id => id !== userId);
                const promiseList = ids.map(id => getUserInfo(id));
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
    const resourceIds = req.query.ids;

    if (!userId || !resourceIds) {
        return res.status(400).send(httpStatus.INVALID_REQUEST_BODY);
    }

    return Promise.all(resourceIds.map(async resourceId => {
        return await getCollaboratorsForResource(userId, resourceId)
    }))
        .then((values) => {
            return res.status(200).send(values);
        })
        .catch((error) => {
            console.log(error);
            return res.status(500).send(error);
        });
}
