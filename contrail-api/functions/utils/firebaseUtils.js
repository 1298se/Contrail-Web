const admin = require('firebase-admin');
const serviceKey = require("../config/serviceKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceKey)
});

exports.getUserDocRef = (userId) => {
    return admin.firestore().collection("users").doc(userId).collection("root").doc("resources");
}

exports.getResourceDocRef = (resourceId) => {
    return admin.firestore().collection("documents").doc(resourceId);
}

exports.firestore = admin.firestore;
exports.auth = admin.auth();
