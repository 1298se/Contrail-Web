
import axios from "axios";
import * as firebase from "firebase/app";
import store from "../../store/store";
import { IResourceModel } from "../../types/resource.types";
import { dbRef, storageRef } from "../firebase";

/**
 * Upload a file to Cloud Storage
 *
 * @param file the file needed to be uploaded
 * @param userID the user's email unique id.
 * @returns a uploadTask object of the uploaded File
 */

export const uploadFiletoStorage = (file: File, userID: string): firebase.storage.UploadTask => {
    return storageRef.child(userID + "/" + file.name).put(file);
};

/**
 * Add the document to the specfic users document
 * subcollection and document collection
 *
 * @param upload the uploadTask of the uploaded file.
 * @param userID the user's email unique id.
 * @param displayName the user's display name.
 * @returns a {@link Promise} that resolves or rejects with the error.
 */

export const writeFileToDB =
    (upload: firebase.storage.UploadTask, user: firebase.User): Promise<any> => {
        return new Promise((resolve, reject) => {
            const { name, size, timeCreated, generation, fullPath, updated } = upload.snapshot.metadata;
            const { uid, displayName, email } = user;

            const batch = dbRef.batch();
            const documentsRef = dbRef.collection("documents").doc(generation);
            batch.set(documentsRef, {
                id: generation,
                name,
                path: fullPath,
                permissions: {
                    [uid]: "owner",
                },
                createdBy: displayName,
                size,
                timeCreated,
                updated,
            });
            const owner = {
                uid,
                displayName,
                email,
            };
            const newDoc = {
                name,
                generation,
                size,
                owner,
                timeCreated,
            };
            const userDocRef = dbRef.collection("users").doc(uid).collection("root").doc("resources");
            batch.update(userDocRef, {
                root: firebase.firestore.FieldValue.arrayUnion(newDoc),
            });

            batch.commit()
                .then(() => {
                    resolve();
                })
                .catch((error) => {
                    reject(error.message);
                });
        });
    };

export const addResourcesToFavourites = (resourceIds: string[]): Promise<any> => {
    return new Promise((resolve, reject) => {
        axios.put("/api/resources", {
            type: "createFavourites",
            resourceIds,
        }).then((response) => {
            resolve(response.data);
        }).catch((error) => {
            reject(error.response.data);
        });
    });
};

export const removeResourcesFromFavourites = (resourceIds: string[]): Promise<any> => {
    return new Promise((resolve, reject) => {
        axios.put("/api/resources", {
            type: "removeFavourites",
            resourceIds,
        }).then((response) => {
            resolve(response.data);
        }).catch((error) => {
            reject(error.response.data);
        });
    });
};

export const addResourcesToTrash = (resourceIds: string[]): Promise<any> => {
    return new Promise((resolve, reject) => {
        axios.put("/api/resources", {
            type: "addTrash",
            resourceIds,
        }).then((response) => {
            resolve(response.data);
        }).catch((error) => {
            reject(error.response.data);
        });
    });
};

export const restoreResourceFromTrash = (resourceIds: string[]): Promise<any> => {
    return new Promise((resolve, reject) => {
        axios.put("/api/resources", {
            type: "restoreTrash",
            resourceIds,
        }).then((response) => {
            resolve(response.data);
        })
        .catch((error) => {
            reject(error.response.data);
        });
    });
};

export const filterTrashResources = (resourceIds: string[]): string[] => {
    const trashResources = store.getState().resourceState.userResources.trash;

    return resourceIds.filter((generation) => !trashResources.includes(generation));
};

export const mapIdsToResources = (resourceIds: string[]): IResourceModel[] => {
    const rootResources = store.getState().resourceState.userResources.root;

    const mappedResources = resourceIds.map((generation) =>
        rootResources.find((res) => res.generation === generation));
    return mappedResources.filter((res): res is IResourceModel => !!res);
};
