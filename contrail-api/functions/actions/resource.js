const { firestore, bucket, getUserDocRef, getResourceDocRef } = require('../utils/firebaseUtils');
const { getUserInfo } = require('./user');
const httpStatus = require('../http/httpStatus');
const fs = require("fs");
const archiver = require("archiver");
const path = require("path");

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

const shareResource = (resource, collaboratorIds, ownerId) => {
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

const unshareResource = (resource, collaboratorIds, ownerId) => {
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

const unshareAllFromResource = (resource, ownerId, includeOwner) => {
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

                const ownerRef = getUserDocRef(ownerId);
                batch.update(ownerRef, {
                    sharedBy: firestore.FieldValue.arrayRemove(resource.generation),
                });
                if (includeOwner) {
                    batch.delete(getResourceDocRef(resource.generation));
                }
                return batch.commit();
            } else {
                return Promise.reject(httpStatus.DOCUMENT_NOT_EXIST);
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

const getCollaboratorsForResource = (userId, resourceId) => {
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
                return Promise.reject(httpStatus.DOCUMENT_NOT_EXIST);
            }
        })
        .catch((error) => {
            return Promise.reject(error);
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
            return res.status(500).send(error);
        });
}

checkUserPermissionsForResource = async (userId, resourceId) => {
    const doc = await getResourceDocRef(resourceId).get();
    if (doc.exists) {
        if (Object.keys(doc.data().permissions).includes(userId)) {
            return Promise.resolve(doc.data());
        } else {
            return Promise.reject(httpStatus.PERMISSION_DENIED);
        }
    } else {
        return Promise.reject(httpStatus.DOCUMENT_NOT_EXIST);
    }
}

const getFileFromBucket =  (ownerId, resourceName) => {
    return bucket.file(`${ownerId}/${resourceName}`);
}
exports.downloadResource = async (req, res) => {
    const userId = req.uid;
    const resourceId = req.params.resourceId;

    if (!resourceId || !userId) {
        return res.status(400).send(httpStatus.INVALID_REQUEST_BODY);
    }

    return checkUserPermissionsForResource(userId, resourceId)
        .then((docData) => {

            return getFileFromBucket(docData.owner, docData.name).download((error, contents) => {
                if (error) {
                    return res.status(500).send(error);
                }

                res.setHeader('content-disposition', 'attachment; filename=' + docData.name);
                return res.end(contents, "binary");
            });
        }).catch((error) => {
            if (error.code === httpStatus.PERMISSION_DENIED.code) {
                return res.status(401).send(error);
            } else {
                return res.status(500).send(error);
            }
        });
}


exports.downloadResourceZip = (req, res) => {
    const userId = req.uid;
    const resourceIds = req.body.resourceIds;

    const time = new Date().getTime();

    const zipFilePath = path.join("/tmp", `contrail-${userId}${time}.zip`);

    let counter = 0;
    const archive = archiver('zip', {
        zlib: { level: 9 }
    });

    const output = fs.createWriteStream(zipFilePath);
    output.on('close', () => {
        return res.download(zipFilePath, ((error) => {
            if (error) {
                return res.status(500).send(error);
            }

            return fs.unlinkSync(zipFilePath);
        }));
    });

    archive.pipe(output);

    const permissionCheckList = resourceIds.map((resourceId) => checkUserPermissionsForResource(userId, resourceId));
    Promise.all(permissionCheckList)
        .then((docDataList) => {
            return docDataList.forEach((docData) => {

                // eslint-disable-next-line consistent-return
                return getFileFromBucket(docData.owner, docData.name).download((error, contents) => {
                    if (error) {
                        return res.status(500).send(error);
                    }
                    archive.append(contents, { name: `${docData.name}` });
                    counter++;

                    if (counter === resourceIds.length) {
                        return archive.finalize();
                    }
                });
            })
        })
        .catch((error) => {
            fs.unlinkSync(zipFilePath);
            if (error.code === httpStatus.PERMISSION_DENIED.code) {
                return res.status(401).send(error);
            } else {
                return res.status(500).send(error);
            }
        });
}

const deleteResource = async (userId, resource) => {
    try {
        const doc = await getResourceDocRef(resource.generation).get();
        if (doc.exists) {
            if (doc.data().permissions[userId] === "editor") {
                return unshareResource(resource, [userId], doc.data().owner);
            } else if (doc.data().permissions[userId] === "owner") {
                await unshareAllFromResource(resource, doc.data().owner, true);
                return getFileFromBucket(doc.data().owner, doc.data().name).delete();
            } else {
                return Promise.reject(httpStatus.PERMISSION_DENIED);
            }
        } else {
            return Promise.reject(httpStatus.DOCUMENT_NOT_EXIST);
        }
    } catch (error) {
        return Promise.reject(error);
    }
}

exports.deletePermanent = async (req, res) => {
    const userId = req.uid;
    const resources = req.body.resources;

    try {
        const permissionCheckList = resources.map((resource) => checkUserPermissionsForResource(userId, resource.generation));
        await Promise.all(permissionCheckList);
        const deleteResourceList = resources.map((resource) => deleteResource(userId, resource));
        await Promise.all(deleteResourceList);
        return res.status(200).send(httpStatus.DELETE_SUCCESSFUL(resources.length));
    } catch (error) {
        if (error.code === httpStatus.PERMISSION_DENIED.code) {
            return res.status(401).send(error);
        } else {
            return res.status(500).send(error);
        }
    }
}
