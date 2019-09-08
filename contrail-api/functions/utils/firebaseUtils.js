const admin = require('firebase-admin');
const serviceKey = require("../config/serviceKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceKey),
    storageBucket: "contrail-fbase.appspot.com",
});

const firestore = admin.firestore;
const auth = admin.auth();
const bucket = admin.storage().bucket();
module.exports = { auth, firestore, bucket }
