
import * as firebase from "firebase/app";
import { dbRef, storageRef } from "../firebase";

/**
 * Upload a file to Cloud Storage
 *
 * @param file the file needed to be uploaded
 * @param userID the user's email unique id.
 * @returns a uploadTask object of the uploaded File
 */

export function uploadFiletoStorage(file: File, userID: string): firebase.storage.UploadTask {
    return storageRef.child(userID + "/" + file.name).put(file);
}

/**
 * Add the document to the specfic users document
 * subcollection and document collection
 *
 * @param upload the uploadTask of the uploaded file.
 * @param userID the user's email unique id.
 * @param displayName the user's display name.
 * @returns a {@link Promise} that resolves or rejects with the error.
 */

export function writeFileToDB(upload: firebase.storage.UploadTask, userID: string, displayName: string | null):
Promise<any> {
    return new Promise((resolve, reject) => {
        const { name, size, timeCreated, generation, fullPath, updated } = upload.snapshot.metadata;

        const batch = dbRef.batch();
        const documentsRef = dbRef.collection("documents").doc(generation);
        batch.set(documentsRef, {
            id: generation,
            name,
            path: fullPath,
            permissions: {
                [userID]: "owner",
            },
            createdBy: displayName,
            size,
            timeCreated,
            updated,
        });
        const owner = {
            displayName,
            userID,
        };
        const newDoc = {
            name,
            generation,
            size,
            timeCreated,
            owner,
        };
        const userDocRef = dbRef.collection("users").doc(userID).collection("resources").doc("root");
        batch.update(userDocRef, {
            rootFiles: firebase.firestore.FieldValue.arrayUnion(newDoc),
        });

        batch.commit()
        .then(() => {
            resolve();
        })
        .catch((error) => {
            reject(error);
        });
    });
}
