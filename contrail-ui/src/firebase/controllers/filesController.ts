
import axios from "axios";
import * as firebase from "firebase/app";
import { IResourceModel } from "../../types/resource.types";
import { dbRef, storageRef } from "../firebase";
import { ISuggestion } from "../../components/resources/share-dialog/shareDialog.types";

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

export const addResourcesToFavourites = (resources: IResourceModel[]): Promise<any> => {
    return new Promise((resolve, reject) => {
        axios.put("/api/resources", {
            type: "addFavourites",
            resources,
        })
        .then((response) => {
            resolve(response.data);
        })
        .catch((error) => {
            resolve(error.response.data);
        });
    });
};

export const removeResourcesFromFavourites = (resources: IResourceModel[]): Promise<any> => {
    return new Promise((resolve, reject) => {
        axios.put("/api/resources", {
            type: "removeFavourites",
            resources,
        })
        .then((response) => {
            resolve(response.data);
        })
        .catch((error) => {
            resolve(error.response.data);
        });
    });
};

export const addResourcesToShare = (users: ISuggestion[], resources: IResourceModel[]): Promise<any> => {
    const userIds = users.map((user) => user.id);
    return new Promise((resolve, reject) => {
        axios.put("/api/resources", {
            type: "share",
            resources,
            userIds,
        })
        .then((response) => {
            resolve(response.data);
        })
        .catch((error) => {
            resolve(error.response.data);
        });
    });
};

export const getCollaborators = (resources: IResourceModel[]): Promise<any> => {
    return new Promise((resolve, reject) => {
        const ids = resources.map((resource) => resource.generation);
        const request = {
            params: {
                ids,
            },
        };
        axios.get("/api/shares", request)
        .then((response) => {
            resolve(response.data);
        })
        .catch((error) => {
            resolve(error.response.data);
        });
    });
};
