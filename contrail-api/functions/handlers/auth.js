const { auth, db } = require("../utils/firebaseUtils");
const firebase = require('firebase');

const emailRegex = RegExp(/^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
const passwordRegex = RegExp(/^\S*$/);
const minDisplayNameLength = 3;
const minPasswordLength = 6;

const firebaseConfig = require("../config/dev-config");

firebase.initializeApp(firebaseConfig);

const registerUserDb = (userRecord) => {
    return new Promise((resolve, reject) => {
        return db.collection("users").doc(userRecord.uid).set({
            displayName: userRecord.displayName,
            email: userRecord.email,
            documents: {
                owned: [],
                sharedToUser: [],
            },
        })
            .then(() => {
                return resolve();
            })
            .catch((error) => {
                return reject(error);
            })
    });
}

const deleteUser = (uid) => {
    return new Promise((resolve, reject) => {
        auth.deleteUser(uid)
            .then(() => {
                return resolve();
            })
            .catch((error) => {
                return reject(error);
            });
    });
}

const verifyEmailandPassword = (email, password) => {
    let errors = {};
    if (email.trim().length === 0) {
        errors.email = "Email must not be empty."
    } else if (!(emailRegex.test(email.trim()))) {
        errors.email = "An invalid email was entererd."
    }

    if (!(password.length >= minPasswordLength)) {
        errors.email = "Password must contain at least 6 characters."
    } else if (!passwordRegex.test(password)) {
        errors.password = "Password must not contain whitespace."
    }

    return errors;
}

const verifyRegisterInfo = (displayName, email, password) => {
    let errors = verifyEmailandPassword(email, password);

    if (displayName === null || displayName.trim().length === 0) {
        errors.displayName = "Display name must not be empty."
    } else if (!(displayName.trim().length >= minDisplayNameLength)) {
        errors.displayName = "Display name must contain at least 3 characters."
    }

    return errors;
}

const createCustomToken = (uid) => {
    return new Promise((resolve, reject) => {
        auth.createCustomToken(uid)
            .then((customToken) => {
                return resolve(customToken);
            })
            .catch((error) => {
                return reject(error);
            })
    })
}

exports.registerUser = async (req, res) => {
    const displayName = req.body.displayName || null;
    const email = req.body.email || null;
    const password = req.body.password || null;

    if (displayName === null || email === null || password === null) {
        return res.status(400).send("Request is missing body parameters.");
    }

    const errors = verifyRegisterInfo(displayName, email, password);
    if (Object.values(errors).length > 0) {
        res.status(400).json(errors);
    }

    try {
        const userRecord = await auth.createUser(req.body);
        return registerUserDb(userRecord)
            .then(() => {
                return res.status(201).send(`user ${userRecord.uid} has been created.`);
            }).catch((error) => {
                deleteUser(userRecord.uid);
                return res.status(500).send(error);
            })
    } catch (error) {
        return res.status(500).send(error);
    }
}

exports.loginUser = (req, res) => {
    const email = req.body.email || null;
    const password = req.body.password || null;

    if (email === null || password === null) {
        return res.status(400).send("Request is missing body parameters.")
    }

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
        return res.status(200).send("user is logged in");
    })
    .catch((error) => {
        return res.status(500).send(error);
    })

    return res.status(200).send(req.body);
}