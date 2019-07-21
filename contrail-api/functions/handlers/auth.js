const { auth, db } = require("../utils/firebaseUtils");
const { validateRegisterInfo } = require("../utils/validation/authValidation");

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

exports.registerUser = async (req, res) => {
    const displayName = req.body.displayName || null;
    const email = req.body.email || null;
    const password = req.body.password || null;

    if (displayName === null || email === null || password === null) {
        return res.status(400).send("Request is missing body parameters.");
    }

    const errors = validateRegisterInfo(displayName, email, password);
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
