
import * as firebase from "firebase/app";
import { dbRef, storageRef } from "../firebase";

/**
 * Upload a file to Cloud Storage
 *
 * @param file the file needed to be updates
 * @returns uploadTask of the uploaded File
 */

export function uploadFiletoStorage(file: File, userID: string): firebase.storage.UploadTask {
    return storageRef.child(userID + "/" + file.name).put(file);
}

export function writeFileToDB(upload: firebase.storage.UploadTask, userID: string): Promise<any> {
    return new Promise((resolve, reject) => {
        const { name, size, timeCreated, generation, fullPath, downloadURLs, updated } = upload.snapshot.metadata;
        const batch = dbRef.batch();
        const documentsDBRef = dbRef.collection("documents").doc(generation);

        batch.set(documentsDBRef, {
            id: generation,
            name,
            path: fullPath,
            permissions: [],
            createdBy: userID,
            size,
            timeCreated,
            updated,
        });
        const newDoc = { name, size, timeCreated, generation, fullPath };
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
